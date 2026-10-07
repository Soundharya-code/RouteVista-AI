import React from 'react';
import { BarChart2, PieChart, Activity, TrendingUp } from 'lucide-react';

export default function Analytics() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-text flex items-center gap-2">
            <BarChart2 className="text-primary" /> Analytics
          </h2>
          <p className="text-textMuted">System performance and historical risk distribution.</p>
        </div>
        <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold tracking-widest border border-amber-200">
          ANALYTICS • SIMULATED DEMO DATA
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
        <div className="card flex flex-col">
          <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2"><PieChart size={18}/> Risk Distribution</h3>
          <div className="flex-1 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center p-4">
            {/* Fake Pie Chart using CSS conic-gradient */}
            <div className="w-48 h-48 rounded-full shadow-inner relative" style={{background: 'conic-gradient(#EF4444 0% 15%, #F59E0B 15% 40%, #10B981 40% 100%)'}}>
              <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center shadow">
                <div className="text-center">
                  <p className="text-2xl font-bold text-text">142</p>
                  <p className="text-xs text-textMuted uppercase font-bold">Routes</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-4 text-sm font-semibold">
            <span className="flex items-center gap-1 text-emerald-600"><div className="w-3 h-3 bg-emerald-500 rounded-sm"></div> 60% Low</span>
            <span className="flex items-center gap-1 text-amber-600"><div className="w-3 h-3 bg-amber-500 rounded-sm"></div> 25% Medium</span>
            <span className="flex items-center gap-1 text-red-600"><div className="w-3 h-3 bg-red-500 rounded-sm"></div> 15% High</span>
          </div>
        </div>

        <div className="card flex flex-col">
          <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2"><Activity size={18}/> Incidents by Type</h3>
          <div className="flex-1 flex flex-col justify-end gap-4 bg-slate-50 border border-slate-100 rounded-lg p-6">
             {/* Fake Bar Chart */}
             <div className="flex items-end justify-between h-48 gap-2">
                {[{label: 'Flood', h: '60%', c: 'bg-blue-400'}, {label: 'Landslide', h: '85%', c: 'bg-amber-600'}, {label: 'Damage', h: '40%', c: 'bg-slate-500'}, {label: 'Closure', h: '30%', c: 'bg-red-500'}].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-full bg-slate-200 rounded-t-sm overflow-hidden h-full relative flex items-end">
                      <div className={`w-full rounded-t-sm transition-all duration-1000 ${bar.c}`} style={{height: bar.h}}></div>
                    </div>
                    <span className="text-xs font-bold text-slate-500">{bar.label}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="card flex flex-col">
          <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2"><TrendingUp size={18}/> Delivery Status</h3>
          <div className="flex-1 bg-slate-50 border border-slate-100 rounded-lg p-6 flex flex-col justify-center space-y-6">
            <div>
              <div className="flex justify-between text-sm font-bold mb-1">
                <span className="text-emerald-700">Delivered on Time</span>
                <span className="text-emerald-700">78%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3"><div className="bg-emerald-500 h-3 rounded-full" style={{width: '78%'}}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold mb-1">
                <span className="text-blue-700">Safely Rerouted</span>
                <span className="text-blue-700">14%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3"><div className="bg-primary h-3 rounded-full" style={{width: '14%'}}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold mb-1">
                <span className="text-red-700">Delayed / At Risk</span>
                <span className="text-red-700">8%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3"><div className="bg-red-500 h-3 rounded-full" style={{width: '8%'}}></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
