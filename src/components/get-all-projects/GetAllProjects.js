import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UpdateProjectDetails from "../update-project-details/UpdateProjectDetails";
import Table from 'react-bootstrap/Table';

const GetAllProjects = () => {
  //state for projects
  let [projects, setProjects] = useState([]);

  //state for error
  let [error, setError] = useState("");

  //state for update
  let [showUpdate, setShowUpdate] = useState(false);

  //state for setting current project
  let [project, setProject] = useState({});

  //state for response
  let [response, setResponse] = useState("");

  //get token from session storage
  let token = sessionStorage.getItem("token");

  //navigate
  let navigate = useNavigate();

  //state for delete
  let [deletes, setDeletes]=useState(false)

  //get state from store
  let { userObj } = useSelector((state) => state.login);

  //get projects
  const getProjects = async () => {
    try {
      //make http request based on role
      if (userObj.role === "Admin") {
        var res = await axios.get("http://localhost:4000/admin-api/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      if (userObj.role === "project manager") {
        res = await axios.get(
          `http://localhost:4000/project-manager-api/projects/${userObj.email}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      if (userObj.role === "GDO head") {
          res = await axios.get(
          `http://localhost:4000/gdoHead-api/projects/${userObj.email}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      console.log(res);
      setProjects(res.data.payload);
      setError("");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  useEffect(() => {
    getProjects();
  }, [deletes,showUpdate]);

  //navigate to project detailed view
  const projectDetailedView = (projectId) => {
    console.log("project id", projectId);
    navigate(`/project-detailed-view/${projectId}`);
  };

  //update projects modal
  const updateProject = (project) => {
    console.log("project object", project);
    setProject(project);

    setShowUpdate(true);
    console.log(showUpdate);
  };

  //delete project
  const deleteProject = async (projectId) => {
    try {
      //make http request
      let res = await axios.delete(
        `http://localhost:4000/admin-api/projectId/${projectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res);
      setResponse(res.data.message);
      setError("");
      setDeletes(true)
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="container-fluid mt-5 text-center ms-5">
      <p className="text-secondary display-6 text-center fw-bold">
        All Projects
      </p>
      <hr></hr>
      {error ? (
        <p className="text-center fw-bold text-danger fs-3">{error}</p>
      ) : (
        response && (
          <p className="text-center text-success fw-bold fs-3">{response}</p>
        )
      )}
      <div className="container-fluid">
      <Table responsive striped bordered hover className="text-center" style={{boxShadow:"4px 4px 7px #555"}}>
        <thead>
          <tr className="bg-success">
            <th>Name</th>
            <th>Client</th>
            <th>client account manager</th>
            <th>status</th>
            <th>start date</th>
            <th>Fitness Indicator</th>
            <th>GDO head</th>
            <th>Project manager</th>
            {
              userObj.role==="Admin" && <div><th></th> <th></th></div>
            }
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index}>
              <td onClick={() => projectDetailedView(project.projectId)}>
                {" "}
                {project.projectName}{" "}
              </td>
              <td onClick={() => projectDetailedView(project.projectId)}>
                {" "}
                {project.client}{" "}
              </td>
              <td onClick={() => projectDetailedView(project.projectId)}>
                {" "}
                {project.clientAccountManager}{" "}
              </td>
              <td onClick={() => projectDetailedView(project.projectId)}>
                {" "}
                {project.statusOfProject}{" "}
              </td>
              <td onClick={() => projectDetailedView(project.projectId)}>
                {" "}
                {project.startDate}{" "}
              </td>
              <td onClick={() => projectDetailedView(project.projectId)}>
                {" "}
                {project.overallProjectFitnessIndicator}{" "}
              </td>
              <td onClick={() => projectDetailedView(project.projectId)}>
                {" "}
                {project.gdoHeadEmail}{" "}
              </td>
              <td onClick={() => projectDetailedView(project.projectId)}>
                {" "}
                {project.projectManagerEmail}{" "}
              </td>
              {userObj.role === "Admin" && (
                <div className="ps-4">
                  <td>
                  <button className="btn btn-outline-warning me-3" onClick={()=>updateProject(project)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16" >
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg></button>
                  </td>
                  <td onClick={()=>deleteProject(project.projectId)}>
                  <button className="btn btn-outline-danger">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
</svg></button>
                  </td>
                </div>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
      {
        // conditional rendering for update modal
        showUpdate && (
          <UpdateProjectDetails
            showUpdate={showUpdate}
            setShowUpdate={setShowUpdate}
            project={project}
          />
        )
      }
    </div>
  );
};

export default GetAllProjects;
