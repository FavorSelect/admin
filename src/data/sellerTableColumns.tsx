import { ColumnConfig } from "@/types";
import Link from "next/link";

export const sellerTableColumns: ColumnConfig[] = [
  { key: "seller", type: "text", label: "Seller" },
  { key: "contact", type: "text", label: "Contact" },
  { key: "membershipId", type: "text", label: "Membership ID" },
  { key: "email", type: "text", label: "Email" },
  { key: "status", type: "text", label: "Status" },
  {
    key: "actions",
    type: "custom",
    label: "Actions",
    render: (row) => (
      <Link
        href={`/sellers/${row.id}`}
        className="text-sm font-medium text-scarlet-red hover:underline"
      >
        View Details
      </Link>
    ),
  },
];
