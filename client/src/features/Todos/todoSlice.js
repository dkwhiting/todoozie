import { createSlice } from "@reduxjs/toolkit";
import { getDatabase, ref, push, set } from "firebase/database";
import { auth } from "../../firebase";


const initialState = {
  todos: []
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
    })
  }
})

export const { newTodo, deleteTodo, initializeTodos } = todoSlice.actions

export default todoSlice.reducer