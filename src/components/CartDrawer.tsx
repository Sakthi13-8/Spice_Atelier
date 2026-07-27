import React, { useState } from 'react';
import { CartItem, CustomerDetails } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, Receipt, Sparkles, Send, Phone, User, Home, UtensilsCrossed } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  customer: CustomerDetails;
  onUpdateCustomer: (details: Partial<CustomerDetails>) => void;
  onUpdateQuantity: (item: any, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onPlaceOrder: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  customer,
  onUpdateCustomer,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onPlaceOrder,
}) => {
  const [showPhoneError, setShowPhoneError] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const taxAmount = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = subtotal + taxAmount;

  const handleCheckout = () => {
    if (!customer.phone || customer.phone.trim().length < 10) {
      setShowPhoneError(true);
      return;
    }
    setShowPhoneError(false);
    onPlaceOrder();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end transition-opacity animate-in fade-in">
      
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Editorial Drawer Panel */}
      <div className="relative w-full max-w-lg bg-[#FFFDF9] border-l border-[#5A0E1D]/20 text-[#2A0810] h-full flex flex-col justify-between shadow-2xl z-10">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#5A0E1D]/20 flex items-center justify-between bg-[#F7F2EA]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#5A0E1D] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFECA7]">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-royal font-bold text-[#5A0E1D]">
                Your Order Summary
              </h2>
              <p className="text-xs text-[#8C1A2E] font-serif italic">The Spice Atelier Royal Fine Dining</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#2A0810]/60 hover:text-[#5A0E1D] hover:bg-[#EFE5D8] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          
          {/* Customer Quick Detail Bar */}
          <div className="bg-[#F7F2EA] p-4 rounded-2xl border border-[#5A0E1D]/20 space-y-3">
            <div className="flex items-center justify-between text-xs text-[#5A0E1D]">
              <span className="font-semibold uppercase tracking-wider text-[10px] text-[#8C1A2E]">
                Customer Information
              </span>
              <span className="text-[10px] bg-[#5A0E1D] text-[#FFECA7] px-2 py-0.5 rounded-full border border-[#D4AF37]/50 font-medium">
                {customer.orderType.replace('_', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <label className="text-[10px] text-[#2A0810]/70 uppercase block">Name</label>
                <input
                  type="text"
                  value={customer.name}
                  onChange={(e) => onUpdateCustomer({ name: e.target.value })}
                  placeholder="Guest Name"
                  className="w-full bg-white border border-[#5A0E1D]/20 rounded-lg px-2.5 py-1.5 text-xs text-[#2A0810] focus:outline-none focus:border-[#5A0E1D]"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#2A0810]/70 uppercase block">
                  Phone <span className="text-rose-600">*</span>
                </label>
                <input
                  type="tel"
                  value={customer.phone}
                  onChange={(e) => {
                    onUpdateCustomer({ phone: e.target.value });
                    if (showPhoneError && e.target.value.length >= 10) setShowPhoneError(false);
                  }}
                  placeholder="10-digit Phone #"
                  className={`w-full bg-white border rounded-lg px-2.5 py-1.5 text-xs text-[#2A0810] focus:outline-none ${
                    showPhoneError ? 'border-rose-500 bg-rose-50' : 'border-[#5A0E1D]/20 focus:border-[#5A0E1D]'
                  }`}
                />
              </div>
            </div>

            {showPhoneError && (
              <p className="text-[11px] text-rose-600 font-medium animate-shake">
                Please enter a valid 10-digit phone number to generate the official bill.
              </p>
            )}

            {/* Table / Room number */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[10px] text-[#2A0810]/70 uppercase block">Order Type</label>
                <select
                  value={customer.orderType}
                  onChange={(e) => onUpdateCustomer({ orderType: e.target.value as any })}
                  className="w-full bg-white border border-[#5A0E1D]/20 rounded-lg px-2 py-1.5 text-xs text-[#2A0810] focus:outline-none"
                >
                  <option value="DINE_IN">Dine In (Table)</option>
                  <option value="ROOM_SERVICE">Room Service</option>
                  <option value="TAKEAWAY">Takeaway</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-[#2A0810]/70 uppercase block">
                  {customer.orderType === 'ROOM_SERVICE' ? 'Room Number' : 'Table Number'}
                </label>
                <input
                  type="text"
                  value={customer.tableOrRoomNumber}
                  onChange={(e) => onUpdateCustomer({ tableOrRoomNumber: e.target.value })}
                  placeholder={customer.orderType === 'ROOM_SERVICE' ? 'e.g. Room 304' : 'e.g. Table 08'}
                  className="w-full bg-white border border-[#5A0E1D]/20 rounded-lg px-2.5 py-1.5 text-xs text-[#2A0810] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Cart Items List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs uppercase font-bold tracking-widest text-[#5A0E1D]">
                Selected Delicacies ({cart.length})
              </h3>
              {cart.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 transition-colors font-medium"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="py-12 text-center rounded-2xl bg-[#F7F2EA] border border-[#5A0E1D]/15 p-6">
                <UtensilsCrossed className="w-12 h-12 text-[#5A0E1D]/40 mx-auto mb-3" />
                <p className="text-sm text-[#2A0810] font-medium">Your cart is currently empty.</p>
                <p className="text-xs text-[#2A0810]/60 mt-1">Select items from the Spice Atelier menu to build your bill.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map(({ menuItem, quantity }) => (
                  <div
                    key={menuItem.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#5A0E1D]/15 gap-3 shadow-xs"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <img
                        src={menuItem.image}
                        alt={menuItem.name}
                        className="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-[#5A0E1D]/20"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              menuItem.category === 'VEG' ? 'bg-emerald-600' : 'bg-rose-600'
                            }`}
                          />
                          <h4 className="text-sm font-semibold text-[#2A0810] truncate font-royal">
                            {menuItem.name}
                          </h4>
                        </div>
                        <p className="text-xs text-[#2A0810]/70">
                          ₹{menuItem.price} x {quantity} = <span className="font-bold text-[#5A0E1D]">₹{menuItem.price * quantity}</span>
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 bg-[#F7F2EA] px-2 py-1 rounded-lg border border-[#5A0E1D]/20">
                      <button
                        onClick={() => onUpdateQuantity(menuItem, -1)}
                        className="w-6 h-6 rounded bg-white hover:bg-[#5A0E1D] flex items-center justify-center text-[#5A0E1D] hover:text-white border border-[#5A0E1D]/20 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(menuItem, 1)}
                        className="w-6 h-6 rounded btn-royal-gold flex items-center justify-center text-[#2A0810]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Special Instructions */}
          {cart.length > 0 && (
            <div>
              <label className="text-[10px] text-[#2A0810]/70 uppercase block mb-1">
                Special Kitchen Instructions (Optional)
              </label>
              <textarea
                value={customer.specialInstructions || ''}
                onChange={(e) => onUpdateCustomer({ specialInstructions: e.target.value })}
                placeholder="e.g. Less spicy, extra butter naan, serve desserts after main course..."
                rows={2}
                className="w-full bg-white border border-[#5A0E1D]/20 rounded-xl p-2.5 text-xs text-[#2A0810] placeholder-[#2A0810]/40 focus:outline-none focus:border-[#5A0E1D]"
              />
            </div>
          )}

        </div>

        {/* Footer Checkout Calculation */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#5A0E1D]/20 bg-[#F7F2EA] space-y-4">
            <div className="space-y-1.5 text-xs text-[#2A0810] font-mono">
              <div className="flex justify-between">
                <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-[#2A0810]/70">
                <span>Taxes & Service GST (5%)</span>
                <span>₹{taxAmount}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#2A0810] font-sans pt-2 border-t border-[#5A0E1D]/20">
                <span>TOTAL BILL AMOUNT</span>
                <span className="text-xl text-[#5A0E1D] font-royal font-bold">₹{grandTotal}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 px-6 rounded-2xl btn-royal-burgundy text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01] transition-transform"
            >
              <Send className="w-4 h-4 text-[#FFECA7]" />
              <span>GENERATE OFFICIAL BILL</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
