import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { useDemoStore } from '../store/demoStore';
import { ShieldAlert } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

// Fix Leaflet's default icon path issues in React
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export default function LiveMap() {
  const { vehicles, incidents } = useDemoStore();
  const { t } = useTranslation();
  
  // North-Eastern Region
  const center = [26.14, 91.85];

  // Route lines
  const routeGuwahatiToSonapur = [[26.1445, 91.7362], [26.13, 91.86], [26.1158, 91.9863]]; // Route A (Direct)
  const routeAlternative = [[26.1445, 91.7362], [26.08, 91.86], [26.10, 91.94], [26.1158, 91.9863]]; // Route B (Bypass)

  const rv101 = vehicles.find(v => v.id === 'RV-101');
  const showAlternativeRoute = rv101?.status === 'REROUTED';

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm relative">
      <div className="absolute top-4 left-4 z-[1000] bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-sm font-bold text-slate-800">North-Eastern Region Overview</h2>
        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Live GIS Tracking</p>
      </div>

      <div className="absolute top-4 right-4 z-[1000] flex gap-2">
        <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 flex items-center gap-2 text-xs font-bold text-slate-600">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div> Safe
        </div>
        <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 flex items-center gap-2 text-xs font-bold text-slate-600">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div> Med Risk
        </div>
        <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 flex items-center gap-2 text-xs font-bold text-slate-600">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div> High Risk
        </div>
      </div>
      
      <div className="flex-1 relative z-0">
        <MapContainer center={center} zoom={11} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          
          {incidents.map(inc => (
            <Circle 
              key={inc.id}
              center={[inc.coords.lat, inc.coords.lng]} 
              radius={3000} 
              pathOptions={{ 
                color: inc.severity === 'HIGH' ? '#EF4444' : '#F59E0B', 
                fillColor: inc.severity === 'HIGH' ? '#EF4444' : '#F59E0B', 
                fillOpacity: 0.15, 
                weight: 1 
              }} 
            />
          ))}

          <Polyline 
            positions={routeGuwahatiToSonapur} 
            pathOptions={{ 
              color: showAlternativeRoute ? '#EF4444' : '#0ea5e9', 
              weight: 4, 
              dashArray: showAlternativeRoute ? '5, 10' : undefined,
              opacity: showAlternativeRoute ? 0.5 : 0.8
            }} 
          />

          {showAlternativeRoute && (
             <Polyline 
              positions={routeAlternative} 
              pathOptions={{ color: '#10B981', weight: 5, opacity: 0.9 }} 
            />
          )}

          {vehicles.map(v => (
            <Marker key={v.id} position={[v.location.lat, v.location.lng]}>
              <Popup className="font-sans">
                <div className="p-1 min-w-[200px]">
                  <div className="flex justify-between items-center mb-2 border-b border-slate-100 pb-2">
                    <h3 className="font-bold text-slate-800 text-lg">{v.id}</h3>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold text-white ${v.priority === 'CRITICAL' ? 'bg-red-500' : 'bg-slate-500'}`}>
                      {v.priority}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-1"><strong>Driver:</strong> {v.driver}</p>
                  <p className="text-sm text-slate-600 mb-2"><strong>Delivery:</strong> {v.delivery}</p>
                  <div className={`mt-2 p-2 rounded-lg text-xs font-bold border ${v.status === 'HIGH-RISK ROUTE' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-sky-50 text-sky-700 border-sky-200'}`}>
                    Status: {v.status}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {incidents.map(inc => (
            <Marker key={inc.id} position={[inc.coords.lat, inc.coords.lng]}>
              <Popup>
                <div className="p-1">
                  <h3 className={`font-bold flex items-center gap-1 ${inc.severity === 'HIGH' ? 'text-red-600' : 'text-amber-600'}`}>
                    <ShieldAlert size={16} /> {inc.type}
                  </h3>
                  <p className="text-sm text-slate-700 mt-1">{inc.locationName}</p>
                  <p className="text-xs text-slate-500 mt-1 font-bold">Status: {inc.status}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
