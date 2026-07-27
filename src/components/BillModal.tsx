import React, { useRef, useEffect } from 'react';
import { OrderRecord } from '../types';
import { CheckCircle2, Printer, Copy, Check, Download, Sparkles, X, Share2, Utensils } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BillModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderRecord | null;
  onNewOrder: () => void;
}

export const BillModal: React.FC<BillModalProps> = ({
  isOpen,
  onClose,
  order,
  onNewOrder,
}) => {
  const [copied, setCopied] = React.useState(false);
  const [paymentDone, setPaymentDone] = React.useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#C85A32', '#E06A3B', '#F5E6C8', '#34D399', '#F59E0B'],
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, [isOpen]);

  if (!isOpen || !order) return null;

  // Format text receipt for clipboard or thermal printer preview
  const generateTextReceipt = () => {
    let receipt = `================================\n`;
    receipt += `       THE SPICE ATELIER\n`;
    receipt += ` “Where Every Bite Tells a Royal Story.”\n`;
    receipt += `================================\n`;
    receipt += `Customer Name : ${order.customer.name}\n`;
    receipt += `Phone Number  : ${order.customer.phone}\n`;
    receipt += `Order Type    : ${order.customer.orderType.replace('_', ' ')}\n`;
    if (order.customer.tableOrRoomNumber) {
      receipt += `Location      : ${order.customer.tableOrRoomNumber}\n`;
    }
    receipt += `Date & Time   : ${order.timestamp}\n`;
    receipt += `--------------------------------\n`;

    order.items.forEach(({ menuItem, quantity }) => {
      const itemTotal = menuItem.price * quantity;
      receipt += `${menuItem.name}   ${quantity} x ${menuItem.price} = ${itemTotal}\n`;
    });

    receipt += `--------------------------------\n`;
    receipt += `TOTAL AMOUNT  : ₹${order.totalAmount}\n`;
    receipt += `================================\n\n`;
    receipt += `Thank you, ${order.customer.name}!\n`;
    receipt += `Visit The Spice Atelier Again!\n`;

    return receipt;
  };

  const handleCopyReceipt = () => {
    navigator.clipboard.writeText(generateTextReceipt());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>The Spice Atelier Bill - #${order.orderNumber}</title>
            <style>
              body { font-family: 'Courier New', Courier, monospace; width: 300px; margin: 20px auto; color: #000; }
              .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; }
              .line { border-bottom: 1px dashed #000; margin: 10px 0; }
              .total { font-weight: bold; font-size: 16px; border-top: 2px solid #000; border-bottom: 2px solid #000; padding: 5px 0; }
              .footer { text-align: center; margin-top: 15px; font-style: italic; }
            </style>
          </head>
          <body>
            <pre style="white-space: pre-wrap; font-size: 13px;">${generateTextReceipt()}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#180729] border border-[#C85A32]/40 rounded-3xl text-slate-100 shadow-2xl overflow-hidden animate-in zoom-in-95 my-8">
        
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-[#280C42] via-[#3B115A] to-[#280C42] p-6 border-b border-[#C85A32]/30 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#F5E6C8]/70 hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 mx-auto rounded-full bg-[#C85A32]/20 border border-[#E06A3B]/40 text-[#E06A3B] flex items-center justify-center mb-2">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <h2 className="text-2xl font-serif font-bold italic champagne-gradient-text">
            The Spice Atelier Bill
          </h2>
          <p className="text-xs text-[#F5E6C8]/80 mt-1 font-mono">
            Order #{order.orderNumber} • {order.timestamp}
          </p>
        </div>

        {/* Authentic Thermal Receipt View */}
        <div className="p-6">
          <div
            ref={printRef}
            className="bg-[#120520] p-6 rounded-2xl border border-[#C85A32]/25 font-mono text-xs sm:text-sm shadow-inner text-[#F5E6C8] leading-relaxed"
          >
            <div className="text-center font-bold text-base tracking-widest champagne-gradient-text mb-1">
              ================================<br />
              THE SPICE ATELIER<br />
              ================================
            </div>
            <div className="text-center text-[10px] italic text-[#E06A3B] mb-2 font-sans">
              “Where Every Bite Tells a Royal Story.” 👑✨
            </div>

            <div className="py-2 space-y-1 text-[#F5E6C8]/90">
              <p><span className="text-[#E06A3B]">Customer Name :</span> <span className="font-bold text-white">{order.customer.name}</span></p>
              <p><span className="text-[#E06A3B]">Phone Number  :</span> {order.customer.phone}</p>
              <p><span className="text-[#E06A3B]">Dining Type   :</span> {order.customer.orderType.replace('_', ' ')}</p>
              {order.customer.tableOrRoomNumber && (
                <p><span className="text-[#E06A3B]">Table/Room    :</span> {order.customer.tableOrRoomNumber}</p>
              )}
            </div>

            <div className="text-[#C85A32]/60 my-2">--------------------------------</div>

            {/* Bill Line Items */}
            <div className="space-y-1 py-1">
              {order.items.map(({ menuItem, quantity }) => {
                const itemTotal = menuItem.price * quantity;
                return (
                  <div key={menuItem.id} className="flex justify-between items-baseline gap-2">
                    <span className="truncate flex-1 font-sans text-[#F5E6C8]">{menuItem.name}</span>
                    <span className="text-[#F5E6C8]/80 whitespace-nowrap">
                      {quantity} x {menuItem.price} = <span className="font-bold text-white">₹{itemTotal}</span>
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="text-[#C85A32]/60 my-2">--------------------------------</div>

            <div className="flex justify-between items-center text-sm font-bold pt-1 text-white">
              <span>TOTAL AMOUNT  :</span>
              <span className="text-lg text-[#E06A3B]">₹{order.totalAmount}</span>
            </div>

            <div className="text-center font-bold text-base tracking-widest champagne-gradient-text mt-3">
              ================================
            </div>

            <div className="text-center italic text-[#F5E6C8]/80 mt-4 text-xs font-serif">
              Thank you, <span className="font-bold text-white">{order.customer.name}</span>!<br />
              Visit The Spice Atelier Again!
            </div>
          </div>

          {/* Payment Method Action */}
          <div className="mt-6 p-4 rounded-2xl bg-[#280C42] border border-[#C85A32]/30">
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="text-[#F5E6C8] font-semibold">Payment Status</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                paymentDone ? 'bg-emerald-950 text-emerald-300 border border-emerald-400/40' : 'bg-[#C85A32]/30 text-[#E06A3B] border border-[#C85A32]/50'
              }`}>
                {paymentDone ? 'PAID IN FULL' : 'PAYMENT PENDING'}
              </span>
            </div>

            {!paymentDone ? (
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setPaymentDone(true)}
                  className="py-2 rounded-xl bg-[#1D0930] border border-[#C85A32]/40 hover:bg-[#C85A32] hover:text-white text-xs font-semibold text-[#F5E6C8] transition-all"
                >
                  Pay via UPI
                </button>
                <button
                  onClick={() => setPaymentDone(true)}
                  className="py-2 rounded-xl bg-[#1D0930] border border-[#C85A32]/40 hover:bg-[#C85A32] hover:text-white text-xs font-semibold text-[#F5E6C8] transition-all"
                >
                  Card / Tap
                </button>
                <button
                  onClick={() => setPaymentDone(true)}
                  className="py-2 rounded-xl bg-[#1D0930] border border-[#C85A32]/40 hover:bg-[#C85A32] hover:text-white text-xs font-semibold text-[#F5E6C8] transition-all"
                >
                  Pay Cash
                </button>
              </div>
            ) : (
              <p className="text-xs text-emerald-300 font-medium flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4" />
                Payment received. Studio Kitchen notified for immediate crafting!
              </p>
            )}
          </div>

          {/* Utility Buttons: Print & Copy */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button
              onClick={handleCopyReceipt}
              className="py-2.5 rounded-xl bg-[#280C42] border border-[#C85A32]/30 text-[#F5E6C8] hover:bg-[#38115C] text-xs font-semibold flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Text Copied!' : 'Copy Bill Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="py-2.5 rounded-xl bg-[#280C42] border border-[#C85A32]/30 text-[#F5E6C8] hover:bg-[#38115C] text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>
          </div>

          {/* New Order Button */}
          <button
            onClick={onNewOrder}
            className="w-full mt-4 py-3.5 rounded-2xl btn-burnt-sienna font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl"
          >
            <Utensils className="w-4 h-4 text-white" />
            <span>Order More Delicacies</span>
          </button>

        </div>

      </div>
    </div>
  );
};
