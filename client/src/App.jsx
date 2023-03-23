import './App.css'
import NavBar from './features/NavBar/NavBar'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { auth } from './firebase';
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { getDatabase, ref, child, get } from "firebase/database";
import {
  Dashboard,
  Todos,
  Projects,
  Messages,
  Settings,
  Login
} from './features'
import { setUser } from './features/userSlice'
import { initializeTodos } from './features/Todos/todoSlice'

function App() {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user.currentUser)
  const authToken = useSelector((state) => state.user.authToken)
  const todos = useSelector((state) => state.todos.todos)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Fetch tasks from db
        const dbRef = ref(getDatabase());
        get(child(dbRef, `tasks/${user.uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            const newTodos = []
            Object.entries(snapshot.val()).map(todo => {
              todo[1].id = todo[0]
              newTodos.push(todo[1])
            })
            dispatch(initializeTodos(newTodos))
          }
        }).catch((error) => {
          console.error(error);
        });
        // Fetch projects from db
        get(child(dbRef, `projects/${user.uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            const newProjects = []
            Object.entries(snapshot.val()).map(project => {
              project[1].id = project[0]
              newTodos.push(project[1])
            })
            dispatch(initializeTodos(newTodos))
          }

        }).catch((error) => {
          console.error(error);
        });


        console.log(todos)
      } else {
        console.log('You are not logged in')
      }
    });
    //update tasks
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
