import { apiSlice } from './apiSlice.js'

export const prescriptionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPrescriptions: builder.query({
      query: () => '/prescriptions',
      providesTags: ['Prescriptions'],
    }),
    getPrescription: builder.query({
      query: (id) => `/prescriptions/${id}`,
      providesTags: ['Prescriptions'],
    }),
    createPrescription: builder.mutation({
      query: (data) => ({ url: '/prescriptions', method: 'POST', body: data }),
      invalidatesTags: ['Prescriptions'],
    }),
  }),
})

export const {
  useGetPrescriptionsQuery,
  useGetPrescriptionQuery,
  useCreatePrescriptionMutation,
} = prescriptionApi
