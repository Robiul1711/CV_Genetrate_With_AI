import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CiEdit, CiCircleRemove } from "react-icons/ci";
import { toast } from "sonner";
import DummyUser from "@/assets/images/placeholder-user.png";

const ProfileImage = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const { register, watch, setValue } = useForm();
  const profileImageFile = watch("profile_image");

  useEffect(() => {
    if (profileImageFile && profileImageFile.length > 0) {
      const file = profileImageFile[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setPreviewImage(e.target.result);
            toast.success("Profile photo updated!");
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }, [profileImageFile]);

  const handleImageClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setPreviewImage(null);
    setValue("profile_image", null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    toast.info("Profile photo removed.");
  };

  return (
    <div className="my-4">
      <div className="flex items-center gap-6">
        <div
          className="relative w-24 h-24 rounded-full border-2 border-gray-600 overflow-hidden group cursor-pointer"
          onClick={handleImageClick}
        >
          <img
            src={previewImage || DummyUser}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
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
    </div>
  );
};

export default ProfileImage;
