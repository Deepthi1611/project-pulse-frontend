import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const error=useRouteError()
  //returns an error object if error occurs
  console.log(error)
  return (
    <div className='text-center'>
      <h2 className='text-danger'>{error.statusText}</h2>
      <h3 className='text-danger'>{error.data}</h3>
    </div>
  )
}

export default ErrorPage