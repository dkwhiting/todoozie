import React from 'react'
import { Icon } from '@iconify/react'
import { useSelector } from 'react-redux'
import ProjectCardSmall from '../Projects/ProjectCardSmall'



const RecentProjects = () => {
  const projects = useSelector(state => state.projects.projects)
  return (
    <div className="w-full h-full">
      <div className="flex justify-between">
        <h2 className="text-xl">Recent Projects</h2>
        <button className="flex gap-1 items-center"><Icon icon="ph:arrows-down-up-bold" />Sort by</button>
      </div>
      <div className="w-full flex flex-wrap gap-5 p-5">
        {
          projects.map(project => {
            return (
              <ProjectCardSmall project={project} />
            )
          })
        }
      </div>
    </div>
  )
}

export default RecentProjects
