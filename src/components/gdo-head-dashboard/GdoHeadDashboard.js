import React from "react";
import GdoSideMenu from "../gdo-side-menu/GdoSideMenu";
import GetAllProjects from "../get-all-projects/GetAllProjects";
import { Outlet } from "react-router-dom";

const GdoHeadDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row g-2">
        <div className="col-md-2 mt-5">
          <GdoSideMenu />
        </div>
        <div className="col-md-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default GdoHeadDashboard;
