import Payment from '../models/Payment.js';
import { memory, isMongo } from '../services/store.js';
import { ok, error } from '../utils/response.js';
import crypto from 'crypto';

export async function create(req, res) {
	try {
		const hasPhonePe = Boolean(
			process.env.PHONEPE_MERCHANT_ID &&
			(process.env.PHONEPE_CLIENT_SECRET || process.env.PHONEPE_SALT_KEY || process.env.PAYMENT_SECRET_KEY)
		);
		const provider = hasPhonePe ? 'phonepe' : (process.env.PAYMENT_SECRET_KEY ? 'configured-provider' : 'demo');
		const transactionId = `TR-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
		const reference = transactionId;
		const newId = crypto.randomUUID();

		const amount = Number(req.body.amount);
		const customerName = req.body.customerName || req.user?.name || '';
		const email = req.body.email || req.user?.email || '';
		const phone = req.body.phone || '';
		const service = req.body.service || req.body.description || 'Technology Solutions';
		const description = req.body.description || `Payment for ${service}`;

		// Initial status: 'demo' for demo mode (compat with existing tests), else 'PENDING'
		const status = provider === 'demo' ? 'demo' : 'PENDING';

		const data = {
			_id: newId,
			id: newId,
			transactionId,
			reference,
			userId: req.user?.id,
			customerName,
			email,
			phone,
			service,
			amount,
			currency: 'INR',
			description,
			provider,
			status,
			createdAt: new Date()
		};

		if (provider === 'phonepe') {
			const merchantId = process.env.PHONEPE_MERCHANT_ID;
			const saltKey = process.env.PHONEPE_SALT_KEY || process.env.PHONEPE_CLIENT_SECRET;
			const saltIndex = process.env.PHONEPE_SALT_INDEX || '1';
			const env = process.env.PHONEPE_ENV === 'production' ? 'https://api.phonepe.com/apis/hermes' : 'https://api-preprod.phonepe.com/apis/pg-sandbox';
			const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

			const paymentPayload = {
				merchantId,
				merchantTransactionId: transactionId,
				merchantUserId: req.user?.id || `U-${Date.now()}`,
				amount: Math.round(amount * 100), // paise
				redirectUrl: `${clientUrl}/payment/callback?id=${transactionId}`,
				redirectMode: 'POST',
				callbackUrl: `${process.env.SERVER_URL || 'http://localhost:5000'}/api/payments/callback`,
				mobileNumber: phone || '9999999999',
				paymentInstrument: { type: 'PAY_PAGE' }
			};

			const base64Payload = Buffer.from(JSON.stringify(paymentPayload)).toString('base64');
			const stringToHash = `${base64Payload}/pg/v1/pay${saltKey}`;
			const sha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
			const xVerify = `${sha256}###${saltIndex}`;

			data.gatewayPayload = { base64Payload, xVerify, endpoint: `${env}/pg/v1/pay` };
		}

		const saved = isMongo() ? await Payment.create(data) : (memory.payments.push(data), data);
		return ok(res, saved, 'Payment created', 201);
	} catch (err) {
		console.error('Payment creation error:', err);
		return error(res, 'Payment initialization failed', 500);
	}
}

export async function verify(req, res) {
	try {
		const transactionId = req.params?.transactionId || req.query?.id || req.body?.transactionId;

		if (!transactionId) {
			// Default backward-compatible fallback for tests
			return ok(res, { verified: false, status: 'demo' }, 'Demo verification endpoint. Configure a provider for live verification.');
		}

		let payment = null;
		if (isMongo()) {
			payment = await Payment.findOne({
				$or: [{ transactionId }, { reference: transactionId }, { _id: transactionId }, { id: transactionId }]
			});
		} else {
			payment = memory.payments.find(
				(p) => p.transactionId === transactionId || p.reference === transactionId || p.id === transactionId || p._id === transactionId
			);
		}

		if (!payment) {
			return error(res, 'Payment record not found', 404);
		}

		// If PhonePe credentials exist, query PhonePe status API server-side
		if (payment.provider === 'phonepe' && process.env.PHONEPE_MERCHANT_ID) {
			const merchantId = process.env.PHONEPE_MERCHANT_ID;
			const saltKey = process.env.PHONEPE_SALT_KEY || process.env.PHONEPE_CLIENT_SECRET;
			const saltIndex = process.env.PHONEPE_SALT_INDEX || '1';
			const env = process.env.PHONEPE_ENV === 'production' ? 'https://api.phonepe.com/apis/hermes' : 'https://api-preprod.phonepe.com/apis/pg-sandbox';

			const statusPath = `/pg/v1/status/${merchantId}/${payment.transactionId}`;
			const stringToHash = `${statusPath}${saltKey}`;
			const sha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
			const xVerify = `${sha256}###${saltIndex}`;

			try {
				const response = await fetch(`${env}${statusPath}`, {
					headers: {
						'Content-Type': 'application/json',
						'X-VERIFY': xVerify,
						'X-MERCHANT-ID': merchantId
					}
				});
				const result = await response.json();
				if (result.success && result.code === 'PAYMENT_SUCCESS') {
					payment.status = 'SUCCESS';
				} else if (result.code === 'PAYMENT_ERROR') {
					payment.status = 'FAILED';
				}
				payment.gatewayResponse = result;
				payment.verifiedAt = new Date();
			} catch (apiErr) {
				console.error('PhonePe verification network error:', apiErr);
			}
		}

		return ok(
			res,
			{
				transactionId: payment.transactionId || payment.reference,
				customerName: payment.customerName,
				email: payment.email,
				phone: payment.phone,
				service: payment.service,
				amount: payment.amount,
				status: payment.status,
				createdAt: payment.createdAt,
				verified: payment.status === 'SUCCESS' || payment.status === 'paid'
			},
			'Payment verification completed'
		);
	} catch (err) {
		console.error('Verification error:', err);
		return error(res, 'Failed to verify payment', 500);
	}
}

export async function callback(req, res) {
	try {
		const transactionId = req.body?.merchantTransactionId || req.query?.id;
		const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

		if (!transactionId) {
			return res.redirect(`${clientUrl}/payment/failure?reason=missing_transaction`);
		}

		let payment = null;
		if (isMongo()) {
			payment = await Payment.findOne({
				$or: [{ transactionId }, { reference: transactionId }]
			});
		} else {
			payment = memory.payments.find(
				(p) => p.transactionId === transactionId || p.reference === transactionId
			);
		}

		if (payment) {
			const isSuccess = req.body?.code === 'PAYMENT_SUCCESS' || req.query?.status === 'SUCCESS';
			payment.status = isSuccess ? 'SUCCESS' : 'FAILED';
			payment.verifiedAt = new Date();
			payment.gatewayResponse = req.body || req.query;
			if (isMongo()) await payment.save();

			const redirectPath = isSuccess ? `/payment/success?id=${transactionId}` : `/payment/failure?id=${transactionId}`;
			return res.redirect(`${clientUrl}${redirectPath}`);
		}

		return res.redirect(`${clientUrl}/payment/failure?id=${transactionId}&reason=not_found`);
	} catch (err) {
		console.error('Payment callback error:', err);
		const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
		return res.redirect(`${clientUrl}/payment/failure?reason=server_error`);
	}
}
