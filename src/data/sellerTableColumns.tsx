import { ColumnConfig } from "@/types";
import Link from "next/link";
import { format } from "date-fns";

// Full columns for "All Sellers"
export const allSellersTableColumns: ColumnConfig[] = [
  { key: "sellerName", type: "text", label: "Seller" },
  { key: "contactNumber", type: "text", label: "Contact" },
  {
    key: "membershipId",
    type: "custom",
    label: "Membership ID",
    render: (row) => row.membershipId ?? "Null",
  },
  {
    key: "membershipStart",
    type: "custom",
    label: "Membership start",
    render: (row) =>
      row.membershipStart
        ? format(new Date(row.membershipStart), "dd MMM yyyy")
        : "—",
  },
  {
    key: "membershipEnd",
    type: "custom",
    label: "Membership end",
    render: (row) =>
      row.membershipEnd
        ? format(new Date(row.membershipEnd), "dd MMM yyyy")
        : "—",
  },
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

// Slim columns for "Pending Approvals"
export const pendingSellersTableColumns: ColumnConfig[] = [
  { key: "sellerName", type: "text", label: "Seller" },
  { key: "contactNumber", type: "text", label: "Contact" },
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
