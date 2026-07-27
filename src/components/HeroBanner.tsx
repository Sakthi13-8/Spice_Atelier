import React, { useState, useRef, useEffect } from 'react';
import { Search, Sparkles, Award, Clock, ArrowRight, Utensils, Crown } from 'lucide-react';
import { MenuItem } from '../types';

import spiceAtelierBg from '../assets/images/spice_atelier_bg_1785065840492.jpg';

const bannerImg = spiceAtelierBg;

interface HeroBannerProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  vegCount: number;
  nonVegCount: number;
  activeCategory: string;
  onSelectCategory: (cat: 'ALL' | 'VEG' | 'NON-VEG') => void;
  menuItems: MenuItem[];
  onDishSelect: (item: MenuItem) => void;
  onSearchSubmit: (query: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  searchQuery,
  onSearchChange,
  vegCount,
  nonVegCount,
  activeCategory,
  onSelectCategory,
  menuItems,
  onDishSelect,
  onSearchSubmit,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter matching dishes for autocomplete dropdown
  const matchingDishes = searchQuery.trim()
    ? menuItems.filter((item) => {
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.subCategory.toLowerCase().includes(q)
        );
      }).slice(0, 6)
    : [];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item: MenuItem) => {
    setIsDropdownOpen(false);
    onDishSelect(item);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsDropdownOpen(false);
    if (matchingDishes.length > 0) {
      onDishSelect(matchingDishes[0]);
    } else {
      onSearchSubmit(searchQuery);
    }
  };

  return (
    <div className="relative overflow-visible rounded-3xl my-6 border-2 border-[#D4AF37]/60 shadow-xl bg-[#F8F3ED] bg-jali-pattern">
      
      {/* Background Banner Image - Highly Visible & Vibrant */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl">
        <img
          src={bannerImg}
          alt="The Spice Atelier Fine Dining Atmosphere"
          className="w-full h-full object-cover object-center opacity-90 sm:opacity-95 contrast-[1.08] saturate-[1.1] scale-100 transition-transform duration-700 hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3D0913]/85 via-[#5A0E1D]/55 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C0B12]/90 via-transparent to-black/20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-14 max-w-4xl">
        
        {/* Spice Atelier Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6B1324]/90 border border-[#D4AF37] text-[#FFECA7] text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-md shadow-md">
          <Crown className="w-4 h-4 text-[#FFECA7]" />
          <span>The Spice Atelier • Royal Fine Dining</span>
        </div>

        {/* Title & Quote */}
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-wider font-royal text-[#FFECA7] mb-3 leading-tight uppercase drop-shadow-md">
          THE SPICE ATELIER
        </h2>
        <p className="text-base sm:text-lg text-[#FFD08A] font-serif italic mb-4 font-medium flex items-center gap-2 drop-shadow-sm">
          <span>“Where Every Bite Tells a Royal Story.”</span> 👑✨
        </p>
        <p className="text-xs sm:text-sm text-[#FDFBF7] font-light max-w-2xl mb-8 leading-relaxed font-serif drop-shadow-sm">
          Savor an extraordinary palette of rich Shahi Mughlai curries, royal biryanis, saffron-infused tandoori breads, exquisite thalis, and opulent desserts crafted for connoisseurs.
        </p>

        {/* Search Bar & Quick Toggles */}
        <form onSubmit={handleSubmit} ref={containerRef} className="relative max-w-2xl">
          
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <button
                type="button"
                onClick={() => handleSubmit()}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-xl text-[#6B1324] hover:bg-[#6B1324]/10 transition-colors"
                title="Search royal dish"
              >
                <Search className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                placeholder="Search royal delicacies e.g. Shahi Paneer, Biryani, Naan, Gulab Jamun..."
                className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-[#FDFBF7]/95 border-2 border-[#D4AF37] text-[#2C0B12] placeholder-[#2C0B12]/50 focus:outline-none focus:border-[#6B1324] focus:ring-2 focus:ring-[#6B1324]/30 text-sm backdrop-blur-md transition-all shadow-md font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    onSearchChange('');
                    setIsDropdownOpen(false);
                  }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-white bg-[#6B1324] px-2.5 py-0.5 rounded-full border border-[#D4AF37]/50"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              type="submit"
              className="px-5 py-3.5 rounded-2xl btn-royal-gold text-[#2C0B12] font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shrink-0"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Find Dish</span>
            </button>
          </div>

          {/* Autocomplete Dropdown Menu */}
          {isDropdownOpen && matchingDishes.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#FFFDF9] border-2 border-[#6B1324]/30 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl divide-y divide-[#6B1324]/10">
              <div className="p-2.5 bg-[#F8F3ED] flex items-center justify-between text-[11px] text-[#6B1324] px-4 font-bold uppercase tracking-wider">
                <span>Matching Royal Preparations ({matchingDishes.length})</span>
                <span>Click to View Dish</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {matchingDishes.map((dish) => (
                  <button
                    key={dish.id}
                    type="button"
                    onClick={() => handleSelect(dish)}
                    className="w-full text-left p-3.5 hover:bg-[#F2E8DC] transition-colors flex items-center gap-3.5 group cursor-pointer"
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-12 h-12 rounded-xl object-cover border border-[#6B1324]/20 shrink-0 group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          dish.category === 'VEG' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}>
                          {dish.category}
                        </span>
                        <span className="text-[10px] text-[#6B1324] font-semibold uppercase">
                          {dish.subCategory}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[#2C0B12] group-hover:text-[#6B1324] transition-colors truncate font-royal">
                        {dish.name}
                      </h4>
                      <p className="text-xs text-[#2C0B12]/70 truncate font-light">
                        {dish.description}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-extrabold text-[#6B1324] block font-royal">
                        ₹{dish.price}/-
                      </span>
                      <span className="text-[10px] text-[#8C1D33] font-bold flex items-center gap-0.5 justify-end group-hover:translate-x-1 transition-transform">
                        Go to dish <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </form>

        {/* Diet Badges & Operating Info */}
        <div className="mt-8 flex flex-wrap items-center gap-4 text-xs">
          
          {/* Veg Toggle */}
          <button
            onClick={() => onSelectCategory(activeCategory === 'VEG' ? 'ALL' : 'VEG')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
              activeCategory === 'VEG'
                ? 'bg-emerald-800 border-emerald-600 text-white shadow-md'
                : 'bg-[#FDFBF7]/90 border-emerald-600/40 text-emerald-800 hover:bg-emerald-50'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-xs" />
            <span className="font-bold">Pure Royal Veg ({vegCount})</span>
          </button>

          {/* Non-Veg Toggle */}
          <button
            onClick={() => onSelectCategory(activeCategory === 'NON-VEG' ? 'ALL' : 'NON-VEG')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
              activeCategory === 'NON-VEG'
                ? 'bg-[#6B1324] border-[#D4AF37] text-white shadow-md'
                : 'bg-[#FDFBF7]/90 border-[#6B1324]/40 text-[#6B1324] hover:bg-rose-50'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block shadow-xs" />
            <span className="font-bold">Royal Non-Veg ({nonVegCount})</span>
          </button>

          {/* Hours */}
          <div className="flex items-center gap-2 text-[#2C0B12] font-serif italic ml-auto bg-[#FDFBF7]/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#6B1324]/30 shadow-md">
            <Clock className="w-3.5 h-3.5 text-[#6B1324]" />
            <span className="font-semibold text-xs">Spice Atelier Hours: 11:00 AM – 11:00 PM</span>
          </div>

        </div>

      </div>
    </div>
  );
};

