/* eslint-disable @typescript-eslint/no-explicit-any */
import { CategoryResponse } from "@/types/category";
import { apiSlice } from "./api";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation<
      { message: string },
      { token: string; data: FormData }
    >({
      query: ({ token, data }) => ({
        url: "api/admin/dashboard/categories/create-categories",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
    }),
    createSubCategory: builder.mutation<any, { token: string; data: FormData }>(
      {
        query: ({ token, data }) => ({
          url: "api/admin/dashboard/categories/create-categories",
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }),
      }
    ),
    getAllCategories: builder.query<CategoryResponse, void>({
      query: () => ({
        url: "api/general/categories",
        method: "GET",
      }),
    }),
    getSubcategoriesById: builder.query<any, { token: string; id: string }>({
      query: ({ token, id }) => ({
        url: `api/admin/dashboard/categories/${id}/subcategories`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    deleteCategory: builder.mutation<any, { token: string; id: string }>({
      query: ({ token, id }) => ({
        url: `api/admin/dashboard/categories/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateCategory: builder.mutation<
      any,
      { token: string; id: string; data: FormData }
    >({
      query: ({ token, id, data }) => ({
        url: `api/admin/dashboard/categories/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateCategoryMutation,
  useCreateSubCategoryMutation,
  useGetAllCategoriesQuery,
  useGetSubcategoriesByIdQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
