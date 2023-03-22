import './App.css'
import NavBar from './features/NavBar/NavBar'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { auth } from './firebase';
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import {
  Dashboard,
  Todos,
  Projects,
  Messages,
  Settings,
  Login
} from './features'
import { login, logout } from './features/userSlice'

function App() {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user.currentUser)
  const authToken = useSelector((state) => state.user.authToken)

  useEffect(() => {
    console.log(currentUser)
  }, [])

  return (
    <div className="flex h-full">
      <NavBar />
      <div className="flex flex-col">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tasks" element={<Todos />} />
          <Route path="projects" element={<Projects />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
