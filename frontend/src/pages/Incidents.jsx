import React from 'react';
import { useDemoStore } from '../store/demoStore';
import { AlertCircle, MapPin, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Incidents() {
  const { incidents } = useDemoStore();

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'HIGH': return 'bg-red-100 text-red-800 border-red-200';
      case 'CRITICAL': return 'bg-red-600 text-white border-red-700';
      case 'MEDIUM': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'LOW': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-text flex items-center gap-2">
            <AlertCircle className="text-danger" /> Incident Management
          </h2>
          <p className="text-textMuted">Active disruptions and field reports.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/report" className="btn-primary">Report New Incident</Link>
        </div>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="p-4 border-b border-border bg-slate-50 flex justify-between items-center">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search incidents..." className="input-field pl-9 py-1.5 text-sm" />
          </div>
          <button className="flex items-center gap-2 text-sm text-textMuted hover:text-text font-medium">
            <Filter size={16} /> Filter
          </button>
        </div>
        
        <table className="w-full text-left text-sm">
          <thead className="bg-white border-b border-border text-slate-500 font-semibold uppercase tracking-wider text-xs">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Severity</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Reported</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {incidents.map((inc) => (
              <tr key={inc.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-500">{inc.id}</td>
                <td className="px-6 py-4 font-bold text-text">{inc.type}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-textMuted">
                    <MapPin size={14} /> {inc.locationName}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold border ${getSeverityColor(inc.severity)}`}>
                    {inc.severity}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    inc.status === 'ACTIVE' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-amber-50 text-amber-600 border border-amber-200'
                  }`}>
                    {inc.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500 font-medium">{inc.time}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-primary hover:text-blue-800 font-medium text-xs underline mr-3">View Map</button>
                  <button className="text-slate-500 hover:text-text font-medium text-xs underline">Resolve</button>
                </td>
              </tr>
            ))}
            {incidents.length === 0 && (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center text-slate-400 font-medium">
                  No active incidents reported.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
