import { ColumnConfig } from "@/types";
import Image from "next/image";
import { format } from "date-fns";
import EditCategory from "@/components/molecules/categories/EditCategory";

export const categoryColumns: ColumnConfig[] = [
  {
    key: "categoryImage",
    type: "custom",
    label: "Image",
    render: (row) => (
      <Image
        src={row.categoryImage}
        alt={row.categoryName}
        className="h-13 w-13 rounded-full object-cover mx-auto"
        width={50}
        height={50}
      />
    ),
  },
  { key: "categoryName", type: "text", label: "Name" },
  { key: "categoryDescription", type: "text", label: "Description" },
  {
    key: "createdAt",
    type: "text",
    label: "Created",
    render: (row) => format(new Date(row.createdAt), "dd MMM yyyy"),
  },
  {
    key: "updatedAt",
    type: "text",
    label: "Updated",
    render: (row) => format(new Date(row.updatedAt), "dd MMM yyyy"),
  },
  {
    key: "actions",
    type: "custom",
    label: "Actions",
    render: (row, token, refetch) =>
      token !== undefined &&
      refetch && <EditCategory row={row} token={token} refetch={refetch} />,
  },
];
