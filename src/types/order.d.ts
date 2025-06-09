export interface OrderUser {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productImageUrl: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface Order {
  id?: string;
  addressId: number;
  cartId: number | null;
  createdAt: string;
  updatedAt: string;
  deliveryDate: string | null;
  shippingDate: string | null;
  orderDate: string;
  orderItems: OrderItem[];
  orderStatus: string;
  paymentMethod: string;
  paymentStatus: string;
  totalAmount: number;
  uniqueOrderId: string;
  userId: number;
  User: OrderUser;
  customer?: string;
  status?: string;
}

export interface OrderResponse {
  message: string;
  count: number;
  orders: Order[];
}

export interface OrderResponseById {
  message: string;
  order: Order;
}
