import React from 'react'

const SingleProject = ({ project }) => {
  return (
    <div key={project.id}>
      {project.title}
    </div>
  )
}

export default SingleProject
