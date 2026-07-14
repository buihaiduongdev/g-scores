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
      .catch(() => setError("Failed to load stats."))
      .finally(() => setLoading(false));
  }, []);

  return { stats, loading, error };
};
