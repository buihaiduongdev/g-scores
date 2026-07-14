import { Router } from "express";
import { getScore } from "./scoreController";

const router = Router();

router.get("/", (req, res) => {
  res.status(400).json({ error: "Registration number is required" });
});
router.get("/:registrationNumber", getScore);

export default router;
