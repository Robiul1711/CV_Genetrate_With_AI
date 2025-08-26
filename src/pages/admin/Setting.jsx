import React, { useState } from "react";
import { FaUser, FaLock, FaCreditCard } from "react-icons/fa";
import ProfileSetting from "@/components/AdminSettingComponents/ProfileSetting";
import ChangePassword from "@/components/AdminSettingComponents/ChangePassword";
import Subscription from "@/components/AdminSettingComponents/Subscription";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import DummyUser from "@/assets/images/placeholder-user.png";
const Setting = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const axiosSecure = useAxiosSecure();
  const { data: userData } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await axiosSecure.get("/user/profile/");
      return response.data;
    },
  });



  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSetting userData={userData?.data} />;
      case "password":
        return <ChangePassword />;
      case "subscription":
        return <Subscription />;
      default:
        return null;
    }
  };

  console.log(userData);

  return (
    <div className="h-[calc(100vh-200px)] overflow-hidden flex lg:gap-2">
      {/* Sidebar */}
      <div className="max-w-1/6 bg-[#0E0E10]/80 p-2 sm:p-4  rounded-xl h-full overflow-y-auto">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-3">
          <img
            src={
   userData?.data?.profile?.profile_image
                ? `${import.meta.env.VITE_IMG_URL}${
                    userData?.data?.profile?.profile_image
                  }`
                : DummyUser
            }
            alt="Profile"
            className="sm:w-16 size-6 sm:h-16 object-cover rounded-full"
          />
          <div>
            <h1 className="text-sm font-semibold text-white">{userData?.data?.profile?.first_name} {userData?.data?.profile?.last_name}</h1>
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex flex-1 flex-col gap-4 text-xs sm:text-base lg:gap-4 text-white">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 transition-colors ${
              activeTab === "profile"
                ? "text-green-400"
                : "hover:text-green-400"
            }`}
          >
            <FaUser /> Profile Settings
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`flex items-center gap-2 transition-colors ${
              activeTab === "password"
                ? "text-green-400"
                : "hover:text-green-400"
            }`}
          >
            <FaLock /> Change Password
          </button>
          <button
            onClick={() => setActiveTab("subscription")}
            className={`flex items-center gap-2 transition-colors ${
              activeTab === "subscription"
                ? "text-green-400"
                : "hover:text-green-400"
            }`}
          >
            <FaCreditCard /> Subscription
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className=" flex-1 h-full overflow-y-auto rounded-xl lg:p-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default Setting;
