import { ColumnConfig } from "@/types";

export const userTableColumns: ColumnConfig[] = [
  { key: "id", type: "text", label: "ID" },
  { key: "name", type: "text", label: "Name" },
  { key: "email", type: "text", label: "Email" },
  { key: "status", type: "text", label: "Status" },
];
