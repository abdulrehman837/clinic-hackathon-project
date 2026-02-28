import { apiSlice } from './apiSlice.js'

export const patientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPatients: builder.query({
      query: () => '/patients',
      providesTags: ['Patients'],
    }),
    getPatient: builder.query({
      query: (id) => `/patients/${id}`,
      providesTags: ['Patients'],
    }),
    createPatient: builder.mutation({
      query: (data) => ({ url: '/patients', method: 'POST', body: data }),
      invalidatesTags: ['Patients'],
    }),
    updatePatient: builder.mutation({
      query: ({ id, ...data }) => ({ url: `/patients/${id}`, method: 'PUT', body: data }),
      invalidatesTags: ['Patients'],
    }),
    deletePatient: builder.mutation({
      query: (id) => ({ url: `/patients/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Patients'],
    }),
  }),
})

export const {
  useGetPatientsQuery,
  useGetPatientQuery,
  useCreatePatientMutation,
  useUpdatePatientMutation,
  useDeletePatientMutation,
} = patientApi
