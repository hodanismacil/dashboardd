
import { Request, Response } from "express";
import Email from "../modle/emali";

// 1. Soo saar dhammaan fariimaha (Get All Emails)
export const getEmails = async (req: Request, res: Response) => {
  try {
    const emails = await Email.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: emails });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createEmail = async (req: Request, res: Response) => {
  try {
    const { senderName, senderEmail, subject, message } = req.body;
    const newEmail = await Email.create({ senderName, senderEmail, subject, message });
    res.status(201).json({ success: true, data: newEmail });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Mark as Read (U calaamadee in la akhriyey)
export const markEmailAsRead = async (req: Request, res: Response) => {
  try {
    const email = await Email.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    res.status(200).json({ success: true, data: email });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Tirtir Email-ka (Delete Email)
export const deleteEmail = async (req: Request, res: Response) => {
  try {
    await Email.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Fariinta si guul leh ayaa loo tirtiray" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};