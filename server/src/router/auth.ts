import express from 'express';
import * as authController from '../controller/auth/auth';
import { authenticationToken } from '../middleware/auth';

const router = express.Router();

// 유효성 검사 해야됨
router.post('/login', authController.login);
router.post('/signup', authController.signUp);
router.post('/logout', authController.logout);
router.get('/csrf-token', authController.csrfToken);
router.get('/me', authenticationToken, authController.me);

export default router;
