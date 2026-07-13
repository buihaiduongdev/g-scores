import { Router } from "express";
import { getScoreDistributionReport } from "./reportController";

const router = Router();

router.get("/score-distribution", getScoreDistributionReport);

export default router;
