import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const UserDropdown = ({
  className = "",
  dropdownItems = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user, setUser, setToken, setRefreshToken } = useAuth();

  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;

  // Logout function
  const logOut = () => {
    setToken("");
    setUser(null);
    setRefreshToken("");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    setIsOpen(false);
  };

  // Default dropdown items in English
  const defaultItems = [
    {
      label: "Dashboard",
      icon: <User className="w-4 h-4 mr-3 text-gray-400 group-hover:text-[#81FB84] transition-colors" />,
      href: "/dashboard",
    },
    {
      label: "Settings",
      icon: <Settings className="w-4 h-4 mr-3 text-gray-400 group-hover:text-[#81FB84] transition-colors" />,
      href: "/dashboard/setting",
    },
    {
      label: "Sign Out",
      icon: <LogOut className="w-4 h-4 mr-3 text-gray-400 group-hover:text-red-400 transition-colors" />,
      onClick: logOut,
      isDanger: true,
    },
  ];

  const items = dropdownItems.length > 0 ? dropdownItems : defaultItems;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getUserInitial = () =>
    user?.profile?.first_name?.charAt(0).toUpperCase() ||
    user?.first_name?.charAt(0).toUpperCase() ||
    user?.email?.charAt(0).toUpperCase() ||
    "U";

  const displayName =
    `${user?.profile?.first_name || user?.first_name || "User"} ${
      user?.profile?.last_name || user?.last_name || ""
    }`.trim();

  const displayEmail =
    user?.profile?.user?.email || user?.email || user?.user?.email || "user@example.com";

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center justify-center bg-[#1A1A1A] hover:bg-[#262626] border border-white/10 hover:border-[#81FB84]/50 w-10 h-10 rounded-full font-medium transition-all overflow-hidden shadow-md"
      >
        {user?.profile?.profile_image ? (
          <img
            src={`${VITE_IMG_URL}${user?.profile?.profile_image}`}
            alt="User Avatar"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span className="text-white font-semibold text-sm">{getUserInitial()}</span>
        )}
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-64 rounded-xl shadow-2xl bg-[#0E0E10]/95 backdrop-blur-xl py-2 z-50 border border-[#262626]"
          >
            {/* User Info */}
            <div className="px-4 py-3 border-b border-[#262626]">
              <p className="text-sm font-semibold text-white truncate">
                {displayName}
              </p>
              <p className="text-xs text-gray-400 truncate mt-0.5">
                {displayEmail}
              </p>
            </div>

            {/* Menu Items */}
            <div className="py-2 flex flex-col gap-0.5">
              {items.map((item, index) =>
                item.href ? (
                  <Link
                    key={index}
                    to={item.href}
                    className="group flex items-center px-3.5 py-2 mx-1.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      item.onClick?.();
                    }}
                    className={`group flex w-[calc(100%-12px)] items-center px-3.5 py-2 mx-1.5 rounded-lg text-sm transition-colors text-left ${
                      item.isDanger
                        ? "text-gray-300 hover:text-red-400 hover:bg-red-500/10"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;
