import {
  AdminStatsResponse,
  LatestOrder,
  LatestOrderResponse,
  LatestTicketsResponse,
  LatestUser,
  LatestUsersResponse,
  OrdersByCategoryResponse,
  RawUser,
  RevenueAnalyticsResponse,
} from "@/types/dashboard";
import { apiSlice } from "./api";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminStats: builder.query<AdminStatsResponse, string>({
      query: (token) => ({
        url: "api/admin/dashboard/admin-stats",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getRevenueAnalytics: builder.query<RevenueAnalyticsResponse, string>({
      query: (token) => ({
        url: "api/admin/dashboard/analytics/revenue",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    getOrdersByCategory: builder.query<OrdersByCategoryResponse, string>({
      query: (token) => ({
        url: "api/admin/dashboard/analytics/orders-by-category",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getLatestUsers: builder.query<LatestUsersResponse, string>({
      query: (token) => ({
        url: "api/admin/dashboard/latest-users",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

      transformResponse: (response: {
        message: string;
        count: number;
        users: RawUser[];
      }): LatestUsersResponse => {
        const transformedUsers: LatestUser[] = response.users.map((user) => ({
          ...user,
          name: `${user.firstName} ${user.lastName || ""}`.trim(),
        }));

        return {
          message: response.message,
          count: response.count,
          users: transformedUsers,
        };
      },
    }),
    getLatestOrders: builder.query<LatestOrderResponse, string>({
      query: (token) => ({
        url: "api/admin/dashboard/latest-orders",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

      transformResponse: (
        response: LatestOrderResponse
      ): LatestOrderResponse => {
        const transformedOrders: LatestOrder[] = response.orders.map(
          (order) => ({
            ...order,
            name: `${order.User.firstName} ${order.User.lastName || ""}`.trim(),
            status: order.orderStatus,
          })
        );

        return {
          ...response,
          orders: transformedOrders,
        };
      },
    }),
    getLatestTickets: builder.query<LatestTicketsResponse, string>({
      query: (token) => ({
        url: "api/admin/dashboard/latest-tickets",
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
  useGetAdminStatsQuery,
  useGetRevenueAnalyticsQuery,
  useGetOrdersByCategoryQuery,
  useGetLatestUsersQuery,
  useGetLatestOrdersQuery,
  useGetLatestTicketsQuery,
} = dashboardApi;
