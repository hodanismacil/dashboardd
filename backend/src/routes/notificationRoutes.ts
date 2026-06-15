
import { Router } from 'express';
import { createNotification, getNotifications, markAsRead } from '../controllers/notificationController';


const router = Router();
router.get("/", getNotifications);
router.post("/create", createNotification);
router.put("/read/:id", markAsRead);


export default router;