import React from 'react';
import { ShoppingBag, Utensils, User, Clock, Star, Users, Sparkles, Search, Crown } from 'lucide-react';
import { CustomerDetails, OrderRecord, UserProfile } from '../types';

interface HeaderProps {
  customer: CustomerDetails;
  user: UserProfile;
  onOpenCustomerDialog: () => void;
  onOpenTableManagement: () => void;
  onOpenFeedback: () => void;
  freeTableCount: number;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  orderHistory: OrderRecord[];
  onOpenHistory: () => void;
  onFocusSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  customer,
  user,
  onOpenCustomerDialog,
  onOpenTableManagement,
  onOpenFeedback,
  freeTableCount,
  cartCount,
  cartTotal,
  onOpenCart,
  orderHistory,
  onOpenHistory,
  onFocusSearch,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-xl border-b border-[#5A0E1D]/20 text-[#2A0810] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3 sm:gap-4">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#FFECA7] via-[#D4AF37] to-[#5A0E1D] p-[1.5px] shadow-md flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-[#5A0E1D] rounded-[10.5px] flex items-center justify-center border border-[#D4AF37]/50">
              <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFECA7]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-2xl font-bold tracking-widest text-[#5A0E1D] font-royal uppercase">
                THE SPICE ATELIER
              </h1>
              <span className="hidden md:inline-block px-2.5 py-0.5 text-[9px] uppercase font-extrabold tracking-widest bg-[#5A0E1D] text-[#FFECA7] border border-[#D4AF37]/60 rounded-full shadow-sm">
                Culinary Atelier 👑
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#8C1A2E] font-serif italic flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#B8860B] inline shrink-0" />
              “Where Every Bite Tells a Royal Story.” 👑✨
            </p>
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Search Button */}
          {onFocusSearch && (
            <button
              onClick={onFocusSearch}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F7F2EA] border border-[#5A0E1D]/15 hover:border-[#5A0E1D]/40 hover:bg-[#EFE5D8] transition-all text-xs group"
              title="Search royal dishes"
            >
              <div className="w-7 h-7 rounded-lg bg-[#5A0E1D]/10 border border-[#5A0E1D]/20 flex items-center justify-center text-[#5A0E1D] group-hover:scale-105 transition-transform">
                <Search className="w-4 h-4" />
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-[10px] text-[#2A0810]/60 uppercase font-semibold">Palace Menu</p>
                <p className="font-bold text-[#2A0810] text-xs">Find Dish</p>
              </div>
            </button>
          )}

          {/* Tables Seating Section Button */}
          <button
            onClick={onOpenTableManagement}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F7F2EA] border border-[#5A0E1D]/15 hover:border-[#5A0E1D]/40 hover:bg-[#EFE5D8] transition-all text-xs group"
            title="Royal Tables Seating (Free, Reserved, Occupied)"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 group-hover:scale-105 transition-transform">
              <Users className="w-4 h-4" />
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-[10px] text-[#2A0810]/60 uppercase font-semibold">Palace Seating</p>
              <p className="font-bold text-emerald-800 text-xs">
                {freeTableCount} Free Tables
              </p>
            </div>
          </button>

          {/* Feedback & Reviews Button */}
          <button
            onClick={onOpenFeedback}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F7F2EA] border border-[#5A0E1D]/15 hover:border-[#5A0E1D]/40 hover:bg-[#EFE5D8] transition-all text-xs group"
            title="Royal Guest Ratings & Feedback"
          >
            <div className="w-7 h-7 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 group-hover:scale-105 transition-transform">
              <Star className="w-4 h-4 fill-amber-500 text-amber-600" />
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-[10px] text-[#2A0810]/60 uppercase font-semibold">Guest Honor</p>
              <p className="font-bold text-amber-800 text-xs">
                4.9 ★ Feedback
              </p>
            </div>
          </button>

          {/* Customer Login / Profile Pill */}
          <button
            onClick={onOpenCustomerDialog}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all text-xs group ${
              user.isLoggedIn
                ? 'bg-[#F8F3ED] border-[#6B1324]/20 hover:border-[#6B1324] hover:bg-[#EFE4D8]'
                : 'bg-[#6B1324] border-[#D4AF37] text-white hover:bg-[#7A1A2C]'
            }`}
            title="Spice Atelier Guest Sign In & Account Details"
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform ${
              user.isLoggedIn
                ? 'bg-[#6B1324]/10 border border-[#6B1324]/20 text-[#6B1324]'
                : 'bg-white/20 text-[#FFECA7]'
            }`}>
              <User className="w-4 h-4" />
            </div>
            <div className="hidden sm:block text-left">
              <p className={`text-[10px] uppercase font-semibold ${user.isLoggedIn ? 'text-[#2C0B12]/70' : 'text-[#FFECA7]'}`}>
                {user.isLoggedIn ? 'Atelier Guest' : 'Atelier Access'}
              </p>
              <p className={`font-bold max-w-[120px] truncate ${user.isLoggedIn ? 'text-[#2C0B12]' : 'text-white'}`}>
                {user.isLoggedIn ? (user.name || customer.name || 'Atelier Guest') : 'Sign In / Register'}
              </p>
            </div>
          </button>

          {/* Past Bills Button */}
          {orderHistory.length > 0 && (
            <button
              onClick={onOpenHistory}
              className="relative p-2.5 rounded-xl bg-[#F7F2EA] border border-[#5A0E1D]/15 hover:border-[#5A0E1D]/40 hover:bg-[#EFE5D8] text-[#2A0810] transition-all flex items-center justify-center"
              title="View Previous Royal Feast Bills"
            >
              <Clock className="w-5 h-5 text-[#5A0E1D]" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#5A0E1D] text-[#FFECA7] text-[10px] font-bold rounded-full flex items-center justify-center border border-[#D4AF37]">
                {orderHistory.length}
              </span>
            </button>
          )}

          {/* Interactive Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl btn-royal-gold flex items-center gap-2 shadow-md group transition-all"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-[#2A0810]" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#5A0E1D] text-[#FFECA7] text-[10px] font-bold rounded-full flex items-center justify-center border border-[#FFECA7]">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="text-left font-sans">
              <span className="text-[10px] uppercase font-extrabold text-[#2A0810] block leading-tight">
                Royal Feast Bill
              </span>
              <span className="text-sm font-extrabold text-[#2A0810]">
                ₹{cartTotal}
              </span>
            </div>
          </button>

        </div>

      </div>
    </header>
  );
};
