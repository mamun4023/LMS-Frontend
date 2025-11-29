import { createApi } from "@reduxjs/toolkit/query"
import BaseQuery from "./baseQuery"

export const apiSlice = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
  tagTypes: ['Post'],
  endpoints: builder => ({
    getUser: builder.query<any, any>({
      query: (id) => `/users/${id}`,
    }),
  })
})

export const {

} = apiSlice    