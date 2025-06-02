import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { LuCirclePlus } from "react-icons/lu";
const StepTwo = () => {
    const [experienceForms, setExperienceForms] = useState([0]); // initially one form

  const handleAddForm = () => {
    setExperienceForms((prev) => [...prev, prev.length]);
  };

  return (

      <div className="w-full">

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First & Last Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Job Title *</label>
            <input
              type="text"
              placeholder="Jhon"
              className="bg-[#0E0E10] p-5 rounded-lg border border-[#262626] text-white"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Company Name *</label>
            <input
              type="text"
              placeholder="Smith"
              className="bg-[#0E0E10] p-5 rounded-lg border border-[#262626] text-white"
            />
          </div>

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

          <div className="flex items-center gap-2 py-6">
            <Checkbox />
            <p>I&apos;m still working here</p>
          </div>
          {/* About */}
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-sm text-white">
              Responsibilities / Achievements ( Optional)
            </label>
            <textarea
              placeholder="Tell us about yourself..."
              className="bg-[#0E0E10] p-5 rounded-lg border border-[#262626] h-24 resize-none text-white"
            />
          </div>
          <div>
    
            <button className="font-medium px-7 py-5 rounded-lg  flex items-center gap-2   border border-white/20 hover:bg-[white] hover:text-black  transition-colors duration-200">
              <LuCirclePlus size={20} /> Add Another Pervious Experience
            </button>
          </div>
        </form>

    </div>
  );
};

export default StepTwo;
