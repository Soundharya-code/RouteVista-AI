import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemoStore } from '../store/demoStore';
import { Activity, ShieldCheck, Mail, Lock, CheckCircle2, Navigation, AlertTriangle, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../i18n/LanguageContext';

export default function Login() {
  const [role, setRole] = useState('authority');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const { setUserRole } = useDemoStore();
  const { t, currentLanguage, setCurrentLanguage, languages } = useTranslation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setUserRole(role);
      navigate('/dashboard');
    }, 1500);
  };

  const handleDemoLogin = () => {
    setSuccess(true);
    setTimeout(() => {
      setUserRole(role);
      navigate('/dashboard');
    }, 1500);
  };

  const steps = [
    { icon: Activity, label: "Field Report", delay: 0 },
    { icon: ShieldCheck, label: "AI Risk Engine", delay: 1 },
    { icon: Navigation, label: "Smart Route", delay: 2 },
    { icon: AlertTriangle, label: "Driver Alert", delay: 3 },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-main)] relative overflow-hidden">
      {/* Professional Theme Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-50/50 rounded-full blur-3xl pointer-events-none transform -translate-x-1/3 translate-y-1/3"></div>

      <div className="absolute top-4 left-4 bg-white px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest border border-slate-200 shadow-sm z-50 flex items-center gap-2 text-cyan-600">
        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></div>
        FRONTEND DEMO MODE
      </div>
      
      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-50">
        <select 
          className="bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-lg px-3 py-1.5 focus:outline-none shadow-sm"
          value={currentLanguage}
          onChange={(e) => setCurrentLanguage(e.target.value)}
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>{lang.native}</option>
          ))}
        </select>
      </div>

      <div className="w-full max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-12 z-10 items-center">
        
        {/* LEFT PANEL */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex flex-col justify-center p-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Activity className="text-white w-7 h-7" />
            </div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">ROUTEVISTA <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">AI</span></h1>
          </div>
          <h2 className="text-xl font-bold text-slate-500 tracking-widest uppercase mb-4">Predict. Protect. Deliver.</h2>
          <p className="text-slate-500 text-lg max-w-md leading-relaxed mb-12">
            AI-powered logistics intelligence for disruption-prone regions. Convert field reports into automated, safe rerouting decisions instantly.
          </p>

          <div className="card-glass border-slate-200/60 bg-white/60">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Field-to-Decision Intelligence</h3>
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                />
              </div>
              
              {steps.map((step, index) => (
                <div key={index} className="relative z-10 flex flex-col items-center gap-3">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{ scale: [1, 1.1, 1], opacity: 1 }}
                    transition={{ duration: 2, delay: step.delay, repeat: Infinity, repeatDelay: 2 }}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 text-cyan-600"
                  >
                    <step.icon size={18} />
                  </motion.div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center w-20">{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT PANEL - LOGIN CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-md mx-auto"
        >
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card py-16 text-center border-emerald-100 bg-emerald-50/30"
              >
                <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">{t('demo_login_success')}</h3>
                <p className="text-slate-500 font-medium">{t('entering_cmd')}</p>
              </motion.div>
            ) : (
              <motion.div key="login" className="card p-8">
                <div className="lg:hidden flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                    <Activity className="text-white w-5 h-5" />
                  </div>
                  <h1 className="text-2xl font-black text-slate-800 tracking-tight">ROUTEVISTA AI</h1>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-black text-slate-800 mb-1">{t('welcome_back')}</h2>
                  <p className="text-slate-500 text-sm font-medium">{t('sign_in_desc')}</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t('email_username')}</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder="demo@routevista.ai" 
                        className="input-field pl-12" 
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">{t('password')}</label>
                      <button type="button" className="text-xs font-bold text-cyan-600 hover:text-cyan-700">Forgot password?</button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type={showPassword ? "text" : "password"} 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        placeholder="••••••••" 
                        className="input-field pl-12 pr-16" 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 uppercase"
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <input 
                      type="checkbox" 
                      id="rememberMe" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-cyan-600 border-slate-300 rounded focus:ring-cyan-500"
                    />
                    <label htmlFor="rememberMe" className="text-sm font-medium text-slate-600">Remember me</label>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 mt-4">{t('select_role')}</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['authority', 'field_officer', 'driver', 'logistics_operator'].map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setRole(r)}
                          className={`py-2 px-3 rounded-xl text-[10px] md:text-xs font-bold capitalize transition-all border ${
                            role === r 
                              ? 'bg-cyan-50 border-cyan-200 text-cyan-700 shadow-sm' 
                              : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                          }`}
                        >
                          {r.replace('_', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <button type="submit" className="w-full btn-primary py-3.5 text-base">
                      {t('sign_in')}
                    </button>
                  </div>
                </form>

                <div className="mt-6 text-center">
                  <div className="relative flex items-center py-4">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-bold uppercase">Or</span>
                    <div className="flex-grow border-t border-slate-200"></div>
                  </div>
                  
                  <button 
                    type="button" 
                    onClick={handleDemoLogin}
                    className="w-full btn-secondary py-3 text-sm text-cyan-600 border-cyan-100 bg-cyan-50/50 hover:bg-cyan-50"
                  >
                    {t('continue_demo')}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
