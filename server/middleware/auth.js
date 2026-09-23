import jwt from 'jsonwebtoken';
import { fail } from '../utils/response.js';

const getJwtSecret = () => process.env.JWT_SECRET || 'techrizers-dev-jwt-secret-key-2026-secure-random';

export function auth(req, res, next) {
	const h = req.headers.authorization;
	if (!h?.startsWith('Bearer ')) return fail(res, 'Authentication required', 401);

	try {
		req.user = jwt.verify(h.slice(7), getJwtSecret());
		next();
	} catch {
		return fail(res, 'Invalid or expired token', 401);
	}
}

export function optionalAuth(req, res, next) {
	const h = req.headers.authorization;
	if (h?.startsWith('Bearer ')) {
		try {
			req.user = jwt.verify(h.slice(7), getJwtSecret());
		} catch {
			// ignore invalid token on optional routes
		}
	}
	next();
}

export const roles = (...allowed) => (req, res, next) =>
	allowed.includes(req.user?.role) ? next() : fail(res, 'Forbidden', 403);
