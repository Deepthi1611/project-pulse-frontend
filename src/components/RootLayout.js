import React from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div>
      {/* header */}
      <Header />
      {/* main content - dynamic */}
      <div style={{minHeight: "90vh"}} className="mt-5">
      <Outlet />
      </div>
      {/* footer */}
      <Footer />
    </div>
  )
}

export default RootLayout