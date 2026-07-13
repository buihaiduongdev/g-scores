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
