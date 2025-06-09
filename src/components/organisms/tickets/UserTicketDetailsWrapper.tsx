"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  useGetUserTicketByIdQuery,
  useReplyToUserTicketMutation,
} from "@/store/api/ticketApi";
import UserTicketHeader from "@/components/molecules/tickets/UserTicketHeader";
import UserTicketInfo from "@/components/molecules/tickets/UserTicketInfo";
import UserTicketReplyForm from "@/components/molecules/tickets/UserTicketReplyForm";

type ReplyFormValues = {
  reply: string;
  status: "Open" | "InProgress" | "Closed";
};

const UserTicketDetailsWrapper = ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
  const router = useRouter();
  const [replyToUserTicket, { isLoading: isReplying }] =
    useReplyToUserTicketMutation();
  const {
    data: userTicketDetails,
    isLoading,
    isError,
  } = useGetUserTicketByIdQuery({ token, id });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ReplyFormValues>({
    defaultValues: {
      reply: "",
      status: "InProgress",
    },
  });

  const onSubmit = async (data: ReplyFormValues) => {
    try {
      const response = await replyToUserTicket({ token, id, ...data }).unwrap();
      toast.success(response?.message || "Reply and status updated!");
      router.push("/tickets");
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to update ticket.");
    }
  };

  if (isLoading) return <div>Loading user ticket details...</div>;
  if (isError || !userTicketDetails?.ticket)
    return <div>Failed to load ticket details.</div>;

  const {
    ticketNumber,
    subject,
    description,
    image,
    status,
    createdAt,
    adminReply,
    User,
  } = userTicketDetails.ticket;

  return (
    <div className="w-full max-w-sm space-y-4">
      <UserTicketHeader
        ticketNumber={ticketNumber}
        subject={subject}
        description={description}
        image={image}
        status={status}
        createdAt={createdAt}
        adminReply={adminReply}
        onBack={() => router.back()}
      />

      <UserTicketInfo
        name={`${User.firstName} ${User.lastName}`}
        email={User.email}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <UserTicketReplyForm
          control={control}
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          isReplying={isReplying}
        />
      </form>
    </div>
  );
};

export default UserTicketDetailsWrapper;
