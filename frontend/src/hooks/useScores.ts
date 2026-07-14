import { useState } from "react";
import api from "../api/apiClient";
import type { ScoreData } from "../types";

export const useScores = () => {
  const [sbd, setSbd] = useState("");
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchScore = async () => {
    if (!sbd.trim()) {
      setError("Please enter a registration number.");
      return;
    }

    if (sbd.length !== 8) {
      setError("Registration number must be exactly 8 characters long.");
      return;
    }

    setLoading(true);
    setError("");
    setScoreData(null);

    try {
      const response = await api.get(`/scores/${sbd}`);
      setScoreData(response.data);
    } catch (err: any) {
      if (err.response?.status === 502) {
        setError(
          "Hệ thống đang import dữ liệu lớn (>1 triệu bản ghi) cho lần chạy đầu tiên (khoảng 1-2 phút). Vui lòng chờ và F5 lại trang...",
        );
      } else {
        setError(
          err.response?.data?.error ||
            "Failed to fetch score data. Please try again later.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    sbd,
    setSbd,
    scoreData,
    loading,
    error,
    searchScore,
  };
};
