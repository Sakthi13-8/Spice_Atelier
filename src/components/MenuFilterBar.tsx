import React from 'react';
import { CategoryType, SubCategoryType } from '../types';
import { Utensils, Flame, Sparkles, SlidersHorizontal, ArrowUpDown, Crown } from 'lucide-react';

interface MenuFilterBarProps {
  activeCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  activeSubCategory: SubCategoryType;
  onSelectSubCategory: (sub: SubCategoryType) => void;
  sortBy: 'default' | 'price-asc' | 'price-desc' | 'popular';
  onSortChange: (sort: 'default' | 'price-asc' | 'price-desc' | 'popular') => void;
}

export const MenuFilterBar: React.FC<MenuFilterBarProps> = ({
  activeCategory,
  onSelectCategory,
  activeSubCategory,
  onSelectSubCategory,
  sortBy,
  onSortChange,
}) => {
  const subCategories: SubCategoryType[] = ['ALL', 'STARTERS', 'CURRIES', 'BREADS', 'MAIN COURSE', 'DESSERTS'];

  return (
    <div className="space-y-4 mb-8">
      
      {/* Category Tabs: ALL | VEG | NON-VEG */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#FFFDF9]/95 p-2.5 rounded-2xl border border-[#5A0E1D]/20 shadow-sm backdrop-blur-md">
        
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1">
          {/* ALL */}
          <button
            onClick={() => onSelectCategory('ALL')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap flex items-center gap-2 uppercase tracking-wider ${
              activeCategory === 'ALL'
                ? 'btn-royal-gold shadow-md font-extrabold'
                : 'text-[#2A0810]/80 hover:text-[#5A0E1D] hover:bg-[#F2E8DC]'
            }`}
          >
            <Crown className="w-4 h-4 text-[#2A0810]" />
            <span>Full Spice Atelier Menu</span>
          </button>

          {/* VEG */}
          <button
            onClick={() => onSelectCategory('VEG')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap flex items-center gap-2 uppercase tracking-wider ${
              activeCategory === 'VEG'
                ? 'bg-emerald-800 text-white border border-emerald-600 shadow-md'
                : 'text-emerald-800 hover:text-emerald-950 hover:bg-emerald-50'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-emerald-200" />
            <span>I. Pure Royal Veg</span>
          </button>

          {/* NON-VEG */}
          <button
            onClick={() => onSelectCategory('NON-VEG')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap flex items-center gap-2 uppercase tracking-wider ${
              activeCategory === 'NON-VEG'
                ? 'bg-[#5A0E1D] text-white border border-[#D4AF37]/60 shadow-md'
                : 'text-[#5A0E1D] hover:text-[#7C1427] hover:bg-rose-50'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 border border-rose-200" />
            <span>II. Royal Non-Veg</span>
          </button>
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F7F2EA] border border-[#5A0E1D]/20 text-xs text-[#2A0810] ml-auto shadow-xs">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#5A0E1D]" />
          <span className="hidden sm:inline text-[#2A0810]/70 font-medium">Sort Royal Feast:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="bg-transparent text-[#2A0810] font-bold focus:outline-none cursor-pointer"
          >
            <option value="default" className="bg-[#FFFDF9] text-[#2A0810]">Chef Recommended</option>
            <option value="popular" className="bg-[#FFFDF9] text-[#2A0810]">Most Popular</option>
            <option value="price-asc" className="bg-[#FFFDF9] text-[#2A0810]">Price: Low to High</option>
            <option value="price-desc" className="bg-[#FFFDF9] text-[#2A0810]">Price: High to Low</option>
          </select>
        </div>

      </div>

      {/* Sub-category Pills: Curries, Breads, Main Course, Desserts */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {subCategories.map((sub) => (
          <button
            key={sub}
            onClick={() => onSelectSubCategory(sub)}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider transition-all whitespace-nowrap uppercase border ${
              activeSubCategory === sub
                ? 'bg-[#5A0E1D] text-[#FFECA7] border-[#D4AF37] shadow-md'
                : 'bg-white/90 text-[#2A0810]/80 border-[#5A0E1D]/20 hover:border-[#5A0E1D]/50 hover:text-[#5A0E1D] hover:bg-[#F7F2EA]'
            }`}
          >
            {sub === 'ALL' ? 'All Imperial Courses' : sub}
          </button>
        ))}
      </div>

    </div>
  );
};
