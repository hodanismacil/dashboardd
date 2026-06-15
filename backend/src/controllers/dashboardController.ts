import { Request, Response } from "express";
// ✅ Waxaan ka soo dhoofsanaynaa Model-ka dhabta ah ee ka jira folder-ka models
import User from "../models/User";

export const getDashboardSummary = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // 1. Xisaabi dhammaan dadka ku jira database-ka
    const totalUsers = await User.countDocuments();

    // 2. Xisaabi inta Active ah (Waxaan u beddelnay User halkii ay ka ahayd UserAnalytics)
  const activeUsersCount = await User.countDocuments({ status: "Active" });;

    // 3. Isku gee dakhliga guud ee monthlySpending
    const revenue = await User.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$monthlySpending",
          },
        },
      },
    ]);

    const totalRevAmount = revenue[0]?.totalRevenue || 0;
    
    // 4. Garaafka Dashboard-ka
    const chartData = [
      { name: 'Jan', revenue: totalRevAmount * 0.2 },
      { name: 'Feb', revenue: totalRevAmount * 0.4 }, 
      { name: 'Mar', revenue: totalRevAmount * 0.3 }, 
      { name: 'Apr', revenue: totalRevAmount * 0.6 }, 
      { name: 'May', revenue: totalRevAmount * 0.8 }, 
      { name: 'Jun', revenue: totalRevAmount },
    ];

    // 5. U dir Frontend-ka
res.status(200).json({
  success: true,
  data: {
    totalUsers: totalUsers,
    activeUsers: activeUsersCount, // 👈 Waxay ku dhex jirtaa "data"
    totalRevenue: totalRevAmount,
  },
  chartData, 
});
  } catch (error: any) {
    console.error("Dashboard Summary Error:", error);
    
     res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};