import SportLight from "@/components/common/SportLight";
import {
  ApplicationPackageIcon,
  CreateCoverLatterIcon,
  CreateNewResumeIcon,
  DashboardIcon,
  HistoryIcon,
  SettingIcon,
  UpdateResumeIcon,
} from "@/components/CustomIcons/CustomIcon";
import CommonNavbar from "@/pages/admin/CommonNavbar";
import SideBar from "@/pages/admin/SiderBar";
import React, { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { useStatusCheck } from "@/components/common/useStatusCheck";

const AdminLayout = () => {
  const [Open, setOpen] = useState(false);
  const { data: status } = useStatusCheck();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location]);

  const createResumePath =
    status?.has_subscription === false &&
    status?.has_pay_per_download_credits === false
      ? "/price"
      : "/dashboard/create-new-resume";
  const updateResumePath =
    status?.has_subscription === false &&
    status?.has_pay_per_download_credits === false
      ? "/price"
      : "/dashboard/update-existing-resume";
  const coverLetterPath =
    status?.has_subscription === false &&
    status?.has_pay_per_download_credits === false
      ? "/price"
      : "/dashboard/create-cover-letter";

  const sideBar = [
    {
      id: 1,
      icon: <DashboardIcon />,
      text: "Dashboard",
      path: "/dashboard",
      sublink: false,
    },
    {
      id: 2,
      icon: <CreateNewResumeIcon />,
      text: "Create New Resume",
      path: createResumePath,
      extra_path: "/dashboard/edit-resume",
      extra_path2: "/dashboard/edit-design",
      sublink: false,
    },
    {
      id: 3,
      icon: <UpdateResumeIcon />,
      text: "Update Existing Resume",
      path: updateResumePath,
      extra_path: "/dashboard/final-review",
      sublink: false,
    },
    {
      id: 4,
      icon: <CreateCoverLatterIcon />,
      text: "Create Cover Letter",
      path: coverLetterPath,
      sublink: false,
    },
    {
      id: 5,
      icon: <HistoryIcon />,
      text: "History",
      path: "/dashboard/history",
      sublink: false,
    },
    {
      id: 6,
      icon: <SettingIcon />,
      text: "Setting",
      sublink: false,
      path: "/dashboard/setting",
    },
  ];

  return (
    <>
      <SportLight />
      <ScrollRestoration />
      <div className="flex h-screen min-h-screen w-full ">
        <SideBar open={Open} setOpen={setOpen} sidebar={sideBar} />
        <div className="flex-1 text-white flex flex-col h-full ">
          <CommonNavbar open={Open} setOpen={setOpen} />
          <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto custom-scrollbar">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
