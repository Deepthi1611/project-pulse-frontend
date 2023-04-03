import React from 'react'
import { NavLink } from 'react-router-dom'

const ProjectManagerSideMenu = () => {
  return (
    <div>
      <ul className="nav flex-column bg-secondary bg-opacity-50 ps-5 pt-5 pb-5">
        <li className="nav-item mb-4">
          {/* project portfolio dashboard */}
          <NavLink className="nav-item text-dark"
            to="get-all-projects">
            <button className="btn btn-primary w-75">Porfolio Dashboard</button>
          </NavLink>
        </li>
        {/* raise a project concern */}
        <li className="nav-item mb-4">
          <NavLink
            className="nav-tem text-dark"
            to="raise-project-concern"
          >
           <button className="btn btn-primary w-75">Raise a project concern</button>
          </NavLink>
        </li>
        {/* create project update */}
        <li className="nav-item">
          <NavLink
            className="nav-tem text-dark"
            to="project-updates"
          >
           <button className="btn btn-primary w-75">Create Project Update</button>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default ProjectManagerSideMenu