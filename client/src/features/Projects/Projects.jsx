import React from 'react'
import { useSelector } from 'react-redux'

import NewProject from './NewProject'
import SingleProject from './SingleProject'
import Spinner from '../Spinner'
import { useGetProjectsQuery } from '../../store/shopApi'

const Projects = () => {
  const currentUser = useSelector(state => state.auth.currentUser)
  const {
    data: projects,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetProjectsQuery(currentUser?.uid)

  let content

  console.log(projects)

  if (currentUser) {
    if (isLoading) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    content = projects?.map(project => <SingleProject key={project.id} project={project} />)
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }
  } 
  


  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        {content}
      </div>
      <NewProject />
    </div>
  )
}

export default Projects
