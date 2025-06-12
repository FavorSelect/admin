"use client";
import React from "react";
import Table from "@/components/molecules/global/table/Table";
import { sellerTicketTableColumns } from "@/column";
import { useGetSellerTicketsQuery } from "@/store/api/ticketApi";

const SellerTicketsWrapper = ({ token }: { token: string }) => {
  const {
    data: sellerTickets,
    isLoading,
    isError,
  } = useGetSellerTicketsQuery(token);

  return (
    <div className="space-y-5">
      {isLoading ? (
        <p className="text-gray-500 italic">Loading tickets...</p>
      ) : isError ? (
        <p className="text-red-500 text-center py-4">
          Something went wrong while fetching tickets.
        </p>
      ) : (
        <Table
          data={sellerTickets?.tickets || []}
          columns={sellerTicketTableColumns}
        />
      )}
    </div>
  );
};

export default SellerTicketsWrapper;
