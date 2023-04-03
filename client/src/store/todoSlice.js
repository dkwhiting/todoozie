import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  today: null,
  tomorrow: null
}

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    newTodo: ((state, action) => {
      state.todos.push(action.payload)
    }),
    deleteTodo: ((state, action) => {
      state.todos.filter(todo => todo.id !== action.payload.id)
    }),
    initializeTodos: ((state, action) => {
      state.todos = action.payload
    }),
    toggleTaskStatus: ((state, action) => {
      const currentTask = [...state.todos.filter(todo => todo.id === action.payload)]
      console.log(currentTask)
      // currentTask.status = 'Complete'
      // console.log(action.payload)
      // state.todos = [...state.todos.filter(todo => todo.id !== action.payload.id), currentTask]
    }),
  }
})

export const { newTodo, deleteTodo, initializeTodos, toggleTaskStatus } = todoSlice.actions

export default todoSlice.reducer