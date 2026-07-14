import { Search, BarChart3, Loader2, AlertCircle } from "lucide-react";
import { useScores } from "../hooks/useScores";
import type { ScoreData } from "../types";

export function SearchScores() {
  const { sbd, setSbd, scoreData, loading, error, searchScore } = useScores();

  const getSubjectName = (key: keyof ScoreData) => {
    const names: Record<string, string> = {
      toan: "Toán",
      ngu_van: "Ngữ Văn",
      ngoai_ngu: "Ngoại Ngữ",
      vat_li: "Vật Lý",
      hoa_hoc: "Hóa Học",
      sinh_hoc: "Sinh Học",
      lich_su: "Lịch Sử",
      dia_li: "Địa Lý",
      gdcd: "GDCD",
    };
    return names[key as string] || key;
  };

  return (
    <>
      <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-indigo-50 to-transparent rounded-bl-full z-0 opacity-50 group-hover:scale-110 transition-transform duration-700"></div>

        <div className="relative z-10">
          <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
            User Registration
          </h3>
          <p className="text-slate-500 mb-8">
            Lookup student scores securely using their registration number.
          </p>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">
              Registration Number
            </label>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={sbd}
                  onChange={(e) => setSbd(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && searchScore()}
                  placeholder="e.g. 01000001"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 font-medium text-slate-900 transition-all"
                />
              </div>
              <button
                onClick={searchScore}
                disabled={loading}
                className="bg-slate-900 hover:bg-indigo-600 disabled:bg-slate-400 disabled:cursor-not-allowed text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-slate-900/20 hover:shadow-indigo-500/30 active:scale-95 flex items-center justify-center gap-2 min-w-[120px]"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Submit"
                )}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm mt-2 font-medium">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 min-h-[300px] flex flex-col items-center">
        {!scoreData ? (
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
              <BarChart3 className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Detailed Scores
            </h3>
            <p className="text-slate-500 max-w-sm">
              Enter a registration number above to view the detailed breakdown
              of examination scores.
            </p>
          </div>
        ) : (
          <div className="w-full animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Result for Registration No:{" "}
                  <span className="text-indigo-600">{scoreData.sbd}</span>
                </h3>
                {scoreData.ma_ngoai_ngu && (
                  <p className="text-sm text-slate-500 mt-1">
                    Foreign Language Code: {scoreData.ma_ngoai_ngu}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {(Object.keys(scoreData) as Array<keyof ScoreData>).map((key) => {
                if (key === "sbd" || key === "ma_ngoai_ngu") return null;
                const score = scoreData[key];

                return (
                  <div
                    key={key}
                    className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col items-center justify-center text-center"
                  >
                    <span className="text-sm font-medium text-slate-500 mb-1">
                      {getSubjectName(key)}
                    </span>
                    <span className="text-2xl font-extrabold text-slate-900">
                      {score !== null ? score : "-"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
