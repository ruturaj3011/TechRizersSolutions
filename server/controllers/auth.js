import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { memory, isMongo } from '../services/store.js';
import { fail, ok } from '../utils/response.js';

const getJwtSecret = () => process.env.JWT_SECRET || 'techrizers-dev-jwt-secret-key-2026-secure-random';

const token = (u) =>
	jwt.sign(
		{ id: String(u._id || u.id), role: u.role, email: u.email, name: u.name },
		getJwtSecret(),
		{ expiresIn: '1d' }
	);

export async function login(req, res) {
	const { email, password } = req.body;
	let u = isMongo()
		? await User.findOne({ email })
		: memory.users.find((x) => x.email === email);

	if (!u || !(await bcrypt.compare(password, u.passwordHash))) {
		return fail(res, 'Invalid email or password', 401);
	}

	return ok(
		res,
		{
			token: token(u),
			user: { id: String(u._id || u.id), name: u.name, email: u.email, role: u.role }
		},
		'Login successful'
	);
}

export async function register(req, res) {
	const { name, email, password } = req.body;
	let exists = isMongo()
		? await User.findOne({ email })
		: memory.users.find((x) => x.email === email);

	if (exists) return fail(res, 'Email already registered', 409);

	const data = {
		name,
		email,
		passwordHash: await bcrypt.hash(password, 12),
		role: 'user'
	};

	let u;
	if (isMongo()) {
		u = await User.create(data);
	} else {
		const newId = crypto.randomUUID();
		const entity = { ...data, _id: newId, id: newId };
		memory.users.push(entity);
		u = entity;
	}

	return ok(
		res,
		{
			token: token(u),
			user: { id: String(u._id || u.id), name: u.name, email: u.email, role: u.role }
		},
		'Registration successful',
		201
	);
}

export async function me(req, res) {
	let u = isMongo()
		? await User.findById(req.user.id).select('-passwordHash')
		: memory.users.find((x) => String(x._id || x.id) === req.user.id);

	if (!u) return fail(res, 'User not found', 404);

	return ok(res, {
		id: String(u._id || u.id),
		name: u.name,
		email: u.email,
		role: u.role
	});
}
