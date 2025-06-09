import React from "react";
import { Button } from "@/components/atoms/Button";
import { Edit, Trash } from "lucide-react";
import Spinner from "../global/Spinner";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
};

const MembershipActions = ({ onEdit, onDelete, isDeleting }: Props) => (
  <div className="flex space-x-3 pt-4">
    <Button
      onClick={onEdit}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded inline-flex items-center space-x-2"
    >
      <Edit size={16} />
      <span>Edit</span>
    </Button>

    <Button
      onClick={onDelete}
      disabled={isDeleting}
      className={`${
        isDeleting ? "bg-red-300" : "bg-red-600 hover:bg-red-700"
      } text-white font-semibold py-2 px-4 rounded inline-flex items-center space-x-2 disabled:opacity-60`}
    >
      {isDeleting ? (
        <>
          <Spinner />
          <span>Deleting...</span>
        </>
      ) : (
        <>
          <Trash size={16} />
          <span>Delete</span>
        </>
      )}
    </Button>
  </div>
);

export default MembershipActions;
