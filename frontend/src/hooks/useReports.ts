import { useState, useEffect } from "react";
import api from "../api/apiClient";

export interface ScoreDistribution {
  subject: string;
  code: string;
  distribution: { score: number; count: number }[];
}

export interface TopGroupA {
  sbd: string;
  toan: number;
  vat_li: number;
  hoa_hoc: number;
  totalScore: number;
}

export const useReports = () => {
  const [distributionData, setDistributionData] = useState<any[]>([]);
  const [topGroupA, setTopGroupA] = useState<TopGroupA[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const [distRes, topRes] = await Promise.all([
          api.get("/reports/score-distribution"),
          api.get("/reports/top-group-a"),
        ]);

        // Group the raw distribution data into 4
        const rawDist: ScoreDistribution[] = distRes.data.data;
        const processedDist = rawDist.map((subjectData) => {
          let gte8 = 0;
          let gte6_lt8 = 0;
          let gte4_lt6 = 0;
          let lt4 = 0;

          subjectData.distribution.forEach((d) => {
            if (d.score >= 8) gte8 += d.count;
            else if (d.score >= 6) gte6_lt8 += d.count;
            else if (d.score >= 4) gte4_lt6 += d.count;
            else lt4 += d.count;
          });

          return {
            subject: subjectData.subject,
            ">= 8": gte8,
            "6 - 7.9": gte6_lt8,
            "4 - 5.9": gte4_lt6,
            "< 4": lt4,
          };
        });

        setDistributionData(processedDist);
        setTopGroupA(topRes.data.data);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to load reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return { distributionData, topGroupA, loading, error };
};
