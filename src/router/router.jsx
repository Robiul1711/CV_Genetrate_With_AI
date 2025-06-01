import ErrorPage from "@/components/common/ErrorPage";
import AdminLayout from "@/layout/AdminLayout";
import Layout from "@/layout/Layout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ApplicationPackage from "@/pages/admin/ApplicationPackage";
import CreateCoverLetter from "@/pages/admin/CreateCoverLetter";
import CreateNewResume from "@/pages/admin/CreateNewResume";
import History from "@/pages/admin/History";
import Setting from "@/pages/admin/Setting";
import UpdateExistingResume from "@/pages/admin/UpdateExistingResume";
import ForgotPassword from "@/pages/auth/forgotPassword/ForgotPassword";
import NewPassword from "@/pages/auth/resetPassword/ResetPassword";
import OTPCode from "@/pages/auth/otpCode/OTPCode";
import SignIn from "@/pages/auth/signIn/SignIn";
import SignUp from "@/pages/auth/signUp/SignUp";
import Home from "@/pages/home/Home";
import Imprint from "@/pages/imprint/Imprint";
import PrivacyPolicy from "@/pages/privacyPolicyPage/PrivacyPolicy";
import TearmsAndCondition from "@/pages/tearms_and_condition/TearmsAndCondition";
import { createBrowserRouter } from "react-router-dom";
import SuccessfullyPasswordChange from "@/pages/auth/setPasswordSuccessfully/SuccessfullyPasswordChange";
import Price from "@/pages/home/price/Price";
import Contact from "@/pages/contact/Contact";
import AIHelp from "@/pages/aiHelp/AIHelp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/price",
        element: <Price />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },

      {
        path: "/ai-help",
        element: <AIHelp />,
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
    element: <AdminLayout />,
    children: [
      {
        path: "/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/dashboard/create-New-resume",
        element: <CreateNewResume />,
      },
      {
        path: "/dashboard/update-existing-resume",
        element: <UpdateExistingResume />,
      },
      {
        path: "/dashboard/create-cover-letter",
        element: <CreateCoverLetter />,
      },
      {
        path: "/dashboard/application-package",
        element: <ApplicationPackage />,
      },
      {
        path: "/dashboard/history",
        element: <History />,
      },
      {
        path: "/dashboard/setting",
        element: <Setting />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/otp-code",
    element: <OTPCode />,
  },
  {
    path: "/new-password",
    element: <NewPassword />,
  },
  {
    path: "/success-new-password",
    element: <SuccessfullyPasswordChange />,
  },
]);

export default router;
