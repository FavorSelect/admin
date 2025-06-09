import { ColumnConfig } from "@/types";
import Link from "next/link";
import { format } from "date-fns";

export const deletionRequestsColumns: ColumnConfig[] = [
  {
    key: "uniqueAccountDeletedId",
    type: "custom",
    label: "Request ID",
    render: (row) => `#${row.uniqueAccountDeletedId}`,
  },
  {
    key: "createdAt",
    type: "custom",
    label: "Date of Request",
    render: (row) => format(new Date(row.createdAt), "dd MMM yyyy"),
  },
  {
    key: "status",
    type: "text",
    label: "Status",
  },
  {
    key: "actions",
    type: "custom",
    label: "Actions",
    render: (row) => (
      <Link
        href={`/deletion-requests/${row.id}`}
        className="text-sm font-medium text-scarlet-red hover:underline"
      >
        View & Update
      </Link>
    ),
  },
];
