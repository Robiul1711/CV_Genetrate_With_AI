import AdminLayout from "@/layout/AdminLayout";
import Layout from "@/layout/Layout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ApplicationPackage from "@/pages/admin/ApplicationPackage";
import CreateCoverLetter from "@/pages/admin/CreateCoverLetter";
import CreateNewResume from "@/pages/admin/CreateNewResume";
import History from "@/pages/admin/History";
import Setting from "@/pages/admin/Setting";
import UpdateExistingResume from "@/pages/admin/UpdateExistingResume";
import Home from "@/pages/home/Home";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
        <AdminLayout/>
    ),
    children: [
      {
        path: "/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/dashboard/create-New-resume",
        element: <CreateNewResume/>,
      },
      {
        path: "/dashboard/update-existing-resume",
        element: <UpdateExistingResume/>,
      },
      {
        path: "/dashboard/create-cover-letter",
        element: <CreateCoverLetter/>,
      },
      {
        path: "/dashboard/application-package",
        element: <ApplicationPackage/>,
      },
      {
        path: "/dashboard/history",
        element: <History/>,
      },
      {
        path: "/dashboard/setting",
        element: <Setting/>,
      },
    
    ],
  },
]);

export default router;
