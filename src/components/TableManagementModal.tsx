import React, { useState } from 'react';
import { TableInfo, TableStatus, CustomerDetails } from '../types';
import { X, Users, CheckCircle, Clock, Lock, Sparkles, PlusCircle, Check } from 'lucide-react';

interface TableManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  tables: TableInfo[];
  customer: CustomerDetails;
  onSelectTableForOrder: (tableNumber: string) => void;
  onUpdateTableStatus: (tableId: string, status: TableStatus, guestName?: string, time?: string) => void;
}

export const TableManagementModal: React.FC<TableManagementModalProps> = ({
  isOpen,
  onClose,
  tables,
  customer,
  onSelectTableForOrder,
  onUpdateTableStatus,
}) => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | TableStatus>('ALL');
  const [selectedTableForReserve, setSelectedTableForReserve] = useState<TableInfo | null>(null);
  const [resName, setResName] = useState(customer.name || '');
  const [resPhone, setResPhone] = useState(customer.phone || '');
  const [resTime, setResTime] = useState('8:00 PM');

  if (!isOpen) return null;

  // Counts
  const freeCount = tables.filter((t) => t.status === 'FREE').length;
  const reservedCount = tables.filter((t) => t.status === 'RESERVED').length;
  const occupiedCount = tables.filter((t) => t.status === 'OCCUPIED').length;

  const filteredTables = tables.filter((t) => {
    if (activeFilter === 'ALL') return true;
    return t.status === activeFilter;
  });

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTableForReserve) return;

    onUpdateTableStatus(selectedTableForReserve.id, 'RESERVED', resName, resTime);
    setSelectedTableForReserve(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-[#FFFDF9] border-2 border-[#6B1324]/20 rounded-3xl text-[#2C0B12] shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#6B1324]/20 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#6B1324] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFECA7] shadow-md">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-royal font-bold text-[#6B1324] tracking-wide">
                Table Reservations & Dining Seating
              </h2>
              <p className="text-xs text-[#2C0B12]/70 font-serif italic">
                Live Dining Room Overview ({tables.length} Total Tables) 👑
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#2C0B12]/60 hover:text-[#6B1324] hover:bg-[#F8F3ED] rounded-xl transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Status Section Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`p-3 rounded-2xl border text-left transition-all ${
              activeFilter === 'ALL'
                ? 'bg-[#6B1324] border-[#D4AF37] text-white shadow-md'
                : 'bg-[#F8F3ED] border-[#6B1324]/20 text-[#2C0B12]/80 hover:border-[#6B1324]'
            }`}
          >
            <p className="text-[10px] uppercase tracking-wider font-semibold opacity-80">
              All Sections
            </p>
            <p className="text-lg font-bold font-royal">{tables.length} Tables</p>
          </button>

          <button
            onClick={() => setActiveFilter('FREE')}
            className={`p-3 rounded-2xl border text-left transition-all ${
              activeFilter === 'FREE'
                ? 'bg-emerald-800 border-emerald-600 text-white shadow-md'
                : 'bg-[#F8F3ED] border-emerald-600/30 text-emerald-800 hover:border-emerald-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider font-semibold">Free / Available</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <p className="text-lg font-bold font-royal">{freeCount} Available</p>
          </button>

          <button
            onClick={() => setActiveFilter('RESERVED')}
            className={`p-3 rounded-2xl border text-left transition-all ${
              activeFilter === 'RESERVED'
                ? 'bg-amber-800 border-amber-600 text-white shadow-md'
                : 'bg-[#F8F3ED] border-amber-600/30 text-amber-900 hover:border-amber-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider font-semibold">Reserved</span>
              <Clock className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <p className="text-lg font-bold font-royal">{reservedCount} Reserved</p>
          </button>

          <button
            onClick={() => setActiveFilter('OCCUPIED')}
            className={`p-3 rounded-2xl border text-left transition-all ${
              activeFilter === 'OCCUPIED'
                ? 'bg-[#6B1324] border-[#6B1324] text-white shadow-md'
                : 'bg-[#F8F3ED] border-rose-600/30 text-rose-900 hover:border-rose-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider font-semibold">Occupied</span>
              <Lock className="w-3.5 h-3.5 text-rose-600" />
            </div>
            <p className="text-lg font-bold font-royal">{occupiedCount} Occupied</p>
          </button>
        </div>

        {/* Table Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[50vh] overflow-y-auto pr-1">
          {filteredTables.map((table) => {
            const isFree = table.status === 'FREE';
            const isReserved = table.status === 'RESERVED';
            const isOccupied = table.status === 'OCCUPIED';
            const isCurrentCustomerTable = customer.tableOrRoomNumber === table.number;

            return (
              <div
                key={table.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between relative overflow-hidden shadow-xs ${
                  isCurrentCustomerTable
                    ? 'ring-2 ring-[#6B1324] border-[#6B1324] bg-rose-50/80'
                    : isFree
                    ? 'bg-[#F8F3ED] border-emerald-600/30 hover:border-emerald-500'
                    : isReserved
                    ? 'bg-[#F8F3ED] border-amber-600/30'
                    : 'bg-[#F8F3ED] border-rose-600/30'
                }`}
              >
                {/* Table Top Info */}
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-royal font-bold text-lg text-[#2C0B12]">
                      {table.number}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isFree
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : isReserved
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}
                    >
                      {table.status}
                    </span>
                  </div>

                  <p className="text-xs text-[#2C0B12]/70 mb-1">
                    Section: <span className="text-[#2C0B12] font-semibold">{table.section.replace('_', ' ')}</span>
                  </p>
                  <p className="text-xs text-[#2C0B12]/70 mb-3">
                    Capacity: <span className="text-[#6B1324] font-bold">{table.capacity} Guests</span>
                  </p>

                  {/* Reserved details */}
                  {isReserved && (
                    <div className="p-2 rounded-xl bg-amber-100/70 border border-amber-300 text-[11px] text-amber-900 mb-3 font-medium">
                      Reserved for <span className="font-bold text-[#2C0B12]">{table.reservedBy || 'Guest'}</span> ({table.reservationTime || '7:30 PM'})
                    </div>
                  )}

                  {/* Occupied details */}
                  {isOccupied && (
                    <div className="p-2 rounded-xl bg-rose-100/70 border border-rose-300 text-[11px] text-rose-900 mb-3 font-medium">
                      Guest: <span className="font-bold text-[#2C0B12]">{table.currentGuestName || 'In Service'}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-2 border-t border-[#6B1324]/15 flex flex-col gap-2">
                  {isFree && (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          onSelectTableForOrder(table.number);
                          onClose();
                        }}
                        className="py-1.5 px-2 btn-royal-gold text-[#2C0B12] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5" /> Select Table
                      </button>
                      <button
                        onClick={() => setSelectedTableForReserve(table)}
                        className="py-1.5 px-2 bg-white hover:bg-[#6B1324] hover:text-white border border-[#6B1324]/30 text-[#6B1324] rounded-xl text-xs font-semibold transition-all shadow-xs"
                      >
                        Reserve
                      </button>
                    </div>
                  )}

                  {isReserved && (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onUpdateTableStatus(table.id, 'OCCUPIED', table.reservedBy)}
                        className="py-1.5 px-2 btn-royal-burgundy text-white rounded-xl text-xs font-semibold"
                      >
                        Occupy Table
                      </button>
                      <button
                        onClick={() => onUpdateTableStatus(table.id, 'FREE')}
                        className="py-1.5 px-2 bg-white hover:bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-semibold"
                      >
                        Cancel Res.
                      </button>
                    </div>
                  )}

                  {isOccupied && (
                    <button
                      onClick={() => onUpdateTableStatus(table.id, 'FREE')}
                      className="w-full py-1.5 bg-rose-100 hover:bg-rose-200 border border-rose-300 text-rose-800 rounded-xl text-xs font-semibold"
                    >
                      Clear & Release Table
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Modal Sub-Form for Reserving Table */}
        {selectedTableForReserve && (
          <div className="mt-6 p-4 rounded-2xl bg-[#F8F3ED] border border-[#6B1324]/20 animate-in fade-in">
            <h4 className="text-sm font-bold font-royal text-[#6B1324] mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              Reserve {selectedTableForReserve.number} ({selectedTableForReserve.capacity} Seats)
            </h4>
            <form onSubmit={handleReserveSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-[#2C0B12]/80 font-medium mb-1">Guest Name</label>
                <input
                  type="text"
                  required
                  value={resName}
                  onChange={(e) => setResName(e.target.value)}
                  placeholder="e.g. Sathish Kumar"
                  className="w-full bg-white border border-[#6B1324]/20 rounded-xl px-3 py-2 text-[#2C0B12] focus:outline-none focus:border-[#6B1324]"
                />
              </div>

              <div>
                <label className="block text-[#2C0B12]/80 font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={resPhone}
                  onChange={(e) => setResPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full bg-white border border-[#6B1324]/20 rounded-xl px-3 py-2 text-[#2C0B12] focus:outline-none focus:border-[#6B1324]"
                />
              </div>

              <div>
                <label className="block text-[#2C0B12]/80 font-medium mb-1">Reservation Time</label>
                <input
                  type="text"
                  required
                  value={resTime}
                  onChange={(e) => setResTime(e.target.value)}
                  placeholder="e.g. 8:30 PM"
                  className="w-full bg-white border border-[#6B1324]/20 rounded-xl px-3 py-2 text-[#2C0B12] focus:outline-none focus:border-[#6B1324]"
                />
              </div>

              <div className="sm:col-span-3 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedTableForReserve(null)}
                  className="px-4 py-2 bg-white text-[#2C0B12] rounded-xl border border-[#6B1324]/20 font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 btn-royal-burgundy text-white rounded-xl font-bold"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
