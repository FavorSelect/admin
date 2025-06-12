"use client";
import Table from "@/components/molecules/global/table/Table";
import { allSellersTableColumns } from "@/column";
import { useGetAllSellersQuery } from "@/store/api/sellerApi";
import React from "react";

function SellersWrapper({ token }: { token: string }) {
  const {
    data,
    isLoading: isLoadingAll,
    isError: isErrorAll,
  } = useGetAllSellersQuery(token, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const sellers = data?.sellers ?? [];

  return (
    <div>
      {isLoadingAll ? (
        <p className="text-gray-500 italic">Loading sellers...</p>
      ) : isErrorAll ? (
        <p className="text-red-500">Failed to fetch sellers.</p>
      ) : (
        <Table data={sellers ?? []} columns={allSellersTableColumns} />
      )}
    </div>
  );
}

export default SellersWrapper;
