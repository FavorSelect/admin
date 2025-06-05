import React from "react";
import { RowData } from "@/types";
import Title from "@/components/atoms/Title";

interface MembershipGridProps {
  data: RowData[];
}

const MembershipGrid: React.FC<MembershipGridProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {data.map((membership) => (
        <div
          key={membership.id}
          className="border border-pale-rose rounded-lg relative p-3 flex flex-col gap-y-0.5 justify-center text-dark-chocolate text-sm"
        >
          <Title text={membership.name} />
          <p>{membership.price}</p>
          <p>{membership.duration}</p>
          <p>{membership.benefits}</p>
        </div>
      ))}
    </div>
  );
};

export default MembershipGrid;
