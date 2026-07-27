import React from 'react';
import { CustomerDetails, OrderRecord } from '../types';
import { User, Receipt, Sparkles, Utensils, History } from 'lucide-react';

interface EditorialHeaderProps {
  user?: { isLoggedIn: boolean; name: string };
  customer: CustomerDetails;
  onOpenGuestProfile: () => void;
  orderHistory: OrderRecord[];
  onOpenHistory: () => void;
  cartCount: number;
  cartTotal: number;
  onToggleMobileSummary: () => void;
}

export const EditorialHeader: React.FC<EditorialHeaderProps> = ({
  user,
  customer,
  onOpenGuestProfile,
  orderHistory,
  onOpenHistory,
  cartCount,
  cartTotal,
  onToggleMobileSummary,
}) => {
  const isLoggedIn = user?.isLoggedIn;

  return (
    <header className="px-6 md:px-12 py-6 border-b border-[#C85A32]/25 bg-[#180729] flex flex-col md:flex-row md:items-end justify-between gap-4 sticky top-0 z-30 backdrop-blur-md">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl md:text-5xl font-serif italic tracking-tight champagne-gradient-text">
            The Spice Atelier
          </h1>
          <span className="text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-[#C85A32]/80 text-white border border-[#E06A3B]/50 font-sans font-semibold">
            Culinary Studio
          </span>
        </div>
        <p className="text-[11px] md:text-xs tracking-[0.1em] text-[#F5E6C8]/90 mt-1 font-serif italic">
          “Where Every Bite Tells a Royal Story.” 👑✨
        </p>
      </div>

      <div className="flex items-center gap-4 sm:gap-6 justify-between md:justify-end">
        {/* Guest Profile Display */}
        <button
          onClick={onOpenGuestProfile}
          className={`text-left group cursor-pointer transition-all flex items-center gap-3 px-3.5 py-2 rounded-xl border ${
            isLoggedIn
              ? 'bg-[#280C42]/60 border-[#C85A32]/30 hover:border-[#E06A3B]/60'
              : 'bg-[#C85A32] border-[#E06A3B] text-white hover:bg-[#D8683B]'
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-[#C85A32]/30 flex items-center justify-center text-[#F5E6C8]">
            <User className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#F5E6C8]/80 font-sans">
              {isLoggedIn ? 'Current Guest' : 'Guest Access'}
            </p>
            <p className="text-sm md:text-base font-serif italic text-white font-semibold">
              {isLoggedIn ? (customer.name || user?.name || 'Guest User') : 'Sign In / Register'}
            </p>
          </div>
        </button>

        {/* History button if orders exist */}
        {orderHistory.length > 0 && (
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#280C42]/50 border border-[#C85A32]/30 text-[#F5E6C8] hover:bg-[#280C42]/80 text-xs uppercase tracking-wider transition-all"
            title="View Past Bills"
          >
            <History className="w-4 h-4 text-[#E06A3B]" />
            <span className="hidden sm:inline">Bills ({orderHistory.length})</span>
          </button>
        )}

        {/* Mobile Cart / Summary Toggle Button */}
        <button
          onClick={onToggleMobileSummary}
          className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl btn-champagne-gold font-bold text-xs uppercase tracking-wider shadow-lg"
        >
          <Receipt className="w-4 h-4" />
          <span>Bill ({cartCount}) • ₹{cartTotal}</span>
        </button>
      </div>
    </header>
  );
};
