"use client";
import React, { useState } from "react";
import Table from "@/components/molecules/global/table/Table";
import { Input } from "@/components/atoms/Input";
import { userData, userTableColumns } from "@/data";
import Title from "@/components/atoms/Title";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/atoms/Button";

const UserWrapper = () => {
  const [search, setSearch] = useState("");

  const filteredData = userData.filter((user) =>
    [user.id, user.name, user.email].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <Title text="Users" />
        <Button
          variant="action"
          className="text-sm bg-scarlet-red hover:bg-red-500 text-white"
        >
          <Plus size={18} /> Add User
        </Button>
      </div>
      <div className="mb-4 w-full relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search by UserID, Name or Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full py-2 pl-10 pr-3 border border-gray-300 text-sm rounded-md font-medium"
        />
      </div>
      <Table columns={userTableColumns} data={filteredData} />
    </div>
  );
};

export default UserWrapper;
