import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import NewTodo from './NewTodo'

const Todos = () => {
  const todos = useSelector((state) => state.todos.todos)
  const [dates, setDates] = useState([])

  useEffect(() => {
    const getDays = () => {

      const newDates = []
      todos.forEach(todo => {
        if (!newDates.includes(todo.due))
          newDates.push(todo.due)
      })
      setDates(newDates)
      console.log(dates)
    }
    getDays()

  }, [todos])

  return (
    <div className="flex flex-col">

      <div className="flex flex-col">
        {
          dates.map(date => {
            return (
              <div className="flex flex-col">
                {date}
                <div className="flex flex-col">
                  {
                    todos.filter(todo => todo.due === date).map(todo => {
                      return (
                        <div className="flex gap-20">
                          <div className="flex flex-col">{todo.title}</div>
                          <div className="flex flex-col">{todo.description}</div>
                        </div>

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
