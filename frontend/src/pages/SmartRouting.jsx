import React from 'react';
import { Compass, Navigation, AlertTriangle, ShieldCheck, Route as RouteIcon, Info, MapPin } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';
import { useDemoStore } from '../store/demoStore';
import { MapContainer, TileLayer, Marker, Polyline, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function SmartRouting() {
  const { t } = useTranslation();
  const { rerouteVehicle, vehicles } = useDemoStore();
  
  const rv101 = vehicles.find(v => v.id === 'RV-101');
  const isRerouted = rv101?.status === 'REROUTED';

  // North-Eastern Demo Locations for Smart Routing Map
  const origin = [26.1445, 91.7362]; // Guwahati
  const dest = [26.1158, 91.9863]; // Sonapur
  
  const routeA = [origin, [26.13, 91.86], dest]; // Direct
  const routeB = [origin, [26.08, 91.86], [26.10, 91.94], dest]; // Bypass
  const routeC = [origin, [26.20, 91.85], [26.18, 91.95], dest]; // Outer Ring

  return (
    <div className="h-full flex flex-col space-y-6 overflow-y-auto pb-6 pr-2">
      <div className="flex justify-between items-end mb-2 flex-shrink-0">
        <div>
          <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3 tracking-tight">
            <Compass className="text-cyan-500 w-8 h-8" /> {t('route_comparison')}
          </h2>
          <p className="text-slate-500 font-medium mt-1">{t('route_comparison_desc')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 flex-1 min-h-[600px]">
        {/* Map Section */}
        <div className="lg:col-span-2 card p-0 flex flex-col relative overflow-hidden">
          <div className="absolute top-4 left-4 right-4 z-20 flex gap-2">
            <div className="bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-sm border border-slate-200 flex-1 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
                <MapPin size={16} />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] font-bold text-slate-400 uppercase">{t('origin')}</p>
                <p className="text-sm font-bold text-slate-800 truncate">Guwahati</p>
              </div>
            </div>
            <div className="bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-sm border border-slate-200 flex-1 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 flex-shrink-0">
                <MapPin size={16} />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] font-bold text-cyan-500/70 uppercase">{t('destination')}</p>
                <p className="text-sm font-bold text-cyan-800 truncate">Sonapur</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 bg-slate-100 z-0">
            <MapContainer 
              bounds={[origin, dest, [26.25, 91.70]]}
              zoomControl={true} 
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              />
              {/* Origin / Dest Markers */}
              <CircleMarker center={origin} radius={8} pathOptions={{ color: '#334155', fillColor: '#334155', fillOpacity: 1 }} />
              <CircleMarker center={dest} radius={8} pathOptions={{ color: '#0ea5e9', fillColor: '#0ea5e9', fillOpacity: 1 }} />
              
              {/* Routes */}
              <Polyline positions={routeC} pathOptions={{ color: '#94a3b8', weight: 4, dashArray: '5, 10' }} />
              <Polyline positions={routeA} pathOptions={{ color: '#ef4444', weight: 4 }} />
              <Polyline positions={routeB} pathOptions={{ color: '#10b981', weight: 6 }} />
              
              {/* High Risk Zone on Route A */}
              <CircleMarker center={[26.13, 91.86]} radius={30} pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.2, weight: 0 }} />
            </MapContainer>
          </div>
        </div>

        {/* Routes Section */}
        <div className="lg:col-span-3 space-y-6 flex flex-col">
          <div className="card-glass border-blue-100 bg-blue-50/50 p-4 flex gap-4 items-start">
            <Info className="text-blue-500 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-bold text-blue-900 text-sm">Route B recommended because it provides a safer risk/ETA balance.</h3>
              <p className="text-xs text-blue-700/80 mt-1 font-medium">The shortest route (Route A) currently traverses a high-risk traffic disruption zone in Chandrapur.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
            {/* Route A */}
            <div className="card p-0 flex flex-col relative opacity-80 hover:opacity-100 transition-opacity">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><AlertTriangle size={80}/></div>
              <div className="bg-slate-50 p-4 border-b border-slate-100">
                <h4 className="font-black text-lg text-slate-800 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div> ROUTE A
                </h4>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{t('shortest_distance')}</p>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="space-y-4 mb-auto">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('distance')}</p>
                    <p className="text-xl font-black text-slate-700">18.5 km</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('eta')}</p>
                    <p className="text-xl font-black text-slate-700">45 min</p>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{t('risk_assessment')}</p>
                  <span className="inline-block bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold border border-red-100">
                    {t('high_risk')} (87/100)
                  </span>
                </div>
              </div>
            </div>

            {/* Route B */}
            <div className="card p-0 flex flex-col relative border-2 border-emerald-500 shadow-md transform sm:-translate-y-2">
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10">
                {t('recommended')}
              </div>
              <div className="absolute top-8 right-0 p-4 opacity-5 text-emerald-600 pointer-events-none"><ShieldCheck size={80}/></div>
              <div className="bg-emerald-50 p-4 border-b border-emerald-100">
                <h4 className="font-black text-xl text-emerald-800 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div> ROUTE B
                </h4>
                <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider">{t('optimal_balance')}</p>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="space-y-4 mb-auto">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('distance')}</p>
                    <p className="text-xl font-black text-slate-800">22.3 km <span className="text-xs text-amber-500 font-bold ml-1">+3.8km</span></p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('eta')}</p>
                    <p className="text-xl font-black text-slate-800">52 min <span className="text-xs text-amber-500 font-bold ml-1">+7m</span></p>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{t('risk_assessment')}</p>
                  <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-emerald-100">
                    <ShieldCheck size={14}/> {t('low_risk')} (25/100)
                  </span>
                </div>
                <div className="pt-4 mt-2">
                  <button 
                    onClick={() => rerouteVehicle('RV-101', 'B')}
                    disabled={isRerouted}
                    className="w-full btn-primary bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-emerald-500/30 text-sm"
                  >
                    {isRerouted ? 'REROUTED TO B' : t('reroute_now')}
                  </button>
                </div>
              </div>
            </div>

            {/* Route C */}
            <div className="card p-0 flex flex-col relative opacity-60 hover:opacity-100 transition-opacity">
              <div className="bg-slate-50 p-4 border-b border-slate-100">
                <h4 className="font-black text-lg text-slate-700 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-400"></div> ROUTE C
                </h4>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{t('safest_longest')}</p>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="space-y-4 mb-auto">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('distance')}</p>
                    <p className="text-xl font-black text-slate-700">28.0 km</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('eta')}</p>
                    <p className="text-xl font-black text-slate-700">1h 10m</p>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{t('risk_assessment')}</p>
                  <span className="inline-block bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-200">
                    {t('low_risk')} (15/100)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
