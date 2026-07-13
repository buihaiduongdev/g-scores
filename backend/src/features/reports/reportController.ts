import { Request, Response } from "express";
import { getScoreDistribution } from "./reportService";

export const getScoreDistributionReport = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const distribution = await getScoreDistribution();
    res.json({ data: distribution });
  } catch (error) {
    console.error("Score distribution error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
