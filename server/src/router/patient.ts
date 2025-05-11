import express from 'express';
import * as patientController from '@controller/patient/patient';

const router = express.Router();

router.post('/chart', patientController.handlerSaveChart);

export default router;
