import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import Title from "../common/Title";
import { useAuth } from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import ProfileImage from "./ProfileImage";
import { useEmail } from "@/hooks/useEmail"; // Custom hook for language
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ProfileSetting = ({ userData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { language } = useEmail(); // "en" or "de"

  // Translation texts
  const texts = {
    en: {
      profileSettings: "Profile Settings",
      updateInfo: "Update your personal information",
      firstName: "First Name *",
      lastName: "Last Name *",
      email: "Email *",
      phoneNumber: "Phone Number *",
      editProfile: "Edit Profile",
      cancel: "Cancel",
      saveChanges: "Save Changes",
    },
    de: {
      profileSettings: "Profile-Einstellungen",
      updateInfo: "Aktualisieren Sie Ihre persönlichen Informationen",
      firstName: "Vorname *",
      lastName: "Nachname *",
      email: "E-Mail *",
      phoneNumber: "Telefonnummer *",
      editProfile: "Profil bearbeiten",
      cancel: "Abbrechen",
      saveChanges: "Änderungen speichern",
    },
  };

  const t = language === "de" ? texts.de : texts.en;

  // Extract user email safely
  const userEmail = userData?.profile?.user?.email || "";

  // Initialize form with default values
  const defaultValues = {
    first_name: userData?.profile?.first_name || "",
    last_name: userData?.profile?.last_name || "",
    email: userEmail,
    phone_number: userData?.profile?.phone_number || "",
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
      first_name: userData?.profile?.first_name || "",
      last_name: userData?.profile?.last_name || "",
      email: userEmail,
      phone_number: userData?.profile?.phone_number || "",
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
      <Title level="title22">{t.profileSettings}</Title>
      <Title level="title16" className="my-2">
        {t.updateInfo}
      </Title>

      <ProfileImage userData={userData} />

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">{t.firstName}</label>
            <input
              type="text"
              {...register("first_name")}
              className={`bg-[#0E0E10] rounded-[10px] px-3 py-1.5 text-xs border border-[#262626] text-white `}
            />
            {errors.first_name && (
              <span className="text-red-500 text-xs">
                {errors.first_name.message}
              </span>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">{t.lastName}</label>
            <input
              type="text"
              {...register("last_name")}
              className={`bg-[#0E0E10] rounded-[10px] px-3 py-1.5 text-xs border border-[#262626] text-white `}
            />
            {errors.last_name && (
              <span className="text-red-500 text-xs">
                {errors.last_name.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">{t.email}</label>
            <input
              type="email"
              disabled
              {...register("email")}
              className="bg-[#0E0E10] rounded-[10px] px-3 py-1.5 text-xs border border-[#262626] text-white opacity-50 cursor-not-allowed"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">{t.phoneNumber}</label>
            <div
              className={`flex items-center rounded-[10px] px-3 py-1.5 text-xs border border-[#262626] bg-[#0E0E10] text-white `}
            >
              <span className="pr-2">📞</span>
              <input
                type="numbert"
                {...register("phone_number")}
                className="bg-transparent text-xs w-full focus:outline-none text-white"
              />
            </div>
            {errors.phone_number && (
              <span className="text-red-500 text-xs">
                {errors.phone_number.message}
              </span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-end gap-4 mt-3 sm:mt-8">
          <button
            type="submit"
            className="font-semibold border border-white text-white px-3 py-2 text-sm rounded-md hover:bg-white hover:text-black transition"
          >
            {updateMutation.isPending ? "Saving..." : t.saveChanges}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSetting;
