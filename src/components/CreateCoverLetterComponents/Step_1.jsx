import React from "react";
import { CiEdit } from "react-icons/ci";
import Title from "../common/Title";
const Step_1 = () => {
  return (
    <div className="     text-white flex items-center justify-center">
      <div className=" w-[800px]  mx-auto">
        <div className="text-center flex flex-col items-center gap-4 mb-5 xl:mb-10">

        <Title level="title40">Basic Information</Title>
        
        </div>

   <form className="grid grid-cols-1 md:grid-cols-2 gap-2">
  {/* First & Last Name */}
  <div className="flex flex-col gap-2">
    <label className="text-sm text-white">First Name *</label>
    <input
      type="text"
      placeholder="Jhon"
      className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
    />
  </div>
  <div className="flex flex-col gap-2">
    <label className="text-sm text-white">Last Name *</label>
    <input
      type="text"
      placeholder="Smith"
      className="bg-[#0E0E10] px-3 py-1.5 text-xs  rounded-lg border border-[#262626] text-white"
    />
  </div>

  {/* Email & Phone */}
  <div className="flex flex-col gap-2">
    <label className="text-sm text-white">Email *</label>
    <input
      type="email"
      placeholder="jhonsmith@gmail.com"
      className="bg-[#0E0E10] px-3 py-1.5 text-xs  rounded-lg border border-[#262626] text-white"
    />
  </div>
  <div className="flex flex-col gap-2">
    <label className="text-sm text-white">Phone Number *</label>
    <div className="flex items-center px-3  text-xs rounded-lg border border-[#262626] bg-[#0E0E10] text-white">
      <span className="pr-2">🇬🇧</span>
      <input
        type="text"
        placeholder="123 456 8455"
        className="bg-transparent px-3 py-1.5 text-xs  w-full focus:outline-none text-white"
      />
    </div>
  </div>

  {/* Address & DOB */}
  <div className="flex flex-col gap-2">
    <label className="text-sm text-white">Address</label>
    <input
      type="text"
      placeholder="Berlin, Germany"
      className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
    />
  </div>
  <div className="flex flex-col gap-2">
    <label className="text-sm text-white">Date of Birth</label>
    <input
      type="date"
      defaultValue="2024-05-22"
      className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
    />
  </div>

  {/* Job Title */}
  <div className="md:col-span-2 flex flex-col gap-2">
    <label className="text-sm text-white">Job Title *</label>
    <input
      type="text"
      placeholder="UI/UX Designer"
      className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
    />
  </div>

  {/* About */}
  <div className="md:col-span-2 flex flex-col gap-2">
    <label className="text-sm text-white">About (Optional)</label>
    <textarea
      placeholder="Tell us about yourself..."
      className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] h-24 resize-none text-white"
    />
  </div>

  {/* LinkedIn & Xing */}
  <div className="flex flex-col gap-2">
    <label className="text-sm text-white">LinkedIn Profile (optional)</label>
    <input
      type="url"
      placeholder="https://www.linkedin.com/in/your-username/"
      className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
    />
  </div>
  <div className="flex flex-col gap-2">
    <label className="text-sm text-white">XING Profile (optional)</label>
    <input
      type="url"
      placeholder="https://www.xing.com/in/your-username/"
      className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
    />
  </div>
</form>


      </div>
    </div>
  );
};

export default Step_1;
