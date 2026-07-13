import ReportCache from "../../models/ReportCache";

export const getScoreDistribution = async () => {
  const cache = await ReportCache.findOne({ reportType: "score_distribution" });
  return cache ? cache.data : null;
};

export const getTopGroupA = async () => {
  const cache = await ReportCache.findOne({ reportType: "top_group_a" });
  return cache ? cache.data : null;
};
