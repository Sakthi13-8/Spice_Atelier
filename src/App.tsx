import React, { useState, useMemo } from 'react';
import { INITIAL_MENU_ITEMS, INITIAL_TABLES, INITIAL_REVIEWS } from './data/menuData';
import { CategoryType, SubCategoryType, CartItem, CustomerDetails, MenuItem, OrderRecord, TableInfo, TableStatus, UserProfile, FeedbackReview } from './types';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { MenuFilterBar } from './components/MenuFilterBar';
import { MenuItemCard } from './components/MenuItemCard';
import { CartDrawer } from './components/CartDrawer';
import { CustomerAuthModal } from './components/CustomerAuthModal';
import { TableManagementModal } from './components/TableManagementModal';
import { FeedbackModal } from './components/FeedbackModal';
import { BillModal } from './components/BillModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { Utensils, Sparkles, ChefHat, Heart, Phone, MapPin, Award, CheckCircle2 } from 'lucide-react';
import spiceAtelierBg from './assets/images/spice_atelier_bg_1785065840492.jpg';
import spiceAtelierBeigeBg from './assets/images/spice_atelier_beige_bg_1785167299583.jpg';
import spiceAtelierScrollBg from './assets/images/spice_atelier_scroll_bg_1785168019062.jpg';

export default function App() {
  // Core Menu & Cart State
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Customer & User Auth State (Starts NOT logged in per prompt)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: '',
    name: '',
    phone: '',
    email: '',
    isLoggedIn: false,
    loyaltyPoints: 0,
  });

  const [customer, setCustomer] = useState<CustomerDetails>({
    name: '',
    phone: '',
    orderType: 'DINE_IN',
    tableOrRoomNumber: 'Table 1',
    specialInstructions: '',
  });

  // Tables State (Free, Reserved, Occupied)
  const [tables, setTables] = useState<TableInfo[]>(INITIAL_TABLES);

  // Reviews State
  const [reviews, setReviews] = useState<FeedbackReview[]>(INITIAL_REVIEWS);

  // Filter States
  const [activeCategory, setActiveCategory] = useState<CategoryType>('ALL');
  const [activeSubCategory, setActiveSubCategory] = useState<SubCategoryType>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'popular'>('default');
  const [highlightedDishId, setHighlightedDishId] = useState<string | null>(null);

  // Search & Dish Redirection Handlers
  const handleDishSelect = (item: MenuItem) => {
    if (activeCategory !== 'ALL' && item.category !== activeCategory) {
      setActiveCategory('ALL');
    }
    if (activeSubCategory !== 'ALL' && item.subCategory !== activeSubCategory) {
      setActiveSubCategory('ALL');
    }
    setSearchQuery(item.name);
    setHighlightedDishId(item.id);

    setTimeout(() => {
      const el = document.getElementById(`dish-${item.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 120);

    setTimeout(() => {
      setHighlightedDishId(null);
    }, 3500);
  };

  const handleSearchSubmit = (query: string) => {
    if (!query.trim()) return;
    const match = menuItems.find(
      (item) => item.name.toLowerCase().includes(query.toLowerCase())
    );
    if (match) {
      handleDishSelect(match);
    } else {
      const el = document.getElementById('menu-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleFocusSearch = () => {
    const searchInput = document.querySelector<HTMLInputElement>('form input[type="text"]');
    if (searchInput) {
      searchInput.focus();
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Modal / Drawer Control States - Start with Auth Modal open so customer logs in at start
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(true);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  // Orders History State
  const [orderHistory, setOrderHistory] = useState<OrderRecord[]>([]);
  const [currentOrder, setCurrentOrder] = useState<OrderRecord | null>(null);

  // Derived counts
  const vegCount = useMemo(() => menuItems.filter(i => i.category === 'VEG').length, [menuItems]);
  const nonVegCount = useMemo(() => menuItems.filter(i => i.category === 'NON-VEG').length, [menuItems]);
  const freeTableCount = useMemo(() => tables.filter(t => t.status === 'FREE').length, [tables]);

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);
  const cartSubtotal = useMemo(() => cart.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cartSubtotal + Math.round(cartSubtotal * 0.05), [cartSubtotal]);

  // Table Handlers
  const handleUpdateTableStatus = (tableId: string, status: TableStatus, guestName?: string, time?: string) => {
    setTables((prev) =>
      prev.map((t) => {
        if (t.id === tableId) {
          return {
            ...t,
            status,
            reservedBy: status === 'RESERVED' ? guestName : undefined,
            reservationTime: status === 'RESERVED' ? time : undefined,
            currentGuestName: status === 'OCCUPIED' ? guestName : undefined,
          };
        }
        return t;
      })
    );
  };

  const handleSelectTableForOrder = (tableNumber: string) => {
    setCustomer((prev) => ({ ...prev, tableOrRoomNumber: tableNumber, orderType: 'DINE_IN' }));
  };

  // Auth Handlers
  const handleLogin = (name: string, phone: string, email?: string) => {
    setUserProfile({
      id: `usr_${Date.now()}`,
      name,
      phone,
      email,
      isLoggedIn: true,
      loyaltyPoints: 100,
    });
    setCustomer((prev) => ({ ...prev, name, phone }));
  };

  const handleLogout = () => {
    setUserProfile({
      id: '',
      name: '',
      phone: '',
      email: '',
      isLoggedIn: false,
      loyaltyPoints: 0,
    });
    setCustomer({
      name: '',
      phone: '',
      orderType: 'DINE_IN',
      tableOrRoomNumber: 'Table 1',
      specialInstructions: '',
    });
    setIsAuthModalOpen(true);
  };

  // Review Handler
  const handleAddReview = (newReview: FeedbackReview) => {
    setReviews((prev) => [newReview, ...prev]);

    // If review is for a specific dish, update dish rating count
    if (newReview.dishName) {
      setMenuItems((prev) =>
        prev.map((item) => {
          if (item.name.toLowerCase() === newReview.dishName?.toLowerCase()) {
            const currentCount = item.ratingCount || 50;
            const currentRating = item.rating || 4.8;
            const newCount = currentCount + 1;
            const newRating = Number(((currentRating * currentCount + newReview.rating) / newCount).toFixed(1));
            return { ...item, rating: newRating, ratingCount: newCount };
          }
          return item;
        })
      );
    }
  };

  // Filter & Sort Logic
  const filteredMenuItems = useMemo(() => {
    return menuItems
      .filter((item) => {
        if (activeCategory !== 'ALL' && item.category !== activeCategory) {
          return false;
        }
        if (activeSubCategory !== 'ALL' && item.subCategory !== activeSubCategory) {
          return false;
        }
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchName = item.name.toLowerCase().includes(q);
          const matchDesc = item.description.toLowerCase().includes(q);
          const matchCat = item.category.toLowerCase().includes(q);
          const matchSub = item.subCategory.toLowerCase().includes(q);
          return matchName || matchDesc || matchCat || matchSub;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'popular') return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
        return 0;
      });
  }, [menuItems, activeCategory, activeSubCategory, searchQuery, sortBy]);

  // Cart Operations
  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex((i) => i.menuItem.id === item.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      }
      return [...prev, { menuItem: item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (item: MenuItem, delta: number) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex((i) => i.menuItem.id === item.id);
      if (existingIdx === -1) return prev;

      const updated = [...prev];
      const newQty = updated[existingIdx].quantity + delta;
      if (newQty <= 0) {
        return updated.filter((i) => i.menuItem.id !== item.id);
      }
      updated[existingIdx].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.menuItem.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleUpdateCustomer = (details: Partial<CustomerDetails>) => {
    setCustomer((prev) => ({ ...prev, ...details }));
  };

  // Generate Official Bill Order
  const handlePlaceOrder = () => {
    if (cart.length === 0) return;

    const newOrderNumber = `${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedTimestamp = now.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const newOrderRecord: OrderRecord = {
      id: `ord_${Date.now()}`,
      orderNumber: newOrderNumber,
      timestamp: formattedTimestamp,
      customer: { ...customer },
      items: [...cart],
      totalAmount: cartTotal,
      status: 'PLACED',
      paymentStatus: 'UNPAID',
    };

    setCurrentOrder(newOrderRecord);
    setOrderHistory((prev) => [newOrderRecord, ...prev]);
    setIsCartOpen(false);
    setIsBillModalOpen(true);
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-[#FAF4EA] text-[#2C0B12] flex flex-col relative selection:bg-[#6B1324] selection:text-[#FFFDF9] overflow-x-hidden">
      
      {/* Global Spice Atelier Background Image - Visible Top to Bottom as User Scrolls */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Main Spice Atelier Scroll Background Image */}
        <img
          src={spiceAtelierScrollBg}
          alt="The Spice Atelier Continuous Artwork"
          className="w-full h-full object-cover object-center opacity-45 sm:opacity-55 contrast-[1.12] saturate-[1.05]"
          referrerPolicy="no-referrer"
        />

        {/* Secondary Delicate Beige Pattern Overlay */}
        <img
          src={spiceAtelierBeigeBg}
          alt="The Spice Atelier Filigree Texture"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30 mix-blend-multiply"
          referrerPolicy="no-referrer"
        />

        {/* Soft Ambient Gold Lighting Highlights */}
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-[#FFE0B2]/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-[600px] h-[600px] bg-[#F4D09C]/25 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/4 w-[700px] h-[700px] bg-[#E8C599]/20 rounded-full blur-3xl" />

        {/* Crystal Clear Readability Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF4EA]/45 via-[#FAF4EA]/25 to-[#FAF4EA]/50" />
        <div className="absolute inset-0 bg-jali-pattern opacity-20" />

        {/* Top & Bottom Gold Filigree Accents */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
      {/* Top Navigation Bar */}
      <Header
        customer={customer}
        user={userProfile}
        onOpenCustomerDialog={() => setIsAuthModalOpen(true)}
        onOpenTableManagement={() => setIsTableModalOpen(true)}
        onOpenFeedback={() => setIsFeedbackModalOpen(true)}
        freeTableCount={freeTableCount}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        orderHistory={orderHistory}
        onOpenHistory={() => setIsHistoryModalOpen(true)}
        onFocusSearch={handleFocusSearch}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Banner */}
        <HeroBanner
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          vegCount={vegCount}
          nonVegCount={nonVegCount}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          menuItems={menuItems}
          onDishSelect={handleDishSelect}
          onSearchSubmit={handleSearchSubmit}
        />

        {/* Menu Section Container with Subtle Background Image */}
        <section className="relative my-8 rounded-3xl p-4 sm:p-7 border border-[#5A0E1D]/20 shadow-sm bg-[#FAF5EE] overflow-hidden">
          {/* Subtle Background Spice Image */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-3xl">
            <img
              src={spiceAtelierBg}
              alt="Spice Atelier Atmosphere"
              className="w-full h-full object-cover object-center opacity-20 sm:opacity-25 contrast-[1.15] scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#FAF5EE]/90 via-[#FAF5EE]/80 to-[#FAF5EE]/95" />
            <div className="absolute inset-0 bg-jali-pattern opacity-20" />
          </div>

          <div className="relative z-10 space-y-6">
            {/* Menu Filtering & Sorting Controls */}
            <MenuFilterBar
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              activeSubCategory={activeSubCategory}
              onSelectSubCategory={setActiveSubCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            {/* Section Heading */}
            <div id="menu-section" className="flex items-center justify-between mb-6 scroll-mt-24 border-b border-[#5A0E1D]/20 pb-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-royal text-[#5A0E1D] tracking-wider uppercase">
                  {activeCategory === 'ALL'
                    ? 'The Spice Atelier Menu 👑'
                    : activeCategory === 'VEG'
                    ? 'I. Royal Vegetarian Delicacies'
                    : 'II. Royal Non-Vegetarian Feast'}
                </h2>
                <p className="text-xs text-[#5A0E1D]/80 mt-1 font-serif italic">
                  Featuring {filteredMenuItems.length} imperial preparations
                  {activeSubCategory !== 'ALL' && ` in ${activeSubCategory}`}
                </p>
              </div>

              {searchQuery && (
                <span className="text-xs text-[#5A0E1D] bg-[#F4ECE1] px-3.5 py-1.5 rounded-full border border-[#5A0E1D]/25 flex items-center gap-2 shadow-sm">
                  <span>Results for "{searchQuery}"</span>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-[#5A0E1D] font-bold hover:text-[#961B31]"
                    title="Clear Search"
                  >
                    ✕
                  </button>
                </span>
              )}
            </div>

            {/* Menu Grid */}
            {filteredMenuItems.length === 0 ? (
              <div className="py-20 text-center bg-white/95 border border-[#5A0E1D]/20 rounded-3xl p-8 max-w-md mx-auto my-8 shadow-xl">
                <ChefHat className="w-12 h-12 text-[#5A0E1D] mx-auto mb-3" />
                <h3 className="text-xl font-royal font-bold text-[#5A0E1D]">
                  {menuItems.length === 0 ? 'Royal Menu Empty' : 'No Royal Dishes Match Your Search'}
                </h3>
                <p className="text-xs text-[#2A0810]/70 mt-2 mb-5 leading-relaxed font-serif">
                  {menuItems.length === 0
                    ? 'The Spice Atelier kitchen currently has no items.'
                    : 'Try adjusting your search filters to explore other imperial preparations.'}
                </p>
                {menuItems.length > 0 && (
                  <button
                    onClick={() => {
                      setActiveCategory('ALL');
                      setActiveSubCategory('ALL');
                      setSearchQuery('');
                    }}
                    className="px-5 py-2.5 rounded-xl btn-royal-gold text-xs uppercase font-extrabold"
                  >
                    Reset All Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMenuItems.map((item) => {
                  const cartItem = cart.find((i) => i.menuItem.id === item.id);
                  return (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      quantityInCart={cartItem ? cartItem.quantity : 0}
                      onAddToCart={handleAddToCart}
                      onUpdateQuantity={handleUpdateQuantity}
                      isHighlighted={item.id === highlightedDishId}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </section>

      </main>

      {/* Floating Bottom Cart Bar for Mobile */}
      {cartCount > 0 && !isCartOpen && (
        <div className="fixed bottom-4 left-4 right-4 z-30 sm:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3.5 px-5 rounded-2xl btn-royal-burgundy text-white flex items-center justify-between shadow-2xl border border-[#D4AF37]/50"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-[#D4AF37] text-[#2A0810] text-xs font-extrabold flex items-center justify-center">
                {cartCount}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                View Royal Feast Bill
              </span>
            </div>
            <span className="text-sm font-extrabold text-[#FFECA7]">
              ₹{cartTotal} →
            </span>
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-20 bg-[#3D0913] border-t border-[#D4AF37]/40 py-12 text-xs text-[#FAF3E0] bg-jali-pattern relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#5A0E1D] border border-[#D4AF37]/60 flex items-center justify-center text-[#FFECA7] shadow-lg">
              <Utensils className="w-6 h-6" />
            </div>
            <div>
              <p className="font-royal font-bold text-[#FFECA7] text-base tracking-widest uppercase">THE SPICE ATELIER</p>
              <p className="text-[11px] text-[#E5C158] italic font-serif">Where Every Bite Tells a Royal Story. 👑✨</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] text-[#FAF3E0]/90">
            <span>Royal Reservations: +91 98765 43210</span>
            <span className="text-[#D4AF37]">•</span>
            <span>Atelier Private Dining</span>
            <span className="text-[#D4AF37]">•</span>
            <span>Palace Suite & Table Service</span>
          </div>

          <p className="text-[11px] text-[#FAF3E0]/60 font-serif">
            © {new Date().getFullYear()} The Spice Atelier. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        customer={customer}
        onUpdateCustomer={handleUpdateCustomer}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onPlaceOrder={handlePlaceOrder}
      />

      <CustomerAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        user={userProfile}
        customer={customer}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onUpdateCustomerDetails={handleUpdateCustomer}
      />

      <TableManagementModal
        isOpen={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
        tables={tables}
        customer={customer}
        onSelectTableForOrder={handleSelectTableForOrder}
        onUpdateTableStatus={handleUpdateTableStatus}
      />

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        reviews={reviews}
        menuItems={menuItems}
        customer={customer}
        onSubmitReview={handleAddReview}
      />

      <BillModal
        isOpen={isBillModalOpen}
        onClose={() => setIsBillModalOpen(false)}
        order={currentOrder}
        onNewOrder={() => {
          setIsBillModalOpen(false);
          setCart([]);
        }}
      />

      <OrderHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        orders={orderHistory}
        onSelectOrder={(ord) => {
          setCurrentOrder(ord);
          setIsBillModalOpen(true);
        }}
      />

      </div>
    </div>
  );
}
