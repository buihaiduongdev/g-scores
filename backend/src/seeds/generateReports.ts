import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/database";
import Score from "../models/Score";
import ReportCache from "../models/ReportCache";
import { subjectManager } from "../models/Subject";

dotenv.config();

const generateScoreDistribution = async () => {
  console.log("Calculating Score Distribution...");
  const facetStage: Record<string, any[]> = {};

  for (const subject of subjectManager.getAll()) {
    facetStage[subject.key] = [
      { $group: { _id: `$${subject.key}`, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ];
  }

  const [rawResult] = await Score.aggregate([
    { $facet: facetStage },
  ]).allowDiskUse(true);

  const formattedResult = subjectManager.getAll().map((subject) => {
    const rawDistribution = rawResult[subject.key] || [];
    return {
      subject: subject.displayName,
      code: subject.code,
      distribution: rawDistribution
        .filter((d: { _id: number | null; count: number }) => d._id !== null)
        .map((d: { _id: number; count: number }) => ({
          score: d._id,
          count: d.count,
        })),
    };
  });

  await ReportCache.findOneAndUpdate(
    { reportType: "score_distribution" },
    { data: formattedResult, lastCalculatedAt: new Date() },
    { upsert: true, new: true },
  );
  console.log("Score Distribution cached successfully.");
};

const generateTopGroupA = async () => {
  console.log("Calculating Top 10 Group A...");
  const groupA = subjectManager.getGroupA();

  const matchConditions: Record<string, any> = {};
  const addArray: string[] = [];
  const projectFields: Record<string, number> = {
    _id: 0,
    sbd: 1,
    totalScore: 1,
  };

  for (const subject of groupA) {
    matchConditions[subject.key] = { $ne: null };
    addArray.push(`$${subject.key}`);
    projectFields[subject.key] = 1;
  }

  const top10 = await Score.aggregate([
    { $match: matchConditions },
    { $addFields: { totalScore: { $add: addArray } } },
    { $sort: { totalScore: -1, sbd: 1 } },
    { $limit: 10 },
    { $project: projectFields },
  ]).allowDiskUse(true);

  await ReportCache.findOneAndUpdate(
    { reportType: "top_group_a" },
    { data: top10, lastCalculatedAt: new Date() },
    { upsert: true, new: true },
  );
  console.log("Top 10 Group A cached successfully.");
};

const run = async () => {
  try {
    await connectDB();

    // 1. Check if source data exists — fail fast if scores collection is empty
    const totalScores = await Score.countDocuments();
    if (totalScores === 0) {
      console.error(
        "Cannot generate reports: 'scores' collection is empty. Please run seed script first!",
      );
      process.exit(1);
    }

    // 2. Check if a valid cache already exists (validate top_group_a has exactly 10 entries)
    const validCache = await ReportCache.findOne({ reportType: "top_group_a" });
    if (validCache && validCache.data && validCache.data.length === 10) {
      console.log("Reports skipped: Valid cache already exists.");
      process.exit(0);
    }

    console.log("Started generating reports cache from 1M records...");
    await generateScoreDistribution();
    await generateTopGroupA();

    console.log("All reports cached successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error generating reports:", error);
    process.exit(1);
  }
};

run();
