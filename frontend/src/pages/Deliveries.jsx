import React, { useState } from 'react';
import { useDemoStore } from '../store/demoStore';
import { Package, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Deliveries() {
  const { deliveries } = useDemoStore();
  const [filter, setFilter] = useState('ALL');

  const filtered = filter === 'ALL' ? deliveries : deliveries.filter(d => d.priority === filter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-text flex items-center gap-2">
            <Package className="text-primary" /> Delivery Management
          </h2>
          <p className="text-textMuted">Track and prioritize logistics based on network risk.</p>
        </div>
        
        <div className="flex gap-2 bg-slate-100 p-1 rounded-lg border border-border">
          {['ALL', 'CRITICAL', 'HIGH', 'NORMAL'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${filter === f ? 'bg-white shadow text-primary' : 'text-slate-500 hover:text-text'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(delivery => (
          <div key={delivery.id} className="card flex flex-col hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-start mb-4 border-b border-border pb-4">
              <div>
                <p className="text-sm font-bold text-slate-400">{delivery.id}</p>
                <h3 className="font-bold text-lg text-text leading-tight mt-1">{delivery.item}</h3>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-bold ${delivery.priority === 'CRITICAL' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'}`}>
                {delivery.priority}
              </span>
            </div>
            
            <div className="space-y-4 flex-1">
              <div className="flex flex-col gap-2 relative">
                <div className="flex gap-3 items-center text-sm text-text">
                  <div className="w-2 h-2 rounded-full bg-slate-400 border border-white"></div>
                  <span className="font-medium truncate">{delivery.origin}</span>
                </div>
                <div className="absolute left-1 top-3 bottom-3 w-px bg-slate-300"></div>
                <div className="flex gap-3 items-center text-sm text-text">
                  <div className="w-2 h-2 rounded-full bg-primary border border-white"></div>
                  <span className="font-medium truncate">{delivery.destination}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                Assigned Vehicle: <strong className="text-text">{delivery.vehicleId}</strong>
              </div>
            </div>
            
            <div className={`mt-6 pt-4 border-t border-border flex justify-between items-center ${
              delivery.risk === 'HIGH' ? 'text-danger' : 
              delivery.status === 'REROUTED' ? 'text-primary' : 'text-success'
            }`}>
              <div className="flex items-center gap-1.5 font-bold text-sm">
                {delivery.risk === 'HIGH' ? <ShieldAlert size={16} /> : <CheckCircle2 size={16} />}
                {delivery.risk === 'HIGH' ? 'AT RISK' : delivery.status}
              </div>
              <button className="text-sm underline font-medium hover:text-slate-800 transition-colors">Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
