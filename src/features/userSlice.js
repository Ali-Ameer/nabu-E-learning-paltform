import { createSelector, createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  token: "",
  loggedIn: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, actions) => {
      state.data = actions.payload.data;
      state.loggedIn = actions.payload.loggedIn;
    },
    setToken: (state, actions) => {
      state.token = actions.payload.accessToken;
    },
    setLogout: (state) => {
      state.data = [];
      state.loggedIn = false;
      state.token = "";
      localStorage.clear()
      window.location.reload()
    }
  },
})

export const { setUser, setToken, setLogout } = userSlice.actions
export default userSlice.reducer

export const selectUserData = state => state.user?.data;
export const selectUserId = state => state.user?.data._id;
export const selectUserCourse = state => state.user?.data.courses;

export const selectUserCourseById = createSelector(
  [selectUserCourse, (state, courseId) => courseId],
  (course, courseId) => course?.find(course => course._id === courseId) || false
)
export const selectUserLoggedIn = state => state.user?.loggedIn;