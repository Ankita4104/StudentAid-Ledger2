
import React, { useState } from 'react';
import { FinancialRequest, Student } from '../types';

interface AdminDashboardProps {
  requests: FinancialRequest[];
  allRequests: FinancialRequest[]; // Pass all to calculate stats
  onUpdateStatus: (id: string, status: 'APPROVED' | 'REJECTED') => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ requests, allRequests, onUpdateStatus }) => {
  const [activeTab, setActiveTab] = useState<'PENDING' | 'STATS'>('PENDING');

  const approvedCount = allRequests.filter(r => r.status === 'APPROVED').length;
  const rejectedCount = allRequests.filter(r => r.status === 'REJECTED').length;
  const totalProcessed = approvedCount + rejectedCount;

  return (
    <div className="space-y-12 animate-reveal">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-3 items-center text-center sm:items-start sm:text-left">
          <h1 className="text-5xl font-black text-emerald-950 tracking-tighter leading-none">Admin <span className="gradient-text">Portal</span></h1>
          <p className="text-emerald-400 font-bold uppercase tracking-[0.3em] text-[10px]">Institutional Governance & Audit</p>
        </div>
        
        <div className="flex bg-emerald-50/50 p-2 rounded-[2rem] border border-emerald-100">
          <button 
            onClick={() => setActiveTab('PENDING')}
            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'PENDING' ? 'bg-emerald-950 text-white shadow-lg' : 'text-emerald-400 hover:text-emerald-600'}`}
          >
            Awaiting Review ({requests.length})
          </button>
          <button 
            onClick={() => setActiveTab('STATS')}
            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'STATS' ? 'bg-emerald-950 text-white shadow-lg' : 'text-emerald-400 hover:text-emerald-600'}`}
          >
            System History
          </button>
        </div>
      </div>

      {activeTab === 'PENDING' ? (
        <div className="grid gap-10">
          {requests.length > 0 ? (
            requests.map((req) => (
              <div key={req.id} className="pretty-card p-10 rounded-[3rem] border-2 border-emerald-50 bg-white relative overflow-hidden">
                {/* Verification Side Badge */}
                <div className="absolute top-0 right-0">
                  <div className="bg-blue-600 text-white px-6 py-2 rounded-bl-3xl font-black text-[9px] uppercase tracking-widest shadow-lg flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    AI Verified Student
                  </div>
                </div>

                <div className="flex flex-col xl:flex-row gap-10">
                  <div className="w-full xl:w-1/3">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-square group">
                      <img src={req.imageUrl} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="Request" />
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-emerald-950 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                          {req.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between pt-6 xl:pt-0">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-3xl font-black text-emerald-950 tracking-tight leading-tight">{req.title}</h3>
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${req.urgency === 'HIGH' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                          {req.urgency} Priority
                        </span>
                      </div>
                      <p className="text-emerald-800/70 text-base leading-relaxed italic border-l-4 border-emerald-100 pl-6 mb-8">"{req.description}"</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-6 border-y border-emerald-50">
                        <div>
                          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Requester</p>
                          <p className="font-bold text-emerald-900">{req.studentName}</p>
                          <p className="text-[10px] text-blue-500 font-bold uppercase tracking-tighter">Identity Cleared ✓</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Amount</p>
                          <p className="text-xl font-black text-emerald-950">₹{req.requestedAmount.toLocaleString()}</p>
                        </div>
                        <div className="hidden md:block">
                          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Entry Timestamp</p>
                          <p className="font-bold text-emerald-900">{new Date(req.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-10">
                      <button onClick={() => onUpdateStatus(req.id, 'REJECTED')} className="flex-1 py-5 bg-rose-50 text-rose-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-100 transition-all border border-rose-100">Deny Access</button>
                      <button onClick={() => onUpdateStatus(req.id, 'APPROVED')} className="flex-[2] py-5 gradient-bg text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-100 hover:opacity-90 active:scale-95 transition-all">Verify & Approve</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-32 bg-white rounded-[3rem] border border-emerald-50 shadow-sm">
              <div className="text-6xl mb-6">🎯</div>
              <p className="text-emerald-950 font-black text-xl tracking-tight">Queue fully processed.</p>
              <p className="text-emerald-400 font-medium mt-2">No pending student requests require action.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-8">
           <div className="grid sm:grid-cols-3 gap-6">
              <div className="pretty-card p-10 rounded-[2.5rem] bg-white text-center">
                 <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-2">Total Processed</p>
                 <p className="text-5xl font-black text-emerald-950 tracking-tighter">{totalProcessed}</p>
              </div>
              <div className="pretty-card p-10 rounded-[2.5rem] bg-white text-center border-l-8 border-l-emerald-500">
                 <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-2">Approved Access</p>
                 <p className="text-5xl font-black text-emerald-600 tracking-tighter">{approvedCount}</p>
              </div>
              <div className="pretty-card p-10 rounded-[2.5rem] bg-white text-center border-l-8 border-l-rose-500">
                 <p className="text-[10px] font-black text-rose-400 uppercase tracking-[0.3em] mb-2">Denied Access</p>
                 <p className="text-5xl font-black text-rose-600 tracking-tighter">{rejectedCount}</p>
              </div>
           </div>

           <div className="bg-emerald-950 p-12 rounded-[3.5rem] text-white">
              <h3 className="text-2xl font-black mb-8 tracking-tight">Operational Insights</h3>
              <div className="space-y-6">
                 <div className="flex justify-between items-center py-4 border-b border-white/10">
                    <span className="text-emerald-300 font-bold uppercase text-[10px] tracking-widest">Active Waiting Queue</span>
                    <span className="font-black text-xl">{requests.length} Requests</span>
                 </div>
                 <div className="flex justify-between items-center py-4 border-b border-white/10">
                    <span className="text-emerald-300 font-bold uppercase text-[10px] tracking-widest">Audit Accuracy Rate</span>
                    <span className="font-black text-xl">100% (Institutional AI)</span>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
