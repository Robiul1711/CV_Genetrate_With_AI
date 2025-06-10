import React, { useEffect, useState } from "react";
import logo from "../../../assets/images/logo.png";
import { Link, ScrollRestoration } from "react-router-dom";
import Title from "@/components/common/Title";
import OTPInput from "react-otp-input";

const OTPCode = () => {
  const [OTP, setOTP] = useState("");
  const [seconds, setSeconds] = useState(56);
  const [resendAvailable, setResendAvailable] = useState(false);

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
  };
  return (
    <div className="section-padding-x section-padding-y md:py-8  min-h-screen  flex justify-center items-center overflow-auto md:overflow-y-hidden">
      <ScrollRestoration />
      <form className="w-full max-w-2xl h-auto  md:h-[600px] px-4 sm:px-8 md:px-12 lg:px-32 py-5 md:py-8 rounded-2xl border border-[#81FB84]/10 bg-[#0D0D0D]">
        <div className="flex justify-center mb-4">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="h-12 md:h-16" />
          </Link>
        </div>

        <h2 className="text-lg font-semibold text-center mb-2">
          Enter OTP Code
        </h2>

        <Title
          level="title18"
          className="text-center md:mb-6 pb-2 !font-normal"
        >
          Check your inbox for the one-time verification code we've sent to your
          email. Enter the code below to proceed With resetting your password.
        </Title>

        {/* otp Input */}
        <div className="w-full max-w-md mx-auto text-center py-6 md:py-10">
          {/* Heading */}
          <Title level="title18" className=" mb-6 pb-2 !font-normal">
            Code has been sent to example@gmail.com
          </Title>

          {/* OTP Input */}
          <OTPInput
            value={OTP}
            onChange={setOTP}
            numInputs={5}
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
          <div className="py-8">
            {!resendAvailable ? (
              <p className="">
                You can resend the code in{" "}
                <span className="text-[#81FB84] font-medium">{seconds}</span>{" "}
                Seconds
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-sm text-[#81FB84] underline hover:text-green-400 transition-all duration-150"
              >
                Resend Code
              </button>
            )}
          </div>
        </div>
        {/* Sign In Button */}
        <div className="pb-6 md:pb-24">
          <Link to={"/new-password"}>
            <button
              type="submit"
              className="w-full bg-[#FFF] text-black py-2  my-3 text-sm font-medium rounded-lg"
            >
              Verify
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default OTPCode;
