import { useResume } from "@/providers/ResumeContext";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

import dummyimg from "@/assets/images/userdummy.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const StepOne = () => {
  const {
    register,
    reset,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { imageString, setImageString, allRedumeData } = useResume();
  const profilePhoto = watch("profile_photo");
  const data = allRedumeData?.data;
  const fileInputRef = useRef(null);
  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;
  const [imageError, setImageError] = useState("");

  // English texts
  const t = {
    uploadPhoto: "Upload your photo *",
    firstName: "First Name *",
    lastName: "Last Name *",
    email: "Email *",
    phoneNumber: "Phone Number *",
    address: "Address",
    dob: "Date of Birth",
    jobTitle: "Job Title *",
    about: "About (Optional)",
    linkedIn: "LinkedIn Profile (optional)",
    xing: "XING Profile (optional)",
    firstNamePlaceholder: "John",
    lastNamePlaceholder: "Smith",
    emailPlaceholder: "johnsmith@gmail.com",
    phonePlaceholder: "123 456 8455",
    addressPlaceholder: "Berlin, Germany",
    jobTitlePlaceholder: "UI/UX Designer",
    aboutPlaceholder: "Tell us about yourself...",
    linkedInPlaceholder: "https://www.linkedin.com/in/your-username/",
    xingPlaceholder: "https://www.xing.com/in/your-username/",
    liveTitle: "Live Title",
  };

  // Profile preview
  const [profilePreview, setProfilePreview] = useState(
    VITE_IMG_URL + data?.profile_photo
  );

  useEffect(() => {
    if (profilePhoto?.startsWith("/media")) {
      setProfilePreview(VITE_IMG_URL + data?.profile_photo);
    } else {
      if (!profilePhoto) {
        setProfilePreview(VITE_IMG_URL + data?.profile_photo);
      } else {
        setProfilePreview(profilePhoto);
      }
    }
  }, [profilePhoto, data?.profile_photo, VITE_IMG_URL]);

  const liveTitle = watch("job_title");
  // console.log(imageError);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      setImageError("Image must be less than 4 MB");
      setValue("profile_photo", "", { shouldValidate: true });

      return;
    } else {
      setImageError(""); // clear error if valid
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        const base64String = reader.result.toString();
        setValue("profile_photo", base64String, { shouldValidate: true });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = (e) => {
    e.stopPropagation();
    setValue("profile_photo", "", { shouldValidate: true });
    setProfilePreview(VITE_IMG_URL + data?.profile_photo);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <div>
      {/* Live Title */}
      {/* <h2 className="text-lg text-white mb-4">
        {t.liveTitle}: {liveTitle}
      </h2> */}

      {/* Upload Section */}
      <div className="flex flex-col gap-4 mb-4 mt-5">
        <p className="text-sm text-white">{t.uploadPhoto}</p>

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
        {imageError && (
            <p className="text-red-500 text-xs mt-1">{imageError}</p>
          )}
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-white">{t.firstName}</label>
          <input
            {...register("first_name")}
            placeholder={t.firstNamePlaceholder}
            className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-white">{t.lastName}</label>
          <input
            {...register("last_name")}
            placeholder={t.lastNamePlaceholder}
            className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-white">{t.email}</label>
          <input
            {...register("email")}
            placeholder={t.emailPlaceholder}
            type="email"
            className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
          />
        </div>

        {/* <div className="flex flex-col gap-2">
          <label className="text-sm text-white">{t.phoneNumber}</label>
          <input
            {...register("phone_number")}
            placeholder={t.phonePlaceholder}
            className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
          />
        </div> */}

        <div className="flex flex-col gap-2">
          <label className="md:text-base text-[14px] font-normal text-white">
            Phone Number
          </label>
          <Controller
            name="phone_number"
            control={control}
            rules={{
              required: "Phone number is required",
            }}
            render={({ field }) => (
              <PhoneInput
                {...field}
                country={"us"}
                placeholder="Enter your phone number"
                inputClass=" md:text-base text-[14px]"
                containerClass={`flex font-poppins gap-2 items-center  p-1  border-[1px] border-[#262626] w-full rounded-[12px] phone_input_container_profile_edit  ${
                  errors.phone ? "border-red-500" : "border-[#D8D8D]"
                } `}
              />
            )}
          />
          {errors.phone_number && (
            <p className="text-red-500 text-sm">
              {errors.phone_number.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-white">{t.address}</label>
          <input
            {...register("address")}
            placeholder={t.addressPlaceholder}
            className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-white">{t.dob}</label>
          <input
            {...register("dob")}
            type="date"
            className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="text-sm text-white">{t.jobTitle}</label>
          <input
            {...register("job_title")}
            placeholder={t.jobTitlePlaceholder}
            className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="text-sm text-white">{t.about}</label>
          <textarea
            {...register("about")}
            placeholder={t.aboutPlaceholder}
            className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] h-20 resize-none text-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-white">{t.linkedIn}</label>
          <input
            {...register("linked_in_profile")}
            placeholder={t.linkedInPlaceholder}
            type="url"
            className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-white">{t.xing}</label>
          <input
            {...register("xing_profile")}
            placeholder={t.xingPlaceholder}
            type="url"
            className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default StepOne;
