import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "@/components/common/Logo";
import { Link, ScrollRestoration, useNavigate } from "react-router-dom";
import Title from "@/components/common/Title";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { useEmail } from "@/hooks/useEmail";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { setEmail } = useEmail();

  // Reset server messages on input change
  const emailValue = watch("email");
  React.useEffect(() => {
    setServerError("");
    setSuccessMessage("");
  }, [emailValue]);

  const [isPending, setIsPending] = useState(false);

  // Mock forgot password
  const onSubmit = (data) => {
    setIsPending(true);
    setEmail(data?.email || emailValue);
    setTimeout(() => {
      setSuccessMessage("OTP sent successfully");
      setIsPending(false);
      toast.success("OTP sent successfully");
      setTimeout(() => navigate("/otp-code"), 1500);
    }, 800);
  };

  return (
    <div className="section-padding-x section-padding-y md:py-8 min-h-screen flex justify-center items-center relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#81FB84]/10 blur-[140px] rounded-full pointer-events-none -z-10" />
      <ScrollRestoration />
      <motion.form
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl h-auto md:h-[440px] px-4 sm:px-8 lg:px-28 py-5 md:py-8 rounded-2xl border border-[#81FB84]/20 hover:border-[#81FB84]/40 transition duration-300 bg-[#0D0D0D] shadow-2xl"
      >
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <Logo size="lg" />
        </div>

        <h2 className="text-lg font-semibold text-center mb-2">
          Forgot Password
        </h2>

        <Title level="title18" className="text-center mb-6 pb-2 !font-normal">
          No worries! Enter the email associated with your account below. We'll send you a one-time verification code to reset your password.
        </Title>


        {/* Server/Success Message */}
        {serverError && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
            {serverError}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500 rounded-lg text-green-500 text-sm">
            {successMessage}
          </div>
        )}

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
              placeholder="andrew.ainsley@yourdomain.com"
              {...register("email", { required: "This field is required" })}
              className={`w-full px-3 py-1.5 pl-10 !text-xs md:text-base border ${
                errors.email ? "border-red-500" : "border-[#666666]"
              } rounded-lg bg-black focus:outline-none`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <button
            type="submit"
            disabled={isPending}
            className={`w-full ${
              isPending ? "bg-gray-400" : "bg-[#FFF]"
            } text-black py-2 my-3 text-sm font-medium rounded-lg flex justify-center items-center gap-2`}
          >
            {isPending ? "Sending OTP..." : "Send OTP Code"}
          </button>
        </div>
      </motion.form>
    </div>
  );
};


export default ForgotPassword;
