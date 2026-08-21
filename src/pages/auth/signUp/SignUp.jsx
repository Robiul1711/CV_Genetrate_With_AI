import React, { useState } from "react";
import Logo from "@/components/common/Logo";
import Title from "@/components/common/Title";
import { Check, Eye, EyeOff, Mail } from "lucide-react";
import { Lock } from "@/components/CustomIcons/CustomIcon";
import { Link, ScrollRestoration, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEmail } from "@/hooks/useEmail";

const SignUp = () => {
  const { setEmail } = useEmail();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [checked, setChecked] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const password = watch("password");

  // Mock signup
  const onSubmit = async (data) => {
    if (!checked) {
      setServerError("You must agree to the terms and conditions");
      return;
    }
    setServerError(null);
    setIsSubmitting(true);
    setEmail(data?.email);

    setTimeout(() => {
      toast.success("Account created successfully!");
      setIsSubmitting(false);
      reset();
      navigate("/sign-in");
    }, 800);
  };

  return (
    <div className="section-padding-x section-padding-y md:py-4 min-h-screen flex justify-center items-center overflow-auto md:overflow-y-hidden">
      <ScrollRestoration />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl px-4 sm:px-4 md:px-12 lg:px-24 xl:px-32 py-5 rounded-2xl border border-[#81FB84]/10 bg-[#0D0D0D]"
        noValidate
      >
        <div className="flex justify-center mb-5">
          <Logo size="lg" />
        </div>

        <h2 className="text-xl font-semibold text-center mb-2">
          Create Your Account
        </h2>
        <Title
          level="title18"
          className="text-center !text-[14px] pb-3 !font-normal"
        >
          Join Clever-CV to build, optimize, and land your dream job with AI-powered resumes and cover letters.
        </Title>

        {serverError && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
            {serverError}
          </div>
        )}

        {/* Name Input */}
        <div className="flex flex-col md:flex-row gap-5 w-full pt-2">
          <div className="mb-1 w-full">
            <label htmlFor="firstName" className="block mb-2 text-sm">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              {...register("firstName", {
                required: "First Name is required",
              })}
              placeholder="First Name"
              className={`w-full px-3 py-1.5 text-xs border ${
                errors.firstName ? "border-red-500" : "border-[#666666]"
              } text-[15px] rounded-lg bg-black focus:outline-none`}
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="mb-1 w-full">
            <label htmlFor="lastName" className="block mb-2 text-sm">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName", {
                required: "Last Name is required",
              })}
              placeholder="Last Name"
              className={`w-full px-3 py-1.5 text-xs border ${
                errors.lastName ? "border-red-500" : "border-[#666666]"
              } text-[15px] rounded-lg bg-black focus:outline-none`}
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Email Input */}
        <div className="mb-1 relative">
          <label htmlFor="email" className="block mb-2 text-sm">
            Email
          </label>
          <div
            className={`relative flex items-center w-full px-3 py-1.5 gap-3 !text-xs md:text-base border rounded-lg ${
              errors.email ? "border-red-500" : "border-[#666666]"
            }`}
          >
            <Mail size={16} />
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
              className="w-full bg-black focus:outline-none"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Passwords */}
        <div className="flex flex-col md:flex-row gap-5 w-full pt-2">
          {/* Password */}
          <div className="mb-1 relative w-full">
            <label htmlFor="password" className="block mb-2 text-sm">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Lock size={16} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()[\]{}<>~_+=|\\/.,:;'"-]).{8,}$/,
                    message: "Password must be at least 8 characters, include uppercase, lowercase, number, and special character",
                  },
                })}
                placeholder="••••••••"
                className={`w-full px-3 py-1.5 pl-10 !text-xs border ${
                  errors.password ? "border-red-500" : "border-[#666666]"
                } rounded-lg bg-black`}
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              </span>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-1 relative w-full">
            <label htmlFor="confirmPassword" className="block mb-2 text-sm">
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Lock size={16} />
              </span>
              <input
                type={showPassword1 ? "text" : "password"}
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                placeholder="••••••••"
                className={`w-full px-3 py-1.5 pl-10 !text-xs border ${
                  errors.confirmPassword ? "border-red-500" : "border-[#666666]"
                } rounded-lg bg-black`}
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword1((prev) => !prev)}
              >
                {showPassword1 ? <Eye size={16} /> : <EyeOff size={16} />}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Terms */}
        <div className="my-4 text-sm">
          <label className="flex items-start gap-3 cursor-pointer">
            <span
              className={`w-4 h-4 flex justify-center items-center border rounded-sm mt-0.5 ${
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
            <span className="text-sm flex gap-2">
              I agree to the{" "}
              <Link
                to="/tearms-and-condition"
                target="_blank"
                className="text-[#81FB84] underline"
              >
                terms of service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy-policy"
                target="_blank"
                className="text-[#81FB84] underline"
              >
                privacy policy
              </Link>
            </span>
          </label>
          {!checked && serverError === "You must agree to the terms and conditions" && (
            <p className="mt-1 text-xs text-red-500">{serverError}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full ${
            isSubmitting ? "bg-gray-400" : "bg-[#FFF]"
          } text-black py-2 my-3 text-sm font-medium rounded-lg flex justify-center items-center gap-2`}
        >
          {isSubmitting ? "Processing..." : "Sign Up"}
        </button>

        {/* Already Account */}
        <p className="text-center text-sm my-3">
          Already have an account?{" "}
          <Link to={"/sign-in"}>
            <span className="font-medium cursor-pointer text-[#81FB84] underline">
              Sign In
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
