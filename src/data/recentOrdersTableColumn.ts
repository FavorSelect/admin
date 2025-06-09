import { ColumnConfig } from "@/types";
import { format } from "date-fns";

export const recentOrdersColumns: ColumnConfig[] = [
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
  { key: "name", type: "text", label: "Name" },
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
];
