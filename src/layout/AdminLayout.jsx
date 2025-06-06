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

const AdminLayout = () => {
  const [Open, setOpen] = useState(false);

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
      path: "/dashboard/create-new-resume",
      extra_path: "/dashboard/edit-resume",
      extra_path2: "/dashboard/edit-design",
      sublink: false,
    },
    {
      id: 3,
      icon: <UpdateResumeIcon />,
      text: "Update Existing Resume",
      path: "/dashboard/update-existing-resume",
      extra_path: "/dashboard/final-review",
      sublink: false,
    },
    {
      id: 4,
      icon: <CreateCoverLatterIcon />,
      text: "Create Cover Letter",
      path: "/dashboard/create-cover-letter",
      sublink: false,
    },
    {
      id: 5,
      icon: <ApplicationPackageIcon />,
      text: "Application Package",
      path: "/dashboard/application-package",
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

    // {
    //   id:6,
    //   icon:<CgProfile />,
    //   text:"Admin Management",
    //   path:"/dashboard/admin-list",
    //   sublink:[
    //     {
    //       id:1,
    //       text:"Admin List",
    //       path:"/dashboard/admin-list",
    //     },
    //     {
    //       id:1,
    //       text:"Add New Admin",
    //       path:"/dashboard/asdasd"
    //     },
    //   ]
    // },
  ];
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location]);
  return (
    <>
    <SportLight />
      <ScrollRestoration />
      <div className="flex  h-screen min-h-screen w-full">
        <SideBar open={Open} setOpen={setOpen} sidebar={sideBar} />
        <div className="flex-1  text-white flex flex-col overflow-auto custom-scrollbar">
          <div className=" flex flex-col  gap-5  py-3  px-2.5 sm:px-10">
            <CommonNavbar open={Open} setOpen={setOpen} />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
