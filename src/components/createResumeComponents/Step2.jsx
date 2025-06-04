import React from "react";
import { CiEdit } from "react-icons/ci";
import Title from "../common/Title";
const Step2 = () => {
  return (
    <div className=" text-white  flex items-center justify-center p-3 lg:p-6">
      <div className="max-w-6xl w-full">
        <div className="text-center flex flex-col items-center gap-4 mb-10">

        <Title level="title40">Add Your Personal Details</Title>
        <Title level="title20">
          Please enter your basic details. These help employers get to know you and ensure your resume is complete.
        </Title>
        </div>

        {/* Upload Section */}
   <div className="flex flex-col gap-4 mb-8">
  <p className="text-sm text-white">Upload your photo *</p>

  <div className="relative w-20 h-20 rounded-full  border-2 border-white">
    <img
      src="https://randomuser.me/api/portraits/men/32.jpg"
      alt="Profile"
      className="w-full h-full object-cover rounded-full"
    />

    {/* Fix: z-index + absolute inside relative parent */}
    <label className="absolute -bottom-1.5 border border-[#81FB84]/30  right-0 w-8 h-8 bg-dark rounded-full flex items-center justify-center cursor-pointer z-50">
      <CiEdit size={20} className="text-white" />
      <input type="file" className="hidden" />
    </label>
  </div>
</div>


   <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* First & Last Name */}
  <div className="flex flex-col gap-2">
    <label className="text-sm text-white">First Name *</label>
    <input
      type="text"
      placeholder="Jhon"
      className="bg-[#0E0E10] p-5 rounded-lg border border-[#262626] text-white"
    />
  </div>
  <div className="flex flex-col gap-2">
    <label className="text-sm text-white">Last Name *</label>
    <input
      type="text"
      placeholder="Smith"
      className="bg-[#0E0E10] p-5 rounded-lg border border-[#262626] text-white"
    />
  </div>

  {/* Email & Phone */}
  <div className="flex flex-col gap-2">
    <label className="text-sm text-white">Email *</label>
    <input
      type="email"
      placeholder="jhonsmith@gmail.com"
      className="bg-[#0E0E10] p-5 rounded-lg border border-[#262626] text-white"
    />
  </div>
  <div className="flex flex-col gap-2">
    <label className="text-sm text-white">Phone Number *</label>
    <div className="flex items-center p-5 rounded-lg border border-[#262626] bg-[#0E0E10] text-white">
      <span className="pr-2">🇬🇧</span>
      <input
        type="text"
        placeholder="123 456 8455"
        className="bg-transparent w-full focus:outline-none text-white"
      />
    </div>
  </div>

  {/* Address & DOB */}
  <div className="flex flex-col gap-2">
    <label className="text-sm text-white">Address</label>
    <input
      type="text"
      placeholder="Berlin, Germany"
      className="bg-[#0E0E10] p-5 rounded-lg border border-[#262626] text-white"
    />
  </div>
  <div className="flex flex-col gap-2">
    <label className="text-sm text-white">Date of Birth</label>
    <input
      type="date"
      defaultValue="2024-05-22"
      className="bg-[#0E0E10] p-5 rounded-lg border border-[#262626] text-white"
    />
  </div>

  {/* Job Title */}
  <div className="md:col-span-2 flex flex-col gap-2">
    <label className="text-sm text-white">Job Title *</label>
    <input
      type="text"
      placeholder="UI/UX Designer"
      className="bg-[#0E0E10] p-5 rounded-lg border border-[#262626] text-white"
    />
  </div>

  {/* About */}
  <div className="md:col-span-2 flex flex-col gap-2">
    <label className="text-sm text-white">About (Optional)</label>
    <textarea
      placeholder="Tell us about yourself..."
      className="bg-[#0E0E10] p-5 rounded-lg border border-[#262626] h-24 resize-none text-white"
    />
  </div>

  {/* LinkedIn & Xing */}
  <div className="flex flex-col gap-2">
    <label className="text-sm text-white">LinkedIn Profile (optional)</label>
    <input
      type="url"
      placeholder="https://www.linkedin.com/in/your-username/"
      className="bg-[#0E0E10] p-5 rounded-lg border border-[#262626] text-white"
    />
  </div>
  <div className="flex flex-col gap-2">
    <label className="text-sm text-white">XING Profile (optional)</label>
    <input
      type="url"
      placeholder="https://www.xing.com/in/your-username/"
      className="bg-[#0E0E10] p-5 rounded-lg border border-[#262626] text-white"
    />
  </div>
</form>


      </div>
    </div>
  );
};

export default Step2;
