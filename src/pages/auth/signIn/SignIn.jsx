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
import { Link } from "react-router-dom";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <div className="section-padding-x section-padding-y min-h-screen flex justify-center items-center">
      <form className="w-full max-w-4xl px-4 sm:px-10 lg:px-[190px] py-10 sm:py-16 rounded-2xl border border-[#81FB84]/10 bg-[#0D0D0D]">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="logo" className="h-12" />
        </div>

        <h2 className="text-[28px] sm:text-[32px] md:text-[40px] font-semibold text-center mb-2">
          Welcome back!
        </h2>

        <Title level="title18" className="text-center mb-6">
          Sign in to access your resumes and tools
        </Title>

        {/* Email Input */}
        <div className="mb-4 relative">
          <label htmlFor="email" className="block mb-2 text-lg">
            Email
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Mail size={20} />
            </span>
            <input
              type="email"
              id="email"
              placeholder="andrew.ainsley@yourdomain.com"
              className="w-full pl-12 pr-4 py-3 border border-[#666666] rounded-lg bg-black focus:outline-none"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <label htmlFor="password" className="block mb-2 text-lg">
            Password
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Lock size={18} className="w-6 h-6" />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              className="w-full pl-12 pr-4 py-3 border border-[#666666] rounded-lg bg-black"
            />
            <span
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex flex-wrap justify-between items-center my-6 text-sm gap-2">
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

            <span className="text-sm">Remember Me</span>
          </label>

          <p className="cursor-pointer text-[16px] font-medium hover:underline">
            Forgot Password?
          </p>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          className="w-full bg-[#FFF] text-black py-3 text-lg font-medium rounded-lg"
        >
          Sign In
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
          Don’t have an account?{" "}
          <Link to={"/sign-up"}>
            <span className="font-medium cursor-pointer underline">
              Sign Up
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
