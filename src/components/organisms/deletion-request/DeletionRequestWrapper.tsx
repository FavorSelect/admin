"use client";
import React from "react";
import Title from "@/components/atoms/Title";
import { deletionRequestsColumns } from "@/data";
import Table from "@/components/molecules/global/table/Table";
import { useGetAllDeletionRequestsQuery } from "@/store/api/deletionRequestApi";

const DeletionRequestWrapper = ({ token }: { token: string }) => {
  const {
    data: deletionRequest,
    isLoading,
    error,
  } = useGetAllDeletionRequestsQuery(token);

  return (
    <div className="space-y-5">
      <div>
        <Title text="Deletion Requests" />
        <p className="text-sm text-gray-600">Manage deletion requests</p>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Failed to load deletion requests.</p>
      ) : (
        <Table
          data={deletionRequest?.requests || []}
          columns={deletionRequestsColumns}
        />
      )}
    </div>
  );
};

export default DeletionRequestWrapper;
