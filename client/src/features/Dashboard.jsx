import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import useGetDates from '../useGetDates'

const Dashboard = () => {
  const tasks = useSelector(state => state.todos.todos)
  const [today, tomorrow] = useGetDates()

  console.log(typeof today, tomorrow)

  return (
    <div className="flex flex-col p-5 w-full">
      <h2 className="text-3xl mb-8">Dashboard</h2>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h3 className="text-xl">Today</h3>
          <button className="flex gap-1 items-center"><Icon icon="ph:arrows-down-up-bold" />Sort by</button>
        </div>
        <div className="flex flex-col">
          {tasks
            .filter(task => task.dueDate == today)
            .map(task => {
              return (
                <div key={task.id} className="flex gap-5 hover:shadow p-1 rounded items-center">
                  <div className="w-4 h-4 border-solid border border-black rounded hover:cursor-pointer" />
                  <span className="min-w-1/2">{task.title}</span>
                  <span className="text-slate-400">{task.description}</span>
                </div>
              )
            })}
        </div>
        <h3 className="text-xl">Tomorrow</h3>
        <div className="flex flex-col">
          {tasks.filter(task => task.dueDate == tomorrow).map(task => {
            return (
              <div className="flex gap-5">
                <span>{task.title}</span>
                <span className="text-slate-400">{task.description}</span>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

export default Dashboard
