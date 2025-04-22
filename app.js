import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { db } from './db/database.js';
import authRouter from './router/auth.js';
import therapistRouter from './router/therapist.js';
import { csrfCheck } from './middleware/csrf.js';

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

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});

db.getConnection().then(console.log('db connected'));
app.listen(8080);
