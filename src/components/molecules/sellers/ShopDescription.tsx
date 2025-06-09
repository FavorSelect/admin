import React, { useState } from "react";

const ShopDescription = ({ description }: { description: string }) => {
  const [showFull, setShowFull] = useState(false);

  if (!description) return null;

  const text = showFull ? description : description.slice(0, 100) + "...";

  return (
    <p className="col-span-full">
      <strong>Shop Description:</strong> {text}{" "}
      {description.length > 100 && (
        <button
          onClick={() => setShowFull((prev) => !prev)}
          className="text-blue-600 underline ml-1 cursor-pointer"
        >
          {showFull ? "Show Less" : "Read More"}
        </button>
      )}
    </p>
  );
};

export default ShopDescription;
