import { Request, Response } from "express";
import { getScoreBySBD } from "./scoreService";
import { getScoreParamsSchema } from "./scoreValidator";
import { ZodError } from "zod";

export const getScore = async (req: Request, res: Response): Promise<void> => {
  try {
    const { registrationNumber } = getScoreParamsSchema.parse(req.params);
    
    const student = await getScoreBySBD(registrationNumber);
    
    if (!student) {
      res.status(404).json({ error: "Registration number not found" });
      return;
    }
    
    res.json(student);
  } catch (error: any) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.issues[0].message });
      return;
    }
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
