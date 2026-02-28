import { apiSlice } from './apiSlice.js'

export const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminAnalytics: builder.query({ query: () => '/analytics/admin' }),
    getDoctorAnalytics: builder.query({ query: () => '/analytics/doctor' }),
  }),
})

export const { useGetAdminAnalyticsQuery, useGetDoctorAnalyticsQuery } = analyticsApi
