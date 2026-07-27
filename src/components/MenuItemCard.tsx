import React from 'react';
import { MenuItem } from '../types';
import { Plus, Minus, Flame, Clock, Sparkles, Crown } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
  quantityInCart: number;
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (item: MenuItem, delta: number) => void;
  isHighlighted?: boolean;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  quantityInCart,
  onAddToCart,
  onUpdateQuantity,
  isHighlighted = false,
}) => {
  const isVeg = item.category === 'VEG';

  return (
    <div
      id={`dish-${item.id}`}
      className={`group relative rounded-2xl bg-white border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl ${
        isHighlighted
          ? 'ring-4 ring-[#5A0E1D] border-[#5A0E1D] shadow-2xl scale-[1.03] z-20'
          : 'border-[#5A0E1D]/15 hover:border-[#5A0E1D]/40'
      }`}
    >
      
      {/* Top Image & Badges Container */}
      <div className="relative h-44 w-full overflow-hidden bg-[#F7F2EA]">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800';
          }}
        />
        
        {/* Subtle Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Veg / Non-Veg Indicator Symbol */}
        <div className="absolute top-3 left-3 bg-white/95 p-1.5 rounded-lg border border-gray-200 backdrop-blur-md flex items-center justify-center shadow-md">
          <div
            className={`w-3.5 h-3.5 rounded-xs border-2 flex items-center justify-center ${
              isVeg ? 'border-emerald-600' : 'border-rose-600'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isVeg ? 'bg-emerald-600' : 'bg-rose-600'
              }`}
            />
          </div>
        </div>

        {/* Maharaja Special Badge */}
        {item.isPopular && (
          <div className="absolute top-3 right-3 bg-[#5A0E1D] text-[#FFECA7] border border-[#D4AF37]/80 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest backdrop-blur-md flex items-center gap-1 shadow-md">
            <Crown className="w-3 h-3 text-[#FFECA7]" />
            <span>Royal Favorite</span>
          </div>
        )}

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 right-3 bg-[#5A0E1D] text-[#FFECA7] font-extrabold text-sm px-3 py-1 rounded-xl border border-[#D4AF37]/60 shadow-md font-royal">
          ₹{item.price}/-
        </div>
      </div>

      {/* Card Body Details */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-white">
        <div>
          
          {/* Category & SubCategory */}
          <div className="flex items-center justify-between gap-2 text-[11px] font-semibold mb-1">
            <span className="uppercase tracking-widest text-[#8C1A2E] font-bold">
              {item.category} • {item.subCategory}
            </span>
            
            {/* Rating badge */}
            {item.rating && (
              <div className="flex items-center gap-1 text-[#B8860B] font-bold text-[11px]">
                <Sparkles className="w-3 h-3 fill-[#B8860B]" />
                <span>{item.rating}</span>
                <span className="text-[#2A0810]/50 font-normal">({item.ratingCount || 50})</span>
              </div>
            )}
          </div>

          {/* Dish Title */}
          <h3 className="text-base font-bold text-[#2A0810] group-hover:text-[#8C1A2E] transition-colors line-clamp-1 mb-1 font-royal tracking-wide">
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-[#4A3A32] line-clamp-2 leading-relaxed mb-3 font-serif font-light">
            {item.description}
          </p>
        </div>

        {/* Card Footer: Metadata & Add Button */}
        <div>
          
          {/* Prep Time & Calories */}
          <div className="flex items-center gap-3 text-[11px] text-[#2A0810]/70 font-medium mb-3">
            {item.preparationTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#8C1A2E]" />
                {item.preparationTime}
              </span>
            )}
            {item.calories && (
              <span>
                {item.calories} kcal
              </span>
            )}
          </div>

          {/* Action Button: Add to Order / Quantity Counter */}
          {quantityInCart === 0 ? (
            <button
              onClick={() => onAddToCart(item)}
              className="w-full py-2.5 px-4 rounded-xl btn-royal-gold flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-wider transition-all shadow-sm"
            >
              <Plus className="w-4 h-4 text-[#2A0810]" />
              <span>ADD TO FEAST</span>
            </button>
          ) : (
            <div className="w-full py-1.5 px-3 rounded-xl bg-[#F7F2EA] border border-[#5A0E1D]/30 flex items-center justify-between text-[#2A0810] shadow-inner">
              <button
                onClick={() => onUpdateQuantity(item, -1)}
                className="w-7 h-7 rounded-lg bg-white hover:bg-[#5A0E1D] border border-[#5A0E1D]/30 flex items-center justify-center text-[#5A0E1D] hover:text-white transition-colors active:scale-95 shadow-xs"
                title="Decrease Quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <div className="text-center">
                <span className="text-[10px] font-bold text-[#8C1A2E] uppercase block leading-none">In Royal Bill</span>
                <span className="text-sm font-extrabold text-[#2A0810]">{quantityInCart}</span>
              </div>
              <button
                onClick={() => onUpdateQuantity(item, 1)}
                className="w-7 h-7 rounded-lg btn-royal-gold flex items-center justify-center text-[#2A0810] transition-colors active:scale-95"
                title="Increase Quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
