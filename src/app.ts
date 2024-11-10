console.log('server start running');
import express from 'express';
import 'dotenv/config';
import usersRouter from './routers/usersRouter';
import  adminRouter from './routers/adminRouter';
import  votesRouter from './routers/votesRouter';
import  candidatesRouter from './routers/candidatesRouter';
import { connectDB } from './config/db';

const PORT = process.env.PORT || 3000;


const app = express();
connectDB();
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/admin', adminRouter);
app.use('/api/votes', votesRouter);
app.use('/api/candidates', candidatesRouter);

app.listen(3000, () => console.log(`Listening on port ${PORT},visit http://localhost:${PORT}`));