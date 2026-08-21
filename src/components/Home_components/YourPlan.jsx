import React, { useState } from "react";
import { Check, Sparkles, Zap, ShieldCheck, HelpCircle, ChevronDown, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const pricingPlans = [
  {
    id: "free",
    name: "Free Trial",
    badge: "Starter",
    description: "Ideal for trying out our AI resume tools and basic export.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    period: "Forever Free",
    popular: false,
    buttonText: "Start Free",
    buttonVariant: "secondary",
    features: [
      "1 Resume Template",
      "Basic AI Content Suggestions",
      "Standard PDF Export",
      "Email Support",
      "Watermark on Downloads",
    ],
  },
  {
    id: "basic",
    name: "Basic Plan",
    badge: "Job Seeker",
    description: "Great for active job seekers needing complete template access.",
    monthlyPrice: 9.99,
    yearlyPrice: 7.99,
    period: "per month",
    popular: false,
    buttonText: "Get Started",
    buttonVariant: "secondary",
    features: [
      "All 11+ Resume Templates",
      "Advanced AI Suggestions",
      "Unlimited PDF Downloads",
      "AI Cover Letter Builder",
      "No Watermark on Exports",
      "Priority Email Support",
    ],
  },
  {
    id: "pro",
    name: "Pro Plan",
    badge: "Most Popular",
    description: "The complete AI toolkit to supercharge your applications & interviews.",
    monthlyPrice: 19.99,
    yearlyPrice: 14.99,
    period: "per month",
    popular: true,
    buttonText: "Unlock Pro AI",
    buttonVariant: "primary",
    features: [
      "Everything in Basic",
      "AI Interview Prep Coach",
      "Multilingual Resume Translation",
      "Targeted Job ATS Match Score",
      "Smart Tone & Voice Tuning",
      "Advanced Analytics & Insights",
      "24/7 Dedicated Support",
    ],
  },
  {
    id: "pay_per_download",
    name: "One-Time Pass",
    badge: "Flexible",
    description: "Pay only when you need a finished, polished document.",
    monthlyPrice: 4.99,
    yearlyPrice: 4.99,
    period: "per download",
    popular: false,
    buttonText: "Buy Single Pass",
    buttonVariant: "secondary",
    features: [
      "All Premium Resume Templates",
      "AI Optimization Engine",
      "1 High-Res PDF Export",
      "No Recurring Subscription",
      "Instant Delivery",
    ],
  },
];

const pricingFaqs = [
  {
    q: "Can I change or cancel my subscription anytime?",
    a: "Yes, you can upgrade, downgrade, or cancel your subscription at any time directly from your account settings with zero penalties or hidden fees.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We support all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay via Stripe's encrypted payment gateway.",
  },
  {
    q: "How does the Multilingual AI translation work?",
    a: "Our Pro plan uses fine-tuned AI models to accurately translate and adapt your resume for international markets while maintaining professional terminology.",
  },
  {
    q: "Is there a money-back guarantee?",
    a: "Absolutely! We offer a 14-day 100% money-back guarantee if you are not completely satisfied with your resume results.",
  },
];

const YourPlan = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState("monthly"); // "monthly" | "yearly"
  const [openFaq, setOpenFaq] = useState(null);

  const handlePlanSelect = (plan) => {
    if (!user) {
      Swal.fire({
        title: "Access Required",
        html: `<p style="color:#c7c7c7; font-size:15px;">You need to <b>log in</b> or <b>create an account</b> to activate the <b>${plan.name}</b>.</p>`,
        background: "#0d0d0d",
        color: "#eaeaea",
        showCancelButton: true,
        confirmButtonText: "Sign Up Free",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#00d084",
        cancelButtonColor: "#333",
        customClass: {
          popup: "rounded-2xl shadow-lg border border-[#1f1f1f]",
          confirmButton: "text-white font-medium px-6 py-2 rounded-lg",
          cancelButton: "text-gray-300 font-medium px-6 py-2 rounded-lg",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/sign-up");
        }
      });
      return;
    }

    Swal.fire({
      title: `${plan.name} Selected!`,
      html: `<p style="color:#c7c7c7; font-size:15px;">You have chosen the <b>${plan.name}</b> (${billingCycle === "yearly" ? "Billed Annually" : "Billed Monthly"}). Payment integration will be connected with Stripe in your next step.</p>`,
      background: "#0d0d0d",
      color: "#eaeaea",
      confirmButtonText: "Proceed to Checkout",
      confirmButtonColor: "#00d084",
      customClass: {
        popup: "rounded-2xl shadow-lg border border-[#1f1f1f]",
      },
    });
  };

  return (
    <div className="pb-8 md:pb-16 max-w-7xl mx-auto space-y-16">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#81FB84]/10 border border-[#81FB84]/30 text-[#81FB84] text-xs font-semibold uppercase tracking-wider">
          <Sparkles size={13} /> Transparent & Flexible Pricing
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Invest in Your Career with the <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#81FB84] via-emerald-400 to-teal-300">
            Right Plan for You
          </span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
          Choose a plan that fits your job search timeline. Upgrade or cancel anytime with zero commitments.
        </p>

        {/* Billing Toggle */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <div className="bg-[#121214] border border-[#262626] p-1.5 rounded-xl flex items-center gap-1 shadow-inner">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                billingCycle === "monthly"
                  ? "bg-white text-black shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("yearly")}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                billingCycle === "yearly"
                  ? "bg-white text-black shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <span>Annual Billing</span>
              <span className="bg-[#81FB84] text-black text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {pricingPlans.map((plan) => {
          const isPro = plan.popular;
          const displayPrice =
            billingCycle === "yearly" && plan.id !== "free" && plan.id !== "pay_per_download"
              ? plan.yearlyPrice
              : plan.monthlyPrice;

          return (
            <motion.div
              key={plan.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className={`relative rounded-2xl flex flex-col justify-between p-6 transition-all ${
                isPro
                  ? "bg-gradient-to-b from-[#16221c] via-[#0E0E10] to-[#0A0A0B] border-2 border-[#81FB84] shadow-[0_0_30px_rgba(129,251,132,0.18)] lg:-translate-y-2"
                  : "bg-[#0E0E10] border border-[#262626] hover:border-[#444] shadow-xl"
              }`}
            >
              {/* Most Popular Floating Pill */}
              {isPro && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#81FB84] to-[#34D399] text-black text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <Sparkles size={12} /> {plan.badge}
                </div>
              )}

              {/* Top Card Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  {!isPro && (
                    <span className="text-[11px] font-medium text-gray-400 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-400 leading-relaxed min-h-[36px]">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="pt-2 pb-4 border-b border-[#262626]">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white">
                      ${displayPrice}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      /{plan.period}
                    </span>
                  </div>
                  {billingCycle === "yearly" && plan.id !== "free" && plan.id !== "pay_per_download" && (
                    <p className="text-[11px] text-[#81FB84] mt-1 font-medium">
                      Billed annually (${(displayPrice * 12).toFixed(2)}/yr)
                    </p>
                  )}
                </div>

                {/* Features List */}
                <div className="space-y-3 pt-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-300">
                    What's included:
                  </p>
                  <ul className="space-y-2.5">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            isPro
                              ? "bg-[#81FB84]/20 text-[#81FB84]"
                              : "bg-white/10 text-white"
                          }`}
                        >
                          <Check size={11} strokeWidth={3} />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-[#262626]/50">
                <button
                  type="button"
                  onClick={() => handlePlanSelect(plan)}
                  className={`w-full py-3 px-4 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    isPro
                      ? "bg-[#81FB84] text-black hover:bg-[#a6fca9] shadow-lg shadow-[#81FB84]/20"
                      : "bg-white text-black hover:bg-gray-200"
                  }`}
                >
                  <span>{plan.buttonText}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="bg-[#0E0E10] border border-[#262626] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#81FB84]/10 border border-[#81FB84]/30 flex items-center justify-center text-[#81FB84] flex-shrink-0">
            <ShieldCheck size={26} />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">
              14-Day Money-Back Guarantee
            </h4>
            <p className="text-xs text-gray-400 mt-0.5">
              Not satisfied with your generated CV or results? Get an instant, hassle-free refund.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-gray-400 font-medium">
          <div className="flex items-center gap-2">
            <Check size={16} className="text-[#81FB84]" /> Instant Account Activation
          </div>
          <div className="flex items-center gap-2">
            <Check size={16} className="text-[#81FB84]" /> Cancel Anytime Online
          </div>
          <div className="flex items-center gap-2">
            <Check size={16} className="text-[#81FB84]" /> 256-Bit SSL Encryption
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-3xl mx-auto space-y-6 pt-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-xs sm:text-sm">
            Everything you need to know about our plans and billing.
          </p>
        </div>

        <div className="space-y-3">
          {pricingFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-[#0E0E10] border border-[#262626] rounded-xl overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 text-sm font-semibold text-white hover:text-[#81FB84] transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-gray-400 transform transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#81FB84]" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-4 pb-4 text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-[#262626]/40 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default YourPlan;
