
import React, { useState } from 'react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (data: { name: string; role: UserRole; email: string; studentId: string }) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [role, setRole] = useState<UserRole>('STUDENT');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin({ 
        name: name.trim(), 
        role, 
        email: email.trim() || `${name.toLowerCase().replace(' ', '.')}@nita.ac.in`, 
        studentId: studentId.trim() || '24UCS000'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#f0f9f6]">
      <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden border border-emerald-50 animate-reveal">
        <div className="p-10 md:p-14">
          <div className="text-center mb-10">
            <div className="w-20 h-20 gradient-bg rounded-3xl flex items-center justify-center text-white font-black text-4xl mx-auto mb-6 shadow-2xl shadow-emerald-200">
              S
            </div>
            <h1 className="text-3xl font-black text-emerald-950 tracking-tight mb-2">StudentAid Ledger</h1>
            <p className="text-emerald-500/70 font-semibold text-sm">Official Peer Support for NIT & IIIT Agartala.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => setRole('STUDENT')}
                className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  role === 'STUDENT' 
                    ? 'bg-emerald-950 text-white shadow-xl scale-105' 
                    : 'bg-emerald-50 text-emerald-300 hover:bg-emerald-100'
                }`}
              >
                I'm a Student
              </button>
              <button 
                type="button"
                onClick={() => setRole('ADMIN')}
                className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  role === 'ADMIN' 
                    ? 'bg-emerald-950 text-white shadow-xl scale-105' 
                    : 'bg-emerald-50 text-emerald-300 hover:bg-emerald-100'
                }`}
              >
                I'm Admin
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-2 ml-1">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-6 py-4 rounded-2xl bg-emerald-50/20 border border-emerald-100 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-emerald-950 outline-none"
                />
              </div>

              {role === 'STUDENT' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-2 ml-1">Institute Email</label>
                    <input 
                      required
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name.24ucs@nita.ac.in"
                      className="w-full px-6 py-4 rounded-2xl bg-emerald-50/20 border border-emerald-100 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-emerald-950 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-2 ml-1">Roll Number (ID)</label>
                    <input 
                      required
                      type="text" 
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder="e.g. 24UCS045"
                      className="w-full px-6 py-4 rounded-2xl bg-emerald-50/20 border border-emerald-100 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-emerald-950 outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            <button 
              type="submit"
              className="w-full py-5 gradient-bg text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-emerald-200 hover:opacity-95 active:scale-95 transition-all mt-4"
            >
              Access Secure Ledger
            </button>
          </form>

          <div className="mt-12 text-center opacity-40">
            <p className="text-[9px] font-black text-emerald-900 uppercase tracking-[0.4em]">
              Peer-to-Peer Verified Support Simulation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
