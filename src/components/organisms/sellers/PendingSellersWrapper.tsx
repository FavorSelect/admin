"use client";
import Table from "@/components/molecules/global/table/Table";
import { pendingSellersTableColumns } from "@/column";
import { useGetPendingSellersQuery } from "@/store/api/sellerApi";
import React from "react";

function PendingSellersWrapper({ token }: { token: string }) {
  const { data, isLoading: isLoadingPending } =
    useGetPendingSellersQuery(token);

  return (
    <div>
      {isLoadingPending ? (
        <p className="text-gray-500 italic">Loading pending sellers...</p>
      ) : !data ||
        !Array.isArray(data.pendingSellers) ||
        data.pendingSellers.length === 0 ? (
        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md border border-yellow-300">
          <strong>Notice:</strong> No pending sellers found.
        </div>
      ) : (
        <Table
          data={data.pendingSellers}
          columns={pendingSellersTableColumns}
        />
      )}
    </div>
  );
}

export default PendingSellersWrapper;
