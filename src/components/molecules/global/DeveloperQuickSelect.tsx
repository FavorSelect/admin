"use client";
import React from "react";
import { loadImageAsFile } from "@/utils/loadImageAsFile";
import { ProductFormValues } from "@/components/organisms/product/AddProductForm";
import { sampleProducts } from "@/utils/sampleProducts";

type DeveloperQuickSelectProps = {
  onProductSelect: (product: ProductFormValues) => void;
};

const DeveloperQuickSelect: React.FC<DeveloperQuickSelectProps> = ({
  onProductSelect,
}) => {
  const handleSelect = async (index: number) => {
    const selected = sampleProducts[index];
    if (!selected) return;

    // Image file mapping by product name
    const coverMap: Record<string, string> = {
      "Electric Kettle - 1.8L": "/sample-images/gallery-4.jpg",
      "Air Fryer 4L - Digital Touch": "/sample-images/laptop.png",
      "12-Piece Stainless Steel Cutlery Set": "/sample-images/gallery-2.jpg",
      "2-Slice Pop-Up Toaster": "/sample-images/elect.jpg",
    };

    // Load cover image
    const coverPath = coverMap[selected.productName];
    const coverFile = coverPath
      ? await loadImageAsFile(coverPath, "cover.jpg")
      : undefined;

    onProductSelect({
      ...selected,
      coverImageUrl: coverFile ? [coverFile] : [],
    });
  };

  return (
    <div className="mb-4 border p-3 rounded bg-yellow-50">
      <label className="block font-semibold text-sm mb-1">
        ⚙️ Developer Quick Product Loader
      </label>
      <select
        onChange={(e) => {
          const index = Number(e.target.value);
          if (!isNaN(index)) {
            handleSelect(index);
          }
        }}
        className="w-full border rounded px-2 py-1"
      >
        <option value="">-- Select Product to Auto-Fill --</option>
        {sampleProducts.map((prod, idx) => (
          <option value={idx} key={idx}>
            {prod.productName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DeveloperQuickSelect;
