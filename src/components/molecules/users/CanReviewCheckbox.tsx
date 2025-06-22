/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Checkbox } from "@/components/atoms/Checkbox";
import { useUpdateCanReviewPermissionMutation } from "@/store/api/userApi";
import { toast } from "react-hot-toast";
type Props = {
  userId: number;
  initialValue: boolean;
};

const CanReviewCheckbox: React.FC<Props> = ({ userId, initialValue }) => {
  console.log(initialValue);
  const [checked, setChecked] = useState(initialValue);
  const [updateCanReview] = useUpdateCanReviewPermissionMutation();

  const handleToggle = async (newValue: boolean) => {
    setChecked(newValue);

    try {
      const response = await updateCanReview({
        userId,
        canReview: newValue,
      }).unwrap();

      toast.success(response?.message || "Review permission updated");
    } catch (error: any) {
      console.error("Failed to update permission:", error);
      setChecked(!newValue);

      toast.error(error?.data?.message || "Failed to update review permission");
    }
  };

  return (
    <div className="flex justify-center">
      <Checkbox checked={checked} onChange={handleToggle} />
    </div>
  );
};

export default CanReviewCheckbox;
