import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],

}

export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: ((state, action) => {
      state.projects.push(action.payload)
    }),
    deleteProject: ((state, action) => {
      state.projects.filter(project => project.id !== action.payload.id)
    }),
    initializeProjects: ((state, action) => {
      state.projects = action.payload
      console.log(state.projects)
    })
  }
})

export const { addProject, deleteProject, initializeProjects } = projectSlice.actions

export default projectSlice.reducer