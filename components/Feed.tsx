
import React from 'react';
import { FinancialRequest, Student } from '../types';
import RequestCard from './RequestCard';

interface FeedProps {
  requests: FinancialRequest[];
  onDonate: (requestId: string, amount: number) => void;
  user: Student | null;
}

const Feed: React.FC<FeedProps> = ({ requests, onDonate, user }) => {
  return (
    <div className="space-y-16 max-w-5xl mx-auto px-4 pb-20">
      {/* Hero Banner Section */}
      <section className="relative w-full rounded-[2.5rem] overflow-hidden shadow-2xl animate-reveal bg-emerald-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-50 transition-transform duration-10s hover:scale-110"
            alt="Students working together"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-900/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 p-10 md:p-20 text-white max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/20 backdrop-blur-lg rounded-full border border-emerald-400/30 text-emerald-300 text-[10px] font-black uppercase tracking-[0.25em] mb-8">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
            Peer-to-Peer Aid Network
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-[1.05] mb-8 tracking-tighter">
            Empowering <span className="text-emerald-400">Futures</span>, One Student at a Time.
          </h1>
          <p className="text-lg md:text-xl text-emerald-100/80 font-medium leading-relaxed mb-12 max-w-xl">
            A safe, verified space for students to overcome urgent financial hurdles through collective community support. No middlemen—just students helping students.
          </p>
          <div className="flex flex-wrap gap-10 border-t border-white/10 pt-10">
            <div>
              <p className="text-3xl font-black text-white">{requests.length}</p>
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Active Requests</p>
            </div>
            <div>
              <p className="text-3xl font-black text-white">100%</p>
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Verified Profiles</p>
            </div>
            <div>
              <p className="text-3xl font-black text-white">Direct</p>
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Transparency</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Ledger Section */}
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-emerald-100 pb-8">
          <div>
            <h2 className="text-3xl font-black text-emerald-950 tracking-tight">Support Needed</h2>
            <p className="text-emerald-500 font-medium mt-1">Sorted by urgency and unmet funding gap.</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black text-emerald-300 uppercase tracking-[0.3em]">Sort Priority:</span>
            <div className="flex bg-white p-1 rounded-xl shadow-sm border border-emerald-50">
              <button className="px-5 py-2 rounded-lg text-[9px] font-black bg-emerald-900 text-white uppercase tracking-widest shadow-md">Critical</button>
              <button className="px-5 py-2 rounded-lg text-[9px] font-black text-emerald-400 uppercase tracking-widest">Newest</button>
            </div>
          </div>
        </div>

        <div className="grid gap-12">
          {requests.length > 0 ? (
            requests.map((request, index) => (
              <RequestCard 
                key={request.id} 
                index={index}
                request={request} 
                onDonate={onDonate}
                isVerified={user?.isVerified || false}
              />
            ))
          ) : (
            <div className="text-center py-40 bg-white rounded-[3rem] border border-emerald-50 shadow-sm">
              <div className="text-7xl mb-6">🤝</div>
              <h3 className="text-2xl font-black text-emerald-950">Our community is strong.</h3>
              <p className="text-emerald-500 font-medium mt-2">All current requests have been fulfilled.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;
