"use client";
import React, { useState } from "react";
import Title from "@/components/atoms/Title";
import { deletionRequestsData, deletionRequestsColumns } from "@/data";
import Table from "@/components/molecules/global/table/Table";
import Select from "react-select";

const filterWith = ["Pending", "Rejected", "Approved"];
const filterOptions = filterWith.map((r) => ({ label: r, value: r }));

const DeletionRequestWrapper = () => {
  const [fitler, setFilter] = useState<{
    value: string;
    label: string;
  } | null>(null);

  return (
    <div className="space-y-5">
      <div>
        <Title text="User Deletion Requests" />
        <p className="text-sm text-gray-600">Manage user deletion requests</p>
      </div>
      <Select
        options={filterOptions}
        value={fitler}
        onChange={setFilter}
        placeholder="Filter with"
        isClearable
        className="mb-4 text-sm max-w-72"
      />

      <Table data={deletionRequestsData} columns={deletionRequestsColumns} />
    </div>
  );
};

export default DeletionRequestWrapper;
