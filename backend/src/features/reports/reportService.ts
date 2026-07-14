import ReportCache from "../../models/ReportCache";
import Score from "../../models/Score";

export const getScoreDistribution = async () => {
  const cache = await ReportCache.findOne({ reportType: "score_distribution" });
  return cache ? cache.data : null;
};

export const getTopGroupA = async () => {
  const cache = await ReportCache.findOne({ reportType: "top_group_a" });
  return cache ? cache.data : null;
};

export const getStats = async () => {
  const [totalStudents, topGroupACache] = await Promise.all([
    Score.estimatedDocumentCount(),
    ReportCache.findOne({ reportType: "top_group_a" }),
  ]);

  const topStudent = topGroupACache?.data?.[0] ?? null;

  return {
    totalStudents,
    topGroupAScore: topStudent ? topStudent.totalScore : null,
    topGroupASbd: topStudent ? topStudent.sbd : null,
  };
};
