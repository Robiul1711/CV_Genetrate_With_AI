import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const UserDropdown = ({
  className = "",
  avatarBgColor = "bg-primary",
  avatarTextColor = "text-white",
  dropdownItems = [],
  scrolled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout, isLoadingUser } = useAuth();

  // Default dropdown items
  const defaultItems = [
    {
      label: "Profile",
      icon: <User className="w-4 h-4 mr-3" />,
      href: "/profile",
    },
    {
      label: "Settings",
      icon: <Settings className="w-4 h-4 mr-3" />,
      href: "/settings",
    },
    {
      label: "Sign Out",
      icon: <LogOut className="w-4 h-4 mr-3" />,
      onClick: logout,
    },
  ];

  console.log(user[0]?.first_name);

  // Combine default and custom items
  const items = dropdownItems.length > 0 ? dropdownItems : defaultItems;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get user initial
  const getUserInitial = () => {
    return user[0]?.first_name
      ? user[0]?.first_name?.charAt(0).toUpperCase()
      : "U";
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex cursor-pointer items-center justify-center aspect-square bg-gray-800 shadow-md w-10 h-10 rounded-full font-medium 
          hover:opacity-90 transition-opacity 
          `}
      >
        {getUserInitial()}
      </button>

      {/* Dropdown Menu */}
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
            <p className="text-sm font-medium !text-gray-900 truncate">
              {user[0]?.first_name} {user[0]?.last_name}
            </p>
            <p className="text-xs !text-black truncate">
              {user[0]?.user?.email}
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
                  onClick={() => {
                    setIsOpen(false);
                    item.onClick?.();
                  }}
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
                  className="flex w-full cursor-pointer items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
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
