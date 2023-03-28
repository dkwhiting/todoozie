import React from 'react'
import { useState } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'


const NavBarItem = ({ title, icon, path, toggleOpen }) => {
  const [hover, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const navigate = useNavigate()



  return (
    <NavLink
      to={path}
    >
      <div
        className={`relative w-full flex items-center gap-3 cursor-pointer p-2`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}>
        <div className={`rounded-tr-2xl rounded-br-2xl h-full absolute top-0 left-0 bg-slate-500 transition-all duration-300 ${hover || window.location.href.includes(path) ? 'w-full' : 'w-0'}`} />
        <Icon className={`absolute w-6 h-6 ${title === 'Tasks' ? 'rotate-180' : ''}`} icon={icon} />
        <div className={`transition-all duration-200 ${toggleOpen ? 'opacity-100 translate-x-9' : 'opacity-0 -translate-x-full'}`}>
          <p>{title}</p>
        </div>
      </div>
    </NavLink>
  )
}

export default NavBarItem
