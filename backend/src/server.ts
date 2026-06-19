import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import connectDB from './config/db';
import dashboardRoutes from './routes/dashbouRuoter';
import userRoutes from './routes/routeruser';
import { getDashboardSummary } from './controllers/dashboardController';
import authRoutes from './routes/authRoutes';
import { getAnalyticsData } from './controllers/userAnalytics';
import notificationRoutes from './routes/notificationRoutes';
import emailRoutes from './routes/emailRoutes';


dotenv.config();

const app: Application = express();

connectDB();

app.use(express.json());
app.use(cors());


app.use('/api/dashboard', dashboardRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/emails', emailRoutes);
app.get("/api/dashboard/analytics", getAnalyticsData);
app.get("/api/dashboard/summary", getDashboardSummary);





const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 daqiiqo gudahood
  max: 100, // IP kasta wuxuu samayn karaa kaliya 100 codsi (requests) 15-kaas daqiiqo gudahood
  message: {
    status: 429,
    message: "Codsiyo aad u badan ayaa naga soo gaadhay IP-gaga, fadlan sug 15 daqiiqo."
  },
  standardHeaders: true, // Waxay dib ugu celinaysaa macluumaadka xadka RateLimit ee gudaha headers-ka
  legacyHeaders: false, // Meesha ka saar X-RateLimit-* headers-ka duugga ah
});


app.use(limiter); 

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