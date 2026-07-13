import express from "express";
import cors from "cors";
import scoreRoutes from "./features/scores/scoreRoutes";
import reportRoutes from "./features/reports/reportRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/scores", scoreRoutes);
app.use("/api/reports", reportRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "G-Scores API is running" });
});

export default app;
