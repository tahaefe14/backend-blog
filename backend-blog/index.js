import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routers/authRouters.js';
import projeRoutes from './routers/projectRouters.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projeRoutes);

app.get('/', (req, res) => {
    res.send('Backend çalışıyor');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor`);
});
