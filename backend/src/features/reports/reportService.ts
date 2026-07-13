import Score from "../../models/Score";
import { subjectManager } from "../../models/Subject";

export const getScoreDistribution = async () => {
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

  return formattedResult;
};

export const getTopGroupA = async () => {
  const groupA = subjectManager.getGroupA();
  
  const matchConditions: Record<string, any> = {};
  const addArray: string[] = [];
  const projectFields: Record<string, number> = { _id: 0, sbd: 1, totalScore: 1 };

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
    { $project: projectFields }
  ]).allowDiskUse(true);

  return top10;
};
