import { Router } from "express";
import { getScore } from "./scoreController";

const router = Router();

router.get("/:registrationNumber", getScore);

export default router;
