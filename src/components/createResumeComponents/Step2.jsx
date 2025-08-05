import React from "react";
import { CiEdit } from "react-icons/ci";
import Title from "../common/Title";
import { useFormContext } from "react-hook-form";

const Step2 = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="text-white flex items-center justify-center p-3 lg:px-6 xl:py-6">
      <div className="w-[800px] mx-auto">

        {/* Header */}
        <div className="text-center flex md:hidden flex-col items-center gap-2 mb-5 xl:mb-10">
          <Title level="title24">Add Your Personal Details</Title>
          <Title level="title14">
            Please enter your basic details. These help employers get to know you and ensure your resume is complete.
          </Title>
        </div>
        <div className="text-center hidden md:flex flex-col items-center gap-4 mb-5 xl:mb-10">
          <Title level="title40">Add Your Personal Details</Title>
          <Title level="title20">
            Please enter your basic details. These help employers get to know you and ensure your resume is complete.
          </Title>
        </div>

        {/* Upload Section */}
        <div className="flex flex-col gap-4 mb-8">
          <p className="text-sm text-white">Upload your photo *</p>
          <div className="relative w-16 h-16 rounded-full border-2 border-white">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
            <label className="absolute -bottom-1.5 border border-[#81FB84]/30 right-0 w-8 h-8 bg-dark rounded-full flex items-center justify-center cursor-pointer z-50">
              <CiEdit size={20} className="text-white" />
              <input type="file" className="hidden" {...register("profileImage")} />
            </label>
          </div>
        </div>

        {/* Form Fields */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">First Name *</label>
            <input
              type="text"
              placeholder="John"
              {...register("firstName", { required: "First name is required" })}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
            {errors.firstName && <p className="text-red-400 text-xs">{errors.firstName.message}</p>}
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Last Name *</label>
            <input
              type="text"
              placeholder="Smith"
              {...register("lastName", { required: "Last name is required" })}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
            {errors.lastName && <p className="text-red-400 text-xs">{errors.lastName.message}</p>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Email *</label>
            <input
              type="email"
              placeholder="johnsmith@gmail.com"
              {...register("email", { required: "Email is required" })}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
            {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Phone Number *</label>
            <div className="flex items-center px-3 py-1.5 text-xs rounded-lg border border-[#262626] bg-[#0E0E10] text-white">
              <span className="pr-2">🇬🇧</span>
              <input
                type="text"
                placeholder="123 456 8455"
                {...register("phone", { required: "Phone number is required" })}
                className="bg-transparent w-full focus:outline-none text-white"
              />
            </div>
            {errors.phone && <p className="text-red-400 text-xs">{errors.phone.message}</p>}
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Address</label>
            <input
              type="text"
              placeholder="Berlin, Germany"
              {...register("address")}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Date of Birth</label>
            <input
              type="date"
              {...register("dob")}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
          </div>

          {/* Job Title */}
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-sm text-white">Job Title *</label>
            <input
              type="text"
              placeholder="UI/UX Designer"
              {...register("jobTitle", { required: "Job title is required" })}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
            {errors.jobTitle && <p className="text-red-400 text-xs">{errors.jobTitle.message}</p>}
          </div>

          {/* About */}
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-sm text-white">About (Optional)</label>
            <textarea
              placeholder="Tell us about yourself..."
              {...register("about")}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] h-20 resize-none text-white"
            />
          </div>

          {/* LinkedIn */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">LinkedIn Profile (optional)</label>
            <input
              type="url"
              placeholder="https://www.linkedin.com/in/your-username/"
              {...register("linkedin")}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
          </div>

          {/* Xing */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">XING Profile (optional)</label>
            <input
              type="url"
              placeholder="https://www.xing.com/in/your-username/"
              {...register("xing")}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step2;
