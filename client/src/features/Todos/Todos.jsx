import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import NewTodo from './NewTodo'
import SingleTodo from './SingleTodo'

const Todos = () => {
  const todos = useSelector((state) => state.todos.todos)
  const projects = useSelector((state) => state.projects.projects)
  const [dates, setDates] = useState([])
  const [view, setView] = useState('project')

  return (
    <div className="flex flex-col">
      <div className="flex">
        <button onClick={() => setView('project')}>Project View</button>
        <button onClick={() => setView('date')}>Date View</button>
      </div>

      <div className="flex flex-col">

        {todos?.map((todo, index) => {
          return (
            <div key={index} className="flex gap-20">
              <SingleTodo todo={todo} index={index} />
            </div>
          )
        })
        }

      </div>
      <NewTodo />
    </div>

  )
}

export default Todos
