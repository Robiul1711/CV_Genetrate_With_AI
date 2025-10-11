import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CiEdit, CiCircleRemove } from "react-icons/ci";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import DummyUser from "@/assets/images/placeholder-user.png";
import { useEmail } from "@/hooks/useEmail";

const ProfileImage = ({ userData }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);

  const axiosSecure = useAxiosSecure();
  const { user,fetchUser,token } = useAuth();
  const queryClient = useQueryClient();
  const { language } = useEmail();

  const texts = {
    en: {
      selectImageError: "Please select an image first",
      uploading: "Uploading...",
    },
    de: {
      selectImageError: "Bitte wählen Sie zuerst ein Bild aus",
      uploading: "Hochladen...",
    },
  };
  const t = language === "de" ? texts.de : texts.en;

  const { register, watch, setValue } = useForm();
  const profileImageFile = watch("profile_image");

  // Preview selected image
  useEffect(() => {
    if (profileImageFile && profileImageFile.length > 0) {
      const file = profileImageFile[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) setPreviewImage(e.target.result);
        };
        reader.readAsDataURL(file);
        // Immediately upload after selection
        handleUpload(file);
      }
    }
  }, [profileImageFile]);

  const ProfileMutation = useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("profile_image", file);
      const response = await axiosSecure.put("/update-profile-image/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Profile updated!");
      if (data?.profile_image) setUploadedImage(data.profile_image);
      setPreviewImage(null);
      setValue("profile_image", null);
      queryClient.invalidateQueries(["userProfile"]);
      fetchUser(token)
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        t.selectImageError;
      toast.error(errorMessage);
      console.error("Profile update error:", error);
    },
  });

  const handleUpload = (file) => {
    if (!file) {
      toast.error(t.selectImageError);
      return;
    }
    ProfileMutation.mutate(file);
  };

  const handleImageClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setPreviewImage(null);
    setValue("profile_image", null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const finalImageSrc = previewImage
    ? previewImage
    : uploadedImage
    ? `${import.meta.env.VITE_IMG_URL}${uploadedImage}`
    : userData?.profile?.profile_image
    ? `${import.meta.env.VITE_IMG_URL}${userData?.profile?.profile_image}`
    : DummyUser;

  return (
    <div className="my-6">
      <div className="flex items-center gap-6">
        <div
          className="relative w-24 h-24 rounded-full border-2 border-gray-300 overflow-hidden group cursor-pointer"
          onClick={handleImageClick}
        >
          <img src={finalImageSrc} alt="Profile" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <CiEdit size={24} className="text-white" />
          </div>

          {previewImage && (
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white shadow-md transform translate-x-1/4 -translate-y-1/4 hover:bg-red-600 transition"
            >
              <CiCircleRemove size={16} />
            </button>
          )}

          <input
            type="file"
            accept="image/*"
            className="hidden"
            {...register("profile_image")}
            ref={(e) => {
              register("profile_image").ref(e);
              fileInputRef.current = e;
            }}
          />
        </div>
      </div>

      {ProfileMutation.isPending && (
        <p className="mt-2 text-sm text-gray-500 flex items-center gap-2">
          <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></span>
          {t.uploading}
        </p>
      )}
    </div>
  );
};

export default ProfileImage;
