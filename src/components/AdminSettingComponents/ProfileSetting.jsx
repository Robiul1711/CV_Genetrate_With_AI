import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import Title from "../common/Title";
import { useAuth } from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import ProfileImage from "./ProfileImage";

const ProfileSetting = ({ userData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Extract user email safely
  const userEmail = userData?.[0]?.user?.email || "";

  // Initialize form with default values
  const defaultValues = {
    first_name: userData?.[0]?.first_name || "",
    last_name: userData?.[0]?.last_name || "",
    email: userEmail,
    phone_number: userData?.[0]?.phone_number || "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
  });

  // Keep form values synced when userData changes
  useEffect(() => {
    reset({
      first_name: userData?.[0]?.first_name || "",
      last_name: userData?.[0]?.last_name || "",
      email: userEmail,
      phone_number: userData?.[0]?.phone_number || "",
    });
  }, [userData, reset, userEmail]);

  // Mutation for profile update
  const updateMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosSecure.put("/update-profile/", data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Profile updated successfully!");
      setIsEditing(false);
      queryClient.invalidateQueries(["userProfile"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Update failed");
      console.error(error);
    },
  });

  const onSubmit = (data) => {
    updateMutation.mutate({ ...data, email: userEmail });
  };

  return (
    <div className="max-w-6xl w-full p-3 lg:p-6">
      <Title level="title22">Profile Settings</Title>
      <Title level="title16" className="my-2">
        Update your personal information
      </Title>

      <ProfileImage userData={userData} />

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">First Name *</label>
            <input
              type="text"
              disabled={!isEditing}
              {...register("first_name", { required: "First name is required" })}
              className={`bg-[#0E0E10] rounded-[10px] px-3 py-1.5 text-xs border border-[#262626] text-white ${
                !isEditing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
            {errors.first_name && (
              <span className="text-red-500 text-xs">{errors.first_name.message}</span>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Last Name *</label>
            <input
              type="text"
              disabled={!isEditing}
              {...register("last_name", { required: "Last name is required" })}
              className={`bg-[#0E0E10] rounded-[10px] px-3 py-1.5 text-xs border border-[#262626] text-white ${
                !isEditing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
            {errors.last_name && (
              <span className="text-red-500 text-xs">{errors.last_name.message}</span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Email *</label>
            <input
              type="email"
              disabled
              {...register("email")}
              className="bg-[#0E0E10] rounded-[10px] px-3 py-1.5 text-xs border border-[#262626] text-white opacity-50 cursor-not-allowed"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Phone Number *</label>
            <div
              className={`flex items-center rounded-[10px] px-3 py-1.5 text-xs border border-[#262626] bg-[#0E0E10] text-white ${
                !isEditing ? "opacity-50" : ""
              }`}
            >
              <span className="pr-2">📞</span>
              <input
                type="text"
                disabled={!isEditing}
                {...register("phone_number", { required: "Phone number is required" })}
                className="bg-transparent text-xs w-full focus:outline-none text-white"
              />
            </div>
            {errors.phone_number && (
              <span className="text-red-500 text-xs">{errors.phone_number.message}</span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-end gap-4 mt-3 sm:mt-8">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 font-semibold border border-white text-white px-3 py-2 text-sm rounded-md hover:bg-white hover:text-black transition"
            >
              <CiEdit /> Edit Profile
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  reset(defaultValues);
                  setIsEditing(false);
                }}
                className="font-semibold border border-white text-white px-3 py-2 text-sm rounded-md hover:bg-white hover:text-black transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="font-semibold border border-white text-white px-3 py-2 text-sm rounded-md hover:bg-white hover:text-black transition"
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
