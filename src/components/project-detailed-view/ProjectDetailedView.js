import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProjectDetailedView.css";
import { useSelector } from "react-redux";
import UpdateTeamMember from "../update-team-member/UpdateTeamMember";
import Table from 'react-bootstrap/Table';

const ProjectDetailedView = () => {
  //get project Id
  let { projectId } = useParams();
  // console.log(projectId)

  //get token from session storage
  let token = sessionStorage.getItem("token");

  //get state from store
  let { userObj } = useSelector((state) => state.login);

  //state for update
  let [showUpdate, setShowUpdate] = useState(false);

  //state for current team member
  let [member, setMember] = useState({});

  //state for response
  // let [response, setResponse] = useState("");

  //states for project
  let [fitness, setFitness] = useState("");
  let [concerns, setConcerns] = useState([]);
  let [team, setTeam] = useState([]);
  let [projectRecord, setProjectRecord] = useState({});
  let [updates, setUpdates] = useState([]);
  let [deletes,setDeletes]=useState(false)

  //state for error
  let [error, setError] = useState("");

  //project detailed view
  const projectDetailedView = async () => {
    let res;
    //make http request based on user role
    try {
      if (userObj.role === "Admin") {
        res = await axios.get(
          `http://localhost:4000/admin-api/projectId/${projectId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      if (userObj.role === "GDO head") {
        res = await axios.get(
          `http://localhost:4000/gdoHead-api/projectId/${projectId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      if (userObj.role === "project manager") {
        res = await axios.get(
          `http://localhost:4000/project-manager-api/project/${projectId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      setFitness(res.data.payload.projectRecord.overallProjectFitnessIndicator);
      setConcerns(res.data.payload.projectRecord.project_concerns);
      setTeam(res.data.payload.projectRecord.team_compositions);
      setProjectRecord(res.data.payload.projectRecord);
      setUpdates(res.data.payload.project_updates);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  useEffect(() => {
    projectDetailedView();
  }, [showUpdate,deletes]);

  //update member details
  const updateMember = (member) => {
    setMember(member);
    setShowUpdate(true);
  };

  //delete team member
  const deleteTeam = async (empId) => {
    console.log("empId in deletion", empId);
    try {
      //make http request
      let res = await axios.delete(
        `http://localhost:4000/gdoHead-api/delete-team-member/empId/${empId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res);
      // setResponse(res.data.message);
      setError("");
      setDeletes(true)
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  return (
    <div>
      {/* error */}
      {error ? (
        <p className="text-center fw-bold text-danger fs-3">{error}</p>
      ) : (
        <div className="row container mx-auto g-3 mb-3">
          <div className="col-4">
            <div className="card text-center shadow p-3 mx-auto bg-light project-card">
              <div className="card-body">
                <h5 className="card-title fs-3 mb-3">
                  Project Overall Fitness
                </h5>
                <p className="card-text fs-5 mb-5 text-info fw-bold fs-3">
                {/* if fitness id red */}
                {
                  fitness==='red' && <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" class="bi bi-circle-fill" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="8"/>
                </svg>
                }
                {/* if fitness is green */}
                {
                  fitness === "green" && <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="green" class="bi bi-circle-fill" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="8"/>
                </svg>
                }
                {/* if fitness is amber */}
                {
                  fitness === "amber" && <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="orange" class="bi bi-circle-fill" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="8"/>
                </svg>
                }
                </p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card text-center shadow p-3 mx-auto bg-light project-card">
              <div className="card-body">
                <h5 className="card-title fs-3 mb-3">Project Concerns</h5>
                <p className="card-text fs-5 mb-5 text-primary fw-bold fs-3">
                  {concerns.length}
                </p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card text-center shadow p-3 mx-auto bg-light project-card">
              <div className="card-body">
                <h5 className="card-title fs-3 mb-3">Project Team members</h5>
                <p className="card-text fs-5 mb-5 text-info fw-bold fs-3">
                  {team.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <p className="display-6 text-center fw-bold register-text mt-5">
        Project Details
      </p>
      <hr></hr>
      <Table responsive bordered hover 
       className="text-center mx-auto table table-hover table-bordered project-table"
        style={{ width: "80%" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Client</th>
            <th>client account manager</th>
            <th>status</th>
            <th>start date</th>
            <th>Fitness Indicator</th>
            <th>Domain</th>
            <th>Type</th>
            <th>Team size</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{projectRecord.projectName}</td>
            <td>{projectRecord.client}</td>
            <td>{projectRecord.clientAccountManager}</td>
            <td>{projectRecord.statusOfProject}</td>
            <td>{projectRecord.startDate}</td>
            <td>{projectRecord.overallProjectFitnessIndicator}</td>
            <td>{projectRecord.domain}</td>
            <td>{projectRecord.typeOfProject}</td>
            <td>{team.length}</td>
          </tr>
        </tbody>
      </Table>
      {updates.length === 0 ? (
        <p className="text-center fw-bold text-danger fs-4 mt-4">
          No updates in last 2 weeks
        </p>
      ) : (
        <div>
          <p className="display-6 text-center fw-bold register-text mt-5">
            Project updates
          </p>
          <hr></hr>
          <table
            className="text-center mx-auto table table-hover table-bordered project-table"
            style={{ width: "80%" }}
          >
            <thead>
              <tr>
                <th>Date</th>
                <th>Status Update</th>
                <th>Schedule status</th>
                <th>Resourcing status</th>
                <th>Quality status</th>
                <th>waiting for cleint inputs</th>
              </tr>
            </thead>
            <tbody>
              {updates.map((update, index) => (
                <tr key={index}>
                  <td>{update.date}</td>
                  <td>{update.statusUpdate}</td>
                  <td>{update.scheduleStatus}</td>
                  <td>{update.resourcingStatus}</td>
                  <td>{update.resourcingStatus}</td>
                  <td>{update.qualityStatus}</td>
                  <td>{update.clientInputs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="display-6 text-center fw-bold register-text mt-5">
        Team Composition
      </p>
      <hr></hr>
      <Table responsive bordered hover
        className="text-center mx-auto table project-table"
        style={{ width: "80%" }}
      >
        <thead>
          <th>Employee name</th>
          <th>Role</th>
          <th>Start date</th>
          <th>status</th>
          <th>Billing status</th>
          <th>Exposed to customer or not</th>
          <th>Allocation type</th>
          {
            userObj.role==="GDO head" && <div><th><th></th></th></div>
          }
        </thead>
        <tbody>
          {team.map((teamObj, index) => (
            <tr key={index}>
              <td>{teamObj.empName}</td>
              <td>{teamObj.role}</td>
              <td>{teamObj.startDate}</td>
              <td>{teamObj.status}</td>
              <td>{teamObj.billingStatus}</td>
              <td>{teamObj.exposedToCustomer ? "Yes" : "No"}</td>
              <td>{teamObj.allocationType}</td>
              {userObj.role === "GDO head" && (
                <div className="ps-4">
                  <td>
                    <button className="btn btn-outline-warning me-3" onClick={() => updateMember(teamObj)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16" >
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg> 
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-warning me-3"
                      onClick={() => deleteTeam(teamObj.empId)}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
</svg>
                    </button>
                  </td>
                </div>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      {concerns.length === 0 ? (
        <p className="text-center fw-bold text-danger fs-4 mt-4">
          No concerns to display
        </p>
      ) : (
        <div>
          <p className="display-6 text-center fw-bold register-text mt-5">
            Project Concerns
          </p>
          <hr></hr>
          <Table responsive bordered hover
            className="text-center mx-auto table table-hover project-table"
            style={{ width: "80%" }}
          >
            <thead>
              <th>project name</th>
              <th>Description</th>
              <th>Raised By</th>
              <th>Raised On</th>
              <th>Severity</th>
              <th>Concern raised internally</th>
              <th>status</th>
              <th>mitigated on</th>
            </thead>
            <tbody>
              {concerns.map((concernObj, index) => (
                <tr key={index}>
                  <td>{projectRecord.projectName}</td>
                  <td>{concernObj.concernDescription}</td>
                  <td>{concernObj.raisedBy}</td>
                  <td>{concernObj.raisedOnDate}</td>
                  <td>{concernObj.severity}</td>
                  <td>{concernObj.concernRaisedInternallyOrNot}</td>
                  <td>{concernObj.status}</td>
                  <td>{concernObj.mitigatedOn}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      {
        // conditional rendering for update modal
        showUpdate && (
          <UpdateTeamMember
            showUpdate={showUpdate}
            setShowUpdate={setShowUpdate}
            member={member}
          />
        )
      }
    </div>
  );
};

export default ProjectDetailedView;
