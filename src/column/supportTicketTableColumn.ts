import { ColumnConfig } from "@/types";
import { format } from "date-fns";

export const supportTicketsColumns: ColumnConfig[] = [
  { key: "ticketNumber", type: "text", label: "Ticket No" },
  { key: "subject", type: "text", label: "Subject" },
  { key: "description", type: "text", label: "Description" },
  { key: "adminReply", type: "text", label: "Admin Reply" },
  { key: "type", type: "text", label: "Type" },
  { key: "status", type: "text", label: "Status" },
  {
    key: "createdAt",
    type: "text",
    label: "Created At",
    render: (row) => format(new Date(row.createdAt), "dd MMM yyyy"),
  },
];
