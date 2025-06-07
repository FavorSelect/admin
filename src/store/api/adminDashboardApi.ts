import {
  PendingSellersResponse,
  PendingSellersResponseById,
  SellersResponse,
  SellersResponseById,
  UserResponse,
} from "@/types";
import { apiSlice } from "./api";

export const adminDashboardApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getUsers: builder.query<UserResponse, string>({
      query: (token: string) => ({
        url: "api/admin/dashboard/users",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response: UserResponse): UserResponse => {
        const transformedUsers = response.users.map((user) => ({
          ...user,
          name: `${user.firstName} ${user.lastName || ""}`.trim(),
        }));

        return {
          ...response,
          users: transformedUsers,
        };
      },
    }),

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
        url: `api/admin/dashboard/${id}/approve`,
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
});

export const {
  useGetUsersQuery,
  useGetAllSellersQuery,
  useGetPendingSellersQuery,
  useGetSellerByIdQuery,
  useGetPendingSellerByIdQuery,
  useApproveSellerMutation,
  useRejectSellerMutation,
} = adminDashboardApi;
