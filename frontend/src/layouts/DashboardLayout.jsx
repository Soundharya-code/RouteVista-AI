import React, { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useDemoStore } from '../store/demoStore';
import { useTranslation } from '../i18n/LanguageContext';
import { LayoutDashboard, Map, Truck, Package, AlertCircle, FileText, Activity, Compass, PlayCircle, Bell, BarChart2, Settings, LogOut, Search, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarLink = ({ to, icon: Icon, labelKey }) => {
  const location = useLocation();
  const isActive = location.pathname.includes(to);
  const { t } = useTranslation();

  return (
    <Link to={to} className="relative block group">
      {isActive && (
        <motion.div 
          layoutId="activeSidebar"
          className="absolute inset-0 bg-blue-50 border-r-4 border-cyan-500 rounded-lg"
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <div className={`relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all z-10 ${isActive ? 'text-cyan-700 font-bold' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}>
        <Icon size={20} className={isActive ? "text-cyan-500" : "group-hover:text-cyan-500 transition-colors"} />
        <span>{t(labelKey)}</span>
      </div>
    </Link>
  );
};

export default function DashboardLayout() {
  const { userRole, alerts } = useDemoStore();
  const { currentLanguage, setCurrentLanguage, languages, t } = useTranslation();
  const navigate = useNavigate();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  const unreadAlerts = alerts.filter(a => !a.read).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-[var(--bg-main)] relative overflow-hidden font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col z-20 shadow-sm m-3 mr-0 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-white">
          <h1 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-md">
              <Activity className="text-white w-5 h-5" />
            </div>
            ROUTEVISTA <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">AI</span>
          </h1>
        </div>
        
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <SidebarLink to="/dashboard" icon={LayoutDashboard} labelKey="dashboard" />
          <SidebarLink to="/map" icon={Map} labelKey="live_map" />
          <SidebarLink to="/vehicles" icon={Truck} labelKey="vehicles" />
          <SidebarLink to="/deliveries" icon={Package} labelKey="deliveries" />
          <SidebarLink to="/incidents" icon={AlertCircle} labelKey="incidents" />
          <SidebarLink to="/report" icon={FileText} labelKey="report_incident" />
          <SidebarLink to="/risk" icon={Activity} labelKey="risk_analysis" />
          <SidebarLink to="/routing" icon={Compass} labelKey="smart_routing" />
          <SidebarLink to="/simulator" icon={PlayCircle} labelKey="simulator" />
          <SidebarLink to="/alerts" icon={Bell} labelKey="alerts" />
          <SidebarLink to="/analytics" icon={BarChart2} labelKey="analytics" />
          <SidebarLink to="/settings" icon={Settings} labelKey="settings" />
        </nav>
        
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-cyan-600 font-bold border border-slate-200 shadow-sm">
              {userRole === 'authority' ? 'A' : 'F'}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700">Demo User</p>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{userRole.replace('_', ' ')}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-3 text-slate-500 hover:text-red-600 transition-colors px-2 py-2 w-full text-left rounded-lg hover:bg-white border border-transparent hover:border-slate-200 font-bold text-sm">
            <LogOut size={18} />
            <span>{t('logout')}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative z-10 p-4">
        {/* Global Demo Indicator */}
        <div className="absolute top-0 left-4 right-4 bg-blue-50 border-b border-blue-100 text-cyan-700 text-[10px] py-1.5 rounded-b-xl text-center font-bold tracking-widest z-50 flex items-center justify-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
          FRONTEND DEMO MODE • SIMULATED DATA
        </div>

        {/* Top Header */}
        <header className="bg-white border border-slate-200 h-16 mt-6 rounded-2xl flex items-center px-6 justify-between flex-shrink-0 shadow-sm mb-4">
          <div className="flex-1 flex items-center">
            <div className="relative w-72 hidden md:block group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={16} />
              <input type="text" placeholder="Search network..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:bg-white transition-all shadow-sm font-medium" />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            
            {/* Language Dropdown */}
            <div className="relative" ref={langRef}>
              <button 
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 shadow-sm hover:shadow transition-all text-sm font-bold text-slate-600"
              >
                <Globe size={16} className="text-cyan-600" />
                <span className="hidden sm:inline">{languages.find(l => l.code === currentLanguage)?.name}</span>
                <ChevronDown size={14} className="text-slate-400" />
              </button>
              
              <AnimatePresence>
                {langOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50 max-h-64 overflow-y-auto"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLanguage(lang.code);
                          setLangOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm font-bold flex items-center justify-between hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 ${currentLanguage === lang.code ? 'text-cyan-700 bg-cyan-50/50' : 'text-slate-600'}`}
                      >
                        {lang.native}
                        <span className="text-xs text-slate-400 font-medium">{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/alerts" className="relative p-2.5 text-slate-500 hover:text-cyan-600 transition-colors hover:bg-slate-50 rounded-xl border border-transparent hover:border-slate-200 shadow-sm">
              <Bell size={20} />
              {unreadAlerts > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-sm animate-pulse"></span>
              )}
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto relative z-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
