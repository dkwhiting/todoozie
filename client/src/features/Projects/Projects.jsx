import React from 'react'
import { useSelector } from 'react-redux'

import NewProject from './NewProject'
import SingleProject from './SingleProject'

const Projects = () => {
  const projects = useSelector((state) => state.projects.projects)

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        {
          projects.map(project => {
            return (

              <SingleProject project={project} />
            )
          })
        }
      </div>
      <NewProject />
    </div>
  )
}

export default Projects
