import { z } from "zod";

export const getScoreParamsSchema = z.object({
  registrationNumber: z
    .string()
    .length(8, "Registration number must be exactly 8 characters long")
    .regex(/^\d+$/, "Registration number must contain only digits"),
});
