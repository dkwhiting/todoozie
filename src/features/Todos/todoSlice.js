import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    {
      name: 'hello!'
    }
  ]
}

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: ((state, action) => {
      state.todos.push(action.payload)
    }),
    deleteTodo: ((state, action) => {
      state.todos.filter(todo => todo.id !== action.payload.id)
    }),
  }
})

export const { addTodo, deleteTodo } = todoSlice.actions

export default todoSlice.reducer