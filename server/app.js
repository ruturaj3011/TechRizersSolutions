import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import auth from './routes/auth.js';
import forms from './routes/forms.js';
import payments from './routes/payments.js';
import admin from './routes/admin.js';
import crud from './routes/crud.js';
import whatsapp from './routes/whatsapp.js';
import github from './routes/github.js';
import { notFound, errorHandler } from './middleware/error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
	helmet({
		contentSecurityPolicy: false,
		crossOriginEmbedderPolicy: false
	})
);
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '200kb' }));
app.use(
	rateLimit({ windowMs: 15 * 60 * 1000, max: 500, standardHeaders: true, legacyHeaders: false })
);

// Simple request logger
app.use((req, res, next) => {
	console.log('REQ', req.method, req.path);
	next();
});

// API Routes
app.get('/api/health', (req, res) => res.json({ success: true, message: 'TechRizers API is healthy' }));
app.use('/api/auth', auth);
app.use('/api', forms);
app.use('/api/payments', payments);
app.use('/api/admin', admin);
app.use('/api/whatsapp', whatsapp);
app.use('/api/github', github);
app.use('/api', crud);

// Serve built React client whenever available
const clientDist = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDist)) {
	app.use(express.static(clientDist));
	app.use((req, res, next) => {
		if (req.method !== 'GET' || req.path.startsWith('/api')) {
			return next();
		}
		res.sendFile(path.join(clientDist, 'index.html'));
	});
}

// 404 & Error Handlers for API
app.use(notFound);
app.use(errorHandler);

export default app;
