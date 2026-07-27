import React, { useState } from 'react';
import { CategoryType, MenuItem, SubCategoryType } from '../types';
import { Search, Flame, Plus, Minus, Info, Sparkles, X } from 'lucide-react';

interface EditorialMenuListProps {
  items: MenuItem[];
  cartItemQuantities: Record<string, number>;
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (item: MenuItem, delta: number) => void;
  activeCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const EditorialMenuList: React.FC<EditorialMenuListProps> = ({
  items,
  cartItemQuantities,
  onAddToCart,
  onUpdateQuantity,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  const [selectedDishDetail, setSelectedDishDetail] = useState<MenuItem | null>(null);
  const [selectedSubCat, setSelectedSubCat] = useState<SubCategoryType>('ALL');

  // Subcategory list
  const subCategories: { id: SubCategoryType; label: string }[] = [
    { id: 'ALL', label: 'All Courses' },
    { id: 'CURRIES', label: 'Curries' },
    { id: 'BREADS', label: 'Breads' },
    { id: 'MAIN COURSE', label: 'Main Course' },
    { id: 'DESSERTS', label: 'Desserts' },
  ];

  // Filter items based on activeCategory, selectedSubCat, and searchQuery
  const filteredItems = items.filter((item) => {
    if (activeCategory !== 'ALL' && item.category !== activeCategory) return false;
    if (selectedSubCat !== 'ALL' && item.subCategory !== selectedSubCat) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.subCategory.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Group filtered items by subcategory for editorial menu sections
  const courses: SubCategoryType[] = ['CURRIES', 'MAIN COURSE', 'BREADS', 'DESSERTS'];

  return (
    <div className="flex-1 p-6 md:p-12 flex flex-col gap-8 overflow-y-auto max-h-full">
      
      {/* Category Tabs Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#cbd5e1]/15 pb-4">
        <div className="flex gap-6 sm:gap-10 overflow-x-auto no-scrollbar">
          <button
            onClick={() => onSelectCategory('ALL')}
            className={`text-sm uppercase tracking-[0.2em] pb-2 font-bold transition-all relative ${
              activeCategory === 'ALL'
                ? 'border-b-2 border-[#e9d5ff] text-[#e9d5ff]'
                : 'text-[#e9d5ff]/40 hover:text-[#e9d5ff]'
            }`}
          >
            All Menu
          </button>
          <button
            onClick={() => onSelectCategory('VEG')}
            className={`text-sm uppercase tracking-[0.2em] pb-2 transition-all flex items-center gap-2 ${
              activeCategory === 'VEG'
                ? 'border-b-2 border-[#e9d5ff] text-[#e9d5ff] font-bold'
                : 'text-[#e9d5ff]/40 hover:text-[#e9d5ff]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            Vegetarian
          </button>
          <button
            onClick={() => onSelectCategory('NON-VEG')}
            className={`text-sm uppercase tracking-[0.2em] pb-2 transition-all flex items-center gap-2 ${
              activeCategory === 'NON-VEG'
                ? 'border-b-2 border-[#e9d5ff] text-[#e9d5ff] font-bold'
                : 'text-[#e9d5ff]/40 hover:text-[#e9d5ff]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
            Non-Vegetarian
          </button>
        </div>

        {/* Search input bar */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#e9d5ff]/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search dish name..."
            className="w-full pl-9 pr-8 py-1.5 text-xs bg-[#2e1065]/40 border border-[#cbd5e1]/20 rounded-lg text-[#e9d5ff] placeholder-[#e9d5ff]/40 focus:outline-none focus:border-[#e9d5ff]/60"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#e9d5ff]/50 hover:text-[#e9d5ff]"
            >
              &times;
            </button>
          )}
        </div>
      </div>

      {/* Subcategory Course Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {subCategories.map((sub) => (
          <button
            key={sub.id}
            onClick={() => setSelectedSubCat(sub.id)}
            className={`px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-semibold transition-all whitespace-nowrap border ${
              selectedSubCat === sub.id
                ? 'bg-[#e9d5ff] text-[#1a0b2e] border-[#e9d5ff]'
                : 'bg-[#2e1065]/30 text-[#e9d5ff]/70 border-[#cbd5e1]/15 hover:border-[#cbd5e1]/40 hover:text-[#e9d5ff]'
            }`}
          >
            {sub.label}
          </button>
        ))}
      </div>

      {/* Menu Grid - Sections with Dotted Leaders */}
      {filteredItems.length === 0 ? (
        <div className="py-16 text-center text-[#e9d5ff]/60 font-serif italic text-xl">
          No delicacies found matching "{searchQuery}".
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 pb-12">
          {courses.map((course) => {
            const courseItems = filteredItems.filter((i) => i.subCategory === course);
            if (courseItems.length === 0) return null;

            return (
              <section key={course} className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#cbd5e1]/20 pb-2">
                  <h2 className="font-serif text-2xl italic text-[#cbd5e1]">
                    {course === 'CURRIES' && 'Curries'}
                    {course === 'MAIN COURSE' && 'Main Course'}
                    {course === 'BREADS' && 'Breads'}
                    {course === 'DESSERTS' && 'Desserts'}
                  </h2>
                  <span className="text-[10px] uppercase tracking-[0.2em] opacity-40 font-sans">
                    {courseItems.length} Selection{courseItems.length > 1 ? 's' : ''}
                  </span>
                </div>

                <ul className="space-y-4">
                  {courseItems.map((item) => {
                    const qty = cartItemQuantities[item.id] || 0;
                    const isVeg = item.category === 'VEG';

                    return (
                      <li
                        key={item.id}
                        className={`group relative p-2.5 rounded-lg transition-all duration-200 border ${
                          qty > 0
                            ? 'bg-[#e9d5ff]/10 border-l-4 border-l-[#e9d5ff] border-[#cbd5e1]/30'
                            : 'border-transparent hover:bg-[#ffffff]/5 hover:border-[#cbd5e1]/10'
                        }`}
                      >
                        <div className="flex justify-between items-baseline gap-2">
                          
                          {/* Dish Name + Veg/Non-Veg Icon */}
                          <div
                            onClick={() => setSelectedDishDetail(item)}
                            className="flex items-center gap-2 cursor-pointer flex-1 min-w-0"
                          >
                            <span
                              className={`w-2 h-2 rounded-xs border shrink-0 ${
                                isVeg ? 'border-emerald-400 bg-emerald-400/20' : 'border-rose-400 bg-rose-400/20'
                              }`}
                            />
                            <span
                              className={`text-base font-medium truncate group-hover:translate-x-1 transition-transform ${
                                qty > 0 ? 'text-white font-semibold' : 'text-[#e9d5ff]'
                              }`}
                            >
                              {item.name}
                            </span>
                            {item.isPopular && (
                              <Sparkles className="w-3 h-3 text-[#e9d5ff]/80 shrink-0 inline" />
                            )}
                          </div>

                          {/* Dotted Leader Line */}
                          <span className="flex-1 border-b border-dotted border-[#cbd5e1]/30 mx-2 hidden sm:block"></span>

                          {/* Price & Quantity Controls */}
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="font-serif italic text-lg text-[#cbd5e1]">
                              ₹{item.price}
                            </span>

                            {/* Quantity buttons */}
                            {qty === 0 ? (
                              <button
                                onClick={() => onAddToCart(item)}
                                className="px-2.5 py-1 text-[11px] uppercase tracking-wider font-semibold border border-[#e9d5ff]/30 text-[#e9d5ff] hover:bg-[#e9d5ff] hover:text-[#1a0b2e] rounded transition-all active:scale-95"
                              >
                                + Add
                              </button>
                            ) : (
                              <div className="flex items-center gap-1.5 bg-[#2e1065] px-2 py-0.5 rounded border border-[#e9d5ff]/40">
                                <button
                                  onClick={() => onUpdateQuantity(item, -1)}
                                  className="text-[#e9d5ff] hover:text-white px-1 text-sm font-bold"
                                >
                                  -
                                </button>
                                <span className="text-xs font-bold text-white px-1 font-sans">
                                  {qty}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item, 1)}
                                  className="text-[#e9d5ff] hover:text-white px-1 text-sm font-bold"
                                >
                                  +
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Description Preview on hover or click */}
                        <p className="text-[11px] text-[#e9d5ff]/60 mt-1 line-clamp-1 font-light pl-4">
                          {item.description}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      )}

      {/* Dish Detail Modal / Preview */}
      {selectedDishDetail && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1a0b2e] border border-[#cbd5e1]/30 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="relative h-48 bg-purple-950">
              <img
                src={selectedDishDetail.image}
                alt={selectedDishDetail.name}
                className="w-full h-full object-cover object-center"
              />
              <button
                onClick={() => setSelectedDishDetail(null)}
                className="absolute top-3 right-3 bg-[#1a0b2e]/80 text-[#e9d5ff] p-1.5 rounded-full hover:bg-[#1a0b2e]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#e9d5ff]/60">
                    {selectedDishDetail.category} &bull; {selectedDishDetail.subCategory}
                  </span>
                  <h3 className="text-2xl font-serif italic font-bold text-[#cbd5e1]">
                    {selectedDishDetail.name}
                  </h3>
                </div>
                <span className="text-xl font-serif italic text-white font-bold">
                  ₹{selectedDishDetail.price}
                </span>
              </div>

              <p className="text-sm text-[#e9d5ff]/80 leading-relaxed font-light">
                {selectedDishDetail.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-[#e9d5ff]/60 border-t border-[#cbd5e1]/10 pt-3">
                <span>Prep: {selectedDishDetail.preparationTime || '15 mins'}</span>
                <span>Cal: {selectedDishDetail.calories || 300} kcal</span>
                <span>
                  Spice:{' '}
                  {Array.from({ length: selectedDishDetail.spiceLevel || 0 }).map((_, i) => (
                    <Flame key={i} className="w-3 h-3 text-amber-400 inline" />
                  ))}
                  {(selectedDishDetail.spiceLevel || 0) === 0 && 'Mild'}
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    onAddToCart(selectedDishDetail);
                    setSelectedDishDetail(null);
                  }}
                  className="w-full py-3 bg-[#e9d5ff] text-[#1a0b2e] text-xs uppercase font-bold tracking-[0.2em] rounded-lg hover:bg-white transition-colors"
                >
                  Add to Bill Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
