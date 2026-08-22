import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Bell,
  Search,
  Sparkles,
  Plus,
  LogOut,
  User,
  Settings,
  ChevronDown,
  Menu,
  CheckCircle2,
  Clock,
  Trash2,
  Zap,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/hooks/useAuth";
import { useStatusCheck } from "@/components/common/useStatusCheck";
import DummyUser from "@/assets/images/placeholder-user.png";
import Swal from "sweetalert2";

const notificationsList = [
  {
    id: 1,
    title: "Resume ATS Score Optimized",
    desc: "Your Senior Full-Stack resume reached a 96% ATS match score.",
    time: "10m ago",
    read: false,
  },
  {
    id: 2,
    title: "New AI Template Added",
    desc: "Try the new 'Executive Minimalist' resume design in your builder.",
    time: "2h ago",
    read: false,
  },
  {
    id: 3,
    title: "Subscription Active",
    desc: "Unlimited PDF downloads and AI translations enabled.",
    time: "1d ago",
    read: true,
  },
];

const getPageTitle = (pathname) => {
  if (pathname === "/dashboard")
    return {
      title: "Dashboard Overview",
      subtitle: "Welcome back to your career hub",
    };
  if (
    pathname.includes("create-new-resume") ||
    pathname.includes("edit-resume") ||
    pathname.includes("edit-design")
  )
    return {
      title: "AI Resume Builder",
      subtitle: "Craft tailored, ATS-friendly resumes",
    };
  if (
    pathname.includes("update-existing-resume") ||
    pathname.includes("final-review")
  )
    return {
      title: "Update Resume",
      subtitle: "Enhance and score your existing CV",
    };
  if (pathname.includes("create-cover-letter"))
    return {
      title: "Cover Letter Generator",
      subtitle: "Generate persuasive application letters",
    };
  if (pathname.includes("history"))
    return {
      title: "Resume History",
      subtitle: "Manage and download previous documents",
    };
  if (pathname.includes("setting"))
    return {
      title: "Account Settings",
      subtitle: "Manage profile, billing, and preferences",
    };
  return { title: "Dashboard", subtitle: "Clever CV Career Platform" };
};

const CommonNavbar = ({ open, setOpen }) => {
  const { pathname } = useLocation();
  const { user, logOut } = useAuth();
  const { data: status } = useStatusCheck();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(notificationsList);
  const pageInfo = getPageTitle(pathname);

  const handleLogout = () => {
    Swal.fire({
      title: "Log out of Clever CV?",
      text: "You will need to sign in again to access your resumes.",
      icon: "warning",
      background: "#0E0E10",
      color: "#ffffff",
      showCancelButton: true,
      confirmButtonText: "Log Out",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#262626",
      customClass: {
        popup: "rounded-2xl border border-[#262626]",
        confirmButton: "font-semibold px-5 py-2.5 rounded-xl",
        cancelButton: "font-semibold px-5 py-2.5 rounded-xl",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (logOut) logOut();
        navigate("/sign-in");
      }
    });
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  return (
    <header className="sticky top-0 z-40 w-full h-[72px] bg-[#08090A]/40 backdrop-blur-xl border-b border-[#262626] px-4 sm:px-6 md:px-8 flex items-center justify-between transition-all duration-300 shadow-md">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3.5 min-w-0">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="xl:hidden p-2 rounded-xl bg-[#141416] border border-[#262626] text-gray-300 hover:text-white hover:border-[#81FB84]/50 transition shrink-0"
          title="Toggle Navigation Menu"
        >
          <Menu size={20} />
        </button>

        <div className="flex flex-col min-w-0">
          <h1 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight truncate flex items-center gap-2">
            <span>{pageInfo.title}</span>
            <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#81FB84]/10 border border-[#81FB84]/30 text-[#81FB84] text-[10px] font-semibold uppercase tracking-wider">
              <Sparkles size={10} /> AI Powered
            </span>
          </h1>
          <p className="text-[11px] text-gray-400 truncate hidden sm:block">
            {pageInfo.subtitle}
          </p>
        </div>
      </div>

      {/* Right Side: Pro Badge + AI Help + Notifications + User Avatar */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
        {/* Pro / Subscription Badge */}
        {status?.has_subscription ? (
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#172b1d] to-[#122217] border border-[#81FB84]/40 text-[#81FB84] text-xs font-semibold shadow-sm">
            <Zap size={13} className="fill-[#81FB84]" />
            <span>Pro Plan Active</span>
          </div>
        ) : (
          <Link
            to="/price"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#81FB84] hover:bg-[#a6fca9] text-black text-xs font-bold transition shadow-[0_0_15px_rgba(129,251,132,0.3)] hover:scale-105"
          >
            <Sparkles size={13} />
            <span>Upgrade Pro</span>
          </Link>
        )}

        {/* AI Career Coach Link */}
        <Link
          to="/ai-help"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#121214] hover:bg-[#1A1A1E] border border-[#262626] hover:border-white/20 text-xs font-medium text-gray-300 hover:text-white transition"
        >
          <Sparkles size={13} className="text-[#81FB84]" />
          <span>Ask AI Coach</span>
        </Link>

        {/* Notifications Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="relative p-2 rounded-xl bg-[#141416] hover:bg-[#1A1A1E] border border-[#262626] hover:border-white/20 text-gray-300 hover:text-white transition"
              title="Notifications"
            >
              <Bell size={17} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#81FB84] shadow-[0_0_8px_#81FB84]" />
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="w-80 sm:w-96 p-0 bg-[#0E0E10] border border-[#262626] rounded-2xl text-white shadow-2xl overflow-hidden"
          >
            <div className="p-3.5 border-b border-[#262626] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Notifications
                </span>
                <span className="px-1.5 py-0.5 rounded-full bg-[#81FB84]/15 text-[#81FB84] text-[10px] font-semibold">
                  {notifications.length}
                </span>
              </div>
              {notifications.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearNotifications}
                  className="text-[11px] text-gray-400 hover:text-red-400 transition flex items-center gap-1"
                >
                  <Trash2 size={12} /> Clear all
                </button>
              )}
            </div>

            <div className="max-h-72 overflow-y-auto no-scrollbar p-2 space-y-1.5">
              {notifications.length === 0 ? (
                <div className="py-8 text-center text-xs text-gray-400 space-y-1">
                  <CheckCircle2
                    size={24}
                    className="text-[#81FB84] mx-auto mb-2 opacity-80"
                  />
                  <p className="font-semibold text-white">All caught up!</p>
                  <p className="text-[11px]">
                    No new notifications at this time.
                  </p>
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-3 rounded-xl bg-[#141416] hover:bg-[#1A1A1E] border border-white/5 transition flex items-start gap-3"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#81FB84]/10 border border-[#81FB84]/20 flex items-center justify-center text-[#81FB84] shrink-0 mt-0.5">
                      <Sparkles size={13} />
                    </div>
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <p className="text-xs font-semibold text-white truncate">
                        {n.title}
                      </p>
                      <p className="text-[11px] text-gray-400 leading-snug">
                        {n.desc}
                      </p>
                      <span className="text-[10px] text-gray-400 flex items-center gap-1 pt-1">
                        <Clock size={10} /> {n.time}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>

        {/* User Avatar & Profile Dropdown */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full bg-[#141416] hover:bg-[#1A1A1E] border border-[#262626] hover:border-[#81FB84]/40 transition group cursor-pointer"
            >
              <img
                src={user?.profile?.profile_image || DummyUser}
                alt="Profile Avatar"
                className="w-7 h-7 rounded-full object-cover border border-[#81FB84]/30"
              />
              <span className="text-xs font-semibold text-white max-w-[90px] truncate hidden sm:block">
                {user?.profile?.first_name || user?.first_name || "User"}
              </span>
              <ChevronDown
                size={14}
                className="text-gray-400 group-hover:text-white transition"
              />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="w-56 p-2 bg-[#0E0E10] border border-[#262626] rounded-2xl shadow-2xl text-white space-y-1"
          >
            <div className="px-3 py-2 border-b border-[#262626] mb-1">
              <p className="text-xs font-bold text-white truncate">
                {user?.profile?.first_name
                  ? `${user.profile.first_name} ${user?.profile?.last_name || ""}`
                  : user?.email || "Job Seeker"}
              </p>
              <p className="text-[11px] text-gray-400 truncate mt-0.5">
                {user?.email || "Free Tier Account"}
              </p>
            </div>

            <Link
              to="/dashboard/setting"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5 transition"
            >
              <Settings size={14} className="text-gray-400" />
              <span>Settings & Preferences</span>
            </Link>

            <Link
              to="/price"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#81FB84] hover:bg-[#81FB84]/10 transition"
            >
              <Sparkles size={14} />
              <span>Subscription Plans</span>
            </Link>

            <div className="border-t border-[#262626] my-1" />

            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10 transition text-left"
            >
              <LogOut size={14} />
              <span>Log Out</span>
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default CommonNavbar;
