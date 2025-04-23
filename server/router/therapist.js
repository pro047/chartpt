import express from 'express';
import * as therapistController from '../controller/therapist.js';
import { authenticationToken } from '../middleware/auth.js';

const router = express.Router();

// 유효성 검사 해야됨

router.get(
  '/email',
  authenticationToken,
  therapistController.therapistNameUpdate
);

export default router;
