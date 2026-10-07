import React from 'react';
import { useDemoStore } from '../store/demoStore';
import { useTranslation } from '../i18n/LanguageContext';
import { Settings as SettingsIcon, Globe, Volume2, Shield, User } from 'lucide-react';

export default function Settings() {
  const { userRole, voiceEnabled, setVoiceEnabled } = useDemoStore();
  const { currentLanguage, setCurrentLanguage, languages, t } = useTranslation();

  const handleTestVoice = () => {
    if ('speechSynthesis' in window) {
      const msg = new SpeechSynthesisUtterance("High disruption risk detected. Alternative route recommended.");
      window.speechSynthesis.speak(msg);
    } else {
      alert("Voice guidance is not supported by this browser.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-6">
      <div className="mb-6">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase flex items-center gap-3">
          <SettingsIcon className="text-cyan-500 w-8 h-8" /> {t('settings')}
        </h2>
        <p className="text-slate-500 font-medium mt-1">Configure your command center preferences.</p>
      </div>

      <div className="space-y-6">
        {/* Profile */}
        <section className="card">
          <h3 className="text-lg font-black text-slate-800 mb-5 flex items-center gap-2"><User size={20} className="text-cyan-500"/> {t('profile')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{t('name')}</label>
              <input type="text" value="Demo User" disabled className="input-field bg-slate-50 cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{t('role')}</label>
              <input type="text" value={userRole.replace('_', ' ').toUpperCase()} disabled className="input-field bg-slate-50 cursor-not-allowed" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{t('organization')}</label>
              <input type="text" value="ROUTEVISTA AI" disabled className="input-field bg-slate-50 cursor-not-allowed" />
            </div>
          </div>
        </section>

        {/* Language & Voice */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="card">
            <h3 className="text-lg font-black text-slate-800 mb-5 flex items-center gap-2"><Globe size={20} className="text-blue-500"/> {t('language_region')}</h3>
            <div className="space-y-3 h-[280px] overflow-y-auto pr-3">
              {languages.map(lang => (
                <label key={lang.code} className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-all ${currentLanguage === lang.code ? 'bg-cyan-50 border-cyan-200' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
                  <div>
                    <span className={`font-bold ${currentLanguage === lang.code ? 'text-cyan-800' : 'text-slate-700'}`}>{lang.native}</span>
                    <span className="text-xs text-slate-400 font-medium ml-2">{lang.name}</span>
                  </div>
                  <input 
                    type="radio" 
                    name="lang" 
                    checked={currentLanguage === lang.code} 
                    onChange={() => setCurrentLanguage(lang.code)} 
                    className="w-4 h-4 text-cyan-600 focus:ring-cyan-500" 
                  />
                </label>
              ))}
            </div>
          </section>

          <section className="card flex flex-col">
            <h3 className="text-lg font-black text-slate-800 mb-5 flex items-center gap-2"><Volume2 size={20} className="text-emerald-500"/> {t('voice_guidance')}</h3>
            <div className="space-y-6 flex-1">
              <p className="text-sm text-slate-500 font-medium leading-relaxed">{t('voice_desc')}</p>
              
              <label className="flex items-center justify-between p-5 border border-slate-200 rounded-2xl bg-slate-50 cursor-pointer shadow-sm">
                <span className="font-bold text-slate-700">{t('enable_voice')}</span>
                <div className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${voiceEnabled ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                  <input type="checkbox" className="sr-only" checked={voiceEnabled} onChange={(e) => setVoiceEnabled(e.target.checked)} />
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition shadow-sm ${voiceEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </div>
              </label>

              <div className="mt-auto pt-6">
                <button 
                  onClick={handleTestVoice}
                  className="w-full btn-secondary py-3.5 flex items-center justify-center gap-2 border-slate-200 text-slate-600"
                >
                  <Volume2 size={18} /> {t('test_voice')}
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* System Info */}
        <section className="card bg-slate-50 text-center border-dashed border-2 border-slate-200 shadow-none">
          <Shield className="mx-auto text-slate-300 w-10 h-10 mb-3" />
          <h4 className="font-black text-slate-800 text-lg tracking-tight">ROUTEVISTA AI</h4>
          <p className="text-slate-500 font-medium text-sm mt-1">{t('system_info')}</p>
          <p className="text-[10px] text-slate-400 mt-3 font-bold uppercase tracking-widest bg-white px-3 py-1 rounded-full inline-block border border-slate-100 shadow-sm">Smart India Hackathon 2026</p>
        </section>
      </div>
    </div>
  );
}
