import { useState, useEffect } from "react";
import api from "../api/apiClient";

interface Stats {
  totalStudents: number;
  topGroupAScore: number | null;
  topGroupASbd: string | null;
}

export const useStats = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/reports/stats")
      .then((res) => setStats(res.data))
      .catch((err) => {
        if (err.response?.status === 502) {
          setError(
            "Hệ thống đang import dữ liệu lớn (>1 triệu bản ghi) cho lần chạy đầu tiên (khoảng 1-2 phút). Vui lòng chờ và F5 lại trang...",
          );
        } else {
          setError("Failed to load stats.");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return { stats, loading, error };
};
