import Link from "next/link";
import React from "react";

interface Props {
  label: string;
  url?: string;
}

const SellerDocumentLink = ({ label, url }: Props) => {
  if (!url) return null;
  return (
    <p className="col-span-full">
      <strong>{label}:</strong>{" "}
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        View Document
      </Link>
    </p>
  );
};

export default SellerDocumentLink;
