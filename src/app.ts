console.log('server start running');
import express from 'express';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;


const app = express();
app.use(express.json());
app.listen(3000, () => console.log(`Listening on port ${PORT},visit http://localhost:${PORT}`));