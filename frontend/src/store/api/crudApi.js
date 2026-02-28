import { apiSlice } from './apiSlice.js'

export const crudApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => '/items',
      providesTags: ['Items'],
    }),
    getItemById: builder.query({
      query: (id) => `/items/${id}`,
      providesTags: ['Items'],
    }),
    createItem: builder.mutation({
      query: (data) => ({
        url: '/items',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Items'],
    }),
    updateItem: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/items/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Items'],
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `/items/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Items'],
    }),
  }),
})

export const {
  useGetItemsQuery,
  useGetItemByIdQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = crudApi