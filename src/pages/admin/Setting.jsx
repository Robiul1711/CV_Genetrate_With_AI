import React, { useState } from "react";
import { User, Lock, CreditCard, ShieldCheck, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProfileSetting from "@/components/AdminSettingComponents/ProfileSetting";
import ChangePassword from "@/components/AdminSettingComponents/ChangePassword";
import Subscription from "@/components/AdminSettingComponents/Subscription";
import DummyUser from "@/assets/images/placeholder-user.png";
import { useAuth } from "@/hooks/useAuth";

const tabs = [
  {
    id: "profile",
    label: "Profile Settings",
    icon: User,
    description: "Manage your personal information and contact details",
  },
  {
    id: "password",
    label: "Security & Password",
    icon: Lock,
    description: "Update your password and enhance account protection",
  },
  {
    id: "subscription",
    label: "Subscription & Plans",
    icon: CreditCard,
    description: "View current plan, active benefits and billing",
  },
];

const Setting = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = useAuth();

  const displayName =
    `${user?.profile?.first_name || user?.first_name || "John"} ${
      user?.profile?.last_name || user?.last_name || "Doe"
    }`.trim();
  const displayEmail =
    user?.profile?.user?.email || user?.email || "user@example.com";

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-12">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white  flex items-center gap-2">
          Account Settings
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage your account preferences, credentials, and subscription status.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Navigation Card */}
        <div className="lg:col-span-4 xl:col-span-3 bg-[#0E0E10] border border-[#262626] rounded-2xl p-5 shadow-xl space-y-6">
          {/* User Profile Mini Badge */}
          <div className="flex items-center gap-3.5 pb-5 border-b border-[#262626]">
            <div className="relative">
              <img
                src={user?.profile?.profile_image || DummyUser}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover border border-[#333]"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#81FB84] border-2 border-[#0E0E10] rounded-full"></span>
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-semibold text-white truncate">
                {displayName}
              </h2>
              <p className="text-xs text-gray-400 truncate mt-0.5">
                {displayEmail}
              </p>
              <div className="inline-flex items-center gap-1 mt-1 text-[10px] text-[#81FB84] bg-[#81FB84]/10 border border-[#81FB84]/20 px-2 py-0.5 rounded-full font-medium">
                <Sparkles size={10} /> Pro Member
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex flex-col gap-1.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                    isActive
                      ? "bg-linearbg text-white shadow-lg border border-white/10"
                      : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon
                    size={18}
                    className={isActive ? "text-white" : "text-gray-400"}
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Help Card */}
          <div className="bg-[#141416] border border-[#262626] rounded-xl p-4 text-xs text-gray-400 space-y-2">
            <div className="flex items-center gap-1.5 text-white font-medium">
              <ShieldCheck size={14} className="text-[#81FB84]" />
              <span>Secure Account</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Your profile data is encrypted. Need any assistance with billing
              or account safety?
            </p>
          </div>
        </div>

        {/* Right Content Panel */}
        <div className="lg:col-span-8 xl:col-span-9 bg-[#0E0E10] border border-[#262626] rounded-2xl p-6 sm:p-8 shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "profile" && <ProfileSetting userData={user} />}
              {activeTab === "password" && <ChangePassword />}
              {activeTab === "subscription" && <Subscription />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Setting;
