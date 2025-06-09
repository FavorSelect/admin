import {
  DeleteMembershipResponse,
  MembershipResponse,
  MembershipResponseById,
  MembershipUpdateResponse,
} from "@/types/membership";
import { apiSlice } from "./api";
import { MembershipFormValues } from "@/components/molecules/membership/AddMembershipForm";

export const membershipApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMemberships: builder.query<MembershipResponse, string>({
      query: (token) => ({
        url: "api/admin/dashboard/memberships",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getMembershipById: builder.query<
      MembershipResponseById,
      { token: string; id: string }
    >({
      query: ({ token, id }) => ({
        url: `api/admin/dashboard/memberships/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    createMembership: builder.mutation<
      { message: string },
      { token: string; data: MembershipFormValues }
    >({
      query: ({ token, data }) => ({
        url: "api/admin/dashboard/memberships/create-membership",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
    deleteMembership: builder.mutation<
      DeleteMembershipResponse,
      { token: string; id: string }
    >({
      query: ({ token, id }) => ({
        url: `api/admin/dashboard/memberships/${id}/delete-membership`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateMembership: builder.mutation<
      MembershipUpdateResponse,
      { token: string; id: string; data: MembershipFormValues }
    >({
      query: ({ token, id, data }) => ({
        url: `api/admin/dashboard/memberships/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllMembershipsQuery,
  useGetMembershipByIdQuery,
  useCreateMembershipMutation,
  useDeleteMembershipMutation,
  useUpdateMembershipMutation,
} = membershipApi;
