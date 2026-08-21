import React, { useEffect, useState } from "react";
import Logo from "@/components/common/Logo";
import { Link, ScrollRestoration, useNavigate } from "react-router-dom";
import Title from "@/components/common/Title";
import OTPInput from "react-otp-input";
import { useEmail } from "@/hooks/useEmail";
import { toast } from "sonner";

const OTPCode2 = () => {
  const { email } = useEmail();
  const [OTP, setOTP] = useState("");
  const [seconds, setSeconds] = useState(56);
  const [resendAvailable, setResendAvailable] = useState(false);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  // Countdown
  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendAvailable(true);
    }
  }, [seconds]);

  const handleResend = () => {
    setOTP("");
    setSeconds(56);
    setResendAvailable(false);
    setError("");
    toast.info("OTP resent to your email.");
  };

  // Mock OTP verification
  const handleSubmit = (e) => {
    e.preventDefault();
    if (OTP.length < 6) {
      setError("Please enter the full OTP.");
      return;
    }
    setIsPending(true);
    setTimeout(() => {
      toast.success("OTP verified successfully");
      setIsPending(false);
      setTimeout(() => navigate("/sign-in"), 1500);
    }, 800);
  };

  return (
    <div className="section-padding-x section-padding-y md:py-8 min-h-screen flex justify-center items-center overflow-auto md:overflow-y-hidden">
      <ScrollRestoration />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl h-auto md:h-[600px] px-4 sm:px-8 md:px-12 lg:px-32 py-5 md:py-8 rounded-2xl border border-[#81FB84]/10 bg-[#0D0D0D]"
      >
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <Logo size="lg" />
        </div>

        {/* Heading */}
        <h2 className="text-lg font-semibold text-center mb-2">
          Verify Your Account
        </h2>

        <Title level="title18" className="text-center md:mb-6 pb-2 !font-normal">
          Check your inbox for the one-time verification code we've sent to your email. Enter the code below to complete registration.
        </Title>

        {/* OTP Input */}
        <div className="w-full max-w-md mx-auto text-center py-6 md:py-10">
          <Title level="title18" className="mb-6 pb-2 !font-normal">
            Code has been sent to <span className="font-medium">{email}</span>
          </Title>

          <OTPInput
            value={OTP}
            onChange={setOTP}
            numInputs={6}
            inputStyle={{
              width: "calc(14vw)",
              maxWidth: "75px",
              minWidth: "20px",
              height: "calc(15vw)",
              maxHeight: "60px",
              marginRight: "6px",
              boxSizing: "border-box",
            }}
            renderInput={(props) => (
              <input
                {...props}
                className="border border-[#7c7c7c] bg-[#0D0D0D] rounded-lg text-[28px] text-[#aaa8a8] text-center outline-none ml-4 shadow-sm focus:border-[#fff] focus:ring-1 focus:ring-[#fff]"
              />
            )}
          />

          {/* Error */}
          {error && (
            <p className="mt-4 text-red-500 text-sm font-medium">{error}</p>
          )}

          {/* Resend */}
          <div className="py-4">
            {!resendAvailable ? (
              <p className="text-sm text-gray-400">
                You can resend the code in{" "}
                <span className="text-[#81FB84] font-medium">{seconds}</span>{" "}
                seconds
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-sm text-[#81FB84] underline hover:text-green-400 transition-all duration-150"
              >
                Resend Code
              </button>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pb-6 md:pb-24">
          <button
            type="submit"
            disabled={isPending}
            className={`w-full ${
              isPending ? "bg-gray-400" : "bg-[#FFF]"
            } text-black py-2 my-3 text-sm font-medium rounded-lg flex justify-center items-center gap-2`}
          >
            {isPending ? "Verifying..." : "Verify & Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OTPCode2;
