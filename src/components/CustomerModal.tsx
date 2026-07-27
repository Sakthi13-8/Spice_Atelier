import React from 'react';
import { CustomerDetails, OrderType } from '../types';
import { X, User, Phone, MapPin, CheckCircle, Sparkles } from 'lucide-react';

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: CustomerDetails;
  onSave: (details: CustomerDetails) => void;
}

export const CustomerModal: React.FC<CustomerModalProps> = ({
  isOpen,
  onClose,
  customer,
  onSave,
}) => {
  const [formData, setFormData] = React.useState<CustomerDetails>(customer);

  React.useEffect(() => {
    setFormData(customer);
  }, [customer, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-[#1C0A33] border border-purple-400/30 rounded-3xl text-slate-100 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-purple-300/60 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-purple-900/80 border border-purple-400/30 flex items-center justify-center text-purple-200">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-serif silver-gradient-text">
              Guest Profile & Table
            </h2>
            <p className="text-xs text-purple-300/70">SVP Hotel Hospitality Services</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Guest Name */}
          <div>
            <label className="block text-purple-300/80 font-medium mb-1">
              Guest Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Sathish Kumar"
              className="w-full bg-[#16082A] border border-purple-400/30 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-purple-300/40 focus:outline-none focus:border-purple-300"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-purple-300/80 font-medium mb-1">
              Phone Number <span className="text-rose-400">*</span>
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. 9876543210"
              className="w-full bg-[#16082A] border border-purple-400/30 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-purple-300/40 focus:outline-none focus:border-purple-300"
            />
          </div>

          {/* Order Type */}
          <div>
            <label className="block text-purple-300/80 font-medium mb-1">
              Dining Preference
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'DINE_IN', label: 'Dine In' },
                { id: 'ROOM_SERVICE', label: 'Room Service' },
                { id: 'TAKEAWAY', label: 'Takeaway' },
              ].map((type) => (
                <button
                  type="button"
                  key={type.id}
                  onClick={() => setFormData({ ...formData, orderType: type.id as OrderType })}
                  className={`py-2 px-3 rounded-xl font-semibold text-center border transition-all ${
                    formData.orderType === type.id
                      ? 'bg-purple-800 border-purple-300 text-white shadow-md'
                      : 'bg-[#16082A] border-purple-400/20 text-purple-300 hover:border-purple-300/40'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Table / Room Number */}
          <div>
            <label className="block text-purple-300/80 font-medium mb-1">
              {formData.orderType === 'ROOM_SERVICE' ? 'Room Number' : 'Table Number'}
            </label>
            <input
              type="text"
              value={formData.tableOrRoomNumber}
              onChange={(e) => setFormData({ ...formData, tableOrRoomNumber: e.target.value })}
              placeholder={formData.orderType === 'ROOM_SERVICE' ? 'e.g. Room 204' : 'e.g. Table 12'}
              className="w-full bg-[#16082A] border border-purple-400/30 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-purple-300/40 focus:outline-none focus:border-purple-300"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-purple-950 border border-purple-400/30 text-purple-200 hover:bg-purple-900 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl btn-silver-foil font-bold flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4 text-slate-900" />
              <span>Save Profile</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
