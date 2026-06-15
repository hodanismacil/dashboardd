import { Request, Response } from "express";

import User from "../models/User";

export const getAnalyticsData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // 1. 📊 User Spending Chart
    const users = await User.find({}, "name monthlySpending");

    const userSpending = users.map((user: any) => ({
      name: user.name || "Unknown",
      spending: user.monthlySpending || 0,
    }));

    // 2. 🟢 Status Distribution Pie Chart
    const activeCount = await User.countDocuments({
      status: "Active",
    });

    const inactiveCount = await User.countDocuments({
      status: "Inactive",
    });

    const statusDistribution = [
      {
        name: "Active Users",
        value: activeCount,
      },
      {
        name: "Inactive Users",
        value: inactiveCount,
      },
    ];

  res.status(200).json({
      success: true,
      data: {
        userSpending,
        statusDistribution,
      },
    });
  } catch (error: any) {
    console.error("Analytics Error:", error);

     res.status(500).json({
      success: false,
      message: "Failed to load analytics data: " + error.message,
    });
  }
};