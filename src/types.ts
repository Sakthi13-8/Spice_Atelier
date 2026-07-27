export type CategoryType = 'ALL' | 'VEG' | 'NON-VEG';
export type SubCategoryType = 'ALL' | 'STARTERS' | 'CURRIES' | 'BREADS' | 'MAIN COURSE' | 'DESSERTS';
export type OrderType = 'DINE_IN' | 'ROOM_SERVICE' | 'TAKEAWAY';

export type TableStatus = 'FREE' | 'RESERVED' | 'OCCUPIED';

export interface TableInfo {
  id: string;
  number: string;
  capacity: number;
  status: TableStatus;
  section: 'MAIN_HALL' | 'FAMILY_SUITE' | 'ROOFTOP' | 'VIP_LOUNGE';
  reservedBy?: string;
  reservedPhone?: string;
  reservationTime?: string;
  currentGuestName?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email?: string;
  isLoggedIn: boolean;
  assignedTable?: string;
  loyaltyPoints?: number;
}

export interface FeedbackReview {
  id: string;
  customerName: string;
  rating: number; // 1 to 5
  comment: string;
  dishName?: string;
  timestamp: string;
  isVerifiedGuest?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'VEG' | 'NON-VEG';
  subCategory: 'STARTERS' | 'CURRIES' | 'BREADS' | 'MAIN COURSE' | 'DESSERTS';
  description: string;
  image: string;
  spiceLevel: number; // 0: Mild, 1: Low, 2: Medium, 3: Spicy
  rating?: number;
  ratingCount?: number;
  isPopular?: boolean;
  preparationTime?: string;
  calories?: number;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  orderType: OrderType;
  tableOrRoomNumber: string;
  specialInstructions?: string;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  timestamp: string;
  customer: CustomerDetails;
  items: CartItem[];
  totalAmount: number;
  status: 'PLACED' | 'PREPARING' | 'READY' | 'SERVED';
  paymentStatus: 'UNPAID' | 'PAID';
  paymentMethod?: 'CASH' | 'CARD' | 'UPI' | 'ROOM_BILL';
}

