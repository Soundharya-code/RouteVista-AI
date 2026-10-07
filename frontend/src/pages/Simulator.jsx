import React, { useState } from 'react';
import { Play, AlertTriangle, Truck, MapPin, Package, Clock, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Simulator() {
  const [scenario, setScenario] = useState('');
  const [status, setStatus] = useState('idle'); // idle, running, complete
  const [results, setResults] = useState(null);

  const handleSimulate = () => {
    if (!scenario) return;
    setStatus('running');
    
    setTimeout(() => {
      setResults({
        affected_vehicles: '06',
        affected_deliveries: '11',
        critical_deliveries_at_risk: '03',
        locations_affected: '17',
        additional_eta_mins: '+42 min',
      });
      setStatus('complete');
    }, 2500);
  };

  const handleReset = () => {
    setStatus('idle');
    setResults(null);
    setScenario('');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-text flex items-center gap-2 uppercase tracking-wide">
            <Play className="text-primary" /> What-If Disruption Simulator
          </h2>
          <p className="text-textMuted mt-1">Simulate network disruptions to evaluate resilience and alternative routing strategies.</p>
        </div>
        <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold tracking-widest border border-amber-200">
          DEMO / SIMULATED VALUES
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-1 space-y-4 flex flex-col border-primary/20 bg-slate-50">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest border-b border-border pb-2 mb-2">Select Scenario</h3>
          
          <div className="space-y-3 flex-1">
            {['Bridge Closure', 'Major Flood', 'Landslide', 'Road Closure'].map((scen) => (
              <label key={scen} className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${scenario === scen ? 'border-primary bg-white shadow-md' : 'border-transparent bg-white shadow-sm hover:border-slate-300'}`}>
                <input 
                  type="radio" 
                  name="scenario" 
                  value={scen} 
                  className="hidden" 
                  onChange={(e) => setScenario(e.target.value)} 
                />
                <div className="flex items-center justify-between">
                  <span className={`font-bold ${scenario === scen ? 'text-primary' : 'text-text'}`}>{scen}</span>
                  {scenario === scen && <ShieldAlert size={18} className="text-primary" />}
                </div>
              </label>
            ))}
          </div>
          
          <div className="space-y-3 pt-4 border-t border-border mt-4">
            <button 
              onClick={handleSimulate}
              disabled={!scenario || status === 'running'}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2 shadow-md uppercase tracking-wider text-sm font-bold"
            >
              {status === 'running' ? 'Running Simulation...' : 'Run Simulation'}
            </button>
            <button 
              onClick={handleReset}
              disabled={status === 'idle'}
              className="w-full btn-secondary py-3 text-slate-500 font-bold uppercase tracking-wider text-sm"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {status === 'idle' && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full min-h-[400px] card flex flex-col items-center justify-center text-center bg-slate-50 border-dashed border-2 border-slate-300"
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-slate-400">
                  <MapPin size={40} />
                </div>
                <h3 className="text-2xl font-bold text-text mb-2">Ready for Simulation</h3>
                <p className="text-textMuted max-w-sm">Select a disruption scenario from the left to calculate the network-wide impact.</p>
              </motion.div>
            )}

            {status === 'running' && (
              <motion.div 
                key="running"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full min-h-[400px] card flex flex-col items-center justify-center text-center bg-slate-50 border-primary/20"
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md mb-6 relative">
                  <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <Play size={24} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-text mb-2 animate-pulse">Analyzing Network Impact</h3>
                <p className="text-textMuted max-w-sm">Recalculating routes, identifying affected logistics, and prioritizing critical deliveries...</p>
              </motion.div>
            )}

            {status === 'complete' && results && (
              <motion.div 
                key="complete"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card h-full flex flex-col"
              >
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                  <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center shadow-sm">
                    <ShieldAlert size={32} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Impact Analysis</p>
                    <h3 className="text-2xl font-black text-text uppercase tracking-wide">{scenario}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-50 p-6 rounded-xl border border-border shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Vehicles Affected</p>
                      <p className="text-3xl font-black text-text">{results.affected_vehicles}</p>
                    </div>
                    <Truck size={32} className="text-blue-500 opacity-20" />
                  </div>
                  
                  <div className="bg-red-50 p-6 rounded-xl border border-red-100 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-red-800/60 text-xs font-bold uppercase tracking-wider mb-1">Critical Deliveries Affected</p>
                      <p className="text-3xl font-black text-red-600">{results.critical_deliveries_at_risk}</p>
                    </div>
                    <AlertTriangle size={32} className="text-red-500 opacity-20" />
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-border shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Deliveries Affected</p>
                      <p className="text-3xl font-black text-text">{results.affected_deliveries}</p>
                    </div>
                    <Package size={32} className="text-emerald-500 opacity-20" />
                  </div>
                  
                  <div className="bg-slate-50 p-6 rounded-xl border border-border shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Average Additional ETA</p>
                      <p className="text-3xl font-black text-warning">{results.additional_eta_mins}</p>
                    </div>
                    <Clock size={32} className="text-warning opacity-20" />
                  </div>
                </div>
                
                <div className="mt-auto pt-4 border-t border-border flex justify-between items-center text-sm font-medium text-slate-500">
                  <span className="flex items-center gap-2"><MapPin size={16}/> Locations affected: <strong>{results.locations_affected}</strong></span>
                  <button className="text-primary hover:underline">View Alternative Routes Map</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
