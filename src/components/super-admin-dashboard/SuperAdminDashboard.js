import React from 'react'
// import { Outlet, useNavigate } from 'react-router-dom'
import './SuperAdminDashboard.css'
import { Outlet } from 'react-router-dom'

const SuperAdminDashboard = () => {
  return (
    <div className='container'>
      < Outlet />
    </div>
  )
}

export default SuperAdminDashboard