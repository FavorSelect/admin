/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "./api";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation<any, { data: FormData }>({
      query: ({ data }) => ({
        url: "api/admin/dashboard/add-products",
        method: "POST",
        headers: {
          
        },
        body: data,
      
        credentials: 'include',  
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useAddProductMutation } = productApi;
