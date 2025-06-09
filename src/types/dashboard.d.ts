export interface AdminStats {
  id: number;
  totalRevenue: number;
  totalRevenuePercentage: number;
  totalOrders: number;
  totalOrdersPercentage: number;
  totalCustomers: number;
  totalCustomersPercentage: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminStatsResponse {
  success: boolean;
  data: AdminStats[];
}

export interface RevenueOverTimeEntry {
  month: string;
  revenue: number;
}

export interface RevenueAnalyticsResponse {
  totalRevenue: number;
  percentageChange: number;
  revenueOverTime: RevenueOverTimeEntry[];
}

export interface OrdersByCategoryEntry {
  category: string;
  orders: number;
}

export interface OrdersByCategoryResponse {
  totalOrders: number;
  ordersByCategory: OrdersByCategoryEntry[];
}

export interface RawUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  authProvider: string;
  isVerified: boolean;
  status: string;
  createdAt: string;
}

export interface LatestUser extends RawUser {
  name: string;
}

export interface LatestUsersResponse {
  message: string;
  count: number;
  users: LatestUser[];
}

export interface LatestOrderUser {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
}

export interface LatestOrderItem {
  id: number;
  productId: number;
  productName: string;
  productImageUrl: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface LatestOrder {
  id?: string;
  addressId: number;
  cartId: number | null;
  createdAt: string;
  updatedAt: string;
  deliveryDate: string | null;
  shippingDate: string | null;
  orderDate: string;
  orderItems: LatestOrderItem[];
  orderStatus: string;
  paymentMethod: string;
  paymentStatus: string;
  totalAmount: number;
  uniqueOrderId: string;
  userId: number;
  User: LatestOrderUser;
  name: string;
  status: string;
}

export interface LatestOrderResponse {
  message: string;
  count: number;
  orders: LatestOrder[];
}

export interface Ticket {
  id: number;
  ticketNumber: string;
  subject: string;
  description: string;
  image: string;
  adminReply: string;
  createdAt: string;
  status?: string;
  type?: string;
}

export interface LatestTicketsResponse {
  message: string;
  tickets: Ticket[];
}
