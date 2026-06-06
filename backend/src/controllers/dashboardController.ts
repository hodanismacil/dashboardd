import { Request, Response } from "express";
import { UserAnalytics } from "../controllers/IUserAnalytics";

export const getDashboardSummary = async (
  req: Request,
  res: Response
) => {
  try {
    const totalUsers = await UserAnalytics.countDocuments();

    const activeUsers = await UserAnalytics.countDocuments({
      status: "Active",
    });

    const revenue = await UserAnalytics.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$monthlySpending",
          },
        },
      },
    ]);

    // 📊 XOGTA GARAFAKA: Waxaan u samaynaynaa array xogta bilaha ah si uu garaafku u sawirmo
    // Mustaqbalka MongoDB aggregation ayaad ku soo saari kartaa, laakiin hadda si uu garaafku u shaqeeyo, kan ayaa ugu fudud:
    const totalRevAmount = revenue[0]?.totalRevenue || 0;
    
    const chartData = [
      { name: 'Jan', revenue: totalRevAmount * 0.2 }, // Tusaale: 20% ka mid ah dakhliga
      { name: 'Feb', revenue: totalRevAmount * 0.4 }, 
      { name: 'Mar', revenue: totalRevAmount * 0.3 }, 
      { name: 'Apr', revenue: totalRevAmount * 0.6 }, 
      { name: 'May', revenue: totalRevAmount * 0.8 }, 
      { name: 'Jun', revenue: totalRevAmount },       // Bisha hadda la joogo wuxuu tusayaa $64 dhabta ah
    ];

    res.json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        totalRevenue: totalRevAmount,
      },
      chartData, // ✅ Khadkan ayaan ku darnay si uu frontend-ka u gaadho garaafku!
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};