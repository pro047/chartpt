import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from '@router/auth';
import therapistRouter from '@router/therapist';
import { csrfCheck } from '@middleware/csrf';
import { errorHandler } from '@middleware/errors';
import './types/express';

const app = express();

const corsOption = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cookieParser());
app.use(morgan('tiny'));
app.use(helmet());
app.use(express.json());
app.use(cors(corsOption));

// app.use(csrfCheck);
app.use('/auth', authRouter);
app.use('/therapist', therapistRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(404);
});

app.use(errorHandler);

export default app;
