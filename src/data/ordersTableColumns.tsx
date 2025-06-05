import { ColumnConfig } from "@/types";
import Link from "next/link";

export const ordersTableColumns: ColumnConfig[] = [
  { key: "id", type: "text", label: "Order ID" },
  { key: "customer", type: "text", label: "Customer" },
  { key: "orderDate", type: "text", label: "Order Date" },
  { key: "status", type: "text", label: "Status" },
  { key: "total", type: "text", label: "Total" },
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
