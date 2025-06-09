import React from "react";
import { Button } from "@/components/atoms/Button";

interface Props {
  onApprove: () => void;
  onReject: () => void;
  isApproving: boolean;
  isRejecting: boolean;
}

const SellerActionButtons = ({
  onApprove,
  onReject,
  isApproving,
  isRejecting,
}: Props) => {
  return (
    <div className="flex gap-4 mt-6 justify-end">
      <Button
        onClick={onApprove}
        disabled={isApproving}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
      >
        {isApproving ? "Approving..." : "Approve"}
      </Button>
      <Button
        onClick={onReject}
        disabled={isRejecting}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
      >
        {isRejecting ? "Rejecting..." : "Reject"}
      </Button>
    </div>
  );
};

export default SellerActionButtons;
