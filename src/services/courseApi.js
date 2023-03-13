import { api } from "./api";

const courseApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllCourse: build.query({
      query: () => `/course`,
      invalidatesTags: [{ type: 'Course'}],
    }),
    getCourseById: build.query({
      query: (id) => "/course/" + id,
      invalidatesTags: [{ type: 'Course'}],
    }),
    getCourseInfo: build.query({
      query: (id) => "/course/info/" + id,
      invalidatesTags: [{ type: 'Course'}],
    })
  }),
  overrideExisting: false,
});

export const { useGetAllCourseQuery, useGetCourseByIdQuery, useGetCourseInfoQuery } = courseApi;
