import { ColumnConfig } from "@/types";
import Link from "next/link";
import { format } from "date-fns";

export const membershipTableColumns: ColumnConfig[] = [
  {
    key: "planName",
    type: "text",
    label: "Name",
  },
  {
    key: "price",
    type: "text",
    label: "Price",
    render: (row) => `$${row.price}`,
  },
  {
    key: "durationInDays",
    type: "text",
    label: "Duration",
    render: (row) => `${row.durationInDays} days`,
  },
  {
    key: "description",
    type: "text",
    label: "Benefits",
  },
  {
    key: "createdAt",
    type: "text",
    label: "Created At",
    render: (row) => format(new Date(row.createdAt), "dd MMM yyyy"),
  },
  {
    key: "actions",
    type: "custom",
    label: "Actions",
    render: (row) => (
      <Link
        href={`/membership/${row.id}`}
        className="text-sm font-medium text-scarlet-red hover:underline"
      >
        View Details
      </Link>
    ),
  },
];
