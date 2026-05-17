import express from 'express'
import morgan from 'morgan';
import userRouter from './routes/user.routes.js';
import candidateRouter from './routes/candidate.routes.js';
import cookieParser from 'cookie-parser';
import { populate } from 'dotenv';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use("/user" , userRouter)
app.use("/candidate" , candidateRouter)

export default app;