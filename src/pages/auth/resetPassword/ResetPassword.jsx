import React, { useState } from "react";
import logo from "../../../assets/images/logo.png";
import { Link, ScrollRestoration } from "react-router-dom";
import Title from "@/components/common/Title";
import { Lock } from "@/components/CustomIcons/CustomIcon";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

const NewPassword = () => {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const onSubmit = (data) => {
    console.log({
      ...data,
      termsAgreed: checked,
    });
  };
  return (
    <div className="section-padding-x section-padding-y min-h-screen flex justify-center items-center">
      <ScrollRestoration />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl px-4 sm:px-8 md:px-12 lg:px-32 py-10 sm:py-16 rounded-2xl border border-[#81FB84]/10 bg-[#0D0D0D]"
      >
        <div className="flex justify-center mb-4">
          <img src={logo} alt="logo" className="h-12" />
        </div>

        <h2 className="text-[28px] sm:text-[32px] md:text-[40px] font-semibold text-center mb-2">
          Create New Password
        </h2>

        <Title level="title18" className="text-center mb-6 pb-2 !font-normal">
          Your new password must be different form previously used password
        </Title>

        {/* new Password Input */}
        <div className="mb-4 relative">
          <label htmlFor="password" className="block mb-2 text-lg">
            New Password
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Lock size={18} className="w-6 h-6" />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("passowrd", { required: true })}
              placeholder="••••••••"
              className="w-full pl-12 pr-4 py-3 border border-[#666666] rounded-lg bg-black"
            />
            <span
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </span>
          </div>
        </div>

        {/* Confirm password input */}
        <div className="mb-4 relative">
          <label htmlFor="password" className="block mb-2 text-lg">
            Confirm New Password
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Lock size={18} className="w-6 h-6" />
            </span>
            <input
              type={showPassword1 ? "text" : "password"}
              id="password"
              {...register("confirmPassword", { required: true })}
              placeholder="••••••••"
              className="w-full pl-12 pr-4 py-3 border border-[#666666] rounded-lg bg-black"
            />
            <span
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword1((prev) => !prev)}
            >
              {showPassword1 ? <Eye size={20} /> : <EyeOff size={20} />}
            </span>
          </div>
        </div>

        {/* Sign In Button */}
        <div className="pb-8 md:pb-24">
          <Link to={"/success-new-password"}>
            <button
              type="submit"
              className="w-full bg-[#FFF] text-black py-2 md:py-3 my-4 text-lg font-medium rounded-lg"
            >
              Save New Password
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default NewPassword;
