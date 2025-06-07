"use client";
import Table from "@/components/molecules/global/table/Table";
import { allSellersTableColumns } from "@/data";
import { useGetAllSellersQuery } from "@/store/api/adminDashboardApi";
import React from "react";

function ActiveSellersWrapper({ token }: { token: string }) {
  const {
    data: allSellers,
    isLoading: isLoadingAll,
    isError: isErrorAll,
  } = useGetAllSellersQuery(token);

  return (
    <div>
      {isLoadingAll ? (
        <p>Loading sellers...</p>
      ) : isErrorAll ? (
        <p className="text-red-500">Failed to fetch sellers.</p>
      ) : (
        <Table
          data={allSellers?.sellers ?? []}
          columns={allSellersTableColumns}
        />
      )}
    </div>
  );
}

export default ActiveSellersWrapper;
