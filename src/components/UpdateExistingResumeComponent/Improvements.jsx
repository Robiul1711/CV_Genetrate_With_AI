import React, { useState } from "react";
import Title from "@/components/common/Title";
import { FaAngleLeft } from "react-icons/fa6";
import resume from "../../assets/images/resume.png";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { BiAnalyse } from "react-icons/bi";
import { Link } from "react-router-dom";
const Improvements = () => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Title level="title32">Suggested Resume Improvements</Title>
      </div>

      <Title level="title22" className="mt-2">
        Based on our analysis, we found areas to enhance your resume for better
        impact.
      </Title>

      <div className="mt-5 flex flex-col lg:flex-row xl:gap-10 gap-5 justify-between">
        {/* Left Image */}
        <div className="lg:w-1/2">
          <img src={resume} alt="resume" className="w-full" />
        </div>

        {/* Right Content */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          <div className="p-6 rounded-xl bg-[#0E0E10]">
            <div className="flex flex-col gap-2">
              <Title level="title22">About</Title>
              <Title level="title18">Original</Title>
              <Title level="title18">
                I am a hardworking individual looking for a challenging
                position.
              </Title>
            </div>
            <div className="mt-4 p-3 rounded-xl border border-[#262626]">
              <Title level="title18">AI Suggestion</Title>
              <Title level="title18" className="mt-2 !text-[#D7D7D7]">
                Motivated and detail-oriented software engineer with 3+ years of
                experience in web development, seeking a challenging role to
                contribute and grow in the German tech landscape
              </Title>
            </div>
            <button className="font-semibold flex items-center gap-2 mt-4 border border-white  py-1.5 px-4 md:text-lg rounded-md bg-white text-black transition-colors duration-300">
              Accept <IoCheckmarkDoneSharp />
            </button>
          </div>
          <div className="p-6 rounded-xl bg-[#0E0E10]">
            <div className="flex flex-col gap-2">
              <Title level="title22">About</Title>
              <Title level="title18">Original</Title>
              <Title level="title18">
                I am a hardworking individual looking for a challenging
                position.
              </Title>
            </div>
            <div className="mt-4 p-3 rounded-xl border border-[#262626]">
              <Title level="title18">AI Suggestion</Title>
              <Title level="title18" className="mt-2 !text-[#D7D7D7]">
                Motivated and detail-oriented software engineer with 3+ years of
                experience in web development, seeking a challenging role to
                contribute and grow in the German tech landscape
              </Title>
            </div>
            <button className="font-semibold flex items-center gap-2 mt-4 border border-white  py-1.5 px-4 md:text-lg rounded-md bg-white text-black transition-colors duration-300">
              Accept <IoCheckmarkDoneSharp />
            </button>
          </div>
          <div className="p-6 rounded-xl bg-[#0E0E10]">
            <div className="flex flex-col gap-2">
              <Title level="title22">About</Title>
              <Title level="title18">Original</Title>
              <Title level="title18">
                I am a hardworking individual looking for a challenging
                position.
              </Title>
            </div>
            <div className="mt-4 p-3 rounded-xl border border-[#262626]">
              <Title level="title18">AI Suggestion</Title>
              <Title level="title18" className="mt-2 !text-[#D7D7D7]">
                Motivated and detail-oriented software engineer with 3+ years of
                experience in web development, seeking a challenging role to
                contribute and grow in the German tech landscape
              </Title>
            </div>
            <button className="font-semibold flex items-center gap-2 mt-4 border border-white  py-1.5 px-4    rounded-md bg-white text-black transition-colors duration-300">
              Accept <IoCheckmarkDoneSharp />
            </button>
          </div>
          <div className="  w-full flex items-center gap-3 md:gap-6">
            <button className="font-semibold flex items-center gap-2 justify-center border border-white/30 text-white w-full   px-8 py-2  rounded-md hover:bg-linearbg transition-colors duration-300">
              Reanalyze <BiAnalyse />
            </button>
            <Link to={"/dashboard/final-review"} className="font-semibold flex items-center gap-2 justify-center w-full border border-white/30 text-white  px-8 py-2  rounded-md hover:bg-linearbg transition-colors duration-300">
              Accept All<IoCheckmarkDoneSharp />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Improvements;
