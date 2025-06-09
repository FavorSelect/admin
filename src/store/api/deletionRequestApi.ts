import {
  DeletionRequestResponse,
  DeletionRequestResponseById,
} from "@/types/userDeletionRequest";
import { apiSlice } from "./api";

export const deletionRequestApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDeletionRequests: builder.query<DeletionRequestResponse, string>({
      query: (token) => ({
        url: "api/support/deletion-requests",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getDeletionRequestById: builder.query<
      DeletionRequestResponseById,
      { token: string; id: string }
    >({
      query: ({ token, id }) => ({
        url: `api/support/deletion-requests/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllDeletionRequestsQuery,
  useGetDeletionRequestByIdQuery,
} = deletionRequestApi;
