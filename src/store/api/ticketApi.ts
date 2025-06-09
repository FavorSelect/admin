import {
  SellerTicketResponse,
  SellerTicketResponseById,
} from "@/types/sellerTicket";
import { apiSlice } from "./api";
import {
  UserTicket,
  UserTicketResponse,
  UserTicketResponseById,
} from "@/types/userTicket";

export const ticketApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserTickets: builder.query<UserTicketResponse, string>({
      query: (token) => ({
        url: "api/support/user/admin/all-tickets",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

      transformResponse: (response: UserTicketResponse): UserTicketResponse => {
        const transformedTickets: UserTicket[] = response.tickets.map(
          (ticket) => ({
            ...ticket,
            user: `${ticket.User.firstName} ${
              ticket.User.lastName || ""
            }`.trim(),
          })
        );

        return {
          ...response,
          tickets: transformedTickets,
        };
      },
    }),
    getUserTicketById: builder.query<
      UserTicketResponseById,
      { token: string; id: string }
    >({
      query: ({ token, id }) => ({
        url: `api/support/user/admin/all-tickets/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getSellerTickets: builder.query<SellerTicketResponse, string>({
      query: (token) => ({
        url: "api/support/seller/admin/all-tickets",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getSellerTicketById: builder.query<
      SellerTicketResponseById,
      { token: string; id: string }
    >({
      query: ({ token, id }) => ({
        url: `api/support/seller/admin/all-tickets/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    replyToUserTicket: builder.mutation<
      { message: string },
      { token: string; id: string; reply: string; status: string }
    >({
      query: ({ token, id, reply, status }) => ({
        url: `api/support/user/admin/reply/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: { adminReply: reply, status },
      }),
    }),
    replyToSellerTicket: builder.mutation<
      { message: string },
      { token: string; id: string; reply: string; status: string }
    >({
      query: ({ token, id, reply, status }) => ({
        url: `api/support/seller/admin/reply/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: { adminReply: reply, status },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUserTicketsQuery,
  useGetUserTicketByIdQuery,
  useGetSellerTicketsQuery,
  useGetSellerTicketByIdQuery,
  useReplyToUserTicketMutation,
  useReplyToSellerTicketMutation,
} = ticketApi;
