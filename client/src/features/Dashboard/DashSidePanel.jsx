import React from 'react'
import RecentProjects from './RecentProjects'

const DashSidePanel = () => {

  return (
    <div className="h-full w-full border-l-2 border-slate-200 md:w-1/3 flex flex-col flex-wrap">
      <RecentProjects />
    </div>
  )
}

export default DashSidePanel
