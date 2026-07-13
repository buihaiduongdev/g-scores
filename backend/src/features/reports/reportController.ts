import { Request, Response } from "express";
import { getScoreDistribution, getTopGroupA } from "./reportService";

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

export const getTopGroupAReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const top10 = await getTopGroupA();
    res.json({ data: top10 });
  } catch (error) {
    console.error("Top Group A report error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
