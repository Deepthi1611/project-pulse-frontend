import React from "react";
import { Outlet } from "react-router-dom";
import ProjectManagerSideMenu from "../project-manager-side-menu/ProjectManagerSideMenu";

const ProjectManagerDashboard = () => {
  return (
    <div>
      <div className="row g-2">
        <div className="col-md-2 mt-5">
          <ProjectManagerSideMenu />
        </div>
        <div className="col-md-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProjectManagerDashboard;
