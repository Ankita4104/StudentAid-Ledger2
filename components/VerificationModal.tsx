
import React, { useState } from 'react';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (university: string, idImage: string) => void;
}

const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen, onClose, onVerify }) => {
  const [university, setUniversity] = useState('');
  const [idImage, setIdImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'IDLE' | 'UPLOADING' | 'SCANNING' | 'SUCCESS'>('IDLE');

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setIdImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idImage) return;
    
    setIsSubmitting(true);
    setStatus('UPLOADING');
    
    setTimeout(() => {
      setStatus('SCANNING');
      setTimeout(() => {
        setStatus('SUCCESS');
        setTimeout(() => {
          onVerify(university, idImage);
          setIsSubmitting(false);
          setStatus('IDLE');
        }, 1000);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-emerald-950/40 backdrop-blur-md">
      <div className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden border border-emerald-100 animate-reveal">
        <div className="p-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-black text-emerald-950 tracking-tight">Identity Access</h2>
              <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest mt-1">Automatic Institutional Scan</p>
            </div>
            {!isSubmitting && (
              <button onClick={onClose} className="p-2 hover:bg-emerald-50 rounded-2xl text-emerald-300">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isSubmitting ? (
              <>
                <div>
                  <label className="block text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2 ml-1">University Name</label>
                  <input 
                    required
                    type="text" 
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    placeholder="e.g. NIT Agartala"
                    className="w-full px-6 py-4 rounded-2xl bg-emerald-50/20 border border-emerald-100 font-bold text-emerald-950 outline-none focus:bg-white transition-all"
                  />
                </div>

                <div className="relative">
                  <label className="block text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2 ml-1">ID Card Photo</label>
                  <div className={`relative h-48 border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center overflow-hidden transition-all ${idImage ? 'border-emerald-500 bg-emerald-50' : 'border-emerald-100 bg-emerald-50/30 hover:bg-emerald-50'}`}>
                    {idImage ? (
                      <img src={idImage} className="absolute inset-0 w-full h-full object-cover" alt="Uploaded ID" />
                    ) : (
                      <>
                        <div className="text-3xl mb-2">🆔</div>
                        <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Select Card Image</p>
                      </>
                    )}
                    <input 
                      required
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={!idImage}
                  className="w-full py-5 gradient-bg text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.25em] shadow-xl shadow-emerald-100 disabled:opacity-50"
                >
                  Start AI Verification
                </button>
              </>
            ) : (
              <div className="py-12 text-center space-y-6">
                <div className="relative w-24 h-24 mx-auto">
                  <div className={`absolute inset-0 border-4 border-emerald-100 rounded-full ${status !== 'SUCCESS' ? 'animate-spin border-t-emerald-600' : ''}`}></div>
                  <div className="absolute inset-0 flex items-center justify-center text-4xl">
                    {status === 'UPLOADING' && '☁️'}
                    {status === 'SCANNING' && '🔍'}
                    {status === 'SUCCESS' && '✅'}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-black text-emerald-950 uppercase tracking-tighter">
                    {status === 'UPLOADING' && 'Uploading Data...'}
                    {status === 'SCANNING' && 'AI Scanning ID...'}
                    {status === 'SUCCESS' && 'Verified Successfully!'}
                  </h3>
                  <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mt-2">
                    {status === 'SCANNING' ? 'Matching records with university database' : 'Please wait a moment'}
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;
