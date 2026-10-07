import React, { useState } from 'react';
import { useDemoStore } from '../store/demoStore';
import { Camera, MapPin, Send, CheckCircle2, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IncidentReporting() {
  const { addIncident } = useDemoStore();
  const [status, setStatus] = useState('idle'); // idle, submitting, success
  
  const [formData, setFormData] = useState({
    type: 'Landslide',
    severity: 'HIGH',
    description: 'Large landslide blocking main corridor. Heavy rainfall continuing.',
    locationName: 'Chandrapur',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    setTimeout(() => {
      // Add to global store
      addIncident({
        type: formData.type,
        severity: formData.severity,
        description: formData.description,
        locationName: formData.locationName,
        coords: { lat: 26.12, lng: 91.90 } // Demo coords for Chandrapur
      });
      
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text flex items-center gap-2">
          <ShieldAlert className="text-primary" /> Field Incident Report
        </h2>
        <p className="text-textMuted">Submit field observations for real-time risk assessment.</p>
      </div>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="card flex flex-col items-center justify-center py-16 text-center border-emerald-200 bg-emerald-50"
          >
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-2xl font-bold text-emerald-800 mb-2">INCIDENT REPORTED</h3>
            <p className="text-emerald-700 font-medium mb-8 max-w-md">
              Risk analysis updated. Affected vehicles and critical deliveries are being identified for rerouting.
            </p>
            <button onClick={() => setStatus('idle')} className="btn-primary bg-emerald-600 hover:bg-emerald-700 shadow-md">
              Submit Another Report
            </button>
          </motion.div>
        ) : (
          <motion.div 
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="card"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-textMuted mb-2">Incident Type</label>
                  <select 
                    className="input-field" 
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="Landslide">Landslide</option>
                    <option value="Flood">Flood</option>
                    <option value="Road Damage">Road Damage</option>
                    <option value="Bridge Damage">Bridge Damage</option>
                    <option value="Road Closure">Road Closure</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-textMuted mb-2">Severity</label>
                  <select 
                    className="input-field" 
                    required
                    value={formData.severity}
                    onChange={(e) => setFormData({...formData, severity: e.target.value})}
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                    <option value="CRITICAL">CRITICAL</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-textMuted mb-2">Location / Zone</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    className="input-field pl-10" 
                    placeholder="E.g., Chandrapur" 
                    required 
                    value={formData.locationName}
                    onChange={(e) => setFormData({...formData, locationName: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-textMuted mb-2">Description</label>
                <textarea 
                  rows="3" 
                  className="input-field resize-none" 
                  placeholder="Provide details about the incident..." 
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <button type="button" className="btn-secondary flex items-center gap-2 flex-1 justify-center py-3 bg-slate-50">
                  <MapPin size={20} className="text-slate-500" />
                  <span className="font-semibold">Capture Location</span>
                </button>
                
                <button type="button" className="btn-secondary flex items-center gap-2 flex-1 justify-center py-3 bg-slate-50">
                  <Camera size={20} className="text-slate-500" />
                  <span className="font-semibold">Upload Photo</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-4 pt-4 border-t border-border mt-6">
                <button 
                  type="submit" 
                  className="flex-2 w-full md:w-auto flex-1 btn-primary py-3 flex justify-center items-center gap-2 text-lg shadow-md"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Analyzing & Submitting...
                    </div>
                  ) : (
                    <>
                      <Send size={20} /> Submit Report
                    </>
                  )}
                </button>
                <button type="button" className="flex-1 btn-secondary py-3 text-slate-600 font-semibold border-slate-300">
                  Save Offline
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
