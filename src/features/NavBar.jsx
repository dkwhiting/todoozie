import React from 'react'
import { NavLink } from 'react-router-dom'


const NavBar = () => {
  return (
    <div className="flex flex-col relative bg-slate-600 text-white [&>*]:px-4 [&>*]:py-1 gap-2">
      < NavLink className={({ isActive }) =>
        isActive ? `bg-white px-3 text-black rounded-l-lg ` : ''}
        to="dashboard" > Dashboard</NavLink >
      <NavLink className={({ isActive }) =>
        isActive ? "bg-white px-3 text-black rounded-l-lg" : ''} to="tasks">Tasks</NavLink>
      <NavLink className={({ isActive }) =>
        isActive ? "bg-white px-3 text-black rounded-l-lg" : ''} to="projects">Projects</NavLink>
      <NavLink className={({ isActive }) =>
        isActive ? "bg-white px-3 text-black rounded-l-lg" : ''} to="messages">Messages</NavLink>
      <NavLink className={({ isActive }) =>
        isActive ? "bg-white px-3 text-black rounded-l-lg" : ''} to="settings">Settings</NavLink>
    </div >
  )
}

export default NavBar

