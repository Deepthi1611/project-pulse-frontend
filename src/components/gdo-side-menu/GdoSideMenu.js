import React from 'react'
import { NavLink } from 'react-router-dom'

const GdoSideMenu = () => {
  return (
    <div style={{minHeight:"100vh"}}>
      <ul className="nav flex-column bg-secondary bg-opacity-50 ps-5 pt-5 pb-5">
        {/* Add team member */}
        <li className="nav-item mb-4">
          <NavLink className="nav-item text-dark" to="add-team-member">
            <button className="btn btn-primary w-75">Add team member</button>
          </NavLink>
        </li>
        {/* project portfolio dashboard */}
        <li className="nav-item mb-4">
          <NavLink className="nav-item text-dark"
            to="get-all-projects">
            <button className="btn btn-primary w-75">Porfolio Dashboard</button>
          </NavLink>
        </li>
        {/* raise a resource request */}
        <li className="nav-item">
          <NavLink
            className="nav-tem text-dark"
            to="raise-resource-request"
          >
           <button className="btn btn-primary w-75">Raise a resource request</button>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default GdoSideMenu