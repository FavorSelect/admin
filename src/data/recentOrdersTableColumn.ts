import { ColumnConfig } from "@/types";

export const recentOrdersColumns: ColumnConfig[] = [
  { key: "orderId", type: "text", label: "Order ID" },
  { key: "customer", type: "text", label: "Customer" },
  { key: "amount", type: "text", label: "Amount" },
  { key: "status", type: "text", label: "Status" },
];
