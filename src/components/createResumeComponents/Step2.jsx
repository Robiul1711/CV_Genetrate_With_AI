import React, { useState, useRef } from "react";
import { CiEdit } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import Title from "../common/Title";
import { Controller, useFormContext } from "react-hook-form";
import { useResume } from "@/providers/ResumeContext";
import DummyUser from "@/assets/images/userdummy.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Step2 = () => {
  const {
    register,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const fileInputRef = useRef(null);
  const [profilePreview, setProfilePreview] = useState(DummyUser);
  const [imageError, setImageError] = useState(""); // new state for image validation error

  const { imageString, setImageString } = useResume();

  const profilePhoto = watch("profile_photo");

  // Convert file to base64 and update state
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 4MB)
    if (file.size > 4 * 1024 * 1024) {
      setImageError("Image must be less than 4 MB");
      setValue("profile_photo", "", { shouldValidate: true });
      setProfilePreview(DummyUser);
      return;
    } else {
      setImageError(""); // clear error if valid
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        const base64String = reader.result.toString();
        setImageString(base64String);
        setValue("profile_photo", base64String, { shouldValidate: true });
        setProfilePreview(base64String);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = (e) => {
    e.stopPropagation();
    setValue("profile_photo", "", { shouldValidate: true });
    setProfilePreview("https://randomuser.me/api/portraits/men/32.jpg");
    setImageError(""); // clear error on remove
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <div className="text-white flex items-center justify-center p-3 lg:px-6 xl:py-6 w-full">
      <div className="w-full max-w-[800px] mx-auto">
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
        <div className="flex flex-col gap-2 mb-8">
          <p className="text-sm text-white">Upload your photo *</p>
          <div className="relative w-16 h-16 rounded-full border-2 border-white">
            <div
              className="w-full h-full rounded-full overflow-hidden cursor-pointer"
              onClick={handleAvatarClick}
            >
              <img
                src={profilePreview}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <div
              className="absolute -bottom-1.5 border border-[#81FB84]/30 right-0 w-8 h-8 bg-dark rounded-full flex items-center justify-center cursor-pointer z-50"
              onClick={handleAvatarClick}
            >
              <CiEdit size={20} className="text-white" />
            </div>

            <input
              ref={fileInputRef}
              id="profile-photo-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {profilePhoto && profilePhoto !== "" && (
              <div
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center cursor-pointer z-50"
                onClick={handleRemovePhoto}
              >
                <RxCross2 size={12} className="text-white" />
              </div>
            )}
          </div>
          {/* Image error */}
          {imageError && (
            <p className="text-red-500 text-xs mt-1">{imageError}</p>
          )}
        </div>

        {/* Form Fields */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">First Name *</label>
            <input
              type="text"
              placeholder="First Name"
              {...register("first_name", {
                required: "First name is required",
              })}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
            {errors.first_name && (
              <p className="text-red-400 text-xs">
                {errors.first_name.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Last Name *</label>
            <input
              type="text"
              placeholder="Last Name"
              {...register("last_name", {
                required: "Last name is required",
              })}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
            {errors.last_name && (
              <p className="text-red-400 text-xs">{errors.last_name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Email *</label>
            <input
              type="email"
              placeholder="Email Address"
              {...register("email", {
                required: "Email is required",
              })}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
            {errors.email && (
              <p className="text-red-400 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <label className="md:text-base text-[14px] font-normal text-white">
              Phone Number
            </label>
            <Controller
              name="phone_number"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Phone number is required",
                },
              }}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  country={"us"}
                  placeholder="Enter your phone number"
                  inputClass=" md:text-base text-[14px]"
                  containerClass={`flex font-poppins gap-2 items-center p-1 border-[1px] border-[#262626] w-full rounded-[12px] phone_input_container_profile_edit ${
                    errors.phone_number ? "border-red-500" : "border-[#D8D8D]"
                  }`}
                />
              )}
            />
            {errors.phone_number && (
              <p className="text-red-500 text-sm">
                {errors.phone_number.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Address *</label>
            <input
              type="text"
              placeholder="Enter your address"
              {...register("address", {
                required: "Address is required",
              })}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
            {errors.address && (
              <p className="text-red-400 text-xs">{errors.address.message}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Date of Birth *</label>
            <input
              type="date"
              {...register("dob", {
                required: "Date of birth is required",
              })}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
            {errors.dob && (
              <p className="text-red-400 text-xs">{errors.dob.message}</p>
            )}
          </div>

          {/* Job Title */}
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-sm text-white">Job Title *</label>
            <input
              type="text"
              placeholder="Enter your job title"
              {...register("job_title", {
                required: "Job title is required",
              })}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
            {errors.job_title && (
              <p className="text-red-400 text-xs">{errors.job_title.message}</p>
            )}
          </div>

          {/* About */}
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-sm text-white">About</label>
            <textarea
              placeholder="Tell us about yourself..."
              {...register("about", {
                required: "About is required",
              })}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] h-20 resize-none text-white"
            />
            {errors.about && (
              <p className="text-red-400 text-xs">{errors.about.message}</p>
            )}
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

export default Step2;
