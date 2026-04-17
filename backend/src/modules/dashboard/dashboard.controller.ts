import { Request, Response } from "express";
import { Subscription } from "../subscription/subscription.model";
import User from "../auth/auth.model";

export const getDashboardData = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user._id;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const subscription = await Subscription.findOne({ userId });

    const planLimits: { [key: string]: number } = {
      FREE: 5,
      PRO: 50,
    };

    const plan = subscription?.plan || "FREE";
    const limit = planLimits[plan] || 5;

    res.status(200).json({
      success: true,
      data: {
        user: {
          name: user.name,
          email: user.email,
        },
        subscription: {
          plan: plan,
          limit: limit,
          usage: {
            count: subscription?.usage?.count || 0,
          },
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
