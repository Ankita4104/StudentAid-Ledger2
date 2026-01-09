
import React from 'react';
import { FinancialRequest } from '../types';

interface AdminDashboardProps {
  requests: FinancialRequest[];
  onUpdateStatus: (id: string, status: 'APPROVED' | 'REJECTED') => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ requests, onUpdateStatus }) => {
  return (
    <div className="space-y-12 animate-reveal">
      <div className="flex flex-col gap-3 items-center text-center sm:items-start sm:text-left">
        <h1 className="text-5xl font-black text-emerald-950 tracking-tighter">Verification <span className="gradient-text">Vault</span></h1>
        <p className="text-emerald-400 font-bold uppercase tracking-[0.3em] text-[10px]">Security Clearing House • Reviewing {requests.length} Pending Peer Requests</p>
      </div>

      <div className="grid gap-10">
        {requests.length > 0 ? (
          requests.map((req, idx) => {
            // Logic to highlight potential issues for the demo
            const isSuspicious = !req.studentEmail?.endsWith('.ac.in');
            const isHighLuxury = req.requestedAmount > 50000 && req.category === 'Other';

            return (
              <div 
                key={req.id} 
                className={`pretty-card p-10 rounded-[3rem] border-2 overflow-hidden relative group transition-all duration-500 ${
                  isSuspicious || isHighLuxury ? 'border-rose-100 bg-rose-50/10' : 'border-emerald-50 bg-white'
                }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Visual Risk Indicator for Demo */}
                {(isSuspicious || isHighLuxury) && (
                  <div className="absolute top-0 right-0 px-8 py-3 bg-rose-500 text-white font-black text-[9px] uppercase tracking-[0.2em] rounded-bl-3xl z-20 shadow-lg animate-pulse">
                    ⚠️ HIGH AUDIT RISK DETECTED
                  </div>
                )}

                <div className="flex flex-col xl:flex-row gap-10">
                  <div className="w-full xl:w-1/3">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-square">
                      <img 
                        src={req.imageUrl} 
                        className="w-full h-full object-cover"
                        alt="Request context"
                      />
                      <div className="absolute top-4 left-4">
                         <span className="px-4 py-1.5 bg-emerald-950 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg">
                          {req.category}
                         </span>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-6 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                      <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4">Verification Metadata</p>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-emerald-800 uppercase">Student Name</span>
                          <span className="text-xs font-black text-emerald-950">{req.studentName}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-emerald-800 uppercase">Institute Email</span>
                          <span className={`text-xs font-black ${isSuspicious ? 'text-rose-600' : 'text-emerald-950'}`}>
                            {req.studentEmail || 'Pending Verification'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-emerald-800 uppercase">Roll / ID Number</span>
                          <span className={`text-xs font-black ${req.studentIdCardNumber === 'NO-CARD-ID' ? 'text-rose-600' : 'text-emerald-950'}`}>
                            {req.studentIdCardNumber || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                       <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${isSuspicious ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                          {isSuspicious ? 'Domain Mismatch' : 'Domain Verified'}
                       </div>
                       <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${isHighLuxury ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                          {isHighLuxury ? 'Luxury Item' : 'Essential Need'}
                       </div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-3xl font-black text-emerald-950 mb-4 tracking-tight leading-tight">{req.title}</h3>
                      <p className="text-emerald-800/70 text-base leading-relaxed mb-10 font-medium italic border-l-4 border-emerald-100 pl-6">
                        "{req.description}"
                      </p>
                      
                      <div className="grid grid-cols-2 gap-8 py-6 border-y border-emerald-50">
                        <div>
                          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Target Capital</p>
                          <p className={`text-2xl font-black ${isHighLuxury ? 'text-rose-600' : 'text-emerald-950'}`}>
                            ₹{req.requestedAmount.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Impact Level</p>
                          <p className="text-2xl font-black text-emerald-950">{req.urgency}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-10">
                      <button 
                        onClick={() => onUpdateStatus(req.id, 'REJECTED')}
                        className="flex-1 py-5 bg-rose-50 text-rose-600 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] hover:bg-rose-100 transition-all border border-rose-100"
                      >
                        Reject Request
                      </button>
                      <button 
                        onClick={() => onUpdateStatus(req.id, 'APPROVED')}
                        className="flex-[2] py-5 gradient-bg text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-emerald-200 hover:scale-[1.02] active:scale-95 transition-all"
                      >
                        Clear for Publication
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-48 bg-white rounded-[4rem] border-2 border-dashed border-emerald-100">
            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center text-4xl mx-auto mb-8 shadow-inner">
               ✅
            </div>
            <h3 className="text-2xl font-black text-emerald-950">Queue Completely Clear</h3>
            <p className="text-emerald-400 font-bold uppercase tracking-[0.3em] text-xs mt-3">All peer requests have been successfully audited.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
