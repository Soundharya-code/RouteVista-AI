import { create } from 'zustand';

// North-Eastern Coordinates
// Guwahati: 26.1445, 91.7362
// Dispur: 26.1433, 91.7898
// Chandrapur: 26.2166, 91.9833
// Sonapur: 26.1158, 91.9863
// Silchar: 24.8333, 92.7789
// Agartala: 23.8315, 91.2868
// Shillong: 25.5788, 91.8933
// Tezpur: 26.6528, 92.7926
// Dibrugarh: 27.4728, 94.9120
// Tinsukia: 27.4922, 95.3468

// Initial Demo Data
const initialVehicles = [
  { id: 'RV-101', driver: 'Tamilselvi', location: { lat: 26.1445, lng: 91.7362 }, origin: 'Guwahati', destination: 'Sonapur', delivery: 'Emergency Medicine', priority: 'CRITICAL', status: 'EN ROUTE', risk: 'LOW', routeId: 'A', eta: '01:42' },
  { id: 'RV-102', driver: 'Suji', location: { lat: 26.1433, lng: 91.7898 }, origin: 'Dispur', destination: 'Chandrapur', delivery: 'Food Supplies', priority: 'HIGH', status: 'EN ROUTE', risk: 'MEDIUM', routeId: 'B', eta: '02:15' },
  { id: 'RV-103', driver: 'Saclin', location: { lat: 24.8333, lng: 92.7789 }, origin: 'Silchar', destination: 'Agartala', delivery: 'Industrial Equipment', priority: 'NORMAL', status: 'EN ROUTE', risk: 'LOW', routeId: 'C', eta: '03:55' },
];

const initialDeliveries = [
  { id: 'DEL-001', vehicleId: 'RV-101', item: 'Emergency Medicine', origin: 'Guwahati', destination: 'Sonapur', priority: 'CRITICAL', status: 'IN TRANSIT', risk: 'LOW' },
  { id: 'DEL-002', vehicleId: 'RV-102', item: 'Food Supplies', origin: 'Dispur', destination: 'Chandrapur', priority: 'HIGH', status: 'IN TRANSIT', risk: 'MEDIUM' },
  { id: 'DEL-003', vehicleId: 'RV-103', item: 'Industrial Equipment', origin: 'Silchar', destination: 'Agartala', priority: 'NORMAL', status: 'IN TRANSIT', risk: 'LOW' },
];

const initialIncidents = [
  { id: 'INC-002', type: 'Flooding', locationName: 'Chandrapur', coords: { lat: 26.2166, lng: 91.9833 }, severity: 'MEDIUM', status: 'MONITORING', time: '1 hr ago' },
];

const initialAlerts = [
  { id: 'A1', type: 'WEATHER', title: 'WEATHER WARNING', message: 'Heavy rainfall may reduce route accessibility in Chandrapur region.', time: '2 hrs ago', read: false, severity: 'MEDIUM' },
];

export const useDemoStore = create((set, get) => ({
  userRole: 'authority',
  language: 'en',
  voiceEnabled: false,
  
  vehicles: initialVehicles,
  deliveries: initialDeliveries,
  incidents: initialIncidents,
  alerts: initialAlerts,
  
  // Stats
  getStats: () => {
    const { vehicles, incidents, deliveries } = get();
    return {
      activeVehicles: vehicles.length,
      highRiskCorridors: incidents.filter(i => i.severity === 'HIGH').length + 2, // demo base number
      activeIncidents: incidents.length,
      criticalDeliveries: deliveries.filter(d => d.priority === 'CRITICAL').length
    };
  },

  // Actions
  setUserRole: (role) => set({ userRole: role }),
  setLanguage: (lang) => set({ language: lang }),
  setVoiceEnabled: (enabled) => set({ voiceEnabled: enabled }),
  
  addIncident: (incident) => set((state) => {
    const newIncident = { 
      id: `INC-00${state.incidents.length + 3}`, 
      ...incident, 
      status: 'ACTIVE',
      time: 'Just now' 
    };
    
    // Simulate Risk Increase -> Reroute RV-101
    const isChandrapurDisruption = incident.locationName.toLowerCase() === 'chandrapur' && incident.type.toLowerCase() === 'traffic';
    
    let updatedVehicles = [...state.vehicles];
    let newAlerts = [...state.alerts];
    
    if (isChandrapurDisruption || incident.severity === 'HIGH') {
      // Find RV-101 and mark as High Risk for demo
      updatedVehicles = updatedVehicles.map(v => 
        v.id === 'RV-101' ? { ...v, status: 'HIGH-RISK ROUTE', risk: 'HIGH' } : v
      );
      
      newAlerts = [
        { id: Date.now().toString(), type: 'RISK', title: 'HIGH RISK ALERT', message: `${incident.locationName} corridor risk increased to 87/100.`, time: 'Just now', read: false, severity: 'HIGH' },
        { id: (Date.now()+1).toString(), type: 'CRITICAL', title: 'CRITICAL DELIVERY', message: 'Emergency medicine DEL-001 may be delayed.', time: 'Just now', read: false, severity: 'HIGH' },
        ...newAlerts
      ];
    }

    return { 
      incidents: [newIncident, ...state.incidents],
      vehicles: updatedVehicles,
      alerts: newAlerts
    };
  }),
  
  rerouteVehicle: (vehicleId, newRoute) => set((state) => {
    const updatedVehicles = state.vehicles.map(v => 
      v.id === vehicleId ? { ...v, routeId: newRoute, risk: 'LOW', status: 'REROUTED' } : v
    );
    
    const newAlert = { 
      id: Date.now().toString(), 
      type: 'REROUTE', 
      title: 'REROUTING RECOMMENDED', 
      message: `Alternative Route ${newRoute} engaged for ${vehicleId}.`, 
      time: 'Just now', 
      read: false, 
      severity: 'LOW' 
    };

    if (state.voiceEnabled) {
      const msg = new SpeechSynthesisUtterance(`Alternative Route ${newRoute} engaged for ${vehicleId}.`);
      window.speechSynthesis.speak(msg);
    }

    return {
      vehicles: updatedVehicles,
      alerts: [newAlert, ...state.alerts]
    };
  }),

  markAlertRead: (alertId) => set((state) => ({
    alerts: state.alerts.map(a => a.id === alertId ? { ...a, read: true } : a)
  })),

  markAllAlertsRead: () => set((state) => ({
    alerts: state.alerts.map(a => ({ ...a, read: true }))
  })),
}));
