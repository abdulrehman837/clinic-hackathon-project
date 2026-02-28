import { apiSlice } from './apiSlice.js'

export const aiApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    symptomChecker: builder.mutation({
      query: (data) => ({ url: '/ai/symptom-checker', method: 'POST', body: data }),
    }),
    prescriptionExplanation: builder.mutation({
      query: (data) => ({ url: '/ai/prescription-explanation', method: 'POST', body: data }),
    }),
    riskFlagging: builder.query({
      query: (patientId) => `/ai/risk-flagging/${patientId}`,
    }),
    predictiveAnalytics: builder.query({
      query: () => '/ai/predictive-analytics',
    }),
  }),
})

export const {
  useSymptomCheckerMutation,
  usePrescriptionExplanationMutation,
  useLazyRiskFlaggingQuery,
  usePredictiveAnalyticsQuery,
} = aiApi
