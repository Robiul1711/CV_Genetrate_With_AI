import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import Title from "../common/Title";
import { useAuth } from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ProfileImage from "./ProfileImage";

const ProfileSetting = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();
  const userEmail = user?.[0]?.user?.email;
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();



  const UpdateMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosSecure.put(`/update-profile/`, data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      console.log(data);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
    UpdateMutation.mutate({ ...data, email: userEmail });
    setIsEditing(false);
  };


  return (
    <div className="max-w-6xl w-full p-3 lg:p-6">
      <Title level="title22">Profile Settings</Title>
      <Title level="title16" className="my-2">
        Update your personal information
      </Title>

<ProfileImage />

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">First Name *</label>
            <input
              type="text"
              defaultValue={user?.[0]?.first_name}
              disabled={!isEditing}
              {...register("first_name", { required: "First name is required" })}
              className={`bg-[#0E0E10] rounded-[10px] px-3 py-1.5 text-xs border border-[#262626] text-white ${
                !isEditing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Last Name *</label>
            <input
              type="text"
              defaultValue={user?.[0]?.last_name}
              disabled={!isEditing}
              {...register("last_name", { required: "Last name is required" })}
              className={`bg-[#0E0E10] rounded-[10px] px-3 py-1.5 text-xs border border-[#262626] text-white ${
                !isEditing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Email *</label>
            <input
              type="email"
              defaultValue={userEmail}
              disabled
              {...register("email")}
              className="bg-[#0E0E10] rounded-[10px] px-3 py-1.5 text-xs border border-[#262626] text-white opacity-50 cursor-not-allowed"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Phone Number *</label>
            <div
              className={`flex items-center rounded-[10px] px-3 py-1.5 text-xs sm:text-sm md:text-base border border-[#262626] bg-[#0E0E10] text-white ${
                !isEditing ? "opacity-50" : ""
              }`}
            >
              <span className="pr-2">🇬🇧</span>
              <input
                type="text"
                defaultValue={user?.[0]?.phone_number}
                disabled={!isEditing}
                {...register("phone_number", { required: "Phone number is required" })}
                className="bg-transparent text-xs w-full focus:outline-none text-white"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-end gap-4 mt-3 sm:mt-8">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="font-semibold border border-white text-white px-2 py-2 text-sm rounded-md hover:bg-white hover:text-black transition"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  reset();
                  setPreviewImage(null); // reset preview
                  setIsEditing(false);
                }}
                className="font-semibold border border-white text-white px-2 py-2 text-sm rounded-md hover:bg-white hover:text-black transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="font-semibold border border-white text-white px-2 py-2 text-sm rounded-md hover:bg-white hover:text-black transition"
              >
                Save Changes
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfileSetting;
