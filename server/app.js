import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
// import { db } from './db/database.js';
import authRouter from './router/auth.js';

const app = express();

const corsOption = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(morgan('tiny'));
app.use(helmet());
app.use(express.json());
app.use(cors(corsOption));

app.use('/auth', authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});

// db.getConnection().then(console.log());
app.listen(8080);
