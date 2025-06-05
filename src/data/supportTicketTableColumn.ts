import { ColumnConfig } from "@/types";

export const supportTicketsColumns: ColumnConfig[] = [
  { key: "ticketId", type: "text", label: "Ticket ID" },
  { key: "subject", type: "text", label: "Subject" },
  { key: "status", type: "text", label: "Status" },
  { key: "priority", type: "text", label: "Priority" },
];
