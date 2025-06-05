import { ColumnConfig } from "@/types";

export const membershipTableColumns: ColumnConfig[] = [
  { key: "name", type: "text", label: "Name" },
  { key: "price", type: "text", label: "Price" },
  { key: "duration", type: "text", label: "Duration" },
  { key: "benefits", type: "text", label: "Benefits" },
];
