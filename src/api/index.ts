import { Router } from 'express';
import user from './routes/user';

const app = Router();
user(app);

export default app;