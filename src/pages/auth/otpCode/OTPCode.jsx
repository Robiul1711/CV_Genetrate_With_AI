import React, { useEffect, useState } from "react";
import logo from "../../../assets/images/logo.png";
import { Link, ScrollRestoration, useNavigate } from "react-router-dom";
import Title from "@/components/common/Title";
import OTPInput from "react-otp-input";
import { useEmail } from "@/hooks/useEmail";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const OTPCode = () => {
    const IMG_URL = import.meta.env.VITE_IMG_URL;
  const { email, language } = useEmail();
  const [OTP, setOTP] = useState("");
  const [seconds, setSeconds] = useState(56);
  const [resendAvailable, setResendAvailable] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const t = {
    en: {
      heading: "Enter OTP Code",
      subtitle:
        "Check your inbox for the one-time verification code we've sent to your email. Enter the code below to proceed with resetting your password.",
      codeSent: "Code has been sent to",
      resendIn: "You can resend the code in",
      verifyBtn: "Verify",
      fullOTPError: "Please enter the full OTP.",
      otpVerified: "OTP verified successfully",
      otpFailed: "Something went wrong. Please try again.",
      resendBtn: "Resend Code",
    },
    de: {
      heading: "Geben Sie den OTP-Code ein",
      subtitle:
        "Überprüfen Sie Ihren Posteingang auf den einmaligen Bestätigungscode, den wir an Ihre E-Mail gesendet haben. Geben Sie den Code unten ein, um Ihr Passwort zurückzusetzen.",
      codeSent: "Code wurde gesendet an",
      resendIn: "Sie können den Code in",
      verifyBtn: "Verifizieren",
      fullOTPError: "Bitte geben Sie den vollständigen OTP ein.",
      otpVerified: "OTP erfolgreich verifiziert",
      otpFailed: "Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.",
      resendBtn: "Code erneut senden",
    },
  };

  const text = t[language || "en"];

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
    // Optional: Call the resend OTP API here
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await axiosPublic.post("/password-reset/verify-otp/", {
        email,
        otp: OTP,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success(text.otpVerified);
      setTimeout(() => navigate("/new-password"), 1500);
    },
    onError: (err) => {
      const otpError =
        err?.response?.data?.errors?.otp?.[0] || text.otpFailed;
      setError(otpError);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (OTP.length < 6) {
      setError(text.fullOTPError);
      return;
    }
    mutate();
  };
  const {data:navData}=useQuery({
    queryKey: ["navData", language],
    queryFn: () =>
      axiosPublic.get("/about-system/", { params: { lan: language } }),
  })

  return (
    <div className="section-padding-x section-padding-y md:py-8 min-h-screen flex justify-center items-center overflow-auto md:overflow-y-hidden">
      <ScrollRestoration />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl h-auto md:h-[600px] px-4 sm:px-8 md:px-12 lg:px-32 py-5 md:py-8 rounded-2xl border border-[#81FB84]/10 bg-[#0D0D0D]"
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Link to="/">
            <img src={IMG_URL + navData?.data?.data?.logo} alt="logo" className="h-12 md:h-16" />
          </Link>
        </div>

        {/* Heading */}
        <h2 className="text-lg font-semibold text-center mb-2">
          {text.heading}
        </h2>

        <Title level="title18" className="text-center md:mb-6 pb-2 !font-normal">
          {text.subtitle}
        </Title>

        {/* OTP Input */}
        <div className="w-full max-w-md mx-auto text-center py-6 md:py-10">
          <Title level="title18" className="mb-6 pb-2 !font-normal">
            {text.codeSent} <span className="font-medium">{email}</span>
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
          {/* <div className="py-8">
            {!resendAvailable ? (
              <p>
                {text.resendIn}{" "}
                <span className="text-[#81FB84] font-medium">{seconds}</span>{" "}
                seconds
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-sm text-[#81FB84] underline hover:text-green-400 transition-all duration-150"
              >
                {text.resendBtn}
              </button>
            )}
          </div> */}
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
            {isPending ? (
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
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Verifying...
              </>
            ) : (
              text.verifyBtn
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OTPCode;
