import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import useGetDates from '../useGetDates'
import DashSidePanel from './DashSidePanel'

const Dashboard = () => {
  const tasks = useSelector(state => state.todos.todos)
  const [today, tomorrow] = useGetDates()

  console.log(new Date(today))

  return (

    <div className="flex w-full h-full">
      <div className="flex flex-col p-5 w-full">
        <h2 className="text-3xl mb-8">Dashboard</h2>
        <div className="flex flex-col gap-2">
          {tasks.filter(task => new Date(task.dueDate) < new Date(today)).length > 0
            ? <>
              < div className="flex justify-between">
                <h3 className="text-xl">Past Due</h3>
                <button className="flex gap-1 items-center"><Icon icon="ph:arrows-down-up-bold" />Sort by</button>
              </div>
              <div className="flex flex-col">
                {
                  tasks.filter(task => new Date(task.dueDate) < new Date(today)).map(task => {
                    return (
                      <div key={task.id} className="flex gap-5 hover:shadow p-1 rounded items-center">
                        <div className="w-4 h-4 border-solid border border-slate-300 hover:bg-slate-100 rounded hover:cursor-pointer" />
                        <span className="w-3/12 min-w-150">{task.title}</span>
                        <span className="text-slate-400">{task.description}</span>
                        <span className="text-slate-400">{task.dueDate}</span>
                      </div>
                    )
                  })
                }
              </div>
            </>
            : ''
          }
          <div className="flex justify-between">
            <h3 className="text-xl">Today</h3>
          </div>
          <div className="flex flex-col">
            {tasks
              .filter(task => task.dueDate == today)
              .map(task => {
                return (
                  <div key={task.id} className="flex gap-5 hover:shadow p-1 rounded items-center">
                    <div className="w-4 h-4 border-solid border border-slate-300 hover:bg-slate-100 rounded hover:cursor-pointer" />
                    <span className="w-3/12">{task.title}</span>
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
      </div >
      <DashSidePanel />
    </div>
  )
}

export default Dashboard
