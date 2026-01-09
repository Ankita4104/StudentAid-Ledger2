
import React, { useState } from 'react';
import { FinancialRequest, UrgencyLevel } from '../types';
import { Icons } from '../constants';
import PaymentModal from './PaymentModal';

interface RequestCardProps {
  request: FinancialRequest;
  onDonate: (requestId: string, amount: number) => void;
  isVerified: boolean;
  index: number;
}

const RequestCard: React.FC<RequestCardProps> = ({ request, onDonate, isVerified, index }) => {
  const [donateAmount, setDonateAmount] = useState<string>('500');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const progress = (request.raisedAmount / request.requestedAmount) * 100;
  
  const urgencyLabel = {
    [UrgencyLevel.HIGH]: 'Critical Care',
    [UrgencyLevel.MEDIUM]: 'Urgent Support',
    [UrgencyLevel.LOW]: 'Community Need'
  };

  const urgencyClass = {
    [UrgencyLevel.HIGH]: 'bg-rose-50 text-rose-600 border-rose-100',
    [UrgencyLevel.MEDIUM]: 'bg-amber-50 text-amber-600 border-amber-100',
    [UrgencyLevel.LOW]: 'bg-emerald-50 text-emerald-600 border-emerald-100'
  };

  const handleDonateSubmit = () => {
    const amount = parseFloat(donateAmount);
    if (!isNaN(amount) && amount >= 1) {
      setIsPaymentOpen(true);
    }
  };

  const handlePaymentConfirm = () => {
    onDonate(request.id, parseFloat(donateAmount));
  };

  return (
    <div 
      className={`pretty-card rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row min-h-[400px] animate-up`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="relative w-full lg:w-2/5 h-64 lg:h-auto overflow-hidden">
        <img 
          src={request.imageUrl || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop'} 
          className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" 
          alt={request.title}
          onError={(e) => (e.currentTarget as HTMLImageElement).src = `https://picsum.photos/seed/${request.id}/800/800`}
        />
        <div className="absolute inset-0 bg-emerald-950/20"></div>
        <div className="absolute bottom-6 left-6 flex gap-2">
           <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border backdrop-blur-md ${urgencyClass[request.urgency]}`}>
            {urgencyLabel[request.urgency]}
          </span>
        </div>
      </div>

      <div className="flex-1 p-8 md:p-12 flex flex-col justify-between bg-white">
        <div>
          <div className="flex justify-between items-center mb-6">
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] px-4 py-1.5 bg-emerald-50 rounded-full border border-emerald-100">
              {request.category}
            </span>
            <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-widest">
              Log: #{request.id.slice(0, 8)}
            </span>
          </div>

          <h3 className="text-3xl font-black text-emerald-950 mb-4 leading-tight tracking-tight">
            {request.title}
          </h3>
          
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center p-1 shadow-sm overflow-hidden">
              <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${request.studentName}&backgroundColor=d1fae5`} className="w-full h-full" alt="Student" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-emerald-900 leading-none">{request.isAnonymous ? 'Verified Peer' : request.studentName}</span>
                <Icons.Verified />
              </div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-tighter mt-1">Verified Institution Status</span>
            </div>
          </div>

          <p className="text-emerald-800/70 text-base leading-relaxed mb-10 font-medium italic border-l-4 border-emerald-100 pl-6">
            "{request.description}"
          </p>
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Impact Goal</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-emerald-950 tracking-tighter">₹{request.raisedAmount.toLocaleString()}</span>
                  <span className="text-emerald-300 font-black text-lg">/ ₹{request.requestedAmount.toLocaleString()}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-black text-emerald-600 px-3 py-1 bg-emerald-50 rounded-lg">
                  {Math.round(progress)}% Complete
                </span>
              </div>
            </div>
            <div className="relative w-full h-3 bg-emerald-50 rounded-full overflow-hidden shadow-inner border border-emerald-100">
              <div 
                className="absolute top-0 left-0 h-full gradient-bg transition-all duration-1000 ease-out rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)]" 
                style={{ width: `${Math.min(100, progress)}%` }}
              ></div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:flex-1 relative group">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-400 font-black text-lg">₹</span>
              <input 
                type="number"
                min="1"
                value={donateAmount}
                onChange={(e) => setDonateAmount(e.target.value)}
                className="w-full h-16 pl-12 pr-6 rounded-[1.5rem] bg-emerald-50/30 border border-emerald-100 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 text-lg font-black text-emerald-950 transition-all outline-none"
              />
            </div>

            <button
              onClick={handleDonateSubmit}
              disabled={progress >= 100 || !isVerified}
              className={`w-full sm:w-auto px-10 h-16 rounded-[1.5rem] font-black text-[12px] uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-3 ${
                progress >= 100 || !isVerified
                  ? 'bg-emerald-100 text-emerald-300 cursor-not-allowed' 
                  : 'gradient-bg text-white hover:shadow-2xl hover:shadow-emerald-200 active:scale-95'
              }`}
            >
              <span>{progress >= 100 ? 'Goal Met' : (isVerified ? 'Back This Student' : 'Verify to Contribute')}</span>
              {progress < 100 && isVerified && <Icons.Urgent />}
            </button>
          </div>
        </div>
      </div>

      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)}
        onConfirm={handlePaymentConfirm}
        amount={parseFloat(donateAmount)}
        recipientName={request.isAnonymous ? 'Verified Peer' : request.studentName}
      />
    </div>
  );
};

export default RequestCard;
