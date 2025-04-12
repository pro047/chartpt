import express from 'express';
import * as authController from '../controller/auth.js';

const router = express.Router();

// 유효성 검사 해야됨
router.post('/login', authController.login);
router.post('/signup', authController.signUp);
router.get('/csrf-token', authController.csrfToken);

export default router;
