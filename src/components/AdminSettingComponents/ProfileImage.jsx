import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import toast from "react-hot-toast";

const ProfileImage = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  // ✅ Mutation for uploading image
  const ProfileMutation = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append("profile_image", data.profile_image[0]); // important
      const response = await axiosSecure.put(`/update-profile-image/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Profile updated!");
      console.log("Success:", data);
      setIsEditing(false);
      reset();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Upload failed!");
      console.error(error);
    },
  });

  // ✅ Preview Image before upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // ✅ Submit form
  const onSubmitImage = (data) => {
    ProfileMutation.mutate(data);
  };

  return (
    <div className="my-6">
      <div className="flex items-center gap-4">
        {/* Profile Image */}
        <div className="relative w-20 h-20 rounded-full border-2 border-gray-300 overflow-hidden">
          <img
            src={previewImage || "https://randomuser.me/api/portraits/men/32.jpg"}
            alt="Profile"
            className="w-full h-full object-cover"
          />

          {isEditing && (
            <label className="absolute bottom-0 right-0 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer shadow hover:bg-blue-700 transition">
              <CiEdit size={16} className="text-white" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                {...register("profile_image")}
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSubmit(onSubmitImage)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setPreviewImage(null);
                  reset();
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 border text-white rounded-md hover:bg-gray-700 transition"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
