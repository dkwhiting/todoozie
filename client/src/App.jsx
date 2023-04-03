import './App.css'
import NavBar from './features/NavBar/NavBar'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
  Dashboard,
  Todos,
  Projects,
  Messages,
  Settings,
  Login
} from './features'
const auth = getAuth()
import Header from './features/Header'
import { getAuth } from 'firebase/auth'
import { useGetProjectsQuery } from './store/shopApi'


function App() {
  const dispatch = useDispatch()
  // const { data, isFetching, isLoading } = useGetProjectsQuery(auth.currentUser?.uid)

  useEffect(() => {

    // console.log('this is user', auth.currentUser?.uid)
    // console.log('this is data', data)
  }, [])



  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex h-full">
        <NavBar />
        <div className="flex flex-col w-full">
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
    </div>
  )
}

export default App
