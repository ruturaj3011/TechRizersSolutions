import { z } from 'zod';

export const contactSchema = z.object({
	name: z.string().min(2).max(100),
	email: z.string().email(),
	phone: z.string().max(30).optional().default(''),
	company: z.string().max(100).optional().default(''),
	projectType: z.string().max(100).optional().default(''),
	budget: z.string().max(100).optional().default(''),
	timeline: z.string().max(100).optional().default(''),
	message: z.string().min(5).max(5000)
});

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(128)
});

export const paymentSchema = z.object({
	amount: z.number().positive().max(100000000),
	description: z.string().max(200).optional().default('Project payment'),
	customerName: z.string().max(100).optional().default(''),
	email: z.string().email().optional().or(z.literal('')).default(''),
	phone: z.string().max(30).optional().default(''),
	service: z.string().max(100).optional().default(''),
	paymentMethod: z.string().max(50).optional().default('UPI')
});
