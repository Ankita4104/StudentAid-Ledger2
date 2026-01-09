
import React, { useState } from 'react';
import { UserRole, Student } from '../types';

interface LoginProps {
  onLogin: (user: Student) => void;
  existingUsers: Student[];
}

const Login: React.FC<LoginProps> = ({ onLogin, existingUsers }) => {
  const [stage, setStage] = useState<'ROLE' | 'AUTH'>('ROLE');
  const [role, setRole] = useState<UserRole>('STUDENT');
  
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState('');
  const [studentId, setStudentId] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStage('AUTH');
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (role === 'ADMIN') {
      // ADMIN ACCESS: Bypass all checks for demo. 
      // Any name/email/passcode combination creates a valid admin session.
      const demoAdmin: Student = {
        id: 'admin-' + Math.random().toString(36).substr(2, 5),
        name: name || email.split('@')[0] || 'Demo Administrator',
        email: email,
        university: 'Institutional Audit',
        studentId: 'ADMIN-ACCESS',
        passcode: passcode,
        verificationStatus: 'VERIFIED',
        avatar: `https://api.dicebear.com/7.x/shapes/svg?seed=${email}&backgroundColor=064e3b&shape1Color=ffffff`,
        role: 'ADMIN'
      };
      
      onLogin(demoAdmin);
    } else {
      // Direct Registration for Students
      const exists = existingUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.role === 'STUDENT');
      if (exists) {
        // If they already exist, for this hackathon demo, we'll just log them in
        onLogin(exists);
        return;
      }
      
      const newUser: Student = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        university,
        studentId,
        passcode: passcode || studentId, // Use Roll Number as passcode fallback
        verificationStatus: 'NONE',
        avatar: `https://api.dicebear.com/7.x/shapes/svg?seed=${name}&backgroundColor=d1fae5`,
        role: 'STUDENT'
      };
      onLogin(newUser);
    }
  };

  if (stage === 'ROLE') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#f0f9f6]">
        <div className="w-full max-w-2xl text-center space-y-12 animate-reveal">
          <div className="space-y-4">
            <div className="w-24 h-24 gradient-bg rounded-[2rem] flex items-center justify-center text-white font-black text-4xl mx-auto shadow-2xl shadow-emerald-200">S</div>
            <h1 className="text-4xl font-black text-emerald-950 tracking-tighter leading-none">StudentAid Ledger</h1>
            <p className="text-emerald-500 font-bold uppercase tracking-[0.3em] text-[10px]">For verified institutional access</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <button 
              onClick={() => handleRoleSelect('STUDENT')}
              className="pretty-card p-10 rounded-[3rem] text-center group hover:scale-105 transition-all bg-white"
            >
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 group-hover:rotate-12 transition-transform">🎓</div>
              <h3 className="text-xl font-black text-emerald-950">I am a Student</h3>
              <p className="text-sm text-emerald-500 mt-2 font-medium italic">Create and verify your profile</p>
            </button>
            <button 
              onClick={() => handleRoleSelect('ADMIN')}
              className="pretty-card p-10 rounded-[3rem] text-center group hover:scale-105 transition-all bg-emerald-950 text-white border-none shadow-2xl"
            >
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 group-hover:-rotate-12 transition-transform">🛡️</div>
              <h3 className="text-xl font-black">I am an Admin</h3>
              <p className="text-sm text-emerald-400 mt-2 font-medium italic">Secure audit dashboard</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#f0f9f6]">
      <div className="bg-white w-full max-w-lg rounded-[3.5rem] shadow-2xl overflow-hidden border border-emerald-50 animate-reveal">
        <div className="p-10 md:p-14">
          <button onClick={() => setStage('ROLE')} className="mb-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-300 hover:text-emerald-500">
            ← Back to Role Selection
          </button>
          
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black text-emerald-950 tracking-tight leading-none">
              {role === 'STUDENT' ? 'Initialize Profile' : 'Secure Admin Entry'}
            </h2>
            <p className="text-emerald-400 font-bold uppercase tracking-widest text-[10px] mt-2 italic">
              {role === 'STUDENT' ? 'Start your institutional journey' : 'Access any demo account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Student always needs full details, Admin can now provide name too */}
            <div>
              <label className="block text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2 ml-1">
                {role === 'STUDENT' ? 'Your Full Name' : 'Admin Name (e.g. Audit Lead)'}
              </label>
              <input required value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Full Name" className="auth-input" />
            </div>

            {role === 'STUDENT' && (
              <>
                <div>
                  <label className="block text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2 ml-1">Institution / University</label>
                  <input required value={university} onChange={e => setUniversity(e.target.value)} type="text" placeholder="e.g. NIT Agartala" className="auth-input" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2 ml-1">University Roll Number</label>
                  <input required value={studentId} onChange={e => setStudentId(e.target.value)} type="text" placeholder="e.g. 24UCS045" className="auth-input" />
                </div>
              </>
            )}

            <div>
              <label className="block text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <input required value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="email@address.edu" className="auth-input" />
            </div>

            <div>
              <label className="block text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2 ml-1">Access Passcode</label>
              <input required value={passcode} onChange={e => setPasscode(e.target.value)} type="password" placeholder="••••••••" className="auth-input" />
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 animate-reveal">
                <p className="text-rose-600 text-[10px] font-black text-center uppercase tracking-widest">{error}</p>
              </div>
            )}

            <button type="submit" className="w-full py-5 gradient-bg text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.3em] shadow-xl shadow-emerald-100 hover:opacity-95 active:scale-95 transition-all">
              {role === 'STUDENT' ? 'Register & Verify' : 'Enter Audit Portal'}
            </button>
            
            {role === 'ADMIN' && (
              <div className="mt-6 p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                <p className="text-[9px] text-center font-bold text-emerald-600 uppercase tracking-widest leading-relaxed">
                  DEMO MODE ENABLED: Any email and passcode will grant administrative access to the Case Priority ledger.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>

      <style>{`
        .auth-input {
          width: 100%;
          padding: 1rem 1.5rem;
          border-radius: 1.25rem;
          background-color: #f8faf9;
          border: 1px solid #d1fae5;
          font-weight: 700;
          color: #064e3b;
          outline: none;
          transition: all 0.2s;
        }
        .auth-input:focus {
          border-color: #10b981;
          background-color: #fff;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Login;
