import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import Title from "../common/Title";
import { LuCirclePlus } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
const Step4 = () => {
  const [addEducation, setAddEducation] = useState(false);
  const handleClick2 = (e) => {
    e.preventDefault();
    setAddEducation((prev) => !prev);
  };
  return (
    <div className=" text-white flex items-center justify-center p-3 lg:px-6 xl:py-6">
      <div className="w-[800px] mx-auto">
        <div className="text-center flex md:hidden flex-col items-center gap-2 mb-5 xl:mb-10">
          <Title level="title24">Add Your Education</Title>
          <Title level="title14">
            Share your academic background — including schools, degrees, and
            graduation dates.
          </Title>
        </div>
        <div className="text-center hidden md:flex flex-col items-center gap-4 mb-5 xl:mb-10">
          <Title level="title40">Add Your Education</Title>
          <Title level="title20">
            Share your academic background — including schools, degrees, and
            graduation dates.
          </Title>
        </div>
        {addEducation && (
          <div className="flex justify-between items-center mb-10 p-6 w-full rounded-[12px] border-[#262626] bg-[#0E0E10] border">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Title level="title32" className="text-sm sm:text-base ">
                  UI/UX Designer{" "}
                </Title>
                <GoDotFill className="text-[#fff] text-3xl" />
                <Title level="title32" className="text-sm sm:text-base ">
                  Softvence agency{" "}
                </Title>
              </div>
              <Title level="title24">Mar 2024 - Jan 2025 </Title>
            </div>
            <CiEdit
              size={32}
              className="text-white cursor-pointer p-1 border border-white/30 rounded-full"
            />
          </div>
        )}
        <form className="flex flex-col gap-4">
          {/* First & Last Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Name Of Institute *</label>
            <input
              type="text"
              placeholder="Polytechnic Institute"
              className="bg-[#0E0E10] px-3 py-1.5  text-xs  rounded-lg border border-[#262626] text-white"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Degree *</label>
            <input
              type="text"
              placeholder="Diploma"
              className="bg-[#0E0E10] px-3 py-1.5  text-xs  rounded-lg border border-[#262626] text-white"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white">Start Date *</label>
              <input
                type="date"
                defaultValue="2024-05-22"
                className="bg-[#0E0E10] px-3 py-1.5  text-xs  rounded-lg border border-[#262626] text-white"
              />
            </div>

            {/* Address & DOB */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white">End Date</label>
              <input
                type="date"
                defaultValue="2024-05-22"
                className="bg-[#0E0E10] px-3 py-1.5  text-xs  rounded-lg border border-[#262626] text-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 py-2 lg:py-3">
            <Checkbox />
            <p className="!text-xs">Currently Enrolled</p>
          </div>

          <div>
            <button
              onClick={handleClick2}
              className="font-medium !text-sm px-4 py-2  rounded-lg  flex items-center gap-2   border border-white/20 hover:bg-[white] hover:text-black  transition-colors duration-200"
            >
              <LuCirclePlus size={20} />
              Add Education
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step4;
