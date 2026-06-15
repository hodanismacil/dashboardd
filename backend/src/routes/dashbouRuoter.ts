import { Router, Request, Response } from 'express';
// ✅ HALKAN AYAA SI SAX AH LOO BEDDELAY: Ugu yeer User xaraf weyn si uu ula jaanqaado koodhka hoose
import User from '../models/User';


const router = Router();


// GET USERS
router.get('/users', async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ADD USER
router.post('/add-user', async (req: Request, res: Response): Promise<any> => {
  try {
    const newUser = await User.create(req.body);

    return res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// UPDATE USER
router.put('/edit-user/:id', async (req: Request, res: Response): Promise<any> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// DELETE USER
router.delete('/delete-user/:id', async (req: Request, res: Response): Promise<any> => {
  try {
    await User.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: 'User deleted',
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;