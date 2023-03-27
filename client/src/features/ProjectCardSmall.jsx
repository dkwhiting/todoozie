import React from 'react'

const ProjectCardSmall = ({ project }) => {
  return (
    <div className="flex flex-auto flex-col items-center h-44 rounded-lg bg-red-300 w-[calc(50% - 15px)]">
      {project.title}
    </div>
  )
}

export default ProjectCardSmall
