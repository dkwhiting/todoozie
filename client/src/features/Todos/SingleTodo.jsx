import React from 'react'

const SingleTodo = ({ todo }) => {
  return (
    <>
      <div className="flex flex-col">{todo.title}</div>
      <div className="flex flex-col">{todo.description}</div>
      <div className="flex flex-col">{todo.status}</div>
      {/* <div className="flex flex-col">{todo.projectId}</div> */}
    </>


  )
}

export default SingleTodo
