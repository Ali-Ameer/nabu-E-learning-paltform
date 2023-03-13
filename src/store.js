import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import darkModeReducer from './features/darkModeSlice'
import langReducer from './features/langSlice'
import userReducer from './features/userSlice'
import { api } from './services/api'

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({ 
    [api.reducerPath]: api.reducer, 
    darkMode: darkModeReducer, 
    language: langReducer,
    user: userReducer 
});

const rootReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(api.middleware),
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
    devTools: true

})

setupListeners(store.dispatch)