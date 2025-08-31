/* eslint-disable @typescript-eslint/no-explicit-any */
// import UpdateProduct from "@/components/molecules/products/UpdateProduct";
// import { ColumnConfig } from "@/types";
// import { Trash } from "lucide-react";
// import Image from "next/image";

// const truncateWords = (s: string | undefined, n = 5) => {
//   if (!s) return "—";
//   const words = s.trim().split(/\s+/);
//   return words.length > n ? `${words.slice(0, n).join(" ")}…` : s;
// };

// export const productColumns: ColumnConfig[] = [
//   {
//     key: "productImage",
//     type: "custom",
//     label: "Image",
//     render: (row) => {
//       return (
//         <Image
//           src={row.coverImageUrl}
//           alt={row.productName ?? "Product image"}
//           width={50}
//           height={50}
//           className="h-12 w-12 rounded object-cover mx-auto"
//         />
//       );
//     },
//   },
//   {
//     key: "productName",
//     type: "custom",
//     label: "Name",
//     render: (row) => truncateWords(row.productName, 5),
//   },
//   {
//     key: "category",
//     type: "custom",
//     label: "Category",
//     render: (row) => row.category?.categoryName,
//   },
//   {
//     key: "productPrice",
//     type: "custom",
//     label: "Price",
//     render: (row) => {
//       const price = row.productPrice ?? row.price ?? 0;
//       const n = typeof price === "string" ? parseFloat(price) : Number(price);
//       return new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "USD",
//       }).format(Number.isNaN(n) ? 0 : n);
//     },
//   },
//   {
//     key: "actions",
//     type: "custom",
//     label: "Actions",
//     render: (row) => (
//       <div className="flex items-center justify-center gap-2">
//         <UpdateProduct row={row} />
//         <button
//           type="button"
//           className="inline-flex items-center px-3 py-1.5 text-sm cursor-pointer font-medium rounded-md border border-red-300 text-red-700
//                hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2
//                disabled:opacity-50 disabled:cursor-not-allowed transition"
//         >
//           <Trash className="h-4 w-4 mr-2" />
//           Delete
//         </button>
//       </div>
//     ),
//   },
// ];

import UpdateProduct from "@/components/molecules/products/UpdateProduct";
import { useDeleteProductMutation } from "@/store/api/productApi";
import { ColumnConfig } from "@/types";
import { Trash } from "lucide-react";
import Image from "next/image";

const truncateWords = (s: string | undefined, n = 5) => {
  if (!s) return "—";
  const words = s.trim().split(/\s+/);
  return words.length > n ? `${words.slice(0, n).join(" ")}…` : s;
};

// ✅ Component wrapper for action buttons
const ProductActions = ({ row }: { row: any }) => {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${row.productName}"?`))
      return;

    console.log(row.id);
    try {
      await deleteProduct(row.id).unwrap();
      console.log("Product deleted successfully");
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <UpdateProduct row={row} />
      <button
        type="button"
        onClick={handleDelete}
        disabled={isLoading}
        className="inline-flex items-center px-3 py-1.5 text-sm cursor-pointer font-medium rounded-md border border-red-300 text-red-700
             hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2
             disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <Trash className="h-4 w-4 mr-2" />
        {isLoading ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export const productColumns: ColumnConfig[] = [
  {
    key: "productImage",
    type: "custom",
    label: "Image",
    render: (row) => (
      <Image
        src={row.coverImageUrl}
        alt={row.productName ?? "Product image"}
        width={50}
        height={50}
        className="h-12 w-12 rounded object-cover mx-auto"
      />
    ),
  },
  {
    key: "productName",
    type: "custom",
    label: "Name",
    render: (row) => truncateWords(row.productName, 5),
  },
  {
    key: "category",
    type: "custom",
    label: "Category",
    render: (row) => row.category?.categoryName,
  },
  {
    key: "productPrice",
    type: "custom",
    label: "Price",
    render: (row) => {
      const price = row.productPrice ?? row.price ?? 0;
      const n = typeof price === "string" ? parseFloat(price) : Number(price);
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(Number.isNaN(n) ? 0 : n);
    },
  },
  {
    key: "actions",
    type: "custom",
    label: "Actions",
    render: (row) => <ProductActions row={row} />,
  },
];
