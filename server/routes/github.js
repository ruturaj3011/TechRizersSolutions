import { Router } from 'express';
import { getRepositories } from '../controllers/github.js';

const r = Router();

r.get('/repos', getRepositories);

export default r;
