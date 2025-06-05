import { ColumnConfig } from "@/types";

export const sellerTicketTableColumns: ColumnConfig[] = [
  { key: "ticketId", label: "Ticket ID", type: "text" },
  { key: "subject", label: "Subject", type: "text" },
  { key: "seller", label: "Seller", type: "text" },
  { key: "status", label: "Status", type: "text" },
  { key: "date", label: "Date", type: "text" },
  { key: "representative", label: "Representative", type: "text" },
];
