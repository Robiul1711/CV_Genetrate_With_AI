import React from "react";
import { useForm } from "react-hook-form";
import logo from "../../../assets/images/logo.png";
import { Link, ScrollRestoration } from "react-router-dom";
import Title from "@/components/common/Title";
import { Mail } from "lucide-react";

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log({
      ...data,
      termsAgreed: checked,
    });
  };
  return (
    <div className="section-padding-x section-padding-y md:py-8  h-auto md:h-screen flex justify-center items-center">
      <ScrollRestoration />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl h-[450px] px-4 sm:px-8  lg:px-28 py-5 md:py-8 rounded-2xl border border-[#81FB84]/10 bg-[#0D0D0D]"
      >
        <div className="flex justify-center mb-4">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="h-12 md:h-16" />
          </Link>
        </div>

        <h2 className="text-lg font-semibold text-center mb-2">
          Forget Password
        </h2>

        <Title level="title18" className="text-center mb-6 pb-2 !font-normal">
          No worries! Enter the email associated with your Storybook World
          account below. We'll send you a one-time verification code to reset
          your password.
        </Title>

        {/* Email Input */}
        <div className="mb-4 relative">
          <label htmlFor="email" className="block mb-2 text-sm">
            Your Registered Email
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Mail size={16} />
            </span>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              placeholder="andrew.ainsley@yourdomain.com"
              className="w-full px-3 py-1.5 pl-10  !text-xs md:text-base border border-[#666666] rounded-lg bg-black focus:outline-none"
            />
          </div>
        </div>

        {/* Sign In Button */}
        <div className="pb-8 md:pb-24">
          <Link to={"/otp-code"}>
            <button
              type="submit"
              className="w-full bg-[#FFF] text-black py-2  my-3 text-sm font-medium rounded-lg"
            >
              Send OTP Code
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
