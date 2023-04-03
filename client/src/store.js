import { configureStore, } from '@reduxjs/toolkit'
import todoReducer from './store/todoSlice'
import projectReducer from './store/projectSlice'
import userReducer from './store/authSlice'
import { shopApi } from './store/shopApi'
import { getDefaultMiddleware } from '@reduxjs/toolkit'


export const store = configureStore({
  reducer: {
    todos: todoReducer,
    projects: projectReducer,
    user: userReducer,
    [shopApi.reducerPath]: shopApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(shopApi.middleware)
  }

})