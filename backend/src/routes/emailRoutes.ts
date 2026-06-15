import { Router } from 'express';
import { createEmail, deleteEmail, getEmails, markEmailAsRead } from '../controllers/emailController';




const router = Router();
router.get("/",getEmails);
router.post("/create", createEmail);
router.put("/read/:id", markEmailAsRead);
router.delete("/:id", deleteEmail);

export default router;

