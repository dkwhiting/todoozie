import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className="flex flex-col bg-slate-600">
      <NavLink to="dashboard">Dashboard</NavLink>
      <NavLink to="tasks">Tasks</NavLink>
      <NavLink to="projects">Projects</NavLink>
      <NavLink to="messages">Messages</NavLink>
      <NavLink to="settings">Settings</NavLink>
    </div>
  )
}

export default NavBar

