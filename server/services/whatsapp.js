export const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || '918308367073';

/**
 * Generate a WhatsApp Click-to-Chat URL
 * @param {string} text - Message text to pre-fill
 * @param {string} [phone] - Optional phone number override
 * @returns {string}
 */
export function createWhatsAppLink(text = '', phone = WHATSAPP_NUMBER) {
	const cleanPhone = phone.replace(/[^0-9]/g, '');
	const encoded = encodeURIComponent(text.trim());
	return `https://wa.me/${cleanPhone}${encoded ? `?text=${encoded}` : ''}`;
}

/**
 * Format a structured message for project inquiry leads
 */
export function formatProjectInquiryMessage(data) {
	const lines = [
		'👋 *Hello TechRizers!*',
		'',
		`I would like to discuss a project:`,
		`• *Name*: ${data.name || 'Client'}`,
		data.company ? `• *Company*: ${data.company}` : null,
		data.email ? `• *Email*: ${data.email}` : null,
		data.phone ? `• *Phone*: ${data.phone}` : null,
		data.projectType ? `• *Service*: ${data.projectType}` : null,
		data.budget ? `• *Estimated Budget*: ${data.budget}` : null,
		data.timeline ? `• *Expected Timeline*: ${data.timeline}` : null,
		'',
		`*Message*:`,
		data.message || 'Looking forward to hearing from you.'
	].filter(Boolean);

	return lines.join('\n');
}

/**
 * Format a structured message for contact leads
 */
export function formatContactMessage(data) {
	const lines = [
		'👋 *Hello TechRizers!*',
		'',
		`• *Name*: ${data.name || 'Visitor'}`,
		data.email ? `• *Email*: ${data.email}` : null,
		data.company ? `• *Company*: ${data.company}` : null,
		'',
		`*Message*:`,
		data.message || 'I have an inquiry about your services.'
	].filter(Boolean);

	return lines.join('\n');
}
