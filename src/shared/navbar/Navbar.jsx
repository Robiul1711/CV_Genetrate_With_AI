import { useState, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import uk from "../../assets/images/uk.png";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

const navLinks = ["Home", "Price", "Contact", "AI Help"];

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 section-padding-x py-6 flex items-center justify-between transition-all duration-300 ${
        isScrolled
          ? "bg-[#0E0E10]/70 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center gap-24">
        <img src={logo} alt="Logo" />
        <ul className="flex items-center gap-4">
          {navLinks.map((link, index) => (
            <li
              key={index}
              onClick={() => setActiveLink(link)}
              className={`cursor-pointer font-medium py-3 px-7 rounded-lg transition-all duration-300 transform ${
                activeLink === link
                  ? "bg-white text-dark translate-y-[-2px]"
                  : "text-white hover:bg-white hover:text-dark hover:translate-y-[-2px]"
              }`}
            >
              {link}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-5">
        <Link to={"/sign-in"}>
          <button className="font-medium py-3 px-7 border border-white rounded-lg">
            Log In
          </button>
        </Link>
        <Link to={"/sign-up"}>
          <button className="font-medium py-3 px-7 border border-white rounded-lg bg-white text-dark">
            Sign Up
          </button>
        </Link>

        <div className="flex items-center font-medium py-3 px-4 border border-white rounded-lg gap-2">
          <img src={uk} alt="UK Flag" />
          <span>Eng</span>
          <IoIosArrowDown />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
