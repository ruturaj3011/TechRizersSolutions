import { Router } from 'express';
import {
	WHATSAPP_NUMBER,
	createWhatsAppLink,
	formatProjectInquiryMessage,
	formatContactMessage
} from '../services/whatsapp.js';
import { ok } from '../utils/response.js';

const r = Router();

// Public config for frontend WhatsApp integration
r.get('/config', (req, res) => {
	ok(res, {
		phoneNumber: WHATSAPP_NUMBER,
		formattedNumber: '+91 83083 67073',
		defaultGreeting: 'Hello TechRizers! I would like to discuss a digital project with your team.'
	});
});

// Generate pre-filled WhatsApp link
r.post('/link', (req, res) => {
	const { type, text, data } = req.body || {};

	let message = text || '';
	if (type === 'project' && data) {
		message = formatProjectInquiryMessage(data);
	} else if (type === 'contact' && data) {
		message = formatContactMessage(data);
	}

	const link = createWhatsAppLink(message);
	ok(res, { link, message, phoneNumber: WHATSAPP_NUMBER });
});

export default r;
