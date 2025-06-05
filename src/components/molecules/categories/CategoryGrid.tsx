import { RowData } from "@/types";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CategoryGridProps {
  data: RowData[];
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {data.map((category) => (
        <div
          key={category.id}
          className="border border-pale-rose rounded-lg relative"
        >
          {/* Badge */}
          {category.tag && (
            <span className="absolute top-2 left-2 bg-pale-rose text-dark-chocolate text-xs font-medium px-2 py-1 rounded">
              {category.tag}
            </span>
          )}

          {/* Image */}
          <Image
            src={category.image}
            alt={category.name}
            className="w-full h-40 object-cover mb-2"
            width={300}
            height={100}
          />

          <div className="px-3 pb-2">
            {/* Name & Description */}
            <h3 className="text-lg font-semibold mb-1">{category.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{category.description}</p>

            {/* Edit Button */}
            <Link
              href={`/categories/edit/${category.id}`}
              className="inline-flex items-center gap-x-1.5 text-sm text-white bg-scarlet-red px-3 py-1 rounded transition"
            >
              <Edit size={16} /> Edit
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;
