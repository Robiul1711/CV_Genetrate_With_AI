import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useLocation, Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";
import Avatar from "@/assets/avatar.png";
import {
  NotificationIcon,
  SearchIcon,
} from "@/components/CustomIcons/CustomIcon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Title from "@/components/common/Title";
import { Bell, Timer, Trash2, TrashIcon } from "lucide-react";
import LanguageDropdown from "@/components/common/LanguageDropdown";

const CommonNavbar = ({ open, setOpen }) => {
  const { pathname } = useLocation();

  const handleLogout = () => {
    // Perform logout logic here
    console.log("Logging out...");
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-5 justify-between w-full py-6 px-0 sm:px-6 rounded-2xl">
        {/* Sidebar toggle + Search */}
        <div className="flex items-center gap-2 w-full">
          <span
            onClick={() => setOpen(!open)}
            className="xlg:hidden block cursor-pointer"
          >
            <GiHamburgerMenu color="white" size={26} />
          </span>
          <div className="lg:p-4 p-3 max-w-[718px] w-full rounded-[16px] sm:flex hidden items-center gap-2 border border-[#262626]">
            <span>
              <SearchIcon />
            </span>
            <input
              className="w-full border-none text-white outline-none bg-transparent placeholder-secondary text-base font-normal"
              placeholder="Search anything here..."
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Notification & Avatar */}
          <Popover >
            <PopoverTrigger >
              <span className="w-[40px] h-[40px] rounded-full border-[1px] border-[#ECEEF0] justify-center items-center flex">
                <NotificationIcon />
              </span>
            </PopoverTrigger>
            <PopoverContent align="end" className="sm:max-w-[700px] max-w-[380px]  !bg-black    w-full p-4 md:p-6 bg-background border border-muted rounded-xl text-white shadow-md">
              <div className="flex flex-col gap-2">
                <Title level="title22" className="text-sm">Notifications</Title>
                <Title level="title18" className="text-[#9B9B9B] text-sm">
                  Stay up-to-date with AI suggestions, resume updates, interview
                  tips, and more.
                </Title>
                <div className="mt-4 flex flex-col gap-2 p-2 sm:p-4 rounded-xl border border-[#262626]">
                  <div className="flex gap-4 items-center">
                    <Bell />
                    <Title level="title18"  className="text-xs">
                      Your Resume Was Optimized for &apos;Marketing
                      Specialist&apos; Role
                    </Title>
                  </div>
                  <div className="flex gap-4 items-center justify-between mt-4">
                    <span className="text-[#9B9B9B] flex items-center gap-2 text-xs border-none "><Timer />1 Day ago</span>
                    <button className="text-[#9B9B9B] flex items-center gap-2 text-xs border-none "><Trash2 />Delete</button>
          
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          {/* Langauge  */}
          <LanguageDropdown />
          {/* aVATAR  */}
          <Popover>
            <PopoverTrigger asChild>
              <div className="w-[40px] h-[40px] rounded-full cursor-pointer">
                <img
                  src={Avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-44 p-2 !bg-black border border-muted rounded-xl shadow-md">
              <div className="flex flex-col gap-2">
                <Link
                  to="#"
                  className="text-sm px-3 py-1 rounded-md hover:bg-muted transition-colors text-white "
                >
                  Profile
                </Link>
                <div
                  variant="ghost"
                  className="text-sm justify-start px-3 py-1 hover:bg-muted text-white"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="lg:p-4 p-3 max-w-[718px] w-full rounded-[16px] sm:hidden flex items-center gap-2 border border-[#262626]">
        <span>
          <SearchIcon />
        </span>
        <input
          className="w-full border-none text-white outline-none bg-transparent placeholder-secondary text-base font-normal"
          placeholder="Search anything here..."
        />
      </div>
    </div>
  );
};

export default CommonNavbar;
