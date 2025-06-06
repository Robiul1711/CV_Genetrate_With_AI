import React from "react";
import { LuCirclePlus } from "react-icons/lu";

const StepFive = () => {
  return (
    <div className=" w-full">
      <form className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-white">Language *</label>
          <select className="bg-[#0E0E10] px-3 py-1.5  text-xs  rounded-lg border border-[#262626] text-white">
            <option value="beginner">German</option>
            <option value="intermediate">English</option>
            <option value="advanced">Russian</option>
            <option value="advanced">Arabic</option>
            <option value="advanced">Spanish</option>
            <option value="advanced">Turkish</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-white">Select Level *</label>
          <select className="bg-[#0E0E10] px-3 py-1.5  text-xs  rounded-lg border border-[#262626] text-white">
            <option value="beginner">Native</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div>
          <button className="font-medium px-4 py-3 text-xs rounded-lg  flex items-center gap-2   border border-white/20 hover:bg-[white] hover:text-black  transition-colors duration-200">
            <LuCirclePlus size={20} /> Add Another language
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepFive;
