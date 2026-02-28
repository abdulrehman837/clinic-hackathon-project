import { apiSlice } from './apiSlice.js'

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (role) => role ? `/users?role=${role}` : '/users',
      providesTags: ['Users'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({ url: `/users/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Users'],
    }),
  }),
})

export const { useGetUsersQuery, useDeleteUserMutation } = usersApi
