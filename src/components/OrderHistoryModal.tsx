import React from 'react';
import { OrderRecord } from '../types';
import { X, Clock, Receipt, ChevronRight, Utensils, CheckCircle2 } from 'lucide-react';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderRecord[];
  onSelectOrder: (order: OrderRecord) => void;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  isOpen,
  onClose,
  orders,
  onSelectOrder,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#180729] border border-[#C85A32]/40 rounded-3xl text-white shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 my-8">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#F5E6C8]/60 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#280C42] border border-[#C85A32]/40 flex items-center justify-center text-[#F5E6C8]">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold italic champagne-gradient-text">
              Previous Atelier Bills ({orders.length})
            </h2>
            <p className="text-xs text-[#F5E6C8]/70">Session Order History</p>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {orders.map((ord) => (
            <div
              key={ord.id}
              onClick={() => {
                onSelectOrder(ord);
                onClose();
              }}
              className="group p-4 rounded-2xl bg-[#120520] border border-[#C85A32]/25 hover:border-[#E06A3B]/60 cursor-pointer transition-all hover:bg-[#280C42]/60"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-[#E06A3B]" />
                  <span className="font-mono text-xs font-bold text-white">
                    Order #{ord.orderNumber}
                  </span>
                </div>
                <span className="text-[10px] text-[#F5E6C8]/60">
                  {ord.timestamp}
                </span>
              </div>

              <div className="text-xs text-[#F5E6C8]/80 space-y-1 mb-3">
                <p>Guest: <span className="font-bold text-white">{ord.customer.name}</span> ({ord.customer.phone})</p>
                <p className="line-clamp-1 text-[#F5E6C8]/70">
                  Items: {ord.items.map(i => `${i.quantity}x ${i.menuItem.name}`).join(', ')}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#C85A32]/20 text-xs">
                <span className="font-bold text-emerald-300">
                  Total: ₹{ord.totalAmount}
                </span>
                <span className="text-[#E06A3B] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform text-[11px]">
                  <span>View Bill Receipt</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-[#C85A32]/30 text-center">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#280C42] border border-[#C85A32]/40 text-[#F5E6C8] hover:bg-[#38115C] font-semibold text-xs"
          >
            Close History
          </button>
        </div>

      </div>
    </div>
  );
};
