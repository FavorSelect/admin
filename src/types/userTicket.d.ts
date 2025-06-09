export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserTicket {
  id: number;
  ticketNumber: string;
  subject: string;
  description: string;
  image: string;
  status: string;
  createdAt: string;
  adminReply: string;
  User: User;
  user: string;
}

export interface UserTicketResponse {
  tickets: UserTicket[];
}

export interface UserTicketResponseById {
  ticket: UserTicket;
}
