import React from "react";
import Title from "@/components/common/Title";
import { FaAngleLeft } from "react-icons/fa6";
import resume from "../../assets/images/resume.png";
import { Link } from "react-router-dom";
import StepDesign from "@/components/Edit_Resume_Components/StepDesign";


const Design = () => {

  return (
    <div>
      <Link to={"/dashboard/edit-resume"} className="flex items-center gap-2 cursor-pointer">
        <FaAngleLeft className="cursor-pointer text-3xl p-1 border border-white/30 rounded-full" />
        <Title level="title32">Edit Resume</Title>
      </Link>

      <Title level="title22" className="mt-2">
        Let AI help improve your resume content.
      </Title>

      <div className="mt-10 flex gap-10 justify-between">
        {/* Left Image */}
        <div className="w-1/2">
          <img src={resume} alt="resume" />
        </div>

        {/* Right Content */}
        <div className="w-1/2">
          {/* Top buttons */}
          <div className="p-6 rounded-xl bg-[#0E0E10] flex items-center justify-center gap-6 border border-[#262626]">
            <Link to={"/dashboard/edit-resume"} className="font-semibold border w-full text-center border-white/10 text-white py-4 px-16 text-lg rounded-md hover:bg-linearbg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              Edit Content
            </Link>
            <Link to={"/dashboard/edit-design"} className="font-semibold border w-full text-center border-white/10 text-white py-4 px-16 text-lg rounded-md bg-linearbg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              Design
            </Link>
          </div>


          {/* Active Step */}
          <div className="mt-10">
            <StepDesign  />
            <button className="font-semibold border bg-white mt-8 w-full border-white/30 text-black py-4 px-16 text-lg rounded-md hover:bg-black hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Design;
