import { ColumnConfig } from "@/types";

export const usersTicketTableColumns: ColumnConfig[] = [
  { key: "ticketId", label: "Ticket ID", type: "text" },
  { key: "subject", label: "Subject", type: "text" },
  { key: "user", label: "User", type: "text" },
  { key: "status", label: "Status", type: "text" },
  { key: "date", label: "Date", type: "text" },
  { key: "assignee", label: "Assignee", type: "text" },
];
