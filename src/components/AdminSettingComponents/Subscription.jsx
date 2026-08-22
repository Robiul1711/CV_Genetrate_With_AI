import React from "react";
import { Link } from "react-router-dom";
import {
  Check,
  Sparkles,
  Zap,
  ArrowUpRight,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

const Subscription = () => {
  const activePlan = {
    name: "Pro AI Plan",
    price: "$19.99",
    billingCycle: "Monthly",
    status: "Active",
    renewsOn: "September 21, 2026",
    features: [
      "Unlimited AI Resume Generations",
      "Unlimited AI Cover Letter Creations",
      "Export to High-Res PDF without Watermark",
      "Full Multilingual Optimization",
      "24/7 AI Career Coaching Assistant",
      "Access to All 11+ Premium Resume Templates",
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#262626]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <CreditCard className="text-[#81FB84]" size={24} />
            Subscription & Billing
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage your subscription tier, billing period, and unlocked AI
            capabilities.
          </p>
        </div>
        <Link
          to="/price"
          className="inline-flex items-center justify-center gap-2 bg-white text-black font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-gray-200 transition shadow-md w-fit"
        >
          Explore All Plans <ArrowUpRight size={16} />
        </Link>
      </div>

      {/* Active Plan Showcase Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#121214] via-[#0E0E10] to-[#121815] border border-[#81FB84]/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#81FB84]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#81FB84] bg-[#81FB84]/10 border border-[#81FB84]/30 px-3 py-1 rounded-full font-semibold">
              <Sparkles size={12} /> {activePlan.status}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white ">
              {activePlan.name}
            </h3>
            <p className="text-sm text-gray-400">
              Next billing date:{" "}
              <span className="text-white font-medium">
                {activePlan.renewsOn}
              </span>
            </p>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-bold text-white">
              {activePlan.price}
            </span>
            <span className="text-gray-400 text-sm">
              /{activePlan.billingCycle}
            </span>
          </div>
        </div>

        {/* Plan Features */}
        <div className="mt-6 space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-300">
            Included in your plan:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {activePlan.features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-sm text-gray-200"
              >
                <span className="w-5 h-5 rounded-full bg-[#81FB84]/20 text-[#81FB84] flex items-center justify-center flex-shrink-0">
                  <Check size={13} />
                </span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <ShieldCheck size={16} className="text-[#81FB84]" />
            <span>Encrypted billing & instant cancel anytime.</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/price"
              className="px-5 py-2.5 bg-[#81FB84] text-black font-semibold text-sm rounded-xl hover:bg-[#a6fca9] transition shadow-lg inline-flex items-center gap-1.5"
            >
              <Zap size={15} /> Upgrade to Lifetime
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
