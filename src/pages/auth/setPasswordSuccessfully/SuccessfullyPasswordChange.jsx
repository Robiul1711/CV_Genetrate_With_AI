import React from "react";
import logo from "../../../assets/images/logo.png";
import image from "../../../assets/images/password.png";
import { Link, ScrollRestoration } from "react-router-dom";
import Title from "@/components/common/Title";

const SuccessfullyPasswordChange = () => {
  return (
    <div className="section-padding-x section-padding-y md:py-8  min-h-screen  flex justify-center items-center overflow-auto md:overflow-y-hidden">
      <ScrollRestoration />
      <form className="w-full max-w-2xl h-auto md:h-[600px] px-4 sm:px-8 md:px-12 lg:px-32 py-5 md:py-8 rounded-2xl border border-[#81FB84]/10 bg-[#0D0D0D]">
        <div className="flex justify-center mb-4">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="h-12 md:h-16" />
          </Link>
        </div>

        <h2 className="text-xl font-semibold text-center mb-2">
          Password Changed Successfully!
        </h2>

        <Title level="title18" className="text-center mb-6 pb-2 !font-normal">
          You can now sign in with your new password
        </Title>

        <div className="py-2 md:py-6 flex justify-center">
          <img src={image} alt="image" />
        </div>

        {/* Sign In Button */}
        <div className="mt-4 md:pb-24">
          <Link to={"/sign-in"}>
            <button
              type="submit"
              className="w-full bg-[#FFF] text-black py-2  my-3 text-sm font-medium rounded-lg"
            >
              Sign In Now
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SuccessfullyPasswordChange;
