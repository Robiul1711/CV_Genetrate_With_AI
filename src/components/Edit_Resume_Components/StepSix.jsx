import React from "react";
import { LuCirclePlus } from "react-icons/lu";
const StepSix = () => {
  return (
      <div className=" w-full">


        <form className="flex flex-col gap-4">
          {/* First & Last Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Name Of Institute *</label>
            <input
              type="text"
              placeholder="Polytechnic Institute"
              className="bg-[#0E0E10] p-5 rounded-lg border border-[#262626] text-white"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Course Name *</label>
            <input
              type="text"
              placeholder="Diploma"
              className="bg-[#0E0E10] p-5 rounded-lg border border-[#262626] text-white"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white">Start Date *</label>
              <input
                type="date"
                defaultValue="2024-05-22"
                className="bg-[#0E0E10] p-5 rounded-lg border border-[#262626] text-white"
              />
            </div>

            {/* Address & DOB */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white">End Date</label>
              <input
                type="date"
                defaultValue="2024-05-22"
                className="bg-[#0E0E10] p-5 rounded-lg border border-[#262626] text-white"
              />
            </div>
          </div>

          <div>
            <button className="font-medium px-7 py-5 rounded-lg  flex items-center gap-2   border border-white/20 hover:bg-[white] hover:text-black  transition-colors duration-200">
              <LuCirclePlus size={20} />
              Add Another Certificate
            </button>
          </div>
        </form>
      </div>
  );
};

export default StepSix;
