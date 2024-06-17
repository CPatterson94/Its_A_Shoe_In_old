import { api } from "./api";
const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/api/products",
    }),
    getProduct: builder.query({
      query: (id) => "/api/products/" + id,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = postApi;