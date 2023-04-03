import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import ProjectNav from './ProjectNav'
import { Icon } from '@iconify/react'
import NavBarItem from './NavBarItem'


const NavBar = () => {
  const [path, setPath] = useState(window.location.href)
  const [toggleOpen, setToggleOpen] = useState(false)
  const currentUser = useSelector((state) => state.user.currentUser)

  useEffect(() => {
    setPath(window.location.href)
  }, [open])

  return (
    <div className={`flex flex-col h-full py-3 bg-slate-600 text-white transition-all duration-300 ${toggleOpen ? 'w-44' : 'w-11'}`} >
      <div
        id="expand-button"
        className="scale(75) w-10 h-9 rotate-0 transition-all duration-500 cursor-pointer relative"
        onClick={() => setToggleOpen(!toggleOpen)}>
        <span className={`block absolute h-0.5 w-3/5 rounded opacity-100 left-2 rotate-0 transition-all duration-250 opacity-100 ${toggleOpen ? 'w-0 top-2 bg-transparent' : ' bg-white top-0'}`}></span>
        <span className={`block absolute h-0.5 w-3/5 bg-white rounded opacity-100 left-2 rotate-0 transition-all duration-250 top-2 ${toggleOpen ? 'rotate-45' : 'top-2'}`}></span>
        <span className={`block absolute h-0.5 w-3/5 bg-white rounded opacity-100 left-2 rotate-0 transition-all duration-250 top-2 ${toggleOpen ? '-rotate-45' : 'top-2'}`}></span>
        <span className={`block absolute h-0.5 w-3/5 rounded opacity-100 left-2 rotate-0 transition-all duration-250 opacity-100 ${toggleOpen ? 'w-0 top-2 bg-transparent' : 'bg-white top-4'}`}></span>
      </div>

      <div className="flex flex-col text-left" onClick={(e) => e.stopPropagation()}>
        <NavBarItem
          title={'Dashboard'}
          icon="material-symbols:space-dashboard-outline"
          path="dashboard"
          toggleOpen={toggleOpen}
        />
        <NavBarItem
          title={'Projects'}
          icon="ic:outline-folder"
          path="projects"
          toggleOpen={toggleOpen}
        />
        <NavBarItem
          title={'Tasks'}
          icon="material-symbols:event-list-outline-rounded"
          path="tasks"
          toggleOpen={toggleOpen}
        />

      </div>
      <div className="flex flex-col text-left mt-auto" onClick={(e) => e.stopPropagation()}>
        <NavBarItem
          title={'Account'}
          icon="ic:baseline-account-circle"
          path="account"
          toggleOpen={toggleOpen}
        />
        <NavBarItem
          title={'Settings'}
          icon="mdi:cog"
          path="settings"
          toggleOpen={toggleOpen}
        />
        <NavBarItem
          title={'Logout'}
          icon="material-symbols:logout-rounded"
          path="login"
          toggleOpen={toggleOpen}
        />


      </div>
    </div>

  )
}

export default NavBar

