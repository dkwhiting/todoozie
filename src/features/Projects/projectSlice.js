import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [
    {
      id: 1,
      title: 'Create ToDo App'
    },
    {
      id: 2,
      title: 'Create Score Keeper App'
    },
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