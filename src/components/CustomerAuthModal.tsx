import React, { useState } from 'react';
import { UserProfile, CustomerDetails } from '../types';
import { X, User, Phone, Mail, Lock, LogIn, LogOut, Award, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';

interface CustomerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  customer: CustomerDetails;
  onLogin: (name: string, phone: string, email?: string) => void;
  onLogout: () => void;
  onUpdateCustomerDetails: (details: Partial<CustomerDetails>) => void;
}

export const CustomerAuthModal: React.FC<CustomerAuthModalProps> = ({
  isOpen,
  onClose,
  user,
  customer,
  onLogin,
  onLogout,
  onUpdateCustomerDetails,
}) => {
  const [authMode, setAuthMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');
  const [name, setName] = useState(customer.name || '');
  const [phone, setPhone] = useState(customer.phone || '');
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState('');
  const [roomOrTable, setRoomOrTable] = useState(customer.tableOrRoomNumber || 'Table 1');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    onLogin(name.trim(), phone.trim(), email.trim());
    onUpdateCustomerDetails({ name: name.trim(), phone: phone.trim(), tableOrRoomNumber: roomOrTable.trim() || 'Table 1' });
    onClose();
  };

  const fillQuickDemo = (demoName: string, demoPhone: string, demoTable: string) => {
    setName(demoName);
    setPhone(demoPhone);
    setEmail(`${demoName.toLowerCase().replace(/\s+/g, '')}@gmail.com`);
    setRoomOrTable(demoTable);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-[#FFFDF9] border-2 border-[#6B1324]/20 rounded-3xl text-[#2C0B12] shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 my-8">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#2C0B12]/60 hover:text-[#6B1324] p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {user.isLoggedIn ? (
          /* Logged In View */
          <div className="space-y-6">
            <div className="flex items-center gap-4 border-b border-[#6B1324]/20 pb-4">
              <div className="w-14 h-14 rounded-2xl bg-[#6B1324] border border-[#D4AF37] flex items-center justify-center text-[#FFECA7] font-bold text-xl shadow-md">
                {user.name ? user.name.charAt(0).toUpperCase() : 'G'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-royal font-bold text-[#6B1324]">
                    {user.name}
                  </h3>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-xs text-[#2C0B12]/70">{user.phone}</p>
                <p className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider mt-0.5">
                  Verified Spice Atelier Member
                </p>
              </div>
            </div>

            {/* Loyalty Rewards & Dining Room Badge */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#F8F3ED] border border-[#6B1324]/20 text-center">
                <Award className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <p className="text-[10px] uppercase text-[#2C0B12]/70 font-semibold">Atelier Spice Points</p>
                <p className="text-lg font-bold font-royal text-[#6B1324]">{user.loyaltyPoints || 450} pts</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8F3ED] border border-[#6B1324]/20 text-center">
                <Sparkles className="w-5 h-5 text-[#6B1324] mx-auto mb-1" />
                <p className="text-[10px] uppercase text-[#2C0B12]/70 font-semibold">Current Dining Table</p>
                <p className="text-lg font-bold font-royal text-[#2C0B12]">{customer.tableOrRoomNumber || 'Table 12'}</p>
              </div>
            </div>

            {/* Quick Profile Form */}
            <div className="space-y-3 text-xs pt-2">
              <div>
                <label className="block text-[#2C0B12]/80 font-medium mb-1">Guest Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#F8F3ED] border border-[#6B1324]/20 rounded-xl px-3 py-2 text-[#2C0B12] focus:outline-none focus:border-[#6B1324]"
                />
              </div>

              <div>
                <label className="block text-[#2C0B12]/80 font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#F8F3ED] border border-[#6B1324]/20 rounded-xl px-3 py-2 text-[#2C0B12] focus:outline-none focus:border-[#6B1324]"
                />
              </div>

              <div>
                <label className="block text-[#2C0B12]/80 font-medium mb-1">Assigned Table / Room Number</label>
                <input
                  type="text"
                  value={roomOrTable}
                  onChange={(e) => setRoomOrTable(e.target.value)}
                  placeholder="e.g. Table 12 or Room 204"
                  className="w-full bg-[#F8F3ED] border border-[#6B1324]/20 rounded-xl px-3 py-2 text-[#2C0B12] focus:outline-none focus:border-[#6B1324]"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex gap-3">
              <button
                onClick={onLogout}
                className="py-3 px-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 font-semibold text-xs flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>

              <button
                onClick={() => {
                  onUpdateCustomerDetails({ name, phone, tableOrRoomNumber: roomOrTable });
                  onClose();
                }}
                className="flex-1 py-3 rounded-xl btn-royal-burgundy text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4 text-white" />
                <span>Update Guest Details</span>
              </button>
            </div>
          </div>
        ) : (
          /* Login / Signup Form */
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#6B1324] border border-[#D4AF37] flex items-center justify-center text-[#FFECA7]">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-royal font-bold text-[#6B1324]">
                  {authMode === 'LOGIN' ? 'Spice Atelier Sign In' : 'Register Atelier Account'}
                </h2>
                <p className="text-xs text-[#2C0B12]/70 font-serif italic">The Spice Atelier Fine Dining Access 👑</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Quick Fill Presets */}
              <div className="bg-[#F8F3ED] p-3 rounded-2xl border border-[#6B1324]/15 mb-3">
                <p className="text-[10px] uppercase font-bold text-[#6B1324] mb-2">Quick Fill Guest Presets:</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => fillQuickDemo('Sathish Kumar', '9876543210', 'Table 12')}
                    className="px-2.5 py-1 bg-white hover:bg-[#6B1324] hover:text-white border border-[#6B1324]/30 rounded-lg text-[11px] text-[#2C0B12] font-medium transition-colors"
                  >
                    Sathish K. (Table 12)
                  </button>
                  <button
                    type="button"
                    onClick={() => fillQuickDemo('Anand Sharma', '9123456789', 'Table 3')}
                    className="px-2.5 py-1 bg-white hover:bg-[#6B1324] hover:text-white border border-[#6B1324]/30 rounded-lg text-[11px] text-[#2C0B12] font-medium transition-colors"
                  >
                    Anand S. (Table 3)
                  </button>
                  <button
                    type="button"
                    onClick={() => fillQuickDemo('Priya Sundaram', '9988776655', 'Table 6')}
                    className="px-2.5 py-1 bg-white hover:bg-[#6B1324] hover:text-white border border-[#6B1324]/30 rounded-lg text-[11px] text-[#2C0B12] font-medium transition-colors"
                  >
                    Priya S. (Table 6)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[#2C0B12]/80 font-medium mb-1">
                  Full Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name (e.g. Sathish Kumar)"
                  className="w-full bg-[#F8F3ED] border border-[#6B1324]/20 rounded-xl px-3.5 py-2.5 text-[#2C0B12] placeholder-[#2C0B12]/40 focus:outline-none focus:border-[#6B1324]"
                />
              </div>

              <div>
                <label className="block text-[#2C0B12]/80 font-medium mb-1">
                  Mobile Phone Number <span className="text-rose-600">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter 10-digit mobile number"
                  className="w-full bg-[#F8F3ED] border border-[#6B1324]/20 rounded-xl px-3.5 py-2.5 text-[#2C0B12] placeholder-[#2C0B12]/40 focus:outline-none focus:border-[#6B1324]"
                />
              </div>

              <div>
                <label className="block text-[#2C0B12]/80 font-medium mb-1">
                  Table / Room Number <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={roomOrTable}
                  onChange={(e) => setRoomOrTable(e.target.value)}
                  placeholder="e.g. Table 12, Table 4, or Room 204"
                  className="w-full bg-[#F8F3ED] border border-[#6B1324]/20 rounded-xl px-3.5 py-2.5 text-[#2C0B12] placeholder-[#2C0B12]/40 focus:outline-none focus:border-[#6B1324]"
                />
              </div>

              <div>
                <label className="block text-[#2C0B12]/80 font-medium mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. guest@spiceatelier.com"
                  className="w-full bg-[#F8F3ED] border border-[#6B1324]/20 rounded-xl px-3.5 py-2.5 text-[#2C0B12] placeholder-[#2C0B12]/40 focus:outline-none focus:border-[#6B1324]"
                />
              </div>

              <div>
                <label className="block text-[#2C0B12]/80 font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#F8F3ED] border border-[#6B1324]/20 rounded-xl px-3.5 py-2.5 text-[#2C0B12] placeholder-[#2C0B12]/40 focus:outline-none focus:border-[#6B1324]"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-3.5 mt-2 rounded-2xl btn-royal-burgundy text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <LogIn className="w-4 h-4 text-white" />
                <span>{authMode === 'LOGIN' ? 'Sign In & Access Dining' : 'Create Atelier Guest Account'}</span>
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-[#6B1324]/20 text-center">
              <button
                type="button"
                onClick={() => setAuthMode(authMode === 'LOGIN' ? 'SIGNUP' : 'LOGIN')}
                className="text-xs text-[#6B1324] hover:text-[#8C1D33] underline font-semibold"
              >
                {authMode === 'LOGIN'
                  ? "Don't have an account? Register as Guest"
                  : 'Already registered? Sign In'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
