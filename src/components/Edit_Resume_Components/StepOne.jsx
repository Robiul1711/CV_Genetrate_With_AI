import { useResume } from "@/providers/ResumeContext";
import React, { useEffect } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { CiEdit } from "react-icons/ci";

const StepOne = () => {
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useFormContext();
  const { allRedumeData, setAllResumeData } = useResume();
  const data = allRedumeData?.data;
  useEffect(() => {
    if (data) {
      reset({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        email: data.email || "",
        phone_number: data.phone_number || "",
        address: data.address || "",
        dob: data.dob || "",
        job_title: data.job_title || "",
        about: data.about || "",
        linked_in_profile: data.linked_in_profile || "",
        xing_profile: data.xing_profile || "",
        profile_photo: data.profile_photo || "",
      });
    }
  }, [data, reset]);

  const onSubmit = (formValues) => {
    console.log("Updated values:", formValues);
    // Call API to save updated form values here
  };

  // Watch for live updates (e.g., CV Title)
  const liveTitle = watch("job_title");

  return (
    <div>
      {/* Real-time CV Title */}
      <h2 className="text-lg text-white mb-4">Live Title: {liveTitle}</h2>

      {/* Upload Section */}
      <div className="flex flex-col gap-4 mb-4">
        <p className="text-sm text-white">Upload your photo *</p>
        <div className="relative w-16 h-16 rounded-full border-2 border-white">
          <img
            src={watch("profile_photo") || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
          <label className="absolute -bottom-1.5 right-0 w-8 h-8 bg-dark rounded-full flex items-center justify-center cursor-pointer border border-[#81FB84]/30 z-50">
            <CiEdit size={20} className="text-white" />
            <input
              type="file"
              className="hidden"
              // Optional: handle image upload change here
            />
          </label>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
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

        <div className="md:col-span-2">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepOne;
