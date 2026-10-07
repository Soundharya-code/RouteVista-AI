import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import LiveMap from './pages/LiveMap';
import Vehicles from './pages/Vehicles';
import Deliveries from './pages/Deliveries';
import Incidents from './pages/Incidents';
import IncidentReporting from './pages/IncidentReporting';
import RiskAnalysis from './pages/RiskAnalysis';
import SmartRouting from './pages/SmartRouting';
import Simulator from './pages/Simulator';
import Alerts from './pages/Alerts';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/Login';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/login" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="map" element={<LiveMap />} />
            <Route path="vehicles" element={<Vehicles />} />
            <Route path="deliveries" element={<Deliveries />} />
            <Route path="incidents" element={<Incidents />} />
            <Route path="report" element={<IncidentReporting />} />
            <Route path="risk" element={<RiskAnalysis />} />
            <Route path="routing" element={<SmartRouting />} />
            <Route path="simulator" element={<Simulator />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
