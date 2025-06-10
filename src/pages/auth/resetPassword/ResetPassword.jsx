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
    <div className="section-padding-x section-padding-y md:py-8  h-auto md:h-screen  flex justify-center items-center">
      <ScrollRestoration />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl h-[470px] px-4 sm:px-8 md:px-12 lg:px-32 py-5 md:py-8 rounded-2xl border border-[#81FB84]/10 bg-[#0D0D0D]"
      >
        <div className="flex justify-center mb-4">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="h-12 md:h-16" />
          </Link>
        </div>

        <h2 className="text-lg font-semibold text-center mb-2">
          Create New Password
        </h2>

        <Title level="title18" className="text-center mb-6 pb-2 !font-normal">
          Your new password must be different form previously used password
        </Title>

        {/* new Password Input */}
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
              {...register("password", { required: true })}
              className="w-full  px-3 py-1.5 pl-10  !text-xs    md:text-base border border-[#666666] rounded-lg bg-black"
            />
            <span
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </span>
          </div>
        </div>

        {/* Confirm password input */}
        <div className="mb-4 relative">
          <label htmlFor="password" className="block mb-2 text-sm">
            Confirm New Password
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Lock size={16} className="w-4 h-4" />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              {...register("password", { required: true })}
              className="w-full  px-3 py-1.5 pl-10  !text-xs    md:text-base border border-[#666666] rounded-lg bg-black"
            />
            <span
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </span>
          </div>
        </div>

        {/* Sign In Button */}
        <div className="pb-8 md:pb-24">
          <Link to={"/success-new-password"}>
            <button
              type="submit"
              className="w-full bg-[#FFF] text-black py-2  my-3 text-sm font-medium rounded-lg"
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
