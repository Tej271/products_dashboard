import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type Product } from '../../types';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
    }),
    getProduct: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),
    getCategories: builder.query<string[], void>({
      query: () => '/products/categories',
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoriesQuery,
} = productsApi;