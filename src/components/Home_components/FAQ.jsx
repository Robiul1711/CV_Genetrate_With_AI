import React from "react";
import { Sparkles, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Can I change or cancel my subscription anytime?",
    answer:
      "Yes, you can upgrade, downgrade, or cancel your subscription at any time directly from your account settings with zero penalties or hidden fees.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We support all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay via Stripe's 256-bit encrypted secure checkout.",
  },
  {
    question: "How does the Multilingual AI translation work?",
    answer:
      "Our AI engine translates and adapts your resume across 10+ languages (English, German, French, Spanish, etc.) while preserving industry-specific terminology and formatting nuances.",
  },
  {
    question: "Is there a money-back guarantee?",
    answer:
      "Absolutely! We offer a 14-day 100% money-back guarantee if you are not completely satisfied with your resume creation and job application results.",
  },
  {
    question:
      "Are the resume templates ATS (Applicant Tracking System) compliant?",
    answer:
      "Yes! All 11+ templates are built strictly according to modern recruiter guidelines, ensuring single-column readability, clean metadata structure, and high keyword parsing scores.",
  },
  {
    question: "Can I download my resume as a PDF without watermarks?",
    answer:
      "Yes. Paid plans and one-time download passes allow high-resolution, vector PDF exports completely free of any watermarks, ready for instant job applications.",
  },
];

const FAQ = () => {
  return (
    <section className="py-16 md:py-24 max-w-4xl mx-auto px-4">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center space-y-4 mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#81FB84]/10 border border-[#81FB84]/30 text-[#81FB84] text-xs font-semibold uppercase tracking-wider">
          <Sparkles size={13} /> Common Questions
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white ">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
          Everything you need to know about our AI resume builder, pricing
          plans, and export features.
        </p>
      </motion.div>

      {/* Shadcn UI Accordion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      >
        <Accordion
          type="single"
          collapsible
          defaultValue="item-0"
          className="w-full space-y-3.5"
        >
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="bg-[#0E0E10] border border-[#262626] hover:border-[#81FB84]/40 rounded-2xl px-6 transition-all duration-300 shadow-lg data-[state=open]:border-[#81FB84]/50 data-[state=open]:shadow-[0_0_25px_rgba(129,251,132,0.1)]"
            >
              <AccordionTrigger className="text-left text-sm sm:text-base font-semibold text-white hover:text-[#81FB84] py-5 transition-colors">
                <span className="flex items-center gap-3">
                  <HelpCircle
                    size={17}
                    className="text-[#81FB84] shrink-0 opacity-80"
                  />
                  <span>{faq.question}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3 pb-5 pl-7">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
};

export default FAQ;
