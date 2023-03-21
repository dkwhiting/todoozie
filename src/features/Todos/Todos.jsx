import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import NewTodo from './NewTodo'
import SingleTodo from './SingleTodo'

const Todos = () => {
  const todos = useSelector((state) => state.todos.todos)
  const projects = useSelector((state) => state.projects.projects)
  const [dates, setDates] = useState([])
  const [view, setView] = useState('project')

  useEffect(() => {
    const getDates = () => {
      const newDates = []
      todos.forEach(todo => {
        const month = todo.dueDate.slice(5, 2)
        const year = todo.dueDate.slice(0, 4)
        console.log(month)
        if (!newDates.includes(todo.dueDate))
          newDates.push(todo.dueDate)
      })
      setDates(newDates)
    }
    getDates()
    console.log(dates)
  }, [todos])



  return (
    <div className="flex flex-col">
      <div className="flex">
        <button onClick={() => setView('project')}>Project View</button>
        <button onClick={() => setView('date')}>Date View</button>
      </div>

      <div className="flex flex-col">
        {view === 'date'
          ? dates.map(date => {
            return (
              <div className="flex flex-col">
                {date}
                <div className="flex flex-col pl-5">
                  {
                    todos.filter(todo => todo.dueDate === date).map(todo => {
                      return (

                        <SingleTodo todo={todo} />
                      )
                    })
                  }
                </div>
              </div>
            )
          })
          : projects.map(project => {
            return (
              <div className="flex flex-col">
                {project.title}
                <div className="flex flex-col pl-5">
                  {
                    todos.filter(todo => todo.projectId === project.id).map(todo => {
                      return (

                        <SingleTodo todo={todo} />
                      )
                    })
                  }
                </div>
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
