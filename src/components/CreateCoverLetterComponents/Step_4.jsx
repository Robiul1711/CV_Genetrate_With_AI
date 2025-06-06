import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import Title from "../common/Title";
import { LuCirclePlus } from "react-icons/lu";
const Step_4 = () => {
  return (
    <div className=" text-white flex items-center justify-center">
      <div className="w-[800px] mx-auto">
        <div className="text-center flex flex-col items-center gap-4 mb-5">
          <Title level="title40"> Why You’re a Good Fit</Title>
  
        </div>

        <form className="flex flex-col gap-4">
          {/* First & Last Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Why do you want this job?</label>
            <input
              type="text"
              placeholder="Write here..."
              className="bg-[#0E0E10] px-3 py-1.5 text-xs  rounded-lg border border-[#262626] text-white"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Relevant Experience/Skills for this role</label>
            <input
              type="text"
              placeholder="Write here..."
              className="bg-[#0E0E10] px-3 py-1.5 text-xs  border border-[#262626] text-white"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Any specific achievement or project to highlight?</label>
            <input
              type="text"
              placeholder="Write here..."
              className="bg-[#0E0E10] px-3 py-1.5 text-xs  rounded-lg border border-[#262626] text-white"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Are there any keywords or values you'd like to emphasize?</label>
            <input
              type="text"
              placeholder="Write here..."
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step_4;
