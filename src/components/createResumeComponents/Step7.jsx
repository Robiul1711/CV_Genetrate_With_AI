import React, { useState } from "react";
import Title from "../common/Title";
import { LuCirclePlus } from "react-icons/lu";
import { CiEdit } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
const Step7 = () => {
  const [addCourse, setAddCourse] = useState(false);
  const handleAddCourse = (e) => {
    e.preventDefault();
    setAddCourse(!addCourse);
  }
  return (
    <div className="bg-black text-white flex items-center justify-center p-3 lg:px-6 xl:py-6">
      <div className="max-w-6xl w-full">
        <div className="text-center flex flex-col items-center gap-4 mb-5 xl:mb-10">
          <Title level="title40"> Courses and Training Details</Title>
          <Title level="title20">
            Provide information about any professional courses or training
            you’ve completed.
          </Title>
        </div>
{
        addCourse && (
            <div className="flex justify-between items-center mb-10 p-6 w-full rounded-[12px] border-[#262626] bg-[#0E0E10] border">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Title level="title32" className="text-sm sm:text-base md:text-[32px]">UI/UX Designer </Title>
                  <GoDotFill className="text-[#fff] text-3xl" />
                  <Title level="title32" className="text-sm sm:text-base md:text-[32px]">Softvence agency </Title>
                </div>
                <Title level="title24">Mar 2024 - Jan 2025 </Title>
              </div>
              <CiEdit
                size={32}
                className="text-white cursor-pointer p-1 border border-white/30 rounded-full"
              />
            </div>
    
        )
}
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
            <button onClick={handleAddCourse} className="font-medium px-7 py-3 md:py-5 rounded-lg  flex items-center gap-2   border border-white/20 hover:bg-[white] hover:text-black  transition-colors duration-200">
              <LuCirclePlus size={20} />
              Add Another Certificate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step7;
