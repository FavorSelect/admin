/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "./api";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation<any, { token: string; data: FormData }>({
      query: ({ token, data }) => ({
        url: "api/admin/dashboard/add-products",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useAddProductMutation } = productApi;
