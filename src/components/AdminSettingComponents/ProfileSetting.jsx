import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { CiEdit } from "react-icons/ci";
import { useAuth } from "@/hooks/useAuth";
import ProfileImage from "./ProfileImage";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { User, Mail, CheckCircle2, Shield } from "lucide-react";

const ProfileSetting = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, setUser } = useAuth();

  const displayName = user?.profile?.first_name || user?.first_name || "John";
  const displayLastName = user?.profile?.last_name || user?.last_name || "Doe";
  const displayEmail = user?.profile?.user?.email || user?.email || "john.doe@example.com";
  const displayPhone = user?.profile?.phone_number || user?.phone_number || "1234567890";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: displayName,
      last_name: displayLastName,
      email: displayEmail,
      phone_number: displayPhone,
    },
  });

  const onSubmit = (data) => {
    setUser({
      ...user,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone_number: data.phone_number,
      profile: {
        ...(user?.profile || {}),
        first_name: data.first_name,
        last_name: data.last_name,
        user: { email: data.email },
        phone_number: data.phone_number,
      },
    });
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header with Title and Edit toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#262626]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Profile Settings
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Update your public profile details and contact information.
          </p>
        </div>
        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center justify-center gap-2 bg-white text-black font-semibold px-4 py-2.5 rounded-xl text-sm hover:bg-gray-200 transition shadow-md"
          >
            <CiEdit size={18} /> Edit Profile
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#81FB84] flex items-center gap-1 bg-[#81FB84]/10 border border-[#81FB84]/20 px-3 py-1.5 rounded-lg">
              <CheckCircle2 size={14} /> Editing Enabled
            </span>
          </div>
        )}
      </div>

      {/* Avatar Section */}
      <div className="bg-[#141416] border border-[#262626] rounded-xl p-5 flex flex-col sm:flex-row items-center gap-6">
        <ProfileImage />
        <div className="text-center sm:text-left space-y-1">
          <h3 className="text-sm font-semibold text-white">Profile Photo</h3>
          <p className="text-xs text-gray-400 max-w-sm">
            Click your avatar to upload a new portrait. JPG, PNG or WEBP (Max 4MB).
          </p>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* First Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
              First Name *
            </label>
            <div className="relative">
              <input
                type="text"
                disabled={!isEditing}
                {...register("first_name", { required: "First name is required" })}
                className={`w-full bg-[#141416] border ${
                  errors.first_name ? "border-red-500" : "border-[#333]"
                } p-3 rounded-xl text-sm text-white focus:outline-none focus:border-white transition ${
                  !isEditing ? "opacity-60 cursor-not-allowed" : ""
                }`}
                placeholder="Enter first name"
              />
            </div>
            {errors.first_name && (
              <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
              Last Name *
            </label>
            <div className="relative">
              <input
                type="text"
                disabled={!isEditing}
                {...register("last_name", { required: "Last name is required" })}
                className={`w-full bg-[#141416] border ${
                  errors.last_name ? "border-red-500" : "border-[#333]"
                } p-3 rounded-xl text-sm text-white focus:outline-none focus:border-white transition ${
                  !isEditing ? "opacity-60 cursor-not-allowed" : ""
                }`}
                placeholder="Enter last name"
              />
            </div>
            {errors.last_name && (
              <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                disabled={!isEditing}
                {...register("email", { required: "Email is required" })}
                className={`w-full bg-[#141416] border ${
                  errors.email ? "border-red-500" : "border-[#333]"
                } p-3 rounded-xl text-sm text-white focus:outline-none focus:border-white transition ${
                  !isEditing ? "opacity-60 cursor-not-allowed" : ""
                }`}
                placeholder="name@example.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
              Phone Number *
            </label>
            <Controller
              name="phone_number"
              control={control}
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <PhoneInput
                  country={"us"}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={!isEditing}
                  inputClass="!w-full !bg-[#141416] !border-[#333] !text-white !h-[46px] !rounded-xl !text-sm"
                  buttonClass="!bg-[#141416] !border-[#333]"
                />
              )}
            />
          </div>
        </div>

        {/* Action Buttons when editing */}
        {isEditing && (
          <div className="flex flex-wrap items-center justify-end gap-3 pt-6 border-t border-[#262626]">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-5 py-2.5 border border-[#333] hover:border-white text-gray-300 hover:text-white rounded-xl text-sm font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-white text-black font-semibold rounded-xl text-sm hover:bg-gray-200 transition shadow-md"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileSetting;
