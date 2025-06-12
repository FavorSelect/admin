import { ColumnConfig } from "@/types";
import Link from "next/link";
import { format } from "date-fns";

export const ordersTableColumns: ColumnConfig[] = [
  {
    key: "id",
    type: "text",
    label: "Order ID",
    render: (row) => {
      const id = row.uniqueOrderId;
      const cleanId =
        typeof id === "string" ? id.replaceAll("-", "") : String(id);
      return `#${cleanId}`;
    },
  },
  { key: "customer", type: "text", label: "Customer" },
  {
    key: "orderDate",
    type: "text",
    label: "Order Date",
    render: (row) =>
      row.orderDate ? format(new Date(row.orderDate), "dd MMM yyyy") : "—",
  },
  { key: "status", type: "text", label: "Status" },
  {
    key: "totalAmount",
    type: "text",
    label: "Price",
    render: (row) =>
      row.totalAmount ? `$${row.totalAmount.toLocaleString()}` : "—",
  },
  {
    key: "actions",
    type: "custom",
    label: "Actions",
    render: (row) => (
      <Link
        href={`/orders/${row.id?.toLocaleString().replace("#", "")}`}
        className="text-sm font-medium text-scarlet-red hover:underline"
      >
        View
      </Link>
    ),
  },
];
