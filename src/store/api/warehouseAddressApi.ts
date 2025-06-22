/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "./api";

export const warehouseAddressApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET all warehouse addresses
    getWarehouseAddresses: builder.query<any, void>({
      query: () => ({
        url: "/api/admin/dashboard/warehouse-add/all",
        method: "GET",
      }),
      providesTags: ["WarehouseAddresses"],
    }),

    // Add a new warehouse address
    addWarehouseAddress: builder.mutation({
      query: (data: any) => ({
        url: "/api/admin/dashboard/warehouse-add/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["WarehouseAddresses"],
    }),

    //  Update existing warehouse address
    updateWarehouseAddress: builder.mutation({
      query: ({ id, data }: { id: number; data: any }) => ({
        url: `/api/admin/dashboard/warehouse-add/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["WarehouseAddresses"],
    }),

    deleteWarehouseAddress: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/admin/dashboard/warehouse-add/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["WarehouseAddresses"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetWarehouseAddressesQuery,
  useAddWarehouseAddressMutation,
  useUpdateWarehouseAddressMutation,
  useDeleteWarehouseAddressMutation,
} = warehouseAddressApi;
