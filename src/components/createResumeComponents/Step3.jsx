import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import Title from "../common/Title";
import { LuCirclePlus } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
const Step3 = () => {
  const [addWork, setAddWork] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setAddWork((prev) => !prev);
  };
  return (
    <div className=" text-white flex items-center justify-center p-3 lg:px-6 xl:py-6">
      <div className="w-[800px] mx-auto">
        <div className="text-center flex flex-col items-center gap-4 mb-3 xl:mb-5">
          <Title level="title40">Your Work Experience</Title>
          <Title level="title20">
            List your previous jobs and responsibilities. Start with your most
            recent experience. You can add multiple positions.
          </Title>
        </div>
        {addWork && (
          <div className="flex justify-between items-center mb-10 p-3 w-full rounded-[12px] border-[#262626] bg-[#0E0E10] border">
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
              <Title level="title24" className="text-sm sm:text-base ">
                Mar 2024 - Jan 2025{" "}
              </Title>
            </div>
            <CiEdit
              size={32}
              className="text-white cursor-pointer p-1 border border-white/30 rounded-full"
            />
          </div>
        )}

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First & Last Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Job Title *</label>
            <input
              type="text"
              placeholder="Jhon"
              className="bg-[#0E0E10] px-3 py-1.5  text-xs  rounded-lg border border-[#262626] text-white"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Company Name *</label>
            <input
              type="text"
              placeholder="Smith"
              className="bg-[#0E0E10] px-3 py-1.5  text-xs rounded-lg border border-[#262626] text-white"
            />
          </div>

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

          <div className="flex items-center gap-2 py-3">
            <Checkbox />
            <p className="text-sm">I&apos;m still working here</p>
          </div>
          {/* About */}
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-sm text-white">
              Responsibilities / Achievements ( Optional)
            </label>
            <textarea
              placeholder="Tell us about yourself..."
              className="bg-[#0E0E10] px-3 py-1.5  text-xs  rounded-lg border border-[#262626] h-20 resize-none text-white"
            />
          </div>
          <div>
            <button
              onClick={handleClick}
              className="font-medium px-4 text-sm py-2   rounded-lg  flex items-center gap-2   border border-white/20 hover:bg-[white] hover:text-black  transition-colors duration-200"
            >
              <LuCirclePlus size={20} /> Add Another Pervious Experience
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step3;
