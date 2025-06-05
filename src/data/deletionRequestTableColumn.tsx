import { ColumnConfig } from "@/types";
import Link from "next/link";
export const deletionRequestsColumns: ColumnConfig[] = [
  { key: "requestId", type: "text", label: "Request ID" },
  { key: "user", type: "text", label: "User Information" },
  { key: "date", type: "text", label: "Date of Request" },
  { key: "status", type: "text", label: "Status" },
  {
    key: "actions",
    type: "custom",
    label: "Actions",

    render: (row) => (
      <Link
        href={`/deletion-requests/${row.requestId.replace("#", "")}`}
        className="text-sm font-medium text-scarlet-red hover:underline"
      >
        View & Update
      </Link>
    ),
  },
];
