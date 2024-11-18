
import express, { Request, Response} from 'express';
import usersRouter from './routers/usersRouter';
import adminRouter from './routers/adminRouter';
import votesRouter from './routers/votesRouter';
import candidatesRouter from './routers/candidatesRouter';
import { connectDB } from './config/db';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import * as dotenv from 'dotenv';
dotenv.config({
    path:  process.env.NODE_ENV === 'production' 
    ? '.env'
    : '.env.staging',
    override: true
});

const PORT = process.env.PORT

export const app = express();
export const server = http.createServer(app);

app.use(cors());
connectDB();
app.use(express.json());
app.get('/ping', (req: Request, res: Response) => {
    res.status(200).send('pong')});

app.use('/api/users', usersRouter);
app.use('/api/admin', adminRouter);
app.use('/api/votes', votesRouter);
app.use('/api/candidates', candidatesRouter);

export const io = new Server(server,{ cors: { origin: "*" } });
io.on('connection', (socket) => {
    console.log('socket: a user connected');
    
    socket.on('disconnect', () => {
        console.log('socket: a user disconnected');
    });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT},visit http://localhost:${PORT}`));