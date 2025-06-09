export interface Seller {
  id: number;
  sellerName: string;
  email: string;
}

export interface SellerTicket {
  id: number;
  ticketNumber: string;
  subject: string;
  description: string;
  imageUrl: string;
  status: string;
  createdAt: string;
  adminReply: string;
  Seller: Seller;
}

export interface SellerTicketResponse {
  tickets: SellerTicket[];
}

export interface SellerTicketResponseById {
  ticket: SellerTicket;
}
