import { BarChart3 } from 'lucide-react';

export function Reports() {
  return (
    <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 min-h-[600px] flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-extrabold text-slate-900">Reports & Analytics</h3>
          <p className="text-slate-500">Visualizing 2024 examination data.</p>
        </div>
      </div>
      
      <div className="flex p-1 bg-slate-100 rounded-xl w-fit mb-8">
        <button className="px-6 py-2.5 bg-white text-slate-900 rounded-lg font-semibold shadow-sm transition-all text-sm">
          Score Distribution
        </button>
        <button className="px-6 py-2.5 text-slate-500 hover:text-slate-700 rounded-lg font-medium transition-all text-sm">
          Top 10 Group A
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
        <p className="text-slate-400 font-medium flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Charts will be rendered here
        </p>
      </div>
    </div>
  );
}
