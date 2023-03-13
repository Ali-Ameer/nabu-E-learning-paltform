import { createSlice } from '@reduxjs/toolkit'
import langData from '../lang/langData.json';

const initialState = {
  language: localStorage.getItem("language") || "en",
  data: langData[localStorage.getItem("language") || "en"]
}

export const langSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, actions) => {
      state.language = actions.payload;
      state.data = langData[actions.payload];
      localStorage.setItem("language", actions.payload);
    },
  },
})

export const { setLanguage } = langSlice.actions

export default langSlice.reducer

export const selectLanguageData = (state, component) => state.language?.data[component];
export const selectUserLanguage = (state) => state.language?.language;