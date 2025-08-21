import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CiEdit, CiCircleRemove } from "react-icons/ci";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import DummyUser from "@/assets/images/placeholder-user.png"

const ProfileImage = ({userData}) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch
  } = useForm();

  // Watch for profile_image changes
  const profileImageFile = watch("profile_image");

  // ✅ Handle preview when file is selected
  useEffect(() => {
    if (profileImageFile && profileImageFile.length > 0) {
      const file = profileImageFile[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewImage(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }, [profileImageFile]);

  // ✅ Mutation for uploading image
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
      toast.success(data?.message || "Profile image updated successfully!");
      setIsEditing(false);
      reset();
      setPreviewImage(null);
      queryClient.invalidateQueries(["userProfile"]);
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 
                          error?.response?.data?.error || 
                          "Failed to update profile image";
      toast.error(errorMessage);
      console.error("Profile update error:", error);
    },
  });

  // ✅ Handle image click to trigger file input
  const handleImageClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // ✅ Remove selected image
  const handleRemoveImage = (e) => {
    e.stopPropagation(); // Prevent triggering the image click
    setPreviewImage(null);
    setValue("profile_image", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ✅ Submit form
  const onSubmitImage = (data) => {
    if (!data.profile_image || data.profile_image.length === 0) {
      toast.error("Please select an image first");
      return;
    }

    console.log("Submitting profile image:", data);
    
    ProfileMutation.mutate(data);
  };

  // ✅ Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
    setPreviewImage(null);
    reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="my-6">
      <div className="flex items-center gap-6">
        {/* Profile Image with Edit Overlay */}
        <div 
          className="relative w-24 h-24 rounded-full border-2 border-gray-300 overflow-hidden group cursor-pointer"
          onClick={handleImageClick}
        >
          <img
            src={previewImage || `${import.meta.env.VITE_IMG_URL}${userData?.[0]?.profile_image}` || DummyUser}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          
          {/* Edit Overlay */}
          {isEditing && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <CiEdit size={24} className="text-white" />
            </div>
          )}
          
          {/* Remove Button when image is selected */}
          {isEditing && previewImage && (
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white shadow-md transform translate-x-1/4 -translate-y-1/4 hover:bg-red-600 transition"
            >
              <CiCircleRemove size={16} />
            </button>
          )}
          
          {/* Hidden File Input */}
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

        {/* Buttons */}
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
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
              <button
                onClick={handleCancel}
                disabled={ProfileMutation.isPending}
                className="px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition disabled:opacity-50"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-2"
            >
              <CiEdit size={18} />
              Edit Image
            </button>
          )}
        </div>
      </div>
      
      {/* Instructions */}
      {isEditing && (
        <p className="mt-3 text-sm text-gray-500">
          Click on the image to select a new profile picture
        </p>
      )}
    </div>
  );
};

export default ProfileImage;