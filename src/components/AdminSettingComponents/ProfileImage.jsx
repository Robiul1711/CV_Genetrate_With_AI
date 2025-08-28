import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CiEdit, CiCircleRemove } from "react-icons/ci";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import DummyUser from "@/assets/images/placeholder-user.png";
import { useEmail } from "@/hooks/useEmail"; // Custom hook for language

const ProfileImage = ({ userData }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { language } = useEmail(); // "en" or "de"

  // Translation texts
  const texts = {
    en: {
      saveChanges: "Save Changes",
      cancel: "Cancel",
      editImage: "Edit Image",
      clickToSelect: "Click on the image to select a new profile picture",
      selectImageError: "Please select an image first",
      uploading: "Saving...",
    },
    de: {
      saveChanges: "Änderungen speichern",
      cancel: "Abbrechen",
      editImage: "Bild bearbeiten",
      clickToSelect: "Klicken Sie auf das Bild, um ein neues Profilbild auszuwählen",
      selectImageError: "Bitte wählen Sie zuerst ein Bild aus",
      uploading: "Speichern...",
    },
  };

  const t = language === "de" ? texts.de : texts.en;

  const { register, handleSubmit, reset, setValue, watch } = useForm();

  const profileImageFile = watch("profile_image");

  useEffect(() => {
    if (profileImageFile && profileImageFile.length > 0) {
      const file = profileImageFile[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setPreviewImage(e.target.result);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }, [profileImageFile]);

  const ProfileMutation = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      if (data.profile_image && data.profile_image.length > 0) {
        formData.append("profile_image", data.profile_image[0]);
      }
      const response = await axiosSecure.put("/update-profile-image/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || t.saveChanges);
      if (data?.profile_image) {
        setUploadedImage(data.profile_image);
      }
      setIsEditing(false);
      reset();
      setPreviewImage(null);
      queryClient.invalidateQueries(["userProfile"]);
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

  const handleImageClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setPreviewImage(null);
    setValue("profile_image", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmitImage = (data) => {
    if (!data.profile_image || data.profile_image.length === 0) {
      toast.error(t.selectImageError);
      return;
    }
    ProfileMutation.mutate(data);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setPreviewImage(null);
    reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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

          {isEditing && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <CiEdit size={24} className="text-white" />
            </div>
          )}

          {isEditing && previewImage && (
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

        <div className="flex flex-col gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleSubmit(onSubmitImage)}
                disabled={ProfileMutation.isPending}
                className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {ProfileMutation.isPending ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                    {t.uploading}
                  </>
                ) : (
                  t.saveChanges
                )}
              </button>
              <button
                onClick={handleCancel}
                disabled={ProfileMutation.isPending}
                className="px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition disabled:opacity-50"
              >
                {t.cancel}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-2"
            >
              <CiEdit size={18} />
              {t.editImage}
            </button>
          )}
        </div>
      </div>

      {isEditing && <p className="mt-3 text-sm text-gray-500">{t.clickToSelect}</p>}
    </div>
  );
};

export default ProfileImage;
