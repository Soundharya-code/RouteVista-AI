import React from 'react';
import { Activity, CloudRain, Map, AlertTriangle, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RiskAnalysis() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-text flex items-center gap-2">
            <Activity className="text-primary" /> AI Risk Analysis
          </h2>
          <p className="text-textMuted">Predictive corridor disruption models.</p>
        </div>
        <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold tracking-widest border border-amber-200">
          AI RISK PROTOTYPE
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card md:col-span-1 bg-slate-900 text-white flex flex-col items-center justify-center p-8 border-none relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <ShieldAlert size={120} />
          </div>
          <h3 className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-2 z-10">Chandrapur Corridor</h3>
          <div className="text-7xl font-black text-red-500 mb-2 z-10 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">87<span className="text-3xl text-slate-500">/100</span></div>
          <div className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wider z-10">HIGH RISK</div>
          
          <div className="w-full mt-8 space-y-2 z-10">
            <p className="text-xs font-bold text-slate-400 uppercase">Risk Thresholds</p>
            <div className="flex h-2 w-full rounded-full overflow-hidden bg-slate-800">
              <div className="bg-emerald-500 w-[30%]"></div>
              <div className="bg-amber-500 w-[30%]"></div>
              <div className="bg-red-500 w-[40%]"></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-bold">
              <span>0-30 LOW</span>
              <span>31-60 MED</span>
              <span>61-100 HIGH</span>
            </div>
          </div>
        </div>

        <div className="card md:col-span-2 space-y-6">
          <h3 className="text-lg font-bold text-text border-b border-border pb-2">Contributive Factors</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-border bg-slate-50 flex items-start gap-4">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-lg"><CloudRain size={24}/></div>
              <div>
                <p className="font-bold text-text">Heavy Rainfall</p>
                <p className="text-sm text-textMuted mt-1">120mm precipitation in last 6 hours.</p>
                <div className="mt-2 text-xs font-bold text-danger">+35% Risk Impact</div>
              </div>
            </div>
            <div className="p-4 rounded-lg border border-red-200 bg-red-50 flex items-start gap-4 shadow-sm">
              <div className="bg-red-200 text-red-700 p-2 rounded-lg"><AlertTriangle size={24}/></div>
              <div>
                <p className="font-bold text-red-800">Landslide Report</p>
                <p className="text-sm text-red-600/80 mt-1">Active field report near KM 12.</p>
                <div className="mt-2 text-xs font-bold text-danger">+40% Risk Impact</div>
              </div>
            </div>
            <div className="p-4 rounded-lg border border-border bg-slate-50 flex items-start gap-4">
              <div className="bg-amber-100 text-amber-600 p-2 rounded-lg"><Map size={24}/></div>
              <div>
                <p className="font-bold text-text">Poor Road Condition</p>
                <p className="text-sm text-textMuted mt-1">Historical degradation known in this sector.</p>
                <div className="mt-2 text-xs font-bold text-warning">+12% Risk Impact</div>
              </div>
            </div>
            <div className="p-4 rounded-lg border border-border bg-slate-50 flex items-start gap-4">
              <div className="bg-slate-200 text-slate-600 p-2 rounded-lg"><Activity size={24}/></div>
              <div>
                <p className="font-bold text-text">Recent Incident</p>
                <p className="text-sm text-textMuted mt-1">Minor disruption reported yesterday.</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm">
            <strong>Note:</strong> This is a decision-support prototype. It combines meteorological data, topological information, and real-time field reports to estimate route disruption probability.
          </div>
        </div>
      </div>
    </div>
  );
}
