import { Router } from "express";
import { getScoreDistributionReport, getTopGroupAReport } from "./reportController";

const router = Router();

router.get("/score-distribution", getScoreDistributionReport);
router.get("/top-group-a", getTopGroupAReport);

export default router;
