import { Router } from "express";
import {
  getScoreDistributionReport,
  getTopGroupAReport,
  getStatsReport,
} from "./reportController";

const router = Router();

router.get("/score-distribution", getScoreDistributionReport);
router.get("/top-group-a", getTopGroupAReport);
router.get("/stats", getStatsReport);

export default router;
