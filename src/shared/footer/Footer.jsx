import React from "react";
import footer from "../../assets/images/logo.png";
// import { Instragram } from "@/components/common/icon";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaMedium } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="bg-Primary w-full section-padding-x pt-10 md:pt-[70px] pb-5 md:pb-10 ">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:justify-between gap-10">
        {/* Left: Logo & Description */}
        <div className="lg:w-[40%]">
          <Link to={"/"}>
            <img
              src={footer}
              alt="icon"
              className="mb-4 text-white cursor-pointer w-[60px] sm:w-[80px] md:w-[100px] lg:w-auto"
            />
          </Link>

          <p className="text-[#666] leading-relaxed">
            CleverCV is an AI-powered resume and cover letter builder that helps you stand out with confidence. Whether you're starting from scratch or improving an existing CV, our platform gives you step-by-step guidance, smart design suggestions, and powerful language enhancements.
          </p>
        </div>

        {/* Right: Links */}
        <div className="lg:w-[60%] grid grid-cols-2  gap-8">
          {/* Company */}
          <div className="flex  justify-end">
            <ul className="text-[#666] space-y-3">
            <p className="text-white text-[20px] font-semibold mb-5">Company</p>
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
            <div className="flex  justify-end">
            <ul className="text-[#666] space-y-3 flex flex-col items-start">
            <p className="text-white text-[20px] font-semibold mb-3">Service</p>
              <li className=" cursor-pointer">AI Resume Builder</li>
              <li className=" cursor-pointer">AI Resume Optimizer</li>
              <li className="cursor-pointer">Create Cover Letter</li>
              <li className="cursor-pointer">Multilingual Resume</li>
           
            </ul>
          </div>

          {/* Tools and Resources */}
          {/* <div>
            <p className="text-white text-[20px] font-semibold mb-5">
              Tools and resources
            </p>
            <ul className="text-[#D5D5D5] space-y-3  flex flex-col items-start">
              <li className="cursor-pointer">Learn</li>
              <li className="cursor-pointer">Credit Score</li>
              <li className="cursor-pointer">Loan Calculator</li>
              <li className="cursor-pointer">Payment Calculator</li>
              <li className="cursor-pointer">Interest Calculator</li>
              <li className="cursor-pointer">Inflation Calculator</li>
              <li className="cursor-pointer">Help center</li>
            </ul>
          </div> */}
        </div>
      </div>

      {/* Divider */}
      <hr className="lg:my-8 my-5 border-[#666]/50" />

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-center lg:justify-between items-center gap-5 text-center">
        {/* Left Text */}
        <div className="flex flex-col  sm:flex-row flex-wrap items-center gap-4 text-[#666] md:text-[16px]">
 
          <p className="underline cursor-pointer">Privacy Policy</p>
          <p className="underline cursor-pointer"> Terms of Service</p>
          <p className="underline cursor-pointer">Cookies Settings</p>
        </div>
<div className="flex gap-5 items-center">
  <FaFacebookF  className="text-2xl text-white" />
  <FaMedium  className="text-2xl text-white"/>
  <FaLinkedin className="text-2xl text-white"/>
</div>
        {/* Right: Social Icons */}
        <div className="flex items-center mx-auto lg:mx-0 text-[#666] lg:gap-3  cursor-pointer">
         <p>© 2024 FutureTech. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
