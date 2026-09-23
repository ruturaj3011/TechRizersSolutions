import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
	{
		transactionId: { type: String, unique: true, sparse: true },
		reference: { type: String },
		userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		customerName: { type: String, default: '' },
		email: { type: String, default: '' },
		phone: { type: String, default: '' },
		service: { type: String, default: '' },
		amount: { type: Number, required: true },
		currency: { type: String, default: 'INR' },
		description: { type: String, default: '' },
		provider: { type: String, default: 'demo' },
		status: {
			type: String,
			enum: ['PENDING', 'SUCCESS', 'FAILED', 'CANCELLED', 'created', 'pending', 'paid', 'failed', 'demo'],
			default: 'PENDING'
		},
		gatewayResponse: { type: mongoose.Schema.Types.Mixed },
		verifiedAt: { type: Date }
	},
	{ timestamps: true }
);

export default mongoose.model('Payment', paymentSchema);
