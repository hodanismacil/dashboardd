import { Request, Response } from "express";
// ✅ WAA LA SAXAY: Folder-ka magiciisa waxaan ka dhignay "models" halkii uu ka ahaa "modele"
import Notification from "../modele/Notification";

// 1️⃣ Soo saar dhammaan ogeysiisyada (Get All)
export const getNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await Notification.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 2️⃣ Abuur ogeysiis cusub (Create)
export const createNotification = async (req: Request, res: Response) => {
  try {
    const notification = await Notification.create(req.body);

    res.status(201).json({
      success: true,
      data: notification,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 3️⃣ U calaamadee in la akhriyey (Mark as Read)
export const markAsRead = async (req: Request, res: Response) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        isRead: true,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      data: notification,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🚀 4️⃣ SHAQO TIJAABO AH (Seed Data Function)
// Tani waxay database-ka ku shubaysaa 3 ogeysiis oo aad ku tijaabiso Frontend-ka
export const seedNotifications = async (req: Request, res: Response) => {
  try {
    // 1. Tirtir wixii ogeysiis hore u jiray
    await Notification.deleteMany({});

    // 2. Ku shub 3 ogeysiis oo cusub oo wata "type"-yada rasmiga ah ee aad Frontend-ka ku xirtay
    const testData = await Notification.create([
      {
        title: "Macaamiil Cusub oo ku soo biiray!",
        message: "Hodan, qof la yiraahdo Hoodo ayaa hadda is-diwaangalisay.",
        type: "success", // Wuxuu Frontend-ka ka kicin doonaa astaanta UserPlus
        isRead: false,
      },
      {
        title: "Calaamad Danger: Isticmaale la tirtiray",
        message: "Xogta isticmaalihii la oron jiray Xasan ayaa laga tirtiray nidaamka.",
        type: "danger", // Wuxuu Frontend-ka ka kicin doonaa astaanta Trash2
        isRead: false,
      },
      {
        title: "Amniga System-ka",
        message: "Password-ka maamulaha (Admin Settings) si guul leh ayaa loo cusboonaysiiyey.",
        type: "info", // Wuxuu Frontend-ka ka kicin doonaa astaanta ShieldCheck
        isRead: false,
      }
    ]);

    res.status(200).json({
      success: true,
      message: "Xogtii tijaabada ogeysiisyada si guul leh ayaa loogu dhex daray MongoDB! 🎉",
      data: testData,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};