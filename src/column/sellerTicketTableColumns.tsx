import { ColumnConfig } from "@/types";
import Link from "next/link";
import { format } from "date-fns";

export const sellerTicketTableColumns: ColumnConfig[] = [
  {
    key: "ticketNumber",
    label: "Ticket ID",
    type: "text",
  },
  { key: "subject", label: "Subject", type: "text" },
  {
    key: "seller",
    label: "Seller",
    type: "text",
    render: (row) => row.Seller.sellerName,
  },
  { key: "status", label: "Status", type: "text" },
  {
    key: "createdAt",
    label: "Date",
    type: "text",
    render: (row) => format(new Date(row.createdAt), "dd MMM yyyy"),
  },
  {
    key: "actions",
    type: "custom",
    label: "Actions",
    render: (row) => (
      <Link
        href={`/tickets/seller-tickets/${row.id}`}
        className="text-sm font-medium text-scarlet-red hover:underline"
      >
        View Details
      </Link>
    ),
  },
];
