"use client";
import React, { useState } from "react";
import Table from "@/components/molecules/global/table/Table";
import { Input } from "@/components/atoms/Input";
import Title from "@/components/atoms/Title";
import { Search } from "lucide-react";
import { useGetUsersQuery } from "@/store/api/userApi";
import { User } from "@/types/user";
import { userTableColumns } from "@/data";

const UserWrapper = ({ token }: { token: string }) => {
  const [search, setSearch] = useState("");

  const { data: userResponse, isLoading, isError } = useGetUsersQuery(token);

  const users = userResponse?.users ?? [];

  const filteredUsers = users.filter((user: User) => {
    return (
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      String(user.id).includes(search)
    );
  });
  return (
    <div className="space-y-5">
      <Title text="Users" />
      <div className="mb-4 w-full relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search by UserID, Name or Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full py-2 pl-10 pr-3 border border-gray-300 text-sm rounded-md font-medium"
        />
      </div>

      {isLoading ? (
        <p className="text-gray-500 italic">Loading users...</p>
      ) : isError ? (
        <p className="text-red-500">Failed to fetch users.</p>
      ) : (
        <Table columns={userTableColumns} data={filteredUsers} />
      )}
    </div>
  );
};

export default UserWrapper;
