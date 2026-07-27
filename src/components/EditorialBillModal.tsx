import React, { useState, useEffect } from 'react';
import { CartItem, CustomerDetails, OrderRecord } from '../types';
import { Printer, Copy, Check, X, Sparkles, Download, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EditorialBillModalProps {
  orderRecord: OrderRecord;
  onClose: () => void;
  onNewOrder: () => void;
}

export const EditorialBillModal: React.FC<EditorialBillModalProps> = ({
  orderRecord,
  onClose,
  onNewOrder,
}) => {
  const [copied, setCopied] = useState(false);
  const [showAsciiView, setShowAsciiView] = useState(false);

  const { customer, items, totalAmount, orderNumber, timestamp } = orderRecord;

  // Trigger sprinkles confetti when bill modal mounts
  useEffect(() => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#C85A32', '#E06A3B', '#F5E6C8', '#34D399', '#F59E0B', '#E11D48'],
      });

      const timeout = setTimeout(() => {
        confetti({
          particleCount: 70,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#C85A32', '#E06A3B', '#F5E6C8', '#34D399'],
        });
        confetti({
          particleCount: 70,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#C85A32', '#E06A3B', '#F5E6C8', '#F59E0B'],
        });
      }, 400);

      return () => clearTimeout(timeout);
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Generate ASCII text representation exactly like the Java application output!
  const asciiBill = `================================
       THE SPICE ATELIER
 “Where Every Bite Tells a Royal Story.”
================================
Customer Name : ${customer.name || 'Valued Guest'}
Phone Number  : ${customer.phone || 'N/A'}
Order Type    : ${customer.orderType.replace('_', ' ')} (${customer.tableOrRoomNumber ? `No. ${customer.tableOrRoomNumber}` : 'Table 1'})
Date & Time   : ${timestamp}
--------------------------------
${items
  .map(
    (ci) =>
      `${ci.menuItem.name.padEnd(20, ' ')} ${ci.quantity} x ${ci.menuItem.price} = ${
        ci.quantity * ci.menuItem.price
      }`
  )
  .join('\n')}
--------------------------------
TOTAL AMOUNT  : ₹${totalAmount}/-
================================

Thank you, ${customer.name || 'Guest'}!
Visit The Spice Atelier Again!`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(asciiBill);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#180729] border border-[#C85A32]/40 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 my-8">
        
        {/* Modal Header Bar */}
        <div className="bg-[#280C42] px-6 py-4 border-b border-[#C85A32]/30 flex justify-between items-center no-print">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E06A3B]" />
            <h3 className="font-serif italic text-xl font-bold champagne-gradient-text">
              The Spice Atelier Bill / Tax Receipt
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#F5E6C8]/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Toggle Bar */}
        <div className="px-6 py-3 bg-[#120520] border-b border-[#C85A32]/20 flex items-center justify-between no-print text-xs">
          <button
            onClick={() => setShowAsciiView(!showAsciiView)}
            className="text-[#F5E6C8] underline font-mono text-[11px] hover:text-white"
          >
            {showAsciiView ? 'Switch to Editorial Card View' : 'Switch to Terminal ASCII View'}
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="px-2.5 py-1 bg-[#280C42] text-[#F5E6C8] rounded-lg border border-[#C85A32]/30 hover:bg-[#38115C] flex items-center gap-1 font-semibold"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-2.5 py-1 btn-champagne-gold rounded-lg font-bold flex items-center gap-1"
            >
              <Printer className="w-3 h-3" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Bill Body Container */}
        <div className="p-6 sm:p-8 space-y-6">
          {showAsciiView ? (
            /* Terminal ASCII Format */
            <div className="bg-[#0e031a] p-4 rounded-xl border border-[#C85A32]/30 font-mono text-xs text-[#F5E6C8] whitespace-pre-wrap leading-relaxed select-all">
              {asciiBill}
            </div>
          ) : (
            /* Editorial Aesthetic Receipt Card */
            <div className="bg-[#280C42]/60 border border-[#C85A32]/30 p-6 rounded-xl font-sans space-y-6">
              
              {/* Hotel Header */}
              <div className="text-center border-b border-dashed border-[#C85A32]/40 pb-4">
                <h2 className="font-serif italic text-3xl font-bold champagne-gradient-text tracking-tight">
                  THE SPICE ATELIER
                </h2>
                <p className="text-[11px] italic text-[#E06A3B] mt-0.5 font-serif">
                  “Where Every Bite Tells a Royal Story.” 👑✨
                </p>
                <p className="text-[10px] opacity-60 font-mono mt-1 text-[#F5E6C8]">Receipt No: #{orderNumber}</p>
              </div>

              {/* Guest Meta */}
              <div className="grid grid-cols-2 gap-4 text-xs border-b border-dashed border-[#C85A32]/40 pb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#F5E6C8]/60 font-semibold">
                    Customer Name
                  </p>
                  <p className="font-serif italic text-sm font-bold text-white">
                    {customer.name || 'Valued Guest'}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#F5E6C8]/60 font-semibold">
                    Phone Number
                  </p>
                  <p className="font-mono text-white">{customer.phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#F5E6C8]/60 font-semibold">
                    Service Type
                  </p>
                  <p className="text-white font-medium">
                    {customer.orderType.replace('_', ' ')}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#F5E6C8]/60 font-semibold">
                    Table / Room
                  </p>
                  <p className="text-white font-medium">
                    {customer.tableOrRoomNumber ? `#${customer.tableOrRoomNumber}` : 'Table 1'}
                  </p>
                </div>
              </div>

              {/* Itemized Bill Table */}
              <div>
                <div className="flex justify-between text-[11px] uppercase tracking-wider text-[#F5E6C8]/70 border-b border-[#C85A32]/30 pb-1 font-semibold">
                  <span>Item & Qty</span>
                  <span>Amount</span>
                </div>

                <div className="divide-y divide-[#C85A32]/15 my-2 text-xs">
                  {items.map((ci) => (
                    <div key={ci.menuItem.id} className="py-2.5 flex justify-between items-baseline">
                      <div>
                        <p className="font-medium text-white">{ci.menuItem.name}</p>
                        <p className="text-[10px] text-[#F5E6C8]/60 font-mono">
                          {ci.quantity} x ₹{ci.menuItem.price}
                        </p>
                      </div>
                      <span className="font-serif italic text-sm font-bold text-[#FAF2E1]">
                        ₹{ci.quantity * ci.menuItem.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Summary */}
              <div className="border-t-2 border-[#C85A32]/40 pt-4 flex justify-between items-center">
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#F5E6C8]">
                  TOTAL AMOUNT
                </span>
                <span className="text-3xl font-serif italic font-bold champagne-gradient-text">
                  ₹{totalAmount}/-
                </span>
              </div>

              {/* Footer Blessing */}
              <div className="text-center pt-2 text-xs text-[#F5E6C8]/80 border-t border-dashed border-[#C85A32]/30">
                <p className="font-serif italic text-sm text-white">
                  Thank you, {customer.name || 'Guest'}!
                </p>
                <p className="text-[10px] uppercase tracking-[0.15em] font-semibold text-[#E06A3B] mt-0.5">
                  Visit The Spice Atelier Again!
                </p>
              </div>

            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="bg-[#280C42] px-6 py-4 border-t border-[#C85A32]/30 flex flex-col sm:flex-row gap-3 justify-between items-center no-print">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs uppercase tracking-wider text-[#F5E6C8] hover:bg-[#180729] transition-colors"
          >
            Close Window
          </button>
          <button
            onClick={onNewOrder}
            className="w-full sm:w-auto px-6 py-2.5 btn-burnt-sienna font-bold text-xs uppercase tracking-[0.15em] rounded-xl transition-all shadow-lg"
          >
            Start New Order
          </button>
        </div>

      </div>
    </div>
  );
};
