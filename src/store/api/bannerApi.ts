import { AddBannerResponse } from "@/types/banner";
import { apiSlice } from "./api";

export const bannerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Add Homepage Banner
    addHomepageBanner: builder.mutation<
      AddBannerResponse,
      { token: string; data: FormData }
    >({
      query: ({ token, data }) => ({
        url: "api/advertisement/add-homepage-banners",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
    }),

    // Add Weekly Promotion Banner
    addWeeklyBanner: builder.mutation<
      AddBannerResponse,
      { token: string; data: FormData }
    >({
      query: ({ token, data }) => ({
        url: "api/advertisement/add-weekly-banners",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
    }),

    // Add Popular Banner
    addPopularBanner: builder.mutation<
      AddBannerResponse,
      { token: string; data: FormData }
    >({
      query: ({ token, data }) => ({
        url: "api/advertisement/add-popular-banners",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
    }),

    // Add Brand Poster
    addBrandPoster: builder.mutation<
      AddBannerResponse,
      { token: string; data: FormData }
    >({
      query: ({ token, data }) => ({
        url: "api/advertisement/add-brand-banners",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
    }),

    // Add Product Poster
    addProductPoster: builder.mutation<
      AddBannerResponse,
      { token: string; data: FormData }
    >({
      query: ({ token, data }) => ({
        url: "api/advertisement/add-product-banners",
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

export const {
  useAddHomepageBannerMutation,
  useAddWeeklyBannerMutation,
  useAddPopularBannerMutation,
  useAddBrandPosterMutation,
  useAddProductPosterMutation,
} = bannerApi;
