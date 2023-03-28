import React from 'react'

const ProjectCardSmall = ({ project }) => {
  return (
    <div className="flex lg:w-[calc(50%_-_20px)] md:w-full sm:w-[calc(33%_-_20px)] w-[calc(50%_-_20px)] flex-auto flex-col flex-wrap items-center h-44 rounded-lg bg-red-300 " >
      {project.title}
    </div>
  )
}

export default ProjectCardSmall
