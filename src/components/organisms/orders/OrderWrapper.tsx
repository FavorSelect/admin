"use client";
import React, { useState } from "react";
import Table from "@/components/molecules/global/table/Table";
import { Input } from "@/components/atoms/Input";
import { ordersTableColumns } from "@/column";
import Title from "@/components/atoms/Title";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { useGetOrdersQuery } from "@/store/api/orderApi";

const OrderWrapper = ({ token }: { token: string }) => {
  const [search, setSearch] = useState("");

  const { data: orders, isLoading, isError } = useGetOrdersQuery(token);

  const filteredData =
    orders?.orders?.filter((order) =>
      [String(order.id), order.customer, order.orderStatus].some((field) =>
        field?.toLowerCase().includes(search.toLowerCase())
      )
    ) || [];

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <Title text="Orders" />
        <Button
          variant="action"
          className="text-sm bg-scarlet-red hover:bg-red-500 text-white"
        >
          <Plus size={18} /> New Order
        </Button>
      </div>

      <div className="mb-4 w-full relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search by Order ID, Customer or Status"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full py-2 pl-10 pr-3 border border-gray-300 text-sm rounded-md font-medium"
        />
      </div>

      {isLoading && <p className="text-gray-500 italic">Loading orders...</p>}
      {isError && (
        <p className="text-sm text-red-500">
          Failed to load orders. Please try again.
        </p>
      )}

      {!isLoading && !isError && (
        <Table columns={ordersTableColumns} data={filteredData} />
      )}
    </div>
  );
};

export default OrderWrapper;
