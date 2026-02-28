import { apiSlice } from './apiSlice.js'

export const appointmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAppointments: builder.query({
      query: () => '/appointments',
      providesTags: ['Appointments'],
    }),
    createAppointment: builder.mutation({
      query: (data) => ({ url: '/appointments', method: 'POST', body: data }),
      invalidatesTags: ['Appointments'],
    }),
    updateAppointment: builder.mutation({
      query: ({ id, ...data }) => ({ url: `/appointments/${id}`, method: 'PUT', body: data }),
      invalidatesTags: ['Appointments'],
    }),
    cancelAppointment: builder.mutation({
      query: (id) => ({ url: `/appointments/${id}/cancel`, method: 'PUT' }),
      invalidatesTags: ['Appointments'],
    }),
  }),
})

export const {
  useGetAppointmentsQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useCancelAppointmentMutation,
} = appointmentApi
