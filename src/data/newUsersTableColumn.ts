import { ColumnConfig } from "@/types";
import { format } from "date-fns";

export const newUsersColumns: ColumnConfig[] = [
  { key: "name", type: "text", label: "Name" },
  { key: "email", type: "text", label: "Email" },
  {
    key: "createdAt",
    type: "text",
    label: "Joined",
    render: (row) => format(new Date(row.createdAt), "dd MMM yyyy"),
  },
  { key: "status", type: "text", label: "Status" },
  { key: "isVerified", type: "boolean", label: "Verfied" },
  { key: "authProvider", type: "text", label: "Provider" },
];
