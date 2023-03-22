import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './features/Todos/todoSlice'
import projectReducer from './features/Projects/projectSlice'
import userReducer from './features/userSlice'

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    projects: projectReducer,
    user: userReducer
  },
})