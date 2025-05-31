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
import Imprint from "@/pages/imprint/Imprint";
import PrivacyPolicy from "@/pages/privacyPolicyPage/PrivacyPolicy";
import TearmsAndCondition from "@/pages/tearms_and_condition/TearmsAndCondition";
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
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/tearms-and-condition",
        element: <TearmsAndCondition />,
      },
      {
        path: "/imprint",
        element: <Imprint />,
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
