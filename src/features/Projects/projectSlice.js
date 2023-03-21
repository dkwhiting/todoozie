import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [

  ],
  projectCounter: 5,
}


export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: ((state, action) => {
      ++state.projectCounter
      state.projects.push(action.payload)
    }),
    deleteProject: ((state, action) => {
      state.projects.filter(project => project.id !== action.payload.id)
    })
  }
})

export const { Project, deleteProject } = projectSlice.actions

export default projectSlice.reducer