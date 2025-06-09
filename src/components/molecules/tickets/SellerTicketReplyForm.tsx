"use client";
import {
  Controller,
  Control,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { Textarea } from "@/components/atoms/Textarea";
import { Button } from "@/components/atoms/Button";
import { SingleSelectField } from "@/components/molecules/global/SingleSelectField";
import ErrorMessage from "@/components/molecules/global/ErrorMessage";

type ReplyFormValues = {
  reply: string;
  status: "open" | "pending" | "closed";
};

interface SellerTicketReplyFormProps {
  control: Control<ReplyFormValues>;
  register: UseFormRegister<ReplyFormValues>;
  errors: FieldErrors<ReplyFormValues>;
  isSubmitting: boolean;
  isReplying: boolean;
}

const statusOptions = [
  { value: "open", label: "Open" },
  { value: "pending", label: "Pending" },
  { value: "closed", label: "Closed" },
];

const SellerTicketReplyForm = ({
  control,
  register,
  errors,
  isSubmitting,
  isReplying,
}: SellerTicketReplyFormProps) => (
  <fieldset
    disabled={isSubmitting || isReplying}
    className="space-y-4 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <div>
      <label htmlFor="reply" className="block font-medium mb-1">
        Reply to Seller
      </label>
      <Textarea
        id="reply"
        className="w-full border p-2 rounded"
        rows={4}
        {...register("reply", { required: "Reply is required" })}
      />
      <ErrorMessage error={errors.reply} />
    </div>

    <div>
      <label htmlFor="status" className="block font-medium mb-1">
        Ticket Status
      </label>
      <Controller
        name="status"
        control={control}
        rules={{ required: "Status is required" }}
        render={({ field, fieldState, formState }) => (
          <>
            <SingleSelectField
              field={field}
              fieldState={fieldState}
              formState={formState}
              options={statusOptions}
              placeholder="Select status"
            />
            <ErrorMessage error={fieldState.error} />
          </>
        )}
      />
    </div>

    <Button type="submit" variant="adminReplyBtn">
      {isReplying ? "Sending..." : "Send Reply & Update Status"}
    </Button>
  </fieldset>
);

export default SellerTicketReplyForm;
