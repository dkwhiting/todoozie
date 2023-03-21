import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useMatches } from 'react-router-dom'

const ProjectNav = ({ path, open }) => {
  const projects = useSelector((state) => state.projects.projects)

  console.log(projects)

  return (
    <>
      <NavLink className={({ isActive }) =>
        isActive ? "bg-white px-3 text-black rounded-l-lg" : 'hover:bg-slate-400 rounded-l-lg'} to="projects">Projects</NavLink>
      {
        open === 'projects'
          ? <div className="flex flex-col">
            {
              projects.map(project => {
                return (
                  <div key={project.id}>
                    <NavLink to={`projects/${project.id}`}>{project.title} </NavLink>
                  </div>
                )
              }
              )
            }
          </div>
          : null
      }
    </>
  )
}

export default ProjectNav
