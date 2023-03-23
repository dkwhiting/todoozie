import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import ProjectNav from './ProjectNav'


const NavBar = () => {
  const [path, setPath] = useState(window.location.href)
  const [open, setOpen] = useState('')
  const currentUser = useSelector((state) => state.user.currentUser)

  useEffect(() => {
    setPath(window.location.href)
    console.log(path)
  }, [open])

  return (
    <div className="flex flex-col relative bg-slate-600 text-white [&>*]:pl-3 [&>*]:pr-20 [&>*]:py-1.5">
      <NavLink className={({ isActive }) =>
        isActive ? `bg-white px-3 text-black rounded-l-lg ` : 'hover:bg-slate-400 rounded-l-lg'}
        to="dashboard"
      > Dashboard</NavLink >
      <NavLink className={({ isActive }) =>
        isActive ? "bg-white px-3 text-black rounded-l-lg" : 'hover:bg-slate-400 rounded-l-lg'} to="tasks">Tasks</NavLink>
      <ProjectNav
        onClick={() => { setOpen('projects'); console.log(open) }}
        open={open}
        path={path} />
      <NavLink className={({ isActive }) =>
        isActive ? "bg-white px-3 text-black rounded-l-lg" : 'hover:bg-slate-400 rounded-l-lg'} to="messages">Messages</NavLink>
      <NavLink className={({ isActive }) =>
        isActive ? "bg-white px-3 text-black rounded-l-lg" : 'hover:bg-slate-400 rounded-l-lg'} to="settings">Settings</NavLink>
      {
        !currentUser
          ? <NavLink className={({ isActive }) =>
            isActive ? "bg-white px-3 text-black rounded-l-lg" : 'hover:bg-slate-400 rounded-l-lg'} to="login">Login</NavLink>
          : <NavLink className={({ isActive }) =>
            isActive ? "bg-white px-3 text-black rounded-l-lg" : 'hover:bg-slate-400 rounded-l-lg'} to="account">Log Out</NavLink>
      }
    </div>
  )
}

export default NavBar

