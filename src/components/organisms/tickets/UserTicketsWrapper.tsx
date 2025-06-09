"use client";
import React from "react";
import Table from "@/components/molecules/global/table/Table";
import { usersTicketTableColumns } from "@/data";
import { useGetUserTicketsQuery } from "@/store/api/ticketApi";

const UserTicketsWrapper = ({ token }: { token: string }) => {
  const {
    data: userTickets,
    isLoading,
    isError,
  } = useGetUserTicketsQuery(token);

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
          data={userTickets?.tickets || []}
          columns={usersTicketTableColumns}
        />
      )}
    </div>
  );
};

export default UserTicketsWrapper;
