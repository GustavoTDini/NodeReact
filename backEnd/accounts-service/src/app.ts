// app.ts
import express from 'express';
import helmet from 'helmet';
import accountRouter from './routes/accounts';

const app = express();
app.use(helmet());
app.use(express.json());

app.use(accountRouter);

const port = parseInt(`${process.env.PORT}`)
app.listen(port);
console.log(`Running on port ${port}`);