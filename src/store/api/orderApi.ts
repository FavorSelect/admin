import { apiSlice } from "./api";
import { OrderResponse, Order, OrderResponseById } from "@/types/order";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<OrderResponse, string>({
      query: (token) => ({
        url: "api/common-seller-admin/admin/orders",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response: OrderResponse): OrderResponse => {
        const transformedOrders: Order[] = response.orders.map((order) => ({
          ...order,
          customer: `${order.User.firstName} ${
            order.User.lastName || ""
          }`.trim(),
          status: order.orderStatus,
        }));

        return {
          ...response,
          orders: transformedOrders,
        };
      },
    }),

    getOrderById: builder.query<
      OrderResponseById,
      { token: string; id: string }
    >({
      query: ({ token, id }) => ({
        url: `api/common-seller-admin/admin/orders/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetOrdersQuery, useGetOrderByIdQuery } = orderApi;
