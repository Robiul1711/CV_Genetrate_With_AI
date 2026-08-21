import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  UploadCloud,
  FileText,
  Star,
  CheckCircle2,
  Zap,
  TrendingUp,
  Award,
} from "lucide-react";
import banner from "@/assets/images/banner.png";
import users from "@/assets/images/users.png";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <section className="py-10 md:py-16 lg:py-20 relative overflow-hidden">
      {/* Background Glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#81FB84]/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-4xl mx-auto">
        {/* Top Innovation Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#16221c] border border-[#81FB84]/30 text-[#81FB84] text-xs font-semibold uppercase tracking-wider shadow-sm hover:border-[#81FB84] transition"
        >
          <Sparkles size={13} className="animate-spin-slow text-[#81FB84]" />
          <span>Next-Gen AI Resume & Cover Letter Builder</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]"
        >
          Build Your Perfect Resume <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#81FB84] via-emerald-400 to-teal-300">
            Smarter, Faster with AI
          </span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-gray-300 text-sm sm:text-lg max-w-2xl leading-relaxed"
        >
          Generate ATS-optimized resumes and targeted cover letters in minutes. Powered by intelligent job-matching algorithms to land your dream interview.
        </motion.p>

        {/* Hero CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-3.5 pt-2 w-full sm:w-auto"
        >
          <Link
            to="/dashboard/create-new-resume"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#81FB84] hover:bg-[#a6fca9] text-black font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl transition shadow-[0_0_20px_rgba(129,251,132,0.3)]"
          >
            <FileText size={18} />
            <span>Create New Resume</span>
            <ArrowRight size={16} />
          </Link>

          <Link
            to="/dashboard/update-existing-resume"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#121214] hover:bg-[#1A1A1E] text-white border border-[#262626] hover:border-white/40 font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl transition"
          >
            <UploadCloud size={18} className="text-[#81FB84]" />
            <span>Improve Existing CV</span>
          </Link>
        </motion.div>

        {/* Social Proof & Rating Badge */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-gray-400">
          <div className="flex items-center gap-2 bg-[#0E0E10] border border-[#262626] px-3.5 py-1.5 rounded-full">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} fill="currentColor" />
              ))}
            </div>
            <span className="text-white font-bold">4.9/5</span>
            <span className="text-gray-400">• 25,000+ Hired</span>
          </div>

          <div className="flex items-center gap-1.5 text-gray-300">
            <CheckCircle2 size={15} className="text-[#81FB84]" />
            <span>ATS Friendly Templates</span>
          </div>

          <div className="flex items-center gap-1.5 text-gray-300">
            <Zap size={15} className="text-[#81FB84]" />
            <span>Instant PDF Export</span>
          </div>
        </div>
      </div>

      {/* Main Hero Visual / App Mockup with Floating Badges */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="mt-12 relative max-w-6xl mx-auto"
      >
        <div className="relative rounded-2xl overflow-hidden border border-[#262626] bg-[#0E0E10] shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          <img
            src={banner}
            alt="CleverCV AI Dashboard Preview"
            className="w-full h-auto max-h-[580px] object-cover object-top opacity-90 hover:opacity-100 transition duration-500"
          />

          {/* Floating Feature Card 1: ATS Score */}
          <div className="hidden md:flex absolute top-6 left-6 bg-[#0E0E10]/90 backdrop-blur-md border border-[#81FB84]/30 rounded-xl p-3.5 items-center gap-3 shadow-xl">
            <div className="w-10 h-10 rounded-lg bg-[#81FB84]/15 text-[#81FB84] flex items-center justify-center font-bold">
              <TrendingUp size={20} />
            </div>
            <div className="text-left">
              <p className="text-[11px] text-gray-400 uppercase font-semibold">ATS Compatibility</p>
              <p className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>98.5% High Match</span>
                <span className="w-2 h-2 rounded-full bg-[#81FB84] animate-pulse"></span>
              </p>
            </div>
          </div>

          {/* Floating Feature Card 2: AI Bullet Points */}
          <div className="hidden md:flex absolute bottom-6 right-6 bg-[#0E0E10]/90 backdrop-blur-md border border-white/20 rounded-xl p-3.5 items-center gap-3 shadow-xl">
            <div className="w-10 h-10 rounded-lg bg-teal-500/15 text-teal-400 flex items-center justify-center font-bold">
              <Award size={20} />
            </div>
            <div className="text-left">
              <p className="text-[11px] text-gray-400 uppercase font-semibold">AI Assistant</p>
              <p className="text-sm font-bold text-white">Smart Action Verbs Enhanced</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Banner;
