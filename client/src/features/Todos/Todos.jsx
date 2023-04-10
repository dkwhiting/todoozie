import React from 'react'
import { useSelector } from 'react-redux'

import NewTodo from './NewTodo'
import SingleTodo from './SingleTodo'
import Spinner from '../Spinner'
import { useGetTasksQuery } from '../../store/shopApi'

const Todos = () => {
  const currentUser = useSelector(state => state.auth.currentUser)
  const {
    data: tasks,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetTasksQuery(currentUser?.uid)

  let content

  if (currentUser) {
    if (isLoading) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    content = tasks?.map(todo => <SingleTodo key={todo.id} todo={todo} />)
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }
  } 
  


  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        {content}
      </div>
      <NewTodo />
    </div>
  )
}

export default Todos
