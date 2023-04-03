// import logo from './logo.svg';
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import SuperAdminDashboard from "./components/super-admin-dashboard/SuperAdminDashboard";
import AdminDashboard from "./components/admin-dashboard/AdminDashboard"
import GdoHeadDashboard from "./components/gdo-head-dashboard/GdoHeadDashboard";
import ProjectManagerDashboard from "./components/project-manager-dashboard/ProjectManagerDashboard";
import GetUsers from "./components/get-users/GetUsers"
import AssignRole from "./components/assign-role/AssignRole"
import CreateProject from "./components/create-project/CreateProject";
import GetAllProjects from "./components/get-all-projects/GetAllProjects";
import UpdateProjectDetails from "./components/update-project-details/UpdateProjectDetails";
import ProjectDetailedView from "./components/project-detailed-view/ProjectDetailedView";
import ForgotPassword from "./components/forgot-password/ForgotPassword";
import ResetPassword from "./components/reset-pasword/ResetPassword";
import AddTeamMember from "./components/add-team-member/AddTeamMember"
import AdminLeftSideMenu from "./components/admin-left-side-menu/AdminLeftSideMenu";
import GdoSideMenu from "./components/gdo-side-menu/GdoSideMenu";
import ViewResourceRequests from "./components/view-resource-requests/ViewResourceRequests";
import RaiseResourcerequest from "./components/raise-resource-request/RaiseResourcerequest";
import ProjectManagerSideMenu from "./components/project-manager-side-menu/ProjectManagerSideMenu";
import RaiseProjectConcern from "./components/raise-project-concern/RaiseProjectConcern";
import ProjectUpdates from "./components/project-updates/ProjectUpdates";
import UpdateTeamMember from "./components/update-team-member/UpdateTeamMember";

function App() {
  //create browser router object
  const browserRouterObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/super-admin-dashboard",
          element: <SuperAdminDashboard />,
          children: [
            {
              path: "get-users",
              element: <GetUsers />,
            },
            {
              path: "assign-role",
              element: <AssignRole />,
            },
            {
              path: "",
              element: <GetUsers />,
            },
          ],
        },
        {
          path: "/admin-dashboard",
          element: <AdminDashboard />,
          children: [
            {
              path: "create-project",
              element: <CreateProject />,
            },
            {
              path: "get-all-projects",
              element: <GetAllProjects />,
            },
            {
              path: "view-resource-requests",
              element: <ViewResourceRequests />,
            },
            {
              path: "",
              element: <GetAllProjects />,
            },
          ],
        },
        {
          path: "/gdo-head-dashboard",
          element: <GdoHeadDashboard />,
          children: [
            {
              path: "gdo-side-menu",
              element: <GdoSideMenu />,
            },
            {
              path: "get-all-projects",
              element: <GetAllProjects />,
            },
            {
              path: "add-team-member",
              element: <AddTeamMember />,
            },
            {
              path: "raise-resource-request",
              element: <RaiseResourcerequest />,
            },
            {
              path: "",
              element: <GetAllProjects />,
            },
          ],
        },
        {
          path: "/project-manager-dashboard",
          element: <ProjectManagerDashboard />,
          children: [
            {
              path: "get-all-projects",
              element: <GetAllProjects />,
            },
            {
              path: "",
              element: <GetAllProjects />,
            },
            {
              path: "raise-project-concern",
              element: <RaiseProjectConcern />,
            },
            {
              path: "project-updates",
              element: <ProjectUpdates />,
            },
          ],
        },
        {
          path: "project-detailed-view/:projectId",
          element: <ProjectDetailedView />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
        {
          path: "admin-left-side-menu",
          element: <AdminLeftSideMenu />,
        },
        {
          path: "project-manager-side-menu",
          element: <ProjectManagerSideMenu />,
        },
        {
          path: "update-project-details/:projectId",
          element: <UpdateProjectDetails />,
        },
        {
          path: "update-team-member",
          element: <UpdateTeamMember />,
        },
      ],
    },
  ]);

  return (
    <div>
      {/* provide to app */}
      <RouterProvider router={browserRouterObj} />
    </div>
  );
}

export default App;
