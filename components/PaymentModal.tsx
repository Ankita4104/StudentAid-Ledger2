
import React, { useState } from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  amount: number;
  recipientName: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onConfirm, amount, recipientName }) => {
  const [method, setMethod] = useState<'UPI' | 'CARD' | 'BANK'>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      onConfirm();
      setIsProcessing(false);
      onClose();
    }, 2500);
  };

  const methods = [
    { id: 'UPI', label: 'UPI / Google Pay', icon: '📱' },
    { id: 'CARD', label: 'Credit / Debit Card', icon: '💳' },
    { id: 'BANK', label: 'Net Banking', icon: '🏦' },
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-xl animate-reveal">
      <div className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl border border-emerald-100 overflow-hidden">
        <div className="p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-inner">🛡️</div>
            <h2 className="text-2xl font-black text-emerald-950 tracking-tight leading-none">Safe Contribution</h2>
            <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest mt-1">Institutional Peer Transfer</p>
          </div>

          <div className="bg-emerald-50/50 rounded-2xl p-6 mb-8 border border-emerald-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Amount</span>
              <span className="text-xl font-black text-emerald-950">₹{amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">To Student</span>
              <span className="text-sm font-bold text-emerald-800">{recipientName}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-3 ml-1">Select Gateway</label>
              <div className="space-y-3">
                {methods.map(m => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id as any)}
                    className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer select-none group ${
                      method === m.id 
                        ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/10' 
                        : 'border-emerald-50 bg-white hover:border-emerald-200 hover:bg-emerald-50/30'
                    }`}
                  >
                    <span className="text-2xl pointer-events-none group-hover:scale-110 transition-transform">{m.icon}</span>
                    <span className="font-bold text-emerald-950 pointer-events-none">{m.label}</span>
                    <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center pointer-events-none transition-colors ${method === m.id ? 'border-emerald-600' : 'border-emerald-100'}`}>
                      {method === m.id && <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full animate-scale-in"></div>}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
               <button 
                disabled={isProcessing}
                type="submit" 
                className="w-full py-5 gradient-bg text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.3em] shadow-xl shadow-emerald-100 disabled:opacity-50 transition-all active:scale-[0.98] hover:shadow-2xl"
              >
                {isProcessing ? 'Processing Transaction...' : 'Confirm Peer Transfer'}
              </button>
              
              <button 
                type="button"
                onClick={onClose}
                className="w-full py-3 text-[10px] font-black text-emerald-400 uppercase tracking-widest hover:text-emerald-600 transition-colors"
              >
                Cancel Transfer
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scaleIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default PaymentModal;
