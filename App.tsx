
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Student, 
  FinancialRequest, 
  Donation, 
  UrgencyLevel, 
  RequestCategory,
  UserRole
} from './types';
import { URGENCY_WEIGHTS, Icons } from './constants';
import Header from './components/Header';
import Feed from './components/Feed';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import VerificationModal from './components/VerificationModal';
import CreateRequestModal from './components/CreateRequestModal';
import { geminiService } from './services/geminiService';
import { mockRequests as initialRequests, mockDonations as initialDonations, mockUsers } from './mockData';

const App: React.FC = () => {
  const [user, setUser] = useState<Student | null>(null);
  const [requests, setRequests] = useState<FinancialRequest[]>(initialRequests);
  const [donations, setDonations] = useState<Donation[]>(initialDonations);
  const [view, setView] = useState<'feed' | 'dashboard' | 'admin'>('feed');
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('sa_user_v7');
    const savedRequests = localStorage.getItem('sa_requests_v7');
    const savedDonations = localStorage.getItem('sa_donations_v7');
    
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedRequests) setRequests(JSON.parse(savedRequests));
    if (savedDonations) setDonations(JSON.parse(savedDonations));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('sa_user_v7', JSON.stringify(user));
    else localStorage.removeItem('sa_user_v7');
    
    localStorage.setItem('sa_requests_v7', JSON.stringify(requests));
    localStorage.setItem('sa_donations_v7', JSON.stringify(donations));
  }, [user, requests, donations]);

  const sortedRequests = useMemo(() => {
    return requests
      .filter(r => r.status === 'APPROVED')
      .sort((a, b) => {
        const getScore = (req: FinancialRequest) => {
          const urgencyWeight = URGENCY_WEIGHTS[req.urgency];
          const fundingGap = (req.requestedAmount - req.raisedAmount) / req.requestedAmount;
          return urgencyWeight + (fundingGap * 100);
        };
        return getScore(b) - getScore(a);
      });
  }, [requests]);

  const handleLogin = (data: { name: string; role: UserRole; email: string; studentId: string }) => {
    // Default university for the demo context based on email domain
    const university = data.role === 'ADMIN' ? 'Admin Council' : (data.email.includes('iiita') ? 'IIIT Agartala' : 'NIT Agartala');
    
    const newUser: Student = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      email: data.email,
      university: university,
      studentId: data.studentId,
      isVerified: data.role === 'ADMIN', 
      avatar: `https://api.dicebear.com/7.x/shapes/svg?seed=${data.name}&backgroundColor=d1fae5&shape1Color=059669`,
      role: data.role
    };
    setUser(newUser);
    setView(data.role === 'ADMIN' ? 'admin' : 'feed');
  };

  const handleLogout = () => {
    setUser(null);
    setView('feed');
  };

  const handleDonate = (requestId: string, amount: number) => {
    if (!user) return;
    if (!user.isVerified) {
      setIsVerificationModalOpen(true);
      return;
    }

    const newDonation: Donation = {
      id: Math.random().toString(36).substr(2, 9),
      requestId,
      donorId: user.id,
      donorName: user.name,
      amount,
      timestamp: new Date().toISOString(),
    };

    setDonations([...donations, newDonation]);
    setRequests(requests.map(req => 
      req.id === requestId 
        ? { ...req, raisedAmount: Math.min(req.requestedAmount, req.raisedAmount + amount) } 
        : req
    ));
  };

  const handleCreateRequest = async (newRequest: Partial<FinancialRequest>) => {
    if (!user) return;
    if (!user.isVerified) {
      setIsVerificationModalOpen(true);
      return;
    }

    // Get highly relevant image via keyword search
    const keyword = await geminiService.suggestImageKeyword(newRequest.title || '', newRequest.description || '');
    const dynamicImageUrl = `https://source.unsplash.com/800x600/?${encodeURIComponent(keyword)}`;

    const fullRequest: FinancialRequest = {
      id: Math.random().toString(36).substr(2, 9),
      studentId: user.id,
      studentName: user.name,
      studentUniversity: user.university,
      studentEmail: user.email,
      studentIdCardNumber: user.studentId,
      title: newRequest.title || 'Support Request',
      category: newRequest.category || RequestCategory.OTHER,
      description: newRequest.description || '',
      requestedAmount: newRequest.requestedAmount || 0,
      raisedAmount: 0,
      urgency: newRequest.urgency || UrgencyLevel.MEDIUM,
      deadline: newRequest.deadline,
      isAnonymous: newRequest.isAnonymous || false,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      imageUrl: dynamicImageUrl,
    };

    setRequests([fullRequest, ...requests]);
    setIsRequestModalOpen(false);
  };

  const handleUpdateStatus = (requestId: string, status: 'APPROVED' | 'REJECTED') => {
    setRequests(requests.map(r => r.id === requestId ? { ...r, status } : r));
  };

  const handleVerify = (university: string) => {
    if (user) {
      setUser({ ...user, isVerified: true, university });
      setIsVerificationModalOpen(false);
    }
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen">
      <Header 
        user={user} 
        activeView={view === 'admin' ? 'feed' : view} 
        onViewChange={(v) => setView(v as any)} 
        onOpenRequest={() => setIsRequestModalOpen(true)}
        onLogout={handleLogout}
      />

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        {user.role === 'STUDENT' && !user.isVerified && (
          <div className="pretty-card rounded-[3rem] p-10 mb-20 flex flex-col lg:flex-row items-center justify-between gap-10 border-emerald-100 bg-white shadow-2xl shadow-emerald-900/5">
            <div className="flex items-center gap-8">
              <div className="w-20 h-20 bg-emerald-950 text-white rounded-3xl shadow-2xl flex items-center justify-center text-4xl group-hover:rotate-6 transition-transform">
                 📄
              </div>
              <div className="max-w-md">
                <h3 className="text-3xl font-black text-emerald-950 tracking-tight leading-none">Identity Audit Required</h3>
                <p className="text-base font-semibold text-emerald-600/70 mt-3 leading-relaxed">Official verification of institutional credentials (NIT/IIIT Agartala) is mandatory to start requesting aid.</p>
              </div>
            </div>
            <button 
              onClick={() => setIsVerificationModalOpen(true)}
              className="w-full lg:w-auto px-12 py-5 gradient-bg text-white rounded-[1.5rem] hover:shadow-2xl hover:scale-105 transition-all font-black text-[11px] uppercase tracking-[0.25em] shadow-xl shadow-emerald-200"
            >
              Verify Identity
            </button>
          </div>
        )}

        {view === 'admin' && user.role === 'ADMIN' ? (
          <AdminDashboard 
            requests={requests.filter(r => r.status === 'PENDING')} 
            onUpdateStatus={handleUpdateStatus} 
          />
        ) : view === 'feed' ? (
          <Feed 
            requests={sortedRequests} 
            onDonate={handleDonate} 
            user={user}
          />
        ) : (
          <Dashboard 
            user={user} 
            requests={requests.filter(r => r.studentId === user.id)}
            donations={donations.filter(d => d.donorId === user.id)}
          />
        )}
      </main>

      <footer className="mt-40 pb-20 text-center">
        <div className="inline-block px-10 py-5 rounded-[2rem] bg-white border border-emerald-50 shadow-sm">
          <p className="font-black text-[10px] uppercase tracking-[0.5em] text-emerald-200">
            StudentAid Ledger • NIT & IIIT Agartala Peer Support Network
          </p>
        </div>
      </footer>

      <VerificationModal 
        isOpen={isVerificationModalOpen} 
        onClose={() => setIsVerificationModalOpen(false)} 
        onVerify={handleVerify}
      />
      
      <CreateRequestModal 
        isOpen={isRequestModalOpen} 
        onClose={() => setIsRequestModalOpen(false)}
        onSubmit={handleCreateRequest}
      />
    </div>
  );
};

export default App;
