import React from "react";
import { format } from "date-fns";

type Props = {
  membership: {
    id: number;
    planName: string;
    price: number;
    durationInDays: string;
    description: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
};

const MembershipDetails = ({ membership }: Props) => {
  return (
    <div className="space-y-2 text-base">
      <p>
        <strong>Plan:</strong> {membership.planName}
      </p>
      <p>
        <strong>Price:</strong> ${membership.price}
      </p>
      <p>
        <strong>Duration:</strong> {membership.durationInDays} days
      </p>
      <p>
        <strong>Description:</strong> {membership.description}
      </p>
      <p>
        <strong>Status:</strong> {membership.isActive ? "Active" : "Inactive"}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {format(new Date(membership.createdAt), "PPPpp")}
      </p>
      <p>
        <strong>Updated At:</strong>{" "}
        {format(new Date(membership.updatedAt), "PPPpp")}
      </p>
    </div>
  );
};

export default MembershipDetails;
