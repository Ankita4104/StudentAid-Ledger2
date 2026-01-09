
import React, { useState } from 'react';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (university: string) => void;
}

const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen, onClose, onVerify }) => {
  const [step, setStep] = useState(1);
  const [university, setUniversity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate verification check
    setTimeout(() => {
      onVerify(university);
      setStep(1);
      setUniversity('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-emerald-950/20 backdrop-blur-md">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 border border-emerald-50">
        <div className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-black text-emerald-950 tracking-tight">Identity Check</h2>
              <p className="text-emerald-500 text-xs font-bold uppercase tracking-widest mt-1">Student Enrollment Only</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-emerald-50 rounded-2xl text-emerald-300">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {step === 1 ? (
            <div className="space-y-6">
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-6 flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex-shrink-0 flex items-center justify-center text-white shadow-lg">
                   🌿
                </div>
                <div className="text-sm">
                  <p className="font-black text-emerald-900">Student Verified Ledger</p>
                  <p className="text-emerald-700 font-medium leading-relaxed">To ensure help reaches those in need, we verify university IDs and institutional email addresses.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 border border-emerald-100 rounded-3xl text-center hover:bg-emerald-50 transition cursor-pointer group" onClick={() => setStep(2)}>
                  <p className="text-3xl mb-3">🎓</p>
                  <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest group-hover:text-emerald-800 transition">College ID</p>
                </div>
                <div className="p-6 border border-emerald-100 rounded-3xl text-center hover:bg-emerald-50 transition cursor-pointer group" onClick={() => setStep(2)}>
                  <p className="text-3xl mb-3">✉️</p>
                  <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest group-hover:text-emerald-800 transition">Edu Mail</p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-black text-emerald-400 uppercase tracking-widest mb-2">Your Institution</label>
                <input 
                  required
                  type="text" 
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  placeholder="e.g. IIT Delhi"
                  className="w-full px-5 py-4 rounded-2xl bg-emerald-50/30 border border-emerald-100 focus:ring-2 focus:ring-emerald-500 transition-all font-bold text-emerald-900"
                />
              </div>
              
              <div className="p-10 border-2 border-dashed border-emerald-100 rounded-[2rem] text-center bg-emerald-50/20 hover:bg-emerald-50/50 transition cursor-pointer group">
                <div className="mx-auto w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-500 mb-3">
                   📸
                </div>
                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Upload or Scan ID</p>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 text-xs font-black text-emerald-400 bg-emerald-50 rounded-2xl hover:bg-emerald-100 transition-all uppercase tracking-widest"
                >
                  Back
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] py-4 text-xs font-black text-white gradient-bg rounded-2xl shadow-xl shadow-emerald-100 hover:opacity-90 disabled:opacity-50 uppercase tracking-widest"
                >
                  {isSubmitting ? 'Checking...' : 'Verify Now'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;
