"use client";
import React, { useState } from "react";
import { Button } from "@/components/atoms/Button";
import Title from "@/components/atoms/Title";
import DrawerContainer from "@/components/molecules/global/DrawerContainer";
import Table from "@/components/molecules/global/table/Table";
import { membershipTableColumns } from "@/data";
import { Plus } from "lucide-react";
import AddMembershipForm from "@/components/molecules/membership/AddMembershipForm";
import { useGetAllMembershipsQuery } from "@/store/api/membershipApi";

const MembershipWrapper = ({ token }: { token: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: membership,
    isLoading,
    error,
    refetch,
  } = useGetAllMembershipsQuery(token, {
    refetchOnMountOrArgChange: true,
  });

  const openAddMembershipDrawer = () => {
    setIsOpen(true);
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <Title text="Memberships" />
        <Button
          onClick={openAddMembershipDrawer}
          variant="action"
          className="text-sm bg-scarlet-red hover:bg-red-500 text-white"
        >
          <Plus size={18} /> New membership
        </Button>
      </div>

      {isLoading && <p>Loading memberships...</p>}

      {error && (
        <p className="text-red-500">
          {typeof error === "string"
            ? error
            : "Something went wrong while fetching memberships."}
        </p>
      )}

      {!isLoading && !error && membership && (
        <Table data={membership.memberships} columns={membershipTableColumns} />
      )}

      <DrawerContainer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        dismissible={false}
      >
        <AddMembershipForm
          setIsOpen={setIsOpen}
          token={token}
          refetch={refetch}
        />
      </DrawerContainer>
    </div>
  );
};

export default MembershipWrapper;
