import React, { useState } from 'react';
import { useDemoStore } from '../store/demoStore';
import { Truck, MapPin, Package, AlertTriangle, Clock, Search, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../i18n/LanguageContext';

export default function Vehicles() {
  const { vehicles } = useDemoStore();
  const { t } = useTranslation();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVehicles = vehicles.filter(v => 
    v.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.driver.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'EN ROUTE': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'HIGH-RISK ROUTE': return 'text-red-700 bg-red-50 border-red-200';
      case 'REROUTED': return 'text-sky-700 bg-sky-50 border-sky-200';
      case 'DELAYED': return 'text-amber-700 bg-amber-50 border-amber-200';
      default: return 'text-slate-600 bg-slate-100 border-slate-200';
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6 pb-6 pr-2">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase flex items-center gap-3">
            <Truck className="text-cyan-500 w-8 h-8" /> {t('vehicle_operations')}
          </h2>
          <p className="text-slate-500 font-medium mt-1">{t('vehicle_ops_desc')}</p>
        </div>
        <div className="flex gap-3">
          <div className="relative w-64 hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder={t('search_vehicles')} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-9 py-2" 
            />
          </div>
          <button className="btn-secondary flex items-center gap-2">
            <Filter size={16} /> {t('filter')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card bg-sky-50/50 border-sky-100 p-4">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t('active')}</p>
          <p className="text-2xl font-black text-sky-700 mt-1">{vehicles.length}</p>
        </div>
        <div className="card bg-amber-50/50 border-amber-100 p-4">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t('delayed')}</p>
          <p className="text-2xl font-black text-amber-700 mt-1">0</p>
        </div>
        <div className="card bg-emerald-50/50 border-emerald-100 p-4">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t('rerouted')}</p>
          <p className="text-2xl font-black text-emerald-700 mt-1">{vehicles.filter(v=>v.status==='REROUTED').length}</p>
        </div>
        <div className="card bg-slate-50/80 border-slate-200 p-4">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t('offline')}</p>
          <p className="text-2xl font-black text-slate-700 mt-1">2</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-2 card p-0 overflow-hidden flex flex-col shadow-sm">
          <div className="overflow-auto flex-1">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 z-10">
                <tr>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-[10px]">{t('vehicle_driver')}</th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-[10px]">{t('route')}</th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-[10px]">{t('delivery_priority')}</th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-[10px]">{t('status')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredVehicles.map((v) => (
                  <tr 
                    key={v.id} 
                    onClick={() => setSelectedVehicle(v)}
                    className={`cursor-pointer transition-colors hover:bg-slate-50 ${selectedVehicle?.id === v.id ? 'bg-sky-50/50' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800">{v.id}</p>
                      <p className="text-slate-500 text-xs font-medium">{v.driver}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <MapPin size={12} className="text-slate-400" />
                        <span className="truncate max-w-[150px]">{v.origin} &rarr; {v.destination}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold tracking-wider ${v.priority === 'CRITICAL' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                        {v.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold border uppercase tracking-wider ${getStatusColor(v.status)}`}>
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-1">
          <AnimatePresence mode="wait">
            {selectedVehicle ? (
              <motion.div
                key={selectedVehicle.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="card h-full flex flex-col shadow-sm"
              >
                <div className="flex justify-between items-start mb-6 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-2xl font-black text-slate-800">{selectedVehicle.id}</h3>
                    <p className="text-slate-500 font-medium">{selectedVehicle.driver}</p>
                  </div>
                  <button onClick={() => setSelectedVehicle(null)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-6 flex-1 overflow-auto pr-2">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{t('delivery_details')}</p>
                    <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <Package className="text-cyan-500 mt-0.5" size={20} />
                      <div>
                        <p className="font-bold text-slate-800">{selectedVehicle.delivery}</p>
                        <p className="text-xs text-slate-500 mt-1 font-medium">Priority: <strong className={selectedVehicle.priority === 'CRITICAL' ? 'text-red-600' : 'text-slate-700'}>{selectedVehicle.priority}</strong></p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Route Status</p>
                    <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500 flex items-center gap-2 font-medium"><MapPin size={16}/> {t('from')}</span>
                        <span className="font-bold text-slate-800 text-right max-w-[150px] truncate">{selectedVehicle.origin}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-t border-slate-100 pt-3">
                        <span className="text-slate-500 flex items-center gap-2 font-medium"><MapPin size={16}/> {t('to')}</span>
                        <span className="font-bold text-slate-800 text-right max-w-[150px] truncate">{selectedVehicle.destination}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-t border-slate-100 pt-3">
                        <span className="text-slate-500 flex items-center gap-2 font-medium"><Clock size={16}/> {t('eta')}</span>
                        <span className="font-bold text-slate-800">{selectedVehicle.eta}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{t('network_risk')}</p>
                    <div className={`p-4 rounded-xl border flex gap-3 ${selectedVehicle.risk === 'HIGH' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-emerald-50 border-emerald-200 text-emerald-800'}`}>
                      <AlertTriangle className="flex-shrink-0" />
                      <div>
                        <p className="font-black text-sm uppercase">{selectedVehicle.status}</p>
                        <p className="text-xs mt-1 font-medium">
                          {selectedVehicle.risk === 'HIGH' ? 'Active incident reported on current route. Rerouting recommended.' : 'Current route conditions are optimal.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="card h-full flex flex-col items-center justify-center text-slate-400 border-dashed border-2 bg-slate-50/50 shadow-none">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <Truck size={32} className="text-slate-300" />
                </div>
                <p className="font-medium text-sm">Select a vehicle to view details</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
