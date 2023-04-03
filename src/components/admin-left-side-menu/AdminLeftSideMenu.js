import React from "react";
import { NavLink } from "react-router-dom";

function AdminLeftSideMenu() {

  return (
    <div>
      <ul className="nav flex-column bg-secondary bg-opacity-50 ps-5 pt-5 pb-5">
        {/* create project */}
        <li className="nav-item mb-4">
          <NavLink className="nav-item text-dark" to="create-project">
            <button className="btn btn-primary w-75">Create Project</button>
          </NavLink>
        </li>
        {/* project portfolio dashboard */}
        <li className="nav-item mb-4">
          <NavLink className="nav-item text-dark"
            to="get-all-projects">
            <button className="btn btn-primary w-75">Porfolio Dashboard</button>
          </NavLink>
        </li>
        {/* view resource requests */}
        <li className="nav-item mb-4">
          <NavLink
            className="nav-tem text-dark"
            to="view-resource-requests"
          >
           <button className="btn btn-primary w-75">View Resource Requests</button>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AdminLeftSideMenu;