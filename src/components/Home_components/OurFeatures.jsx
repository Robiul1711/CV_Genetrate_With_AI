import React from "react";
import {
  Sparkles,
  FileEdit,
  Sliders,
  Send,
  Globe2,
  Bot,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <FileEdit size={22} className="text-[#81FB84]" />,
    title: "AI Resume Builder",
    tag: "Core Engine",
    description:
      "Generate complete, tailor-made resumes in minutes with context-aware AI suggestions and auto-formatting.",
    link: "/dashboard/create-new-resume",
  },
  {
    icon: <Sliders size={22} className="text-[#81FB84]" />,
    title: "Smart ATS Optimizer",
    tag: "High Match",
    description:
      "Analyze your existing CV against job descriptions to score keyword density and pass Applicant Tracking Systems.",
    link: "/dashboard/update-existing-resume",
  },
  {
    icon: <Send size={22} className="text-[#81FB84]" />,
    title: "Cover Letter Generator",
    tag: "Custom Pitch",
    description:
      "Craft customized, compelling cover letters that match your resume tone and directly address hiring managers.",
    link: "/dashboard/create-cover-letter",
  },
  {
    icon: <Globe2 size={22} className="text-[#81FB84]" />,
    title: "Multilingual Translation",
    tag: "Global Reach",
    description:
      "Effortlessly adapt and translate your CV into English, German, French, and 10+ languages with industry terms.",
    link: "/dashboard/create-new-resume",
  },
];

const OurFeatures = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    toast.success("Thank you! We'll notify you as soon as Interview Coach launches.");
    reset();
  };

  return (
    <section className="py-16 md:py-24">
      {/* Section Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#81FB84]/10 border border-[#81FB84]/30 text-[#81FB84] text-xs font-semibold uppercase tracking-wider">
          <Sparkles size={13} /> Cutting-Edge Capabilities
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Everything You Need to <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#81FB84] via-emerald-400 to-teal-300">
            Outshine the Competition
          </span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
          Built with advanced AI models trained on thousands of successful resumes and real hiring standards.
        </p>
      </div>

      {/* 4 Feature Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((item, index) => (
          <div
            key={index}
            className="group relative bg-[#0E0E10] border border-[#262626] hover:border-[#81FB84]/50 rounded-2xl p-7 transition-all duration-300 hover:shadow-[0_0_30px_rgba(129,251,132,0.1)] flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#16221c] border border-[#81FB84]/30 flex items-center justify-center shadow-inner group-hover:scale-105 transition">
                  {item.icon}
                </div>
                <span className="text-[11px] font-semibold text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {item.tag}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-[#81FB84] transition">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-[#262626]/60 flex items-center justify-between">
              <Link
                to={item.link}
                className="text-xs font-semibold text-[#81FB84] inline-flex items-center gap-1 hover:underline"
              >
                <span>Try this feature</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Teaser Banner: AI Interview Coach */}
      <div className="mt-8 relative bg-gradient-to-b from-[#141e17] via-[#0E0E10] to-[#0A0A0B] border border-[#81FB84]/30 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#81FB84]/20 text-[#81FB84] text-xs font-bold uppercase tracking-wider">
            <Bot size={13} /> Coming Soon: AI Interview Coach
          </div>

          <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
            Practice Real Job Interviews with Real-Time AI Feedback
          </h3>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Simulate live technical & behavioral interviews, get instant clarity scoring, and master the STAR method before talking to real hiring managers.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2"
          >
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              placeholder="Enter your email for early access"
              className="w-full bg-[#08090A] border border-[#262626] focus:border-[#81FB84] text-white text-sm px-4 py-3 rounded-xl focus:outline-none placeholder-gray-500 transition"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#81FB84] hover:bg-[#a6fca9] text-black font-bold text-sm px-6 py-3 rounded-xl transition flex-shrink-0 shadow-lg shadow-[#81FB84]/20"
            >
              Get Early Access
            </button>
          </form>
          {errors.email && (
            <p className="text-red-400 text-xs">{errors.email.message}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default OurFeatures;
