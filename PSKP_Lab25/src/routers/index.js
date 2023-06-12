import { Router } from 'express'
import usersRouter from './users.router.js'
import authRouter from './auth.router.js'
import reposRouter from './repos.router.js'

const router = Router();

router.use('/api/users', usersRouter);
router.use('/api/auth', authRouter);
router.use('/api/repos', reposRouter);

export default router;