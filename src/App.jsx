import './App.css'
import NavBar from './features/NavBar'
import { Routes, Route } from 'react-router-dom'
import {
  Dashboard,
  Todos,
  Projects,
  Messages,
  Settings
} from './features'

function App() {


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
        </Routes>
      </div>
    </div>
  )
}

export default App
