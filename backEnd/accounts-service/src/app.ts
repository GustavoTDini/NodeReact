// app.ts
import express from 'express';
import helmet from 'helmet';
import accountRouter from './routes/accounts';

const app = express();
app.use(helmet());
app.use(express.json());

app.use(accountRouter);

export default app;