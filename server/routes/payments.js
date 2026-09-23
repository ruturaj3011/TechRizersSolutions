import { Router } from 'express';
import { create, verify, callback } from '../controllers/payments.js';
import { validate } from '../middleware/validate.js';
import { paymentSchema } from '../validators/forms.js';
import { optionalAuth } from '../middleware/auth.js';

const r = Router();

r.post('/create', optionalAuth, validate(paymentSchema), create);
r.post('/verify', optionalAuth, verify);
r.get('/verify', optionalAuth, verify);
r.get('/verify/:transactionId', optionalAuth, verify);
r.post('/callback', callback);
r.get('/callback', callback);

export default r;
