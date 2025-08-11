import React from "react";
import { useFormContext } from "react-hook-form";
import Title from "../common/Title";

const Step_1 = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="text-white flex items-center justify-center">
      <div className="w-[800px] mx-auto">
        <div className="text-center flex flex-col items-center gap-4 mb-5 xl:mb-10">
          <Title level="title40">Basic Information</Title>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* First Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">First Name *</label>
            <input
              type="text"
              placeholder="John"
              {...register("first_name", { required: "First name is required" })}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
            {errors.first_name && (
              <span className="text-red-500 text-xs">
                {errors.first_name.message}
              </span>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Last Name *</label>
            <input
              type="text"
              placeholder="Smith"
              {...register("last_name", { required: "Last name is required" })}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
            {errors.last_name && (
              <span className="text-red-500 text-xs">
                {errors.last_name.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Email *</label>
            <input
              type="email"
              placeholder="johnsmith@gmail.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">{errors.email.message}</span>
            )}
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Phone Number *</label>
            <div className="flex items-center px-3 text-xs rounded-lg border border-[#262626] bg-[#0E0E10] text-white">
              <span className="pr-2">🇬🇧</span>
              <input
                type="text"
                placeholder="123 456 8455"
                {...register("phone_number", { required: "Phone number is required" })}
                className="bg-transparent px-3 py-1.5 text-xs w-full focus:outline-none text-white"
              />
            </div>
            {errors.phone_number && (
              <span className="text-red-500 text-xs">{errors.phone_number.message}</span>
            )}
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
              {...register("job_title", { required: "Job title is required" })}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
            {errors.job_title && (
              <span className="text-red-500 text-xs">{errors.job_title.message}</span>
            )}
          </div>

          {/* About */}
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-sm text-white">About (Optional)</label>
            <textarea
              placeholder="Tell us about yourself..."
              {...register("about")}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] h-24 resize-none text-white"
            />
          </div>

          {/* LinkedIn */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">LinkedIn Profile (optional)</label>
            <input
              type="url"
              placeholder="https://www.linkedin.com/in/your-username/"
              {...register("linked_in_profile")}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
          </div>

          {/* XING */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">XING Profile (optional)</label>
            <input
              type="url"
              placeholder="https://www.xing.com/in/your-username/"
              {...register("xing_profile")}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step_1;
