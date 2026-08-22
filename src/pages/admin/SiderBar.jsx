import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "@/components/common/Logo";

import { MdKeyboardArrowDown } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import LogOutModal from "./LogOutModal";
import { useAuth } from "@/hooks/useAuth";
// import { Logout } from "@/components/common/adminIcon/CustomIcon";

const SideBar = ({ sidebar, open, setOpen }) => {
  const location = useLocation();
  const [activeParentIndex, setActiveParentIndex] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    sidebar.forEach((item, index) => {
      if (item.sublink) {
        const activeSub = item.sublink.find(
          (sub) => sub.path === location.pathname,
        );
        if (activeSub) {
          setActiveParentIndex(index);
        }
      }
    });
  }, [location.pathname, sidebar]);

  const isActive = (...paths) => {
    return paths.includes(location.pathname);
  };

  const isParentActive = (item) => {
    if (!item.sublink) return isActive(item.path);
    return item.sublink.some((sub) => isActive(sub.path));
  };

  const toggleSubmenu = (index) => {
    setActiveParentIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-all duration-300 ease-in-out ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        } xl:hidden z-50`}
        onClick={() => setOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`h-full flex flex-col ${
          open
            ? "left-0 top-0 w-[300px] sm:w-[320px] z-[220] shadow-2xl bg-[#08090A]"
            : "-left-full xl:w-[300px] 2xl:w-[320px] w-[280px]"
        }
        bg-[#0E0E10] border-r border-[#262626] xl:static fixed transition-all duration-300 z-50`}
      >
        {/* Logo Header (Exactly matches CommonNavbar height) */}
        <div className="h-[72px] px-6 flex items-center border-b border-[#262626] shrink-0">
          <Logo size="md" href="/" />
        </div>

        {/* Navigation Body */}
        <div className="flex-1 py-6 px-4 flex flex-col justify-between overflow-y-auto no-scrollbar relative">
          <div className="flex flex-col gap-2">
            {sidebar?.map((item, index) => {
              const active = isActive(item?.path, item?.extra_path, item?.extra_path2);
              const parentActive = isParentActive(item);
              return !item?.sublink ? (
                <Link
                  key={index}
                  to={item?.path}
                  onClick={() => {
                    setActiveParentIndex(null);
                    setOpen(false);
                  }}
                  className={`group flex items-center text-sm gap-3.5 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    active
                      ? "text-white bg-[#18181A] border border-[#76E477]/50 border-l-[5px] border-l-[#76E477] shadow-md shadow-[#76E477]/15 font-semibold"
                      : "text-[#D1D5DB] border border-transparent border-l-[5px] border-l-transparent hover:text-white hover:bg-[#18181D] hover:border-[#2A2A30] hover:border-l-[5px] hover:border-l-[#76E477]/70 hover:shadow-sm"
                  }`}
                >
                  <span
                    className={`text-lg transition-colors duration-200 ${
                      active
                        ? "text-[#76E477]"
                        : "text-gray-400 group-hover:text-[#76E477]"
                    }`}
                  >
                    {item?.icon}
                  </span>
                  <span className="truncate">{item?.text}</span>
                </Link>
              ) : (
                <div className="relative" key={index}>
                  {/* Parent link */}
                  <div
                    className={`group flex items-center justify-between px-4 py-3 cursor-pointer w-full rounded-xl transition-all duration-200 ${
                      parentActive
                        ? "bg-[#18181A] text-white border border-[#76E477]/50 border-l-[5px] border-l-[#76E477] shadow-md shadow-[#76E477]/15 font-semibold"
                        : "text-[#D1D5DB] border border-transparent border-l-[5px] border-l-transparent hover:text-white hover:bg-[#18181D] hover:border-[#2A2A30] hover:border-l-[5px] hover:border-l-[#76E477]/70"
                    }`}
                    onClick={() => toggleSubmenu(index)}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`text-lg transition-colors duration-200 ${
                          parentActive
                            ? "text-[#76E477]"
                            : "text-gray-400 group-hover:text-[#76E477]"
                        }`}
                      >
                        {item?.icon}
                      </span>
                      <p className="font-medium truncate">{item?.text}</p>
                    </div>
                    <span
                      className={`transform transition-transform duration-300 ${
                        activeParentIndex === index ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      <MdKeyboardArrowDown size={20} />
                    </span>
                  </div>

                  {/* Sublinks dropdown */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden px-2 rounded-xl mt-1 ${
                      activeParentIndex === index
                        ? "max-h-[500px] py-2 opacity-100 translate-y-0"
                        : "max-h-0 opacity-0 -translate-y-2"
                    }`}
                  >
                    <div className="flex flex-col gap-1 pl-4 border-l border-[#262626] ml-4">
                      {item?.sublink?.map((value, subIndex) => (
                        <Link
                          key={subIndex}
                          to={value?.path}
                          className={`block px-3 py-2 text-xs rounded-lg transition-all duration-200 ${
                            isActive(value?.path)
                              ? "text-[#76E477] font-semibold bg-[#18181A]"
                              : "text-gray-400 font-normal hover:text-white hover:bg-[#18181D]"
                          }`}
                          onClick={() => setOpen(false)}
                        >
                          {value?.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Logout */}
          <div className="pt-4 mt-6 border-t border-[#262626]">
            <LogOutModal />
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
