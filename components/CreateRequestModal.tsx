
import React, { useState } from 'react';
import { FinancialRequest, RequestCategory, UrgencyLevel } from '../types';
import { geminiService } from '../services/geminiService';

interface CreateRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (request: Partial<FinancialRequest>) => void;
}

const CreateRequestModal: React.FC<CreateRequestModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<Partial<FinancialRequest>>({
    title: '',
    category: RequestCategory.OTHER,
    description: '',
    requestedAmount: 0,
    urgency: UrgencyLevel.MEDIUM,
    isAnonymous: false,
  });
  const [isPolishing, setIsPolishing] = useState(false);

  if (!isOpen) return null;

  const handlePolish = async () => {
    if (!formData.description || !formData.title) return;
    setIsPolishing(true);
    const polished = await geminiService.polishDescription(formData.title, formData.description);
    setFormData({ ...formData, description: polished });
    setIsPolishing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      category: RequestCategory.OTHER,
      description: '',
      requestedAmount: 0,
      urgency: UrgencyLevel.MEDIUM,
      isAnonymous: false,
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-emerald-950/20 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-y-auto max-h-[90vh] animate-in zoom-in-95 duration-300 border border-emerald-50">
        <div className="p-10">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h2 className="text-3xl font-black text-emerald-950 tracking-tight">Request Aid</h2>
              <p className="text-emerald-500 font-medium text-sm mt-1">Transparency builds trust. Tell your story clearly.</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-emerald-50 rounded-2xl text-emerald-300 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <label className="block text-xs font-black text-emerald-400 uppercase tracking-widest mb-2">Heading</label>
                <input 
                  required
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Help with Semester Fees"
                  className="w-full px-5 py-4 rounded-2xl bg-emerald-50/30 border border-emerald-100 focus:ring-2 focus:ring-emerald-500 transition-all font-bold text-emerald-900 placeholder:text-emerald-200"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-emerald-400 uppercase tracking-widest mb-2">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as RequestCategory })}
                  className="w-full px-5 py-4 rounded-2xl bg-emerald-50/30 border border-emerald-100 focus:ring-2 focus:ring-emerald-500 transition-all font-bold text-emerald-900 appearance-none"
                >
                  {Object.values(RequestCategory).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-emerald-400 uppercase tracking-widest mb-2">Goal (₹)</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-400 font-black">₹</span>
                  <input 
                    required
                    type="number" 
                    value={formData.requestedAmount || ''}
                    onChange={(e) => setFormData({ ...formData, requestedAmount: Number(e.target.value) })}
                    className="w-full pl-10 pr-5 py-4 rounded-2xl bg-emerald-50/30 border border-emerald-100 focus:ring-2 focus:ring-emerald-500 transition-all font-black text-emerald-900"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-black text-emerald-400 uppercase tracking-widest mb-2">Urgency</label>
                <div className="flex gap-3">
                  {Object.values(UrgencyLevel).map(level => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setFormData({ ...formData, urgency: level })}
                      className={`flex-1 py-3.5 rounded-2xl text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 ${
                        formData.urgency === level 
                          ? 'bg-emerald-800 text-white shadow-xl scale-[1.02]' 
                          : 'bg-emerald-50 text-emerald-300 hover:bg-emerald-100'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-black text-emerald-400 uppercase tracking-widest">Description</label>
                <button 
                  type="button"
                  onClick={handlePolish}
                  disabled={isPolishing || !formData.description}
                  className="px-3 py-1.5 rounded-xl bg-emerald-800 text-[10px] font-black text-white hover:bg-emerald-900 flex items-center gap-1.5 transition-all disabled:opacity-50 uppercase tracking-wider"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.586 15.657l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zM16 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1z" />
                  </svg>
                  {isPolishing ? 'Drafting...' : 'AI Polish Story'}
                </button>
              </div>
              <textarea 
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Briefly explain your situation and how this support impacts your journey..."
                className="w-full px-5 py-4 rounded-3xl bg-emerald-50/30 border border-emerald-100 focus:ring-2 focus:ring-emerald-500 transition-all resize-none font-medium text-emerald-700 leading-relaxed placeholder:text-emerald-200"
              ></textarea>
            </div>

            <div className="flex items-center gap-3 py-4">
              <input 
                type="checkbox" 
                id="anon"
                checked={formData.isAnonymous}
                onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                className="w-5 h-5 text-emerald-600 rounded-lg border-emerald-200 focus:ring-emerald-500"
              />
              <label htmlFor="anon" className="text-sm font-bold text-emerald-600">Post Anonymously</label>
            </div>

            <div className="pt-4 flex gap-4">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 py-4 text-xs font-black text-emerald-400 bg-emerald-50 rounded-2xl hover:bg-emerald-100 transition-all uppercase tracking-[0.2em]"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex-[2] py-4 text-xs font-black text-white gradient-bg rounded-2xl shadow-xl shadow-emerald-100 hover:opacity-90 active:scale-95 transition-all uppercase tracking-[0.2em]"
              >
                Post for Support
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRequestModal;
