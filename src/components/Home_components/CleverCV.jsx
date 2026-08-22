import React from "react";
import {
  Briefcase,
  Zap,
  ShieldCheck,
  Globe2,
  Tag,
  Headphones,
  Star,
  Layers,
  Palette,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: <Briefcase size={20} className="text-[#81FB84]" />,
    title: "Get More Interviews",
    description:
      "Tailored keywords help your resume pass through automated ATS filters straight to hiring managers.",
  },
  {
    icon: <Zap size={20} className="text-[#81FB84]" />,
    title: "Fast CV Creation",
    description:
      "Generate a fully formatted, ATS-compliant resume in less than 10 minutes with instant AI writing.",
  },
  {
    icon: <ShieldCheck size={20} className="text-[#81FB84]" />,
    title: "GDPR Compliant & Private",
    description:
      "Your personal data is encrypted and private. We never share or sell your resume information.",
  },
  {
    icon: <Globe2 size={20} className="text-[#81FB84]" />,
    title: "Multilingual Resumes",
    description:
      "Apply worldwide with seamless AI-powered translations into English, German, and 10+ languages.",
  },
  {
    icon: <Tag size={20} className="text-[#81FB84]" />,
    title: "Transparent Pricing",
    description:
      "No hidden subscription traps or sneaky charges. Clear plans with simple online cancellation.",
  },
  {
    icon: <Headphones size={20} className="text-[#81FB84]" />,
    title: "24/7 Dedicated Support",
    description:
      "Have questions about formatting or exports? Our career support team is always ready to assist.",
  },
  {
    icon: <Star size={20} className="text-[#81FB84]" />,
    title: "Top Rated by Job Seekers",
    description:
      "Consistently rated 4.9/5 stars by candidates who successfully landed roles in top tech companies.",
  },
  {
    icon: <Layers size={20} className="text-[#81FB84]" />,
    title: "All-in-One Job Suite",
    description:
      "Resume generator, cover letter builder, and AI career assistant all under one unified platform.",
  },
  {
    icon: <Palette size={20} className="text-[#81FB84]" />,
    title: "Modern Recruiter Templates",
    description:
      "Carefully designed templates tested by recruiters for readability, clean spacing, and modern typography.",
  },
];

const CleverCV = () => {
  return (
    <section className="section-padding-y section-padding-x">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center space-y-4 max-w-3xl mx-auto mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#81FB84]/10 border border-[#81FB84]/30 text-[#81FB84] text-xs font-semibold uppercase tracking-wider">
          <Sparkles size={13} /> The CleverCV Advantage
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white ">
          Why Choose CleverCV?
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
          Built to give you the competitive edge with data-backed design and
          state-of-the-art AI optimization.
        </p>
      </motion.div>

      {/* 3x3 Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {benefits.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{
              duration: 0.45,
              delay: index * 0.07,
              ease: "easeOut",
            }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group bg-[#0E0E10] border border-[#262626] hover:border-[#81FB84]/50 rounded-2xl p-6 transition duration-300 hover:shadow-[0_10px_25px_rgba(129,251,132,0.08)] space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-[#16221c] border border-[#81FB84]/30 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:bg-[#81FB84]/20 transition duration-300">
              {item.icon}
            </div>
            <h3 className="text-base font-bold text-white pt-1 group-hover:text-[#81FB84] transition">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CleverCV;
