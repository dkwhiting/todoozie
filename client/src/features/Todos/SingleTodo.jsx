import React from 'react'

const SingleTodo = ({ todo }) => {
  return (
    <div key={todo.id} className="flex gap-20">
      <div className="flex flex-col">{todo.title}</div>
      <div className="flex flex-col">{todo.description}</div>
      <div className="flex flex-col">{todo.status}</div>
      {/* <div className="flex flex-col">{todo.projectId}</div> */}
    </div>

  )
}

export default SingleTodo
