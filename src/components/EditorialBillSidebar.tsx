import React from 'react';
import { CartItem, CustomerDetails } from '../types';
import { ShoppingBag, Trash2, Edit2, ChevronRight, FileText, Sparkles, Plus, Minus } from 'lucide-react';

interface EditorialBillSidebarProps {
  cart: CartItem[];
  customer: CustomerDetails;
  onOpenGuestProfile: () => void;
  onUpdateQuantity: (item: any, delta: number) => void;
  onClearCart: () => void;
  onFinalizeBill: () => void;
  checkNumber: string;
}

export const EditorialBillSidebar: React.FC<EditorialBillSidebarProps> = ({
  cart,
  customer,
  onOpenGuestProfile,
  onUpdateQuantity,
  onClearCart,
  onFinalizeBill,
  checkNumber,
}) => {
  const totalAmount = cart.reduce((sum, ci) => sum + ci.menuItem.price * ci.quantity, 0);

  return (
    <aside className="w-full lg:w-80 xl:w-96 bg-[#280C42] border-t lg:border-t-0 lg:border-l border-[#C85A32]/30 p-6 lg:p-10 flex flex-col justify-between h-full overflow-y-auto shrink-0 shadow-2xl text-[#F5E6C8]">
      <div>
        {/* Header Summary */}
        <div className="flex justify-between items-start mb-6 border-b border-[#C85A32]/25 pb-4">
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#E06A3B] mb-1 font-sans font-bold">
              Order Summary
            </h3>
            <p className="text-2xl font-serif italic champagne-gradient-text font-bold">
              Check #{checkNumber}
            </p>
          </div>
          <div className="bg-[#C85A32]/30 px-3 py-1 rounded-full border border-[#E06A3B]/40">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#F5E6C8]">
              Active
            </span>
          </div>
        </div>

        {/* Customer & Order Type Strip */}
        <div className="bg-[#180729]/80 p-3.5 rounded-xl border border-[#C85A32]/30 mb-6 text-xs flex justify-between items-center">
          <div>
            <p className="font-semibold text-white">{customer.name || 'Guest'}</p>
            <p className="text-[10px] text-[#F5E6C8]/70 uppercase tracking-wider">
              {customer.orderType.replace('_', ' ')} • {customer.tableOrRoomNumber ? `Table/Room ${customer.tableOrRoomNumber}` : 'Table 1'}
            </p>
          </div>
          <button
            onClick={onOpenGuestProfile}
            className="text-[10px] uppercase tracking-wider text-[#E06A3B] hover:underline flex items-center gap-1 font-bold"
          >
            <Edit2 className="w-3 h-3" /> Edit
          </button>
        </div>

        {/* Selected Items List */}
        {cart.length === 0 ? (
          <div className="py-12 text-center text-[#F5E6C8]/40 space-y-2">
            <ShoppingBag className="w-8 h-8 mx-auto opacity-30 text-[#E06A3B]" />
            <p className="text-sm font-serif italic text-[#F5E6C8]/70">Your order check is empty.</p>
            <p className="text-[10px] uppercase tracking-wider text-[#F5E6C8]/50">
              Select items from the menu to begin
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[340px] overflow-y-auto pr-1">
            {cart.map((ci) => (
              <div
                key={ci.menuItem.id}
                className="flex flex-col border-b border-[#C85A32]/20 pb-3 group"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(ci.menuItem, -1)}
                      className="w-5 h-5 rounded bg-[#180729] text-[#F5E6C8] text-xs font-bold hover:bg-[#C85A32] hover:text-white transition-colors"
                      title="Decrease"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-white font-sans w-5 text-center">
                      {ci.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(ci.menuItem, 1)}
                      className="w-5 h-5 rounded bg-[#180729] text-[#F5E6C8] text-xs font-bold hover:bg-[#C85A32] hover:text-white transition-colors"
                      title="Increase"
                    >
                      +
                    </button>
                    <span className="text-sm text-[#F5E6C8] font-medium ml-1">
                      {ci.menuItem.name}
                    </span>
                  </div>
                  <span className="font-serif italic text-base text-[#FAF2E1] font-bold">
                    ₹{ci.menuItem.price * ci.quantity}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-[#F5E6C8]/60 uppercase tracking-wider mt-1 pl-12">
                  <span>Category: {ci.menuItem.subCategory}</span>
                  <span>₹{ci.menuItem.price} each</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Totals and Checkout */}
      <div className="pt-6 border-t border-[#C85A32]/30 mt-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#F5E6C8]">
            Total Amount
          </span>
          <span className="text-3xl lg:text-4xl font-serif italic champagne-gradient-text font-bold">
            ₹{totalAmount}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onClearCart}
            disabled={cart.length === 0}
            className="py-3 border border-[#C85A32]/50 text-[#F5E6C8] text-[10px] uppercase tracking-[0.15em] font-semibold hover:bg-[#C85A32]/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-xl"
          >
            Clear Bill
          </button>
          <button
            onClick={onFinalizeBill}
            disabled={cart.length === 0}
            className="py-3 btn-burnt-sienna text-[10px] uppercase font-bold tracking-[0.15em] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg rounded-xl"
          >
            Finalize Bill
          </button>
        </div>

        <p className="mt-6 text-center text-[10px] text-[#F5E6C8]/50 uppercase tracking-[0.2em] font-serif italic">
          “Flavors & spices artistically crafted”
        </p>
      </div>
    </aside>
  );
};
