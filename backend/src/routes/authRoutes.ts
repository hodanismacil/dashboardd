import {Router, } from 'express';
import { login, register } from '../controllers/authController';
import { getAnalyticsData } from '../controllers/userAnalytics';


const router = Router();
 router.post("/register", register);
 router.post("/login", login);
 router.get("/analytics", getAnalyticsData);
 
 router.get("/login", (req, res) => {
  res.json({ message: "Auth route working" });
});
export default router;
