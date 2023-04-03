import React from 'react'
import "./AdminDashboard.css"
import AdminLeftSideMenu from '../admin-left-side-menu/AdminLeftSideMenu'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div>
    <div className='row g-1'>
      <div className='col-md-2 mt-5'>
        <AdminLeftSideMenu />
      </div>
      <div className='col-md-10'>
      <Outlet />
    </div>
    </div>
  </div>
  )
}

export default AdminDashboard