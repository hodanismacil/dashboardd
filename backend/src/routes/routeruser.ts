import { Router } from "express";
import { UserAnalytics } from "../controllers/IUserAnalytics";
import { protect } from "../middleware/authMiddleware";
import { adminOnly } from "../middleware/adminOnly";

const router = Router();

// GET ALL USERS
router.get("/", protect, async (req, res) => {
  try {
    const users = await UserAnalytics.find();

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
    const user = await UserAnalytics.create(req.body);

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
    const user = await UserAnalytics.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
      }
    );

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
    const user = await UserAnalytics.findByIdAndDelete(req.params.id);

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
export default router;