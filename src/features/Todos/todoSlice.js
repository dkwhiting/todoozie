import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    {
      id: 1,
      title: 'todo1',
      description: 'first todo',
      priority: 'low',
      category: 'work',
      due: 'today'
    },
    {
      id: 2,
      title: 'todo2',
      description: 'second todo',
      priority: 'medium',
      category: 'personal',
      due: 'today'
    },
    {
      id: 3,
      title: 'todo3',
      description: 'third todo',
      priority: 'high',
      category: 'other',
      due: '3/20/23'
    },
  ],
  counter: 5,
}


export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: ((state, action) => {
      ++state.counter
      console.log(action.payload, 'this is payload')
      state.todos.push(action.payload)
      console.log(state.todos)
    }),
    deleteTodo: ((state, action) => {
      state.todos.filter(todo => todo.id !== action.payload.id)
    })
  }
})

export const { addTodo, deleteTodo, toggleTodoForm } = todoSlice.actions

export default todoSlice.reducer