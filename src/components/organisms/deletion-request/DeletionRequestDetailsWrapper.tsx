"use client";

import React from "react";
import { useGetDeletionRequestByIdQuery } from "@/store/api/deletionRequestApi";
import { format } from "date-fns";
import { Button } from "@/components/atoms/Button";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const DeletionRequestDetailsWrapper = ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
  const router = useRouter();
  const { data, isLoading, error } = useGetDeletionRequestByIdQuery({
    token,
    id,
  });

  const request = data?.request;

  return (
    <div className="w-full max-w-sm space-y-4">
      <Button onClick={() => router.back()}>
        <MoveLeft size={20} />
      </Button>
      <h1 className="text-xl font-semibold text-gray-800">
        Deletion Request Details
      </h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Failed to load request details.</p>
      ) : request ? (
        <div className="space-y-1 text-base text-gray-700">
          <p>
            <strong>ID:</strong> #{request.uniqueAccountDeletedId}
          </p>
          <p>
            <strong>Status:</strong> {request.status}
          </p>
          <p>
            <strong>Reason:</strong> {request.reason}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {format(new Date(request.createdAt), "dd MMM yyyy, hh:mm a")}
          </p>
          <p>
            <strong>Updated At:</strong>{" "}
            {format(new Date(request.updatedAt), "dd MMM yyyy, hh:mm a")}
          </p>
        </div>
      ) : (
        <p>No request data found.</p>
      )}
    </div>
  );
};

export default DeletionRequestDetailsWrapper;
