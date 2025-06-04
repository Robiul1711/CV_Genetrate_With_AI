import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import Title from "../common/Title";

const ProfileSetting = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-6xl w-full p-3  lg:p-6">
      <Title level="title22">Profile Settings</Title>
      <Title level="title16" className="my-2">
        Update your personal information
      </Title>

      {/* Upload Section */}
      <div className="flex flex-col gap-4 my-8">
        <div className="relative md:w-20 md:h-20 size-12 rounded-full border-2 border-white">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
          {isEditing && (
            <label className="absolute -bottom-1.5 border border-[#81FB84]/30 right-0 w-8 h-8 bg-dark rounded-full flex items-center justify-center cursor-pointer z-50">
              <CiEdit size={20} className="text-white" />
              <input type="file" className="hidden" />
            </label>
          )}
        </div>
      </div>

      {/* Form */}
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">First Name *</label>
            <input
              type="text"
              placeholder="Jhon"
              disabled={!isEditing}
              className={`bg-[#0E0E10] p-5 rounded-lg border border-[#262626] text-white ${
                !isEditing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Last Name *</label>
            <input
              type="text"
              placeholder="Smith"
              disabled={!isEditing}
              className={`bg-[#0E0E10] p-5 rounded-lg border border-[#262626] text-white ${
                !isEditing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Email *</label>
            <input
              type="email"
              placeholder="jhonsmith@gmail.com"
              disabled={!isEditing}
              className={`bg-[#0E0E10] p-5 rounded-lg border border-[#262626] text-white ${
                !isEditing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Phone Number *</label>
            <div className={`flex items-center p-5 rounded-lg border border-[#262626] bg-[#0E0E10] text-white ${!isEditing ? "opacity-50" : ""}`}>
              <span className="pr-2">🇬🇧</span>
              <input
                type="text"
                placeholder="123 456 8455"
                disabled={!isEditing}
                className="bg-transparent w-full focus:outline-none text-white"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="font-semibold border border-white text-white  md:py-4  px-2 sm:px-8 py-2 text-sm sm:text-lg rounded-md hover:bg-white hover:text-black transition"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="font-semibold border border-white text-white  md:py-4  px-2 sm:px-8 py-2 text-sm sm:text-lg rounded-md hover:bg-white hover:text-black transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={() => setIsEditing(false)}
                className="font-semibold border border-white text-white  md:py-4  px-2 sm:px-8 py-2 text-sm sm:text-lg rounded-md hover:bg-white hover:text-black transition"
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
