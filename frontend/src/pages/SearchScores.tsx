import { Search, BarChart3 } from 'lucide-react';

export function SearchScores() {
  return (
    <>
      <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-50 to-transparent rounded-bl-full -z-0 opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
        
        <div className="relative z-10">
          <h3 className="text-2xl font-extrabold text-slate-900 mb-2">User Registration</h3>
          <p className="text-slate-500 mb-8">Lookup student scores securely using their registration number.</p>
          
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">Registration Number</label>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="e.g. 01000001" 
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 font-medium text-slate-900 transition-all"
                />
              </div>
              <button className="bg-slate-900 hover:bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-slate-900/20 hover:shadow-indigo-500/30 active:scale-95 flex items-center justify-center gap-2">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 min-h-[300px] flex flex-col justify-center items-center text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
          <BarChart3 className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Detailed Scores</h3>
        <p className="text-slate-500 max-w-sm">Enter a registration number above to view the detailed breakdown of examination scores.</p>
      </div>
    </>
  );
}
