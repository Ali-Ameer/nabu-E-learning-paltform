import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Navigate } from 'react-router-dom'
import { setLogout, setToken } from '../features/userSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://192.168.0.182:8000/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.token
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }
      return headers
    },
    Credentials: 'include'
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.originalStatus === 401) {
      console.log('sending refresh token')
      // send refresh token to get new access token 
      const refreshResult = await baseQuery('/auth/refreshToken', api, extraOptions)
      console.log(refreshResult)
      if (refreshResult?.data) {
          // store the new token 
          api.dispatch(setToken({ ...refreshResult.data }))
          // retry the original query with new access token 
          result = await baseQuery(args, api, extraOptions)
      } else {
          api.dispatch(setLogout())
          console.log("cant't get new access token, logout");
      }
  }

  return result
}

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Courses', "User"],
  endpoints: builder => ({})
})