import React, { useState } from "react";
import logo from "../../../assets/images/logo.png";
import Title from "@/components/common/Title";
import { Check, Eye, EyeOff, Mail } from "lucide-react";
import {
  Apple,
  Facebook,
  Google,
  Lock,
} from "@/components/CustomIcons/CustomIcon";
import { Link, ScrollRestoration } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [checked, setChecked] = useState(false);

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
        className="w-full max-w-4xl px-4 sm:px-8 md:px-12 lg:px-24 xl:px-36 py-10 sm:py-16 rounded-2xl border border-[#81FB84]/10 bg-[#0D0D0D]"
      >
        <div className="flex justify-center mb-4">
          <Link to={"/"}>
            {" "}
            <img src={logo} alt="logo" className="h-12" />
          </Link>
        </div>

        <h2 className="text-[28px] sm:text-[32px] md:text-[40px] font-semibold text-center mb-2">
          Create Your Account
        </h2>

        <Title level="title18" className="text-center mb-6 pb-2 !font-normal">
          Join Clever-CV to build, optimize, and land your dream job with
          AI-powered resumes and cover letters.
        </Title>

        {/* Name Input */}
        <div className="flex flex-col md:flex-row gap-5 w-full pt-2">
          <div className="mb-4 w-full">
            <label htmlFor="name" className="block mb-2 md:text-lg">
              First Name
            </label>

            <input
              type="name"
              id="name"
              {...register("firstName", { required: true })}
              placeholder="Enter  first  name"
              className="w-full px-3 py-3 border border-[#666666] text-[15px] rounded-lg bg-black focus:outline-none"
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="name" className="block mb-2 md:text-lg">
              Last Name
            </label>

            <input
              type="name"
              id="name"
              {...register("lastName", { required: true })}
              placeholder="Enter last name"
              className="w-full px-2 py-3 border border-[#666666] text-[15px] rounded-lg bg-black focus:outline-none"
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="mb-4 relative">
          <label htmlFor="email" className="block mb-2 md:text-lg">
            Email
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Mail size={20} />
            </span>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              placeholder="andrew.ainsley@yourdomain.com"
              className="w-full pl-12 pr-4 py-3 text-sm md:text-base border border-[#666666] rounded-lg bg-black focus:outline-none"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <label htmlFor="password" className="block mb-2 md:text-lg">
            Password
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
          <label htmlFor="password" className="block mb-2 md:text-lg">
            Confirm Password
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

        {/* Tearms and conditions */}
        <div className="my-6 text-sm">
          <label className="flex items-center gap-3 cursor-pointer">
            <span
              className={`w-5 h-5 flex justify-center items-center border rounded-sm 
          ${
            checked ? "border-[#81FB84] bg-black" : "border-[#666666] bg-black"
          }`}
            >
              {checked && <Check size={14} className="text-[#81FB84]" />}
            </span>

            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="hidden"
            />

            <span className="text-sm">
              I agreeing to the terms of service and privacy policy
            </span>
          </label>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          className="w-full bg-[#FFF] text-black py-2 md:py-3 my-3 md:text-lg font-medium rounded-lg"
        >
          Sign Up
        </button>

        {/* Divider */}
        <div className="flex items-center my-8">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-[#FFF] text-sm">Or continue with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Icons */}
        <div className="flex justify-center items-center gap-5 mb-4">
          <div className="border border-[#666666] p-3 rounded-full w-12 h-12 flex justify-center items-center">
            <Facebook size={20} />
          </div>
          <div className="border border-[#666666] p-3 rounded-full w-12 h-12 flex justify-center items-center">
            <Google size={20} />
          </div>
          <div className="border border-[#666666] p-3 rounded-full w-12 h-12 flex justify-center items-center">
            <Apple size={20} />
          </div>
        </div>

        {/* Sign Up */}
        <p className="text-center py-6 text-sm">
          Already have an account ?{" "}
          <Link to={"/sign-in"}>
            <span className="font-medium cursor-pointer underline">
              Sign In
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
