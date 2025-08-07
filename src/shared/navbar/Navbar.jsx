import { useState, useEffect, useRef } from "react";
import logo from "../../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import LanguageDropdown from "@/components/common/LanguageDropdown";
import { useAuth } from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Price", path: "/price" },
  { name: "Contact", path: "/contact" },
  { name: "AI Help", path: "/ai-help" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const sidebarRef = useRef(null);
  const { user,logout, isLoadingUser,} = useAuth();

  const axiosSecure =useAxiosSecure()
  

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close sidebar on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 section-padding-x py-4  flex items-center justify-between transition-all duration-300 ${
          isScrolled
            ? "bg-[#0E0E10]/70 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        {/* Left: Logo + Nav Links (desktop only) */}
        <div className="flex items-center gap-24">
          <Link to={"/"}>
            <img src={logo} alt="Logo" className="w-10 md:w-12  xl:w-16" />
          </Link>

          {/* Nav Links - hidden on md and below */}
          <ul className="hidden lg:flex items-center gap-4">
            {navLinks.map(({ name, path }, index) => (
              <Link
                to={path}
                key={index}
                className={`cursor-pointer font-medium py-2 xl:py-3 px-5 xl:px-7 rounded-lg transition-all duration-300 transform ${
                  location.pathname === path
                    ? "bg-white text-dark translate-y-[-2px]"
                    : "text-white hover:bg-white hover:text-dark hover:translate-y-[-2px]"
                }`}
              >
                {name}
              </Link>
            ))}
          </ul>
        </div>

        {/* Right: Buttons - hidden on md and below */}
        {user ? (
          <button onClick={logout} className=" py-2 px-4 rounded-xl border-gray-400 text-center flex justify-center items-center">

            Logout
          </button>
        ) : (
          <div className="hidden lg:flex items-center gap-5">
            <Link to={"/sign-in"}>
              <button className="font-medium py-2 xl:py-3 px-5 xl:px-7 border border-white hover:bg-white hover:text-dark rounded-lg">
                Log In
              </button>
            </Link>
            <Link to={"/sign-up"}>
              <button className="font-medium py-2 xl:py-3 px-5 xl:px-7 border border-white hover:bg-white hover:text-dark rounded-lg ">
                Sign Up
              </button>
            </Link>
            <LanguageDropdown />
          </div>
        )}

        {/* Dynamic Icon for mobile */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <FiX className="text-white text-2xl md:text-3xl" />
            ) : (
              <FiMenu className="text-white text-2xl md:text-3xl" />
            )}
          </button>
        </div>
      </header>

      {/* Sidebar (Mobile Nav) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
            />

            {/* Sidebar */}
            <motion.div
              ref={sidebarRef}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 w-3/4 md:w-1/2 h-full bg-[#0E0E10] z-50 shadow-lg px-6 py-8 flex flex-col gap-6 lg:hidden"
            >
              <ul className="flex flex-col gap-4">
                {navLinks.map(({ name, path }, index) => (
                  <Link
                    to={path}
                    key={index}
                    className={`cursor-pointer font-medium py-2 md:py-3 px-5 md:px-7 rounded-lg transition-all duration-300 transform ${
                      location.pathname === path
                        ? "bg-white text-dark w-[70%] translate-y-[-2px]"
                        : "text-white hover:bg-white hover:text-dark hover:translate-y-[-2px]"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {name}
                  </Link>
                ))}
              </ul>

              <div className="flex flex-col  gap-4 mt-4 w-full">
                <div className="flex justify-between gap-3 w-full">
                  <div className="w-full">
                    <Link to="/sign-in">
                      <button
                        className="w-full font-medium py-2 md:py-3 px-5 md:px-7 border border-white rounded-lg text-white hover:bg-white hover:text-black transition"
                        onClick={() => setIsOpen(false)}
                      >
                        Log In
                      </button>
                    </Link>
                  </div>
                  <div className="w-full">
                    <Link to="/sign-up">
                      <button
                        className="w-full font-medium py-2 md:py-3 px-5 md:px-7 border border-white rounded-lg text-white hover:bg-white hover:text-black transition"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign Up
                      </button>
                    </Link>
                  </div>
                </div>

                <LanguageDropdown />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
