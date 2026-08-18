import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

/**
 * Общий экземпляр RTK Query для всего приложения.
 * Единый reducerPath 'api' и единая baseUrl.
 */
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  tagTypes: ['Tasks'],
  endpoints: () => ({}),
})