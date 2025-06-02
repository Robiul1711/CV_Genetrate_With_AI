import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Title from "../common/Title";
import PasswordSuccessModal from "./PasswordSuccessModal";

const ChangePassword = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="max-w-6xl w-full p-6">
      <Title level="title22">Change Password</Title>
      <Title level="title16" className="my-2">
        Update your password regularly to keep your account secure.
      </Title>

      <form>
        <div className="flex flex-col gap-6 mt-6">
          {/* Current Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="current" className="text-[17px] text-white">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                id="current"
                placeholder="Enter current password"
                className="w-full border border-[#262626] bg-[#0E0E10] rounded-[12px] p-4 text-white"
              />
              <span
                onClick={() => setShowCurrent((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white cursor-pointer"
              >
                {showCurrent ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
          </div>

          {/* New and Confirm Password */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="new" className="text-[17px] text-white">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  id="new"
                  placeholder="Enter new password"
                  className="w-full border border-[#262626] bg-[#0E0E10] rounded-[12px] p-4 text-white"
                />
                <span
                  onClick={() => setShowNew((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white cursor-pointer"
                >
                  {showNew ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="confirm" className="text-[17px] text-white">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  id="confirm"
                  placeholder="Confirm new password"
                  className="w-full border border-[#262626] bg-[#0E0E10] rounded-[12px] p-4 text-white"
                />
                <span
                  onClick={() => setShowConfirm((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white cursor-pointer"
                >
                  {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              className="border border-white text-white py-3 px-10 rounded-md hover:bg-white hover:text-black transition"
            >
              Cancel
            </button>
            <PasswordSuccessModal />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
