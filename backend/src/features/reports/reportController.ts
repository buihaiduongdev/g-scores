import { Request, Response } from "express";
import { getScoreDistribution, getTopGroupA } from "./reportService";

const CACHE_NOT_READY_MESSAGE =
  "Report data is not available yet. Please run 'npm run generate-reports' first.";

export const getScoreDistributionReport = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const distribution = await getScoreDistribution();
    if (!distribution) {
      res.status(503).json({ error: CACHE_NOT_READY_MESSAGE });
      return;
    }
    res.json({ data: distribution });
  } catch (error) {
    console.error("Score distribution error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getTopGroupAReport = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const top10 = await getTopGroupA();
    if (!top10) {
      res.status(503).json({ error: CACHE_NOT_READY_MESSAGE });
      return;
    }
    res.json({ data: top10 });
  } catch (error) {
    console.error("Top Group A report error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
