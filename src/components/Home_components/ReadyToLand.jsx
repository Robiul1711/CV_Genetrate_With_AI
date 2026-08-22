import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import starBG from "@/assets/images/starBG.png";
import { motion } from "framer-motion";

const ReadyToLand = () => {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.96, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className=" relative rounded-t-2xl overflow-hidden bg-gradient-to-b from-[#142319] via-[#0E0E10] to-[#0A0A0B] p-8 sm:p-14 md:p-20 shadow-[0_0_50px_rgba(129,251,132,0.15)] text-center"
    >
      {/* Background Star Texture */}
      <img
        src={starBG}
        alt="Stars Background"
        className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen pointer-events-none"
      />

      {/* Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#81FB84]/15 blur-3xl rounded-full pointer-events-none animate-pulse-glow" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#81FB84]/20 border border-[#81FB84]/40 text-[#81FB84] text-xs font-bold uppercase tracking-wider"
        >
          <Sparkles size={13} /> Instant Career Boost
        </motion.div>

        <h2 className="text-3xl sm:text-5xl font-bold text-white  leading-tight">
          Ready to Land Your Dream Job?
        </h2>

        <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
          Start building your ATS-optimized resume today with AI-powered
          suggestions. Join over 25,000+ candidates who got hired faster.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto"
          >
            <Link
              to="/dashboard/create-new-resume"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#81FB84] hover:bg-[#a6fca9] text-black font-bold text-sm sm:text-base px-8 py-4 rounded-xl transition shadow-lg shadow-[#81FB84]/25"
            >
              <span>Create Your Free Resume</span>
              <ArrowRight size={18} />
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto"
          >
            <Link
              to="/price"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#141416] hover:bg-[#1f1f22] text-white border border-[#262626] font-semibold text-sm sm:text-base px-6 py-4 rounded-xl transition"
            >
              <span>View Pricing Plans</span>
            </Link>
          </motion.div>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400 font-medium">
          <span className="flex items-center gap-1.5">
            <Zap size={14} className="text-[#81FB84]" /> No Credit Card Required
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-[#81FB84]" /> 100% Free Trial
            Available
          </span>
        </div>
      </div>
    </motion.section>
  );
};

export default ReadyToLand;
