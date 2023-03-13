import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  themeMode: localStorage.getItem("themeMode") || "light"
}

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggleDarkMode: (state, actions) => {
      state.themeMode = actions.payload;
      localStorage.setItem("themeMode", actions.payload);
    },
  },
})

export const {toggleDarkMode} = darkModeSlice.actions
export default darkModeSlice.reducer

export const selectThemeMode = state => state.darkMode?.themeMode 