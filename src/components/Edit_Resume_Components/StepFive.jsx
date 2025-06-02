import React from "react";
import { LuCirclePlus } from "react-icons/lu";

const StepFive = () => {
  return (
      <div className=" w-full">
  

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Language *</label>
            <select className="bg-[#0E0E10] p-5 rounded-lg border border-[#262626] text-white">
              <option value="beginner">German</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Select Level *</label>
            <select className="bg-[#0E0E10] p-5 rounded-lg border border-[#262626] text-white">
              <option value="beginner">Native</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div>
            <button className="font-medium px-7 py-5 rounded-lg  flex items-center gap-2   border border-white/20 hover:bg-[white] hover:text-black  transition-colors duration-200">
              <LuCirclePlus size={20} /> Add Another language
            </button>
          </div>
        </form>
    </div>
  );
};

export default StepFive;