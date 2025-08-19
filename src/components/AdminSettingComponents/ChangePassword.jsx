import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Title from "../common/Title";

import { useAuth } from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";

const ChangePassword = () => {
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const {user}=useAuth()
  const userEmail = user?.[0]?.user?.email;
  const axiosSecure = useAxiosSecure();
  console.log(userEmail);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const PassCngMutation=useMutation({
    mutationFn: async (data) => {
      const response = await axiosSecure.post(`/password-reset/change-password/`, data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      console.log(data);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
      console.log(error);
    },
  })
  const onSubmit = (data) => {
    console.log("Password data:", data);
    PassCngMutation.mutate({...data,email:userEmail});
    // call API here
    reset();
  };

  return (
    <div className="max-w-6xl w-full p-2 lg:p-3">
      <Title level="title22">Change Password</Title>
      <Title level="title16" className="my-2">
        Update your password regularly to keep your account secure.
      </Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6 mt-6">
          {/* New Password */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="new" className="text-sm text-white">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                id="new"
                placeholder="Enter new password"
                className="w-full border border-[#262626] bg-[#0E0E10] rounded-[10px] px-3 py-1.5 text-xs text-white"
                {...register("new_password", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <span
                onClick={() => setShowNew((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white cursor-pointer"
              >
                {showNew ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
            {errors.new_password && (
              <p className="text-red-500 text-xs">
                {errors.new_password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="confirm" className="text-sm text-white">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                id="confirm"
                placeholder="Confirm new password"
                className="w-full border border-[#262626] bg-[#0E0E10] rounded-[10px] px-3 py-1.5 text-xs text-white"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("new_password") ||
                    "Passwords do not match",
                })}
              />
              <span
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white cursor-pointer"
              >
                {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap sm:justify-end gap-4">
            <button
              type="button"
              onClick={() => reset()}
              className="border border-white text-white px-3 py-1.5 text-sm rounded-md hover:bg-white hover:text-black transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-white text-black px-3 py-1.5 text-sm rounded-md hover:bg-gray-200 transition"
            >
              Save Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
