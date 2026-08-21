import React, { useState } from "react";
import Logo from "@/components/common/Logo";
import { Link, ScrollRestoration, useNavigate } from "react-router-dom";
import Title from "@/components/common/Title";
import { Lock } from "@/components/CustomIcons/CustomIcon";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const NewPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  // Mock password reset
  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsPending(true);
    setTimeout(() => {
      toast.success("Password reset successfully");
      setIsPending(false);
      setTimeout(() => navigate("/success-new-password"), 1000);
    }, 800);
  };

  return (
    <div className="section-padding-x section-padding-y md:py-8 min-h-screen flex justify-center items-center">
      <ScrollRestoration />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl h-auto md:h-[470px] px-4 sm:px-8 md:px-12 lg:px-32 py-5 md:py-8 rounded-2xl border border-[#81FB84]/10 bg-[#0D0D0D]"
      >
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <Logo size="lg" />
        </div>

        {/* Heading */}
        <h2 className="text-lg font-semibold text-center mb-2">Create New Password</h2>

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
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
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
              {...register("confirmPassword", { required: "Please confirm your password" })}
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
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="md:pb-20">
          <button
            type="submit"
            disabled={isPending}
            className={`w-full ${isPending ? "bg-gray-400" : "bg-[#FFF]"} text-black py-2 my-3 text-sm font-medium rounded-lg flex justify-center items-center gap-2`}
          >
            {isPending ? "Saving..." : "Save New Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPassword;
