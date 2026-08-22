import React from "react";
import Logo from "@/components/common/Logo";
import image from "../../../assets/images/password.png";
import { Link, ScrollRestoration } from "react-router-dom";
import Title from "@/components/common/Title";
import { motion } from "framer-motion";

const SuccessfullyPasswordChange = () => {
  return (
    <div className="section-padding-x section-padding-y md:py-8 min-h-screen flex justify-center items-center overflow-auto md:overflow-y-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#81FB84]/10 blur-[140px] rounded-full pointer-events-none -z-10" />
      <ScrollRestoration />
      <motion.form
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-2xl h-auto md:h-[600px] px-4 sm:px-8 md:px-12 lg:px-32 py-5 md:py-8 rounded-2xl border border-[#81FB84]/20 hover:border-[#81FB84]/40 transition duration-300 bg-[#0D0D0D] shadow-2xl"
      >
        <div className="flex justify-center mb-5">
          <Logo size="lg" />
        </div>

        <h2 className="text-xl font-semibold text-center mb-2">Password Changed Successfully!</h2>

        <Title level="title18" className="text-center mb-6 pb-2 !font-normal">
          You can now sign in with your new password
        </Title>

        <div className="py-2 md:py-6 flex justify-center">
          <img src={image} alt="image" className="animate-float-slow" />
        </div>

        {/* Sign In Button */}
        <div className="mt-4 md:pb-24">
          <Link to={"/sign-in"}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="w-full bg-[#FFF] text-black py-2.5 my-3 text-sm font-semibold rounded-lg hover:bg-gray-200 transition cursor-pointer"
            >
              Sign In Now
            </motion.button>
          </Link>
        </div>
      </motion.form>
    </div>
  );
};

export default SuccessfullyPasswordChange;

