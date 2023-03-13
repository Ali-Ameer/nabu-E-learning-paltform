import { api } from "./api";

const UserApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: ( {...payload} ) => ({
        url: `/auth/login`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [{ type: 'User'}],
    }),
    singUp: build.mutation({
      query: ( {...payload} ) => ({
        url: `/user`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [{ type: 'User'}],
    }),
    getUser: build.query({
      query: (id) => "/user/" + id,
      invalidatesTags: [{ type: 'User'}],
    }),
    updateUser: build.mutation({
      query: ( {id, ...payload} ) => ({
        url: `/user/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: [{ type: 'User'}],
    }),
    updateUserAddCourse: build.mutation({
      query: ( {id, ...payload} ) => ({
        url: `/user/addCourse/${id}`,
        method: 'PUT',
        body: payload, 
      }),
      invalidatesTags: [{ type: 'User'}],
    }),

  }),
  overrideExisting: false,
});

export const { useLoginMutation, useSingUpMutation, useGetUserQuery, useUpdateUserMutation, useUpdateUserAddCourseMutation} = UserApi;
