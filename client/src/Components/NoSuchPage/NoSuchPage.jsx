import React from 'react'
import { Link } from 'react-router-dom'
import './NoSuchPage.css'

const NoSuchPage = () => {
  return (
    <div className='noPageFound'>
        <h1>No Page Found</h1>
        <Link to ='/'>Go to Home</Link>
    </div>
  )
}

export default NoSuchPage