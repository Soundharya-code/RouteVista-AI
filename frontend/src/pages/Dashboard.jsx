import React from 'react';
import { useDemoStore } from '../store/demoStore';
import { useTranslation } from '../i18n/LanguageContext';
import { Truck, AlertTriangle, Activity, Package, ArrowRight, ShieldAlert, CheckCircle2, Navigation, Map } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const KPICard = ({ title, value, icon: Icon, colorClass, bgClass, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="card flex items-center gap-5 group"
  >
    <div className={`p-4 rounded-xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform ${bgClass}`}>
      <Icon className="w-8 h-8" style={{ color: colorClass }} />
    </div>
    <div>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{title}</p>
      <div className="flex items-baseline gap-1 mt-1">
        <p className="text-3xl font-black text-slate-800 tracking-tight">{value}</p>
      </div>
    </div>
  </motion.div>
);

export default function Dashboard() {
  const { getStats, incidents, vehicles } = useDemoStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const stats = getStats();
  
  const hasHighRiskIncident = incidents.some(i => i.severity === 'HIGH');
  const rv101 = vehicles.find(v => v.id === 'RV-101');
  const isRerouted = rv101?.status === 'REROUTED';

  const handleReroute = () => {
    navigate('/routing');
  };

  return (
    <div className="space-y-6 h-full flex flex-col pb-6 pr-2">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase flex items-center gap-3">
            {t('dashboard')}
          </h2>
          <p className="text-slate-500 font-medium mt-1">{t('network_intelligence')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title={t('active_vehicles')} value={String(stats.activeVehicles).padStart(2, '0')} icon={Truck} colorClass="#0284c7" bgClass="bg-sky-50 border-sky-100" delay={0.1} />
        <KPICard title={t('active_incidents')} value={String(stats.activeIncidents).padStart(2, '0')} icon={Activity} colorClass="#dc2626" bgClass="bg-red-50 border-red-100" delay={0.2} />
        <KPICard title={t('high_risk_zones')} value={String(stats.highRiskCorridors).padStart(2, '0')} icon={ShieldAlert} colorClass="#d97706" bgClass="bg-amber-50 border-amber-100" delay={0.3} />
        <KPICard title={t('critical_deliveries')} value={String(stats.criticalDeliveries).padStart(2, '0')} icon={Package} colorClass="#7c3aed" bgClass="bg-violet-50 border-violet-100" delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Live Map Preview Area */}
        <div className="lg:col-span-2 card p-0 flex flex-col relative overflow-hidden group">
          <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center w-[calc(100%-2rem)]">
            <div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide flex items-center gap-2">
                <Map size={16} className="text-cyan-600"/> {t('live_map')}
              </h3>
            </div>
            <Link to="/map" className="text-xs font-bold text-cyan-700 flex items-center gap-1 hover:text-cyan-800 bg-cyan-50 px-3 py-1.5 rounded-lg transition-colors border border-cyan-100">
              {t('expand')} <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="flex-1 bg-slate-100 relative w-full h-full min-h-[400px]">
             {/* Actual Leaflet Map for Preview (North-Eastern Region) */}
             <MapContainer 
              center={[26.14, 91.85]} 
              zoom={10} 
              zoomControl={false} 
              scrollWheelZoom={false} 
              dragging={false}
              style={{ height: '100%', width: '100%' }}
             >
              <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              />
              {/* Demo Incident Marker */}
              {incidents.map(inc => (
                <Circle 
                  key={inc.id}
                  center={[inc.coords.lat, inc.coords.lng]} 
                  radius={4000} 
                  pathOptions={{ 
                    color: inc.severity === 'HIGH' ? '#EF4444' : '#F59E0B', 
                    fillColor: inc.severity === 'HIGH' ? '#EF4444' : '#F59E0B', 
                    fillOpacity: 0.2, 
                    weight: 2 
                  }} 
                />
              ))}
              
              {/* Optional High Risk Pulsing Effect for demo */}
              {hasHighRiskIncident && (
                <div className="absolute inset-0 z-[1000] pointer-events-none flex items-center justify-center">
                   <div className="w-8 h-8 bg-red-500 rounded-full animate-ping opacity-75"></div>
                </div>
              )}
             </MapContainer>
          </div>
        </div>
        
        {/* AI Alert Panel */}
        <div className="card flex flex-col justify-between border-2 border-red-200 relative overflow-hidden bg-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          
          {hasHighRiskIncident ? (
            <AnimatePresence mode="wait">
              <motion.div 
                key={isRerouted ? 'rerouted' : 'risk'}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col h-full relative z-10"
              >
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-red-600 font-black text-sm uppercase tracking-widest mb-4">
                    <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
                    {t('high_risk')}
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight uppercase leading-none mb-4">Chandrapur<br/>Corridor</h3>
                  
                  <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-xl bg-white border border-red-200 flex flex-col items-center justify-center shadow-sm relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 right-0 bg-red-100 h-[87%] opacity-50"></div>
                      <span className="text-2xl font-black text-red-600 relative z-10 leading-none">87</span>
                      <span className="text-[8px] font-bold text-slate-500 relative z-10">/100</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700 mb-1">Traffic Disruption detected.</p>
                      <p className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-lg inline-block border border-red-100">RV-101 Affected</p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto border-t border-slate-100 pt-6">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Activity size={14} /> {t('ai_recommendation')}
                  </p>
                  
                  {isRerouted ? (
                    <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-start gap-3 shadow-sm">
                      <CheckCircle2 className="text-emerald-600 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-emerald-900 text-sm">Successfully Rerouted</p>
                        <p className="text-xs text-emerald-700 font-medium mt-1">Vehicle RV-101 is now navigating via Alternative Route B.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl shadow-sm">
                      <p className="font-bold text-slate-700 text-sm mb-4">Alternative Route B reduces disruption risk by 75%.</p>
                      <div className="flex gap-2">
                        <button onClick={handleReroute} className="btn-primary py-3 px-3 text-sm flex-1 w-full flex items-center justify-center gap-2">
                          <Navigation size={16}/> {t('reroute_now')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6 opacity-80">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-100 shadow-sm">
                <CheckCircle2 size={32} />
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-600">{t('network_normal')}</p>
              <p className="text-xs text-slate-500 mt-2 font-medium">{t('monitoring_ai')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
