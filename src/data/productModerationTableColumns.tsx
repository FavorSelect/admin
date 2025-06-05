import { Button } from "@/components/atoms/Button";
import { ColumnConfig } from "@/types";
import Image from "next/image";

export const productModerationTableColumns: ColumnConfig[] = [
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
  { key: "seller", type: "text", label: "Seller" },
  { key: "submitted", type: "text", label: "Submitted" },
  {
    key: "actions",
    type: "custom",
    label: "Actions",
    render: () => (
      <div className="space-x-2 text-sm">
        <Button className="text-green-600 hover:underline">Approve</Button>
        <span>|</span>
        <Button className="text-red-600 hover:underline">Reject</Button>
      </div>
    ),
  },
];
