"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useGetMembershipByIdQuery,
  useDeleteMembershipMutation,
} from "@/store/api/membershipApi";
import { toast } from "react-hot-toast";
import DrawerContainer from "@/components/molecules/global/DrawerContainer";
import AddMembershipForm from "@/components/molecules/membership/AddMembershipForm";
import MembershipDetails from "@/components/molecules/membership/MembershipDetails";
import MembershipActions from "@/components/molecules/membership/MembershipActions";
import { Button } from "@/components/atoms/Button";
import { MoveLeft } from "lucide-react";

const MembershipDetailsWrapper = ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const {
    data,
    isLoading,
    error,
    refetch: refetchMembership,
  } = useGetMembershipByIdQuery({ token, id });

  const [deleteMembership, { isLoading: isDeleting }] =
    useDeleteMembershipMutation();

  const handleDelete = async () => {
    const confirmed = confirm(
      "Are you sure you want to delete this membership?"
    );
    if (!confirmed) return;
    try {
      const res = await deleteMembership({ token, id }).unwrap();
      toast.success(res.message || "Membership deleted successfully");
      router.push("/membership");
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof error.data === "object"
      ) {
        const err = error as { data?: { message?: string } };
        toast.error(err.data?.message || "Something went wrong.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const membership = data?.membership;

  const initialFormData = {
    planName: membership?.planName || "",
    price: membership?.price || 0,
    durationInDays: membership?.durationInDays || "",
    description: membership?.description || "",
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      <Button onClick={() => router.back()}>
        <MoveLeft size={20} />
      </Button>
      <h1 className="text-2xl font-bold text-gray-800">Membership Details</h1>
      {isLoading ? (
        <p>Loading membership...</p>
      ) : error ? (
        <p className="text-red-500">Error loading membership.</p>
      ) : (
        <>
          {membership && <MembershipDetails membership={membership} />}
          <MembershipActions
            onEdit={() => setIsDrawerOpen(true)}
            onDelete={handleDelete}
            isDeleting={isDeleting}
          />
          <DrawerContainer
            isOpen={isDrawerOpen}
            setIsOpen={setIsDrawerOpen}
            dismissible={false}
          >
            <AddMembershipForm
              setIsOpen={setIsDrawerOpen}
              token={token}
              refetch={refetchMembership}
              initialData={initialFormData}
              editId={id}
            />
          </DrawerContainer>
        </>
      )}
    </div>
  );
};

export default MembershipDetailsWrapper;
