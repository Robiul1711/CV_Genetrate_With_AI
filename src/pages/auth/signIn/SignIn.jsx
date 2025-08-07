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
import { Link, ScrollRestoration, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { setToken,setRefreshToken ,user} = useAuth();

  const signInMutation = useMutation({
    mutationFn: async (data) => {
      const payload = {
        email: data.email,
        password: data.password,
      };
      const res = await axiosPublic.post(`/signin/`, payload);
      return res.data; // should return { access, refresh }
    },
    onSuccess: (data) => {
      setServerError(null);
      toast.success("Login Successfully");
      navigate("/");

      // Save tokens to context
      setToken(data.access);
      setRefreshToken(data.refresh);
    },
    onError: (error) => {
      console.log(error);
      setServerError(
        error?.response?.data?.message || "Invalid credentials or server error."
      );
    },
  });

  const onSubmit = (data) => {
    setServerError(null);
    signInMutation.mutate(data);
  };

  console.log(user);



  return (
    <div className="section-padding-x section-padding-y md:py-8 min-h-screen flex justify-center items-center overflow-y-auto md:overflow-y-hidden">
      <ScrollRestoration />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl px-4 sm:px-10 lg:px-[120px] py-5 md:py-8 rounded-2xl border border-[#81FB84]/10 bg-[#0D0D0D]"
      >
        <div className="flex justify-center mb-4">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="h-12 md:h-16" />
          </Link>
        </div>

        <h2 className="text-xl font-semibold text-center mb-2">
          Welcome back!
        </h2>

        <Title level="title18" className="text-center mb-6">
          Sign in to access your resumes and tools
        </Title>

        {/* Server Error */}
        {serverError && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
            {serverError}
          </div>
        )}

        {/* Email Input */}
        <div className="mb-1 relative">
          <label htmlFor="email" className="block mb-2 text-sm">
            Email
          </label>
          <div
            className={`relative flex items-center w-full px-3 py-1.5  gap-3 !text-xs md:text-base border rounded-lg ${
              errors.email ? "border-red-500" : "border-[#666666]"
            }`}
          >
            <span className=" ">
              <Mail size={16} />
            </span>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="andrew.ainsley@yourdomain.com"
              className={`   w-full  bg-black focus:outline-none`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <label htmlFor="password" className="block mb-2 text-sm">
            Password
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
              className={`w-full px-3 py-1.5 pl-10 !text-xs md:text-base border ${
                errors.password ? "border-red-500" : "border-[#666666]"
              } rounded-lg bg-black`}
            />
            <span
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </span>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex flex-wrap justify-between items-center my-6 text-sm gap-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <span
              className={`w-4 h-4 flex justify-center items-center border rounded-sm ${
                checked
                  ? "border-[#81FB84] bg-black"
                  : "border-[#666666] bg-black"
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

          <Link to={"/forgot-password"}>
            <p className="cursor-pointer text-sm font-medium hover:underline">
              Forgot Password?
            </p>
          </Link>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          disabled={signInMutation.isPending}
          className={`w-full ${
            signInMutation.isPending ? "bg-gray-400" : "bg-[#FFF]"
          } text-black py-2 my-3 text-sm font-medium rounded-xl flex justify-center items-center gap-2`}
        >
          {signInMutation.isPending ? (
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
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center my-3">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-[#FFF] text-sm">Or continue with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Icons */}
        <div className="flex justify-center items-center gap-5 mb-4">
          {[Facebook, Google, Apple].map((Icon, index) => (
            <div
              key={index}
              className="border border-[#666666] p-3 rounded-full w-11 h-11 flex justify-center items-center"
            >
              <Icon size={18} />
            </div>
          ))}
        </div>

        {/* Sign Up */}
        <p className="text-center py-2 text-sm">
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
