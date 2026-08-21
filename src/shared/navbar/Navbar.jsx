import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import UserDropdown from "../UserDropdown";
import Logo from "@/components/common/Logo";
import { Sparkles, ArrowRight } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Price", path: "/price" },
  { name: "Contact", path: "/contact" },
  { name: "AI Help", path: "/ai-help", isBadge: true },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const sidebarRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile sidebar on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 section-padding-x ${
          isScrolled
            ? "py-3 bg-[#08090A]/90 backdrop-blur-xl shadow-lg"
            : "py-4 md:py-5 bg-transparent"
        }`}
      >
        <div className="w-full flex items-center justify-between gap-4">
          {/* Left: Brand Logo */}
          <div className="flex-shrink-0">
            <Logo size="md" />
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#121214]/70 border border-[#262626] p-1.5 rounded-full backdrop-blur-md mx-auto">
            {navLinks.map(({ name, path, isBadge }, index) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  to={path}
                  key={index}
                  className={`relative px-4 py-1.5 text-xs xl:text-sm font-medium rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? "bg-white text-black shadow-md font-semibold"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{name}</span>
                  {isBadge && !isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#81FB84] shadow-[0_0_6px_#81FB84]"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Auth / User Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/dashboard"
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#16221c] border border-[#81FB84]/30 text-[#81FB84] hover:bg-[#81FB84] hover:text-black transition"
                >
                  <Sparkles size={13} /> Dashboard
                </Link>
                <UserDropdown />
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2.5">
                <Link
                  to="/sign-in"
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition"
                >
                  Log In
                </Link>
                <Link
                  to="/sign-up"
                  className="inline-flex items-center gap-1.5 bg-[#81FB84] text-black font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-[#a6fca9] transition shadow-lg shadow-[#81FB84]/20"
                >
                  <span>Get Started</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#141416] border border-[#262626] text-white hover:bg-[#222] transition"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
            />

            {/* Slide-out Drawer */}
            <motion.div
              ref={sidebarRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 w-4/5 max-w-sm h-full bg-[#0E0E10] border-l border-[#262626] z-50 p-6 flex flex-col justify-between shadow-2xl lg:hidden"
            >
              <div className="space-y-6">
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#262626]">
                  <Logo size="sm" />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg bg-[#1A1A1A] text-gray-400 hover:text-white"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-1.5">
                  {navLinks.map(({ name, path, isBadge }, index) => {
                    const isActive = location.pathname === path;
                    return (
                      <Link
                        to={path}
                        key={index}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition ${
                          isActive
                            ? "bg-white text-black font-semibold shadow-md"
                            : "text-gray-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span>{name}</span>
                        {isBadge && (
                          <span className="text-[10px] bg-[#81FB84]/20 text-[#81FB84] px-2 py-0.5 rounded-full font-bold">
                            NEW
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Bottom Auth Buttons */}
              <div className="pt-6 border-t border-[#262626] space-y-3">
                {user ? (
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="w-full py-3 bg-white text-black font-semibold text-sm rounded-xl flex items-center justify-center gap-2"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/sign-in"
                      onClick={() => setIsOpen(false)}
                      className="w-full py-2.5 border border-[#333] hover:border-white text-white text-center font-medium text-sm rounded-xl block transition"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/sign-up"
                      onClick={() => setIsOpen(false)}
                      className="w-full py-3 bg-[#81FB84] text-black font-bold text-sm rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-[#81FB84]/20"
                    >
                      <span>Create Free Account</span>
                      <ArrowRight size={16} />
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
