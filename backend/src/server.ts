import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/db';
import dashboardRoutes from './routes/dashbouRuoter';
import userRoutes from './routes/routeruser';
import { getDashboardSummary } from './controllers/dashboardController';
import authRoutes from './routes/authRoutes';


dotenv.config();

const app: Application = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/dashboard', dashboardRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/dashboard/summary', getDashboardSummary);






app.get('/api/test', (req, res) => {
  res.json({ message: 'API Working' });
});
app.get('/', (req: Request, res: Response) => {
  res.send('Backend working 🚀');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});