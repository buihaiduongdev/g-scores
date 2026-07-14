import { Users, Trophy, Loader2 } from "lucide-react";
import { useStats } from "../hooks/useStats";

const StatCard = ({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  color: string;
}) => (
  <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-slate-100 flex items-start gap-4 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
    <div className={`p-3 rounded-xl ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
      <p className="text-2xl font-extrabold text-slate-900">{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  </div>
);

export function Dashboard() {
  const { stats, loading, error } = useStats();

  return (
    <div className="space-y-8">
      {/* Hero*/}
      <div className="bg-linear-to-br from-[#0B1120] to-indigo-900 rounded-3xl p-8 lg:p-10 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-3 leading-tight">
            Vietnam 2024 National Exam
            <br />
            Score Analytics
          </h2>
          <p className="text-slate-400 max-w-lg text-sm leading-relaxed">
            Explore score distributions across 9 subjects and discover
            top-performing students in Group A from over 1 million exam records.
          </p>
        </div>
      </div>

      {/* Summary*/}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-slate-100 h-28 flex items-center justify-center"
            >
              <Loader2 className="w-6 h-6 text-slate-300 animate-spin" />
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-red-400 text-sm">{error}</p>
      ) : stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard
            icon={Users}
            label="Total Students"
            value={stats.totalStudents.toLocaleString()}
            sub="Exam records imported"
            color="bg-indigo-500"
          />
          <StatCard
            icon={Trophy}
            label="Top Group A Score"
            value={
              stats.topGroupAScore !== null
                ? stats.topGroupAScore.toFixed(2)
                : "N/A"
            }
            sub={stats.topGroupASbd ? `SBD: ${stats.topGroupASbd}` : undefined}
            color="bg-amber-500"
          />
        </div>
      ) : null}
    </div>
  );
}
