"use client";

import Table from "@/components/molecules/global/table/Table";
import { pendingSellersTableColumns } from "@/data";
import { useGetPendingSellersQuery } from "@/store/api/adminDashboardApi";
import React from "react";

function PendingSellersWrapper({ token }: { token: string }) {
  const {
    data: pendingSellers,
    isLoading: isLoadingPending,
    isError: isErrorPending,
  } = useGetPendingSellersQuery(token);

  return (
    <div>
      {isLoadingPending ? (
        <p>Loading pending sellers...</p>
      ) : isErrorPending ? (
        <p className="text-red-500">Failed to fetch pending sellers.</p>
      ) : (
        <Table
          data={pendingSellers?.pendingSellers ?? []}
          columns={pendingSellersTableColumns}
        />
      )}
    </div>
  );
}

export default PendingSellersWrapper;
