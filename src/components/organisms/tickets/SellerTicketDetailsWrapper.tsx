"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  useGetSellerTicketByIdQuery,
  useReplyToSellerTicketMutation,
} from "@/store/api/ticketApi";
import SellerTicketHeader from "@/components/molecules/tickets/SellerTicketHeader";
import SellerTicketInfo from "@/components/molecules/tickets/SellerTicketInfo";
import SellerTicketReplyForm from "@/components/molecules/tickets/SellerTicketReplyForm";

type ReplyFormValues = {
  reply: string;
  status: "open" | "pending" | "closed";
};

const SellerTicketDetailsWrapper = ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
  const router = useRouter();
  const [replyToSellerTicket, { isLoading: isReplying }] =
    useReplyToSellerTicketMutation();

  const {
    data: sellerTicketDetails,
    isLoading,
    isError,
  } = useGetSellerTicketByIdQuery({ token, id });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ReplyFormValues>({
    defaultValues: {
      reply: "",
      status: "closed",
    },
  });

  const onSubmit = async (data: ReplyFormValues) => {
    try {
      const response = await replyToSellerTicket({
        token,
        id,
        ...data,
      }).unwrap();
      toast.success(
        response.message || "Reply and status updated successfully!"
      );
      router.push("/tickets");
    } catch (error) {
      const apiError = error as { data?: { message?: string } };
      const errorMessage =
        apiError?.data?.message || "Failed to update ticket.";
      toast.error(errorMessage);
    }
  };

  if (isLoading) return <div>Loading seller ticket details...</div>;
  if (isError || !sellerTicketDetails?.ticket)
    return <div>Failed to load ticket details.</div>;

  const {
    ticketNumber,
    subject,
    description,
    imageUrl,
    status,
    createdAt,
    adminReply,
    Seller,
  } = sellerTicketDetails.ticket;

  return (
    <div className="w-full max-w-sm space-y-4">
      <SellerTicketHeader
        ticketNumber={ticketNumber}
        subject={subject}
        description={description}
        image={imageUrl}
        status={status}
        createdAt={createdAt}
        adminReply={adminReply}
        onBack={() => router.back()}
      />

      <SellerTicketInfo name={Seller.sellerName} email={Seller.email} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <SellerTicketReplyForm
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

export default SellerTicketDetailsWrapper;
