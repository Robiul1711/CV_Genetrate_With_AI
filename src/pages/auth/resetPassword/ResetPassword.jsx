import React, { useState } from "react";
import logo from "../../../assets/images/logo.png";
import { Link, ScrollRestoration, useNavigate } from "react-router-dom";
import Title from "@/components/common/Title";
import { Lock } from "@/components/CustomIcons/CustomIcon";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useEmail } from "@/hooks/useEmail";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const NewPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { email } = useEmail();

  const { mutate, isPending } = useMutation({
    mutationFn: async (newPassword) => {
      const res = await axiosPublic.post("/password-reset/change-password/", {
        email,
        new_password: newPassword,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Password reset successfully");

      setTimeout(() => {
        navigate("/sign-in");
      }, 1500);
    },
    onError: (err) => {
      toast.error("Failed to reset password. Please try again.");
    },
  });

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    mutate(data.password);
  };

  return (
    <div className="section-padding-x section-padding-y md:py-8 min-h-screen flex justify-center items-center">
      <ScrollRestoration />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl h-auto md:h-[470px] px-4 sm:px-8 md:px-12 lg:px-32 py-5 md:py-8 rounded-2xl border border-[#81FB84]/10 bg-[#0D0D0D]"
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="h-12 md:h-16" />
          </Link>
        </div>

        {/* Heading */}
        <h2 className="text-lg font-semibold text-center mb-2">
          Create New Password
        </h2>

        <Title level="title18" className="text-center mb-6 pb-2 !font-normal">
          Your new password must be different from previously used password
        </Title>

        {/* New Password */}
        <div className="mb-4 relative">
          <label htmlFor="password" className="block mb-2 text-sm">
            New Password
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Lock size={16} className="w-4 h-4" />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              {...register("password", { required: "Password is required" })}
              className="w-full px-3 py-1.5 pl-10 !text-xs md:text-base border border-[#666666] rounded-lg bg-black"
            />
            <span
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-4 relative">
          <label htmlFor="confirmPassword" className="block mb-2 text-sm">
            Confirm New Password
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Lock size={16} className="w-4 h-4" />
            </span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="••••••••"
              {...register("confirmPassword", {
                required: "Please confirm your password",
              })}
              className="w-full px-3 py-1.5 pl-10 !text-xs md:text-base border border-[#666666] rounded-lg bg-black"
            />
            <span
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="md:pb-20">
          <button
            type="submit"
            disabled={isPending}
            className={`w-full ${
              isPending ? "bg-gray-400" : "bg-[#FFF]"
            } text-black py-2 my-3 text-sm font-medium rounded-lg flex justify-center items-center gap-2`}
          >
            {isPending ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : (
              "Save New Password"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPassword;
