import React from 'react'
import { useSelector } from 'react-redux'
import { Icon } from '@iconify/react'
import RecentProjects from './RecentProjects'

const DashSidePanel = () => {
  const projects = useSelector(state => state.projects.projects)

  return (
    <div className="h-full border-l-2 border-slate-200 w-1/2 flex flex-col flex-wrap">
      <RecentProjects />
    </div>
  )
}

export default DashSidePanel
