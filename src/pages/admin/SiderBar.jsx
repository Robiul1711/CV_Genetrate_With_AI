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
          (sub) => sub.path === location.pathname
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
            const parentActive = isParentActive(item);
            return !item?.sublink ? (
              <Link
                key={index}
                to={item?.path}
                onClick={() => {
                  setActiveParentIndex(null);
                  setOpen(false);
                }}
                className={`flex items-center text-sm gap-3 px-4 py-1 rounded-lg  font-medium transition-colors duration-200 ${
                  isActive(item?.path, item?.extra_path, item?.extra_path2)
                    ? "text-white border border-[#76E477]/60 border-l-[6px] border-opacity-60 shadow-md shadow-[#76E477]/30 rounded-lg bg-[#18181A] p-4"
                    : "text-[#FFF] border-[0.5px] border-l-[6px] border-transparent  "
                } rounded-xl`}
              >
                <span className="text-lg">{item?.icon}</span>
                {item?.text}
              </Link>
            ) : (
              <div className="relative" key={index}>
                {/* Parent link */}
                <div
                  className={`flex items-center justify-between px-4 py-2  cursor-pointer w-full rounded-lg transition-all duration-200 ${
                    parentActive
                      ? "bg-[#253E8E] text-white"
                      : "text-gray-700 hover:bg-[#E3ECFF] hover:text-[#253E8E]"
                  }`}
                  onClick={() => toggleSubmenu(index)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{item?.icon}</span>
                    <p className="font-medium">{item?.text}</p>
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
                  className={`transition-all duration-300  ease-in-out overflow-hidden px-4 bg-white rounded-lg ${
                    activeParentIndex === index
                      ? "max-h-[500px] py-4 opacity-100 translate-y-0"
                      : "max-h-0 opacity-0 -translate-y-2"
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    {item?.sublink?.map((value, subIndex) => (
                      <Link
                        key={subIndex}
                        to={value?.path}
                        className={`block px-4 py-2  rounded-md transition-colors duration-200 ${
                          isActive(value?.path)
                            ? "text-black font-medium bg-[#F0F4FF]"
                            : "text-[#5A5C5F] font-normal hover:bg-[#F0F4FF]"
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
