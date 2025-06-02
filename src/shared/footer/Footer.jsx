import React from "react";
import footer from "../../assets/images/logo.png";
// import { Instragram } from "@/components/common/icon";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaMedium } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="bg-Primary w-full section-padding-x pt-10 md:pt-[70px] pb-5 md:pb-10">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:justify-between gap-10">
        {/* Left: Logo & Description */}
        <div className="md:w-full lg:w-[40%]">
          <Link to={"/"}>
            <img
              src={footer}
              alt="icon"
              className="mb-4 text-white cursor-pointer w-[60px]  md:w-[70px] lg:w-auto"
            />
          </Link>
          <p className="text-[#666] leading-relaxed">
            CleverCV is an AI-powered resume and cover letter builder that helps
            you stand out with confidence. Whether you're starting from scratch
            or improving an existing CV, our platform gives you step-by-step
            guidance, smart design suggestions, and powerful language
            enhancements.
          </p>
        </div>

        {/* Right: Links */}
        <div className="md:w-full lg:w-[60%] grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Company */}
          <div className="flex justify-start md:justify-end">
            <ul className="text-[#666] space-y-3">
              <p className="text-white text-[20px] font-semibold mb-5">
                Company
              </p>
              <li>
                <a href="/" className="cursor-pointer">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="cursor-pointer">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/resources" className="cursor-pointer">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Service */}
          <div className="flex justify-start md:justify-end">
            <ul className="text-[#666] space-y-3 flex flex-col items-start">
              <p className="text-white text-[20px] font-semibold mb-3">
                Service
              </p>
              <li className="cursor-pointer">AI Resume Builder</li>
              <li className="cursor-pointer">AI Resume Optimizer</li>
              <li className="cursor-pointer">Create Cover Letter</li>
              <li className="cursor-pointer">Multilingual Resume</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-5 lg:my-8 border-[#666]/50" />

      {/* Bottom Section */}
      <div className="flex flex-col lg:flex-row flex-wrap justify-center lg:justify-between items-center gap-5 text-center w-full">
        {/* Left Text */}
        <div className="flex flex-wrap justify-center gap-4 text-[#666] md:text-[16px]">
          <Link to={"/privacy-policy"}>
            <p className="underline cursor-pointer">Privacy Policy</p>
          </Link>
          <Link to={"/tearms-and-condition"}>
            <p className="underline cursor-pointer">Terms of Service</p>
          </Link>
          <Link to={"/imprint"}>
            <p className="underline cursor-pointer">Imprint</p>
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-5 items-center justify-center">
          <FaFacebookF className="text-2xl text-white" />
          <FaMedium className="text-2xl text-white" />
          <FaLinkedin className="text-2xl text-white" />
        </div>

        {/* Copyright */}
        <div className="text-[#666] text-center">
          <p>© 2024 FutureTech. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
