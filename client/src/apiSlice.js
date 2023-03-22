import { createApi } from '@reduxjs/toolkit/query/react'
const API_URL = import.meta.env.VITE_API_URL

export const shopAPI = createApi({
  reducerPath: 'shopAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({

  }),
})