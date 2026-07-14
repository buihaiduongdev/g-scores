import { useState } from "react";
import { AlertCircle, Loader2, Trophy } from "lucide-react";
import { useReports } from "../hooks/useReports";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function Reports() {
  const { distributionData, topGroupA, loading, error } = useReports();
  const [activeTab, setActiveTab] = useState<"distribution" | "top">(
    "distribution",
  );

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 min-h-[600px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-indigo-500">
          <Loader2 className="w-12 h-12 animate-spin" />
          <p className="font-medium text-slate-500 text-lg">
            Crunching data from 1M+ records...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 min-h-[600px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-red-500 max-w-md text-center">
          <AlertCircle className="w-16 h-16" />
          <h3 className="text-xl font-bold text-slate-900">
            Reports Unavailable
          </h3>
          <p className="font-medium text-slate-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 min-h-[600px] flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h3 className="text-2xl font-extrabold text-slate-900">
            Reports & Analytics
          </h3>
          <p className="text-slate-500">Visualizing 2024 examination data.</p>
        </div>
      </div>

      <div className="flex p-1 bg-slate-100 rounded-xl w-fit mb-8">
        <button
          onClick={() => setActiveTab("distribution")}
          className={`px-6 py-2.5 rounded-lg font-semibold transition-all text-sm ${
            activeTab === "distribution"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Score Distribution
        </button>
        <button
          onClick={() => setActiveTab("top")}
          className={`px-6 py-2.5 rounded-lg font-semibold transition-all text-sm ${
            activeTab === "top"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Top 10 Group A
        </button>
      </div>

      <div className="flex-1 w-full animate-in fade-in duration-500">
        {activeTab === "distribution" && (
          <div className="h-[500px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={distributionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E2E8F0"
                />
                <XAxis
                  dataKey="subject"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748B", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748B", fontSize: 12 }}
                  dx={-10}
                />
                <Tooltip
                  cursor={{ fill: "#F8FAFC" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow:
                      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                  }}
                  itemSorter={(item: any) => {
                    const order: Record<string, number> = {
                      ">= 8": 1,
                      "6 - 7.9": 2,
                      "4 - 5.9": 3,
                      "< 4": 4,
                    };
                    return order[item.dataKey as string] || 0;
                  }}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ paddingTop: "20px" }}
                  itemSorter={(item: any) => {
                    const order: Record<string, number> = {
                      ">= 8": 4,
                      "6 - 7.9": 3,
                      "4 - 5.9": 2,
                      "< 4": 1,
                    };
                    return order[item.dataKey as string] || 0;
                  }}
                />
                <Bar
                  dataKey="< 4"
                  stackId="a"
                  fill="#EF4444"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="4 - 5.9"
                  stackId="a"
                  fill="#F59E0B"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="6 - 7.9"
                  stackId="a"
                  fill="#3B82F6"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey=">= 8"
                  stackId="a"
                  fill="#10B981"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === "top" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="pb-4 pt-2 px-4 text-slate-500 font-semibold text-sm uppercase tracking-wider border-b border-slate-100">
                    Rank
                  </th>
                  <th className="pb-4 pt-2 px-4 text-slate-500 font-semibold text-sm uppercase tracking-wider border-b border-slate-100">
                    Registration No.
                  </th>
                  <th className="pb-4 pt-2 px-4 text-slate-500 font-semibold text-sm uppercase tracking-wider border-b border-slate-100 text-center">
                    Toán
                  </th>
                  <th className="pb-4 pt-2 px-4 text-slate-500 font-semibold text-sm uppercase tracking-wider border-b border-slate-100 text-center">
                    Vật Lý
                  </th>
                  <th className="pb-4 pt-2 px-4 text-slate-500 font-semibold text-sm uppercase tracking-wider border-b border-slate-100 text-center">
                    Hóa Học
                  </th>
                  <th className="pb-4 pt-2 px-4 text-slate-500 font-semibold text-sm uppercase tracking-wider border-b border-slate-100 text-right">
                    Total Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {topGroupA.map((student, index) => (
                  <tr
                    key={student.sbd}
                    className="hover:bg-slate-50 transition-colors group"
                  >
                    <td className="py-4 px-4 border-b border-slate-50">
                      <div className="flex items-center gap-2">
                        {index < 3 ? (
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                              index === 0
                                ? "bg-yellow-400 shadow-lg shadow-yellow-400/20"
                                : index === 1
                                  ? "bg-slate-300 shadow-lg shadow-slate-300/20"
                                  : "bg-amber-600 shadow-lg shadow-amber-600/20"
                            }`}
                          >
                            <Trophy className="w-4 h-4" />
                          </div>
                        ) : (
                          <span className="w-8 h-8 flex items-center justify-center font-bold text-slate-400">
                            #{index + 1}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 border-b border-slate-50 font-semibold text-indigo-600">
                      {student.sbd}
                    </td>
                    <td className="py-4 px-4 border-b border-slate-50 text-center font-medium text-slate-700">
                      {student.toan}
                    </td>
                    <td className="py-4 px-4 border-b border-slate-50 text-center font-medium text-slate-700">
                      {student.vat_li}
                    </td>
                    <td className="py-4 px-4 border-b border-slate-50 text-center font-medium text-slate-700">
                      {student.hoa_hoc}
                    </td>
                    <td className="py-4 px-4 border-b border-slate-50 text-right">
                      <span className="inline-flex items-center justify-center px-3 py-1 bg-indigo-50 text-indigo-700 font-bold rounded-lg border border-indigo-100">
                        {student.totalScore.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
