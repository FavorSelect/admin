import { ColumnConfig } from "@/types";
import Image from "next/image";
import Link from "next/link";

export const categoryColumns: ColumnConfig[] = [
  {
    key: "image",
    type: "custom",
    label: "Image",
    render: (row) => (
      <Image
        src={row.image}
        alt={row.name}
        className="h-13 w-13 rounded-full object-cover mx-auto"
        width={50}
        height={50}
      />
    ),
  },
  { key: "name", type: "text", label: "Name" },
  { key: "description", type: "text", label: "Description" },
  {
    key: "actions",
    type: "custom",
    label: "Actions",
    render: (row) => (
      <Link
        href={`/categories/edit/${row.id}`}
        className="text-sm font-medium text-scarlet-red hover:underline"
      >
        Edit
      </Link>
    ),
  },
];
