import { useResume } from "@/providers/ResumeContext";
import React, { useEffect, useRef, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

const StepOne = () => {
  const {
    register,
    reset,
    watch,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useFormContext();
  const { imageString, setImageString, allRedumeData, setAllResumeData } =
    useResume();
  const profilePhoto = watch("profile_photo");
  const data = allRedumeData?.data;
  const fileInputRef = useRef(null);
  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;
  console.log(VITE_IMG_URL);

  // Initialize profilePreview with the current profile photo from form data
  const [profilePreview, setProfilePreview] = useState(
    VITE_IMG_URL + data?.profile_photo
  );

  console.log(profilePhoto);

  // Update profilePreview when profile_photo changes
  useEffect(() => {
    if (profilePhoto?.startsWith("/media")) {
      setProfilePreview(VITE_IMG_URL + data?.profile_photo);
    } else {
      if(!profilePhoto){
        setProfilePreview(VITE_IMG_URL + data?.profile_photo);

      }else{
        setProfilePreview(profilePhoto)

      }
    }
  }, [profilePhoto, data?.profile_photo, VITE_IMG_URL]);

  const liveTitle = watch("job_title");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        const base64String = reader.result.toString();
        // ✅ Save base64 string to form state
        setValue("profile_photo", base64String, { shouldValidate: true });
        setImageString(base64String);
        // Update local preview
        setProfilePreview(base64String);
        console.log(base64String);
      }
    };
    reader.readAsDataURL(file); // convert to base64
  };

  const handleRemovePhoto = (e) => {
    e.stopPropagation(); // Prevent triggering the file input
    setValue("profile_photo", "", { shouldValidate: true });

    setProfilePreview(VITE_IMG_URL + data?.profile_photo); // Reset to default

    console.log(VITE_IMG_URL + data?.profile_photo);
    // Reset the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  console.log(allRedumeData?.data?.profile_photo);

  return (
    <div>
      {/* Real-time CV Title */}
      <h2 className="text-lg text-white mb-4">Live Title: {liveTitle}</h2>

      {/* Upload Section */}
      <div className="flex flex-col gap-4 mb-4">
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

          {/* Edit button */}
          <div
            className="absolute -bottom-1.5 border border-[#81FB84]/30 right-0 w-8 h-8 bg-dark rounded-full flex items-center justify-center cursor-pointer z-50"
            onClick={handleAvatarClick}
          >
            <CiEdit size={20} className="text-white" />
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            id="profile-photo-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Close icon shown when a custom image is selected */}
          {profilePhoto && profilePhoto !== "" && (
            <div
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center cursor-pointer z-50"
              onClick={handleRemovePhoto}
            >
              <RxCross2 size={12} className="text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-white">First Name *</label>
          <input
            {...register("first_name")}
            placeholder="John"
            className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-white">Last Name *</label>
          <input
            {...register("last_name")}
            placeholder="Smith"
            className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-white">Email *</label>
          <input
            {...register("email")}
            placeholder="jhonsmith@gmail.com"
            type="email"
            className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-white">Phone Number *</label>
          <input
            {...register("phone_number")}
            placeholder="123 456 8455"
            className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-white">Address</label>
          <input
            {...register("address")}
            placeholder="Berlin, Germany"
            className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-white">Date of Birth</label>
          <input
            {...register("dob")}
            type="date"
            className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="text-sm text-white">Job Title *</label>
          <input
            {...register("job_title")}
            placeholder="UI/UX Designer"
            className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="text-sm text-white">About (Optional)</label>
          <textarea
            {...register("about")}
            placeholder="Tell us about yourself..."
            className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] h-20 resize-none text-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-white">
            LinkedIn Profile (optional)
          </label>
          <input
            {...register("linked_in_profile")}
            placeholder="https://www.linkedin.com/in/your-username/"
            type="url"
            className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-white">XING Profile (optional)</label>
          <input
            {...register("xing_profile")}
            placeholder="https://www.xing.com/in/your-username/"
            type="url"
            className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default StepOne;
