import { apiSlice } from "./api";
import {
  PendingSellersResponse,
  PendingSellersResponseById,
  SellersResponse,
  SellersResponseById,
} from "@/types/seller";

export const sellerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSellers: builder.query<SellersResponse, string>({
      query: (token) => ({
        url: "api/admin/dashboard/sellers",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getPendingSellers: builder.query<PendingSellersResponse, string>({
      query: (token) => ({
        url: "api/admin/dashboard/pending-seller",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getSellerById: builder.query<
      SellersResponseById,
      { token: string; id: string }
    >({
      query: ({ token, id }) => ({
        url: `api/admin/dashboard/sellers/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getPendingSellerById: builder.query<
      PendingSellersResponseById,
      { token: string; id: string }
    >({
      query: ({ token, id }) => ({
        url: `api/admin/dashboard/pending-seller/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    approveSeller: builder.mutation<
      { message: string },
      { token: string; id: string }
    >({
      query: ({ token, id }) => ({
        url: `api/admin/dashboard/pending-seller/${id}/approve`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    rejectSeller: builder.mutation<
      { message: string },
      { token: string; id: string }
    >({
      query: ({ token, id }) => ({
        url: `api/admin/dashboard/pending-seller/${id}/reject`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllSellersQuery,
  useGetPendingSellersQuery,
  useGetSellerByIdQuery,
  useGetPendingSellerByIdQuery,
  useApproveSellerMutation,
  useRejectSellerMutation,
} = sellerApi;
