/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "./api";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation<any, { data: FormData }>({
      query: ({ data }) => ({
        url: "api/admin/dashboard/add-products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    fetchProducts: builder.query<any[], void>({
      query: () => ({
        url: "api/admin/dashboard/products",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((p) => ({ type: "Product" as const, id: p.id })),
              { type: "Product" as const, id: "LIST" },
            ]
          : [{ type: "Product" as const, id: "LIST" }],
    }),

    fetchProductById: builder.query<any, string>({
      query: (id) => ({
        url: `api/admin/dashboard/products/${id}`,
        method: "GET",
      }),
      providesTags: (_res, _err, id) => [{ type: "Product", id }],
    }),
    updateProduct: builder.mutation<any, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `api/admin/dashboard/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_res, _err, { id }) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),

    deleteProduct: builder.mutation<any, string>({
      query: (id) => ({
        url: `api/admin/dashboard/delete-product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_res, _err, id) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

// Hooks
export const {
  useAddProductMutation,
  useFetchProductsQuery,
  useFetchProductByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
