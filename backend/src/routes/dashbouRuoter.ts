import { Router, Request, Response } from 'express';

import { UserAnalytics } from '../controllers/IUserAnalytics';



const router = Router();

// GET USERS
router.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await UserAnalytics.find().sort({ createdAt: -1 });

    res.status(200).json({
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
router.post('/add-user', async (req: Request, res: Response) => {
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
router.put('/edit-user/:id', async (req: Request, res: Response) => {
  try {
    const user = await UserAnalytics.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
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
router.delete('/delete-user/:id', async (req: Request, res: Response) => {
  try {
    await UserAnalytics.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'User deleted',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;