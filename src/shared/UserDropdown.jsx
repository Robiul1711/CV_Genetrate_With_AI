import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useEmail } from "@/hooks/useEmail";
import userdummy from "@/assets/images/userdummy.png";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useStatusCheck } from "@/components/common/useStatusCheck";

const UserDropdown = ({
  className = "",
  avatarBgColor = "bg-primary",
  avatarTextColor = "text-white",
  dropdownItems = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user, setUser, logout, token, setToken, setRefreshToken } = useAuth();
  const { language, activeStep, setActiveStep } = useEmail();
  const { data: status } = useStatusCheck();
  const queryClient = useQueryClient();

  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;

  // ✅ Logout function
  const logOut = () => {
    setToken("");
    setUser("");
    setRefreshToken("");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    queryClient.removeQueries({ queryKey: ["authUser"] });
    toast.success("Logout Successfully");
    setActiveStep(0);
  };

  // ✅ Default dropdown items
  const defaultItems = [
    {
      label: language === "de" ? "Übersicht" : "Dashboard",
      icon: <User className="w-4 h-4 mr-3" />,
      href: (status?.has_subscription === false && status?.has_pay_per_download_credits === false) ? "/price" : "/dashboard",
    },
    {
      label: language === "de" ? "Einstellungen" : "Settings",
      icon: <Settings className="w-4 h-4 mr-3" />,
      href:
        (status?.has_subscription === false && status?.has_pay_per_download_credits === false)  ? "/price" : "/dashboard/setting",
    },
    {
      label: language === "de" ? "Abmelden" : "Sign Out",
      icon: <LogOut className="w-4 h-4 mr-3" />,
      onClick: logOut,
    },
  ];

  const items = dropdownItems.length > 0 ? dropdownItems : defaultItems;

  // ✅ Close dropdown on outside click
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
    user?.profile?.first_name?.charAt(0).toUpperCase() || "U";

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* ✅ Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex cursor-pointer items-center justify-center bg-gray-800 w-10 h-10 rounded-full font-medium hover:opacity-90 transition-opacity overflow-hidden`}
      >
        {user?.profile?.profile_image ? (
          <img
            src={`${VITE_IMG_URL}${user?.profile?.profile_image}`}
            alt="User Avatar"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span className="text-white">{getUserInitial()}</span>
        )}
      </button>

      {/* ✅ Dropdown Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white py-2 z-50 border border-gray-100"
        >
          {/* User Info */}
          <div className="px-4 py-3 border-b">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.profile?.first_name} {user?.profile?.last_name}
            </p>
            <p className="text-xs text-black truncate">
              {user?.profile?.user?.email}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {items.map((item, index) =>
              item.href ? (
                <Link
                  key={index}
                  to={item.href}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ) : (
                <button
                  key={index}
                  onClick={() => {
                    setIsOpen(false);
                    item.onClick?.();
                  }}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  {item.icon}
                  {item.label}
                </button>
              )
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UserDropdown;
