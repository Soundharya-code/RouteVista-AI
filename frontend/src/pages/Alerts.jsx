import React from 'react';
import { useDemoStore } from '../store/demoStore';
import { Bell, ShieldAlert, CheckCircle2, AlertTriangle, Check, CheckCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../i18n/LanguageContext';

export default function Alerts() {
  const { alerts, markAlertRead, markAllAlertsRead } = useDemoStore();
  const { t } = useTranslation();
  
  const unreadCount = alerts.filter(a => !a.read).length;

  const getAlertIcon = (type) => {
    if (type === 'CRITICAL' || type === 'RISK') return <ShieldAlert className="text-red-500" size={24} />;
    if (type === 'REROUTE') return <CheckCircle2 className="text-emerald-500" size={24} />;
    return <AlertTriangle className="text-amber-500" size={24} />;
  };

  const getAlertBg = (type, read) => {
    if (read) return 'bg-white opacity-60 border-slate-200';
    if (type === 'CRITICAL' || type === 'RISK') return 'bg-red-50 border-red-200 shadow-[0_4px_12px_rgba(239,68,68,0.1)]';
    if (type === 'REROUTE') return 'bg-emerald-50 border-emerald-200 shadow-[0_4px_12px_rgba(16,185,129,0.1)]';
    return 'bg-amber-50 border-amber-200 shadow-[0_4px_12px_rgba(245,158,11,0.1)]';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 h-full flex flex-col pb-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3 tracking-tight uppercase">
            <Bell className="text-cyan-500 w-8 h-8" /> {t('alert_center')}
          </h2>
          <p className="text-slate-500 font-medium mt-1">{t('alert_center_desc')}</p>
        </div>
        
        <button 
          onClick={markAllAlertsRead}
          disabled={unreadCount === 0}
          className="btn-secondary flex items-center gap-2 text-sm disabled:opacity-50"
        >
          <CheckCheck size={16} /> {t('mark_all_read')}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
        <div className="card p-4 text-center bg-slate-50 border-slate-200">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t('total')}</p>
          <p className="text-3xl font-black text-slate-800 mt-1">{alerts.length}</p>
        </div>
        <div className="card p-4 text-center bg-red-50/50 border-red-100">
          <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{t('critical')}</p>
          <p className="text-3xl font-black text-red-700 mt-1">{alerts.filter(a=>a.severity==='HIGH').length}</p>
        </div>
        <div className="card p-4 text-center bg-amber-50/50 border-amber-100">
          <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">{t('warning')}</p>
          <p className="text-3xl font-black text-amber-700 mt-1">{alerts.filter(a=>a.severity==='MEDIUM').length}</p>
        </div>
        <div className="card p-4 text-center bg-emerald-50/50 border-emerald-100">
          <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{t('info')}</p>
          <p className="text-3xl font-black text-emerald-700 mt-1">{alerts.filter(a=>a.severity==='LOW').length}</p>
        </div>
      </div>

      <div className="card flex-1 overflow-auto p-4 bg-slate-50/50 border-slate-200 shadow-inner">
        <div className="space-y-3">
          <AnimatePresence>
            {alerts.map((alert) => (
              <motion.div 
                key={alert.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                layout
                className={`p-5 rounded-2xl border flex gap-4 items-start transition-all ${getAlertBg(alert.type, alert.read)}`}
              >
                <div className="mt-1 bg-white p-2.5 rounded-xl shadow-sm border border-slate-100">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${alert.read ? 'text-slate-400' : 'text-slate-800'}`}>
                      {alert.title}
                    </p>
                    <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-sm">{alert.time}</span>
                  </div>
                  <p className={`font-medium ${alert.read ? 'text-slate-500 text-sm' : 'text-slate-700 text-base'}`}>{alert.message}</p>
                </div>
                {!alert.read && (
                  <button 
                    onClick={() => markAlertRead(alert.id)}
                    className="w-10 h-10 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-cyan-600 transition-colors border border-slate-200 shadow-sm"
                    title="Mark as read"
                  >
                    <Check size={18} />
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {alerts.length === 0 && (
            <div className="text-center py-16 text-slate-400 font-medium">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200 shadow-sm">
                <Bell size={32} className="opacity-40" />
              </div>
              {t('no_alerts')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
