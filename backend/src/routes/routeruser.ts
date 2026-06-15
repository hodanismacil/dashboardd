import { Router } from "express";

import { protect } from "../middleware/authMiddleware";
import { adminOnly } from "../middleware/adminOnly";
import User from "../models/User";
import Notification from "../modele/Notification";

const router = Router();

// GET ALL USERS
router.get("/", protect, async (req, res) => {
  try {
    const users = await User.find();

    res.json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ADD USER
router.post("/add-user", protect , adminOnly, async (req, res) => {
  try {
    const user = await User.create(req.body);
    
    await Notification.create({
  title: "New User",
  message: `${user.name} ayaa lagu daray system-ka`,
  type: "success",
});
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});



// UPDATE USER
router.put("/edit-user/:id", protect, adminOnly, async (req, res) => {
  try {
    const oldUser = await User.findById(req.params.id);

    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
      }
    );

    await Notification.create({
      title: "User Updated",
      message: `${user?.name} profile-ka waa la cusboonaysiiyay`,
      type: "info",
    });

    if (
      oldUser &&
      user &&
      oldUser.role !== user.role
    ) {
      await Notification.create({
        title: "Role Changed",
        message: `${user.name} role-kiisa waxaa loo beddelay ${user.role}`,
        type: "success",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// DELETE USER
router.delete("/delete-user/:id", protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (user) {
      await Notification.create({
        title: "User Deleted",
        message: `${user.name} ayaa laga saaray system-ka`,
        type: "danger",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/check-user", protect, (req, res) => {
  res.json((req as any).user);
});

router.put("/profile", protect, async (req, res) => {
  try {
    const { name, email } = req.body;

    const currentUser = (req as any).user;

    const user = await User.findByIdAndUpdate(
      currentUser.id,
      { name, email },
      { new: true }
    );

    await Notification.create({
      title: "Profile Updated",
      message: `${user?.name} updated profile settings`,
      type: "info",
    });

    res.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
  
   
export default router;