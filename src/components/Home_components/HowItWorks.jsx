import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import dummyimg from "@/assets/images/plan1.png";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Choose Your Path",
    description:
      "Start fresh from scratch or upload your existing PDF/Word resume for immediate AI diagnosis and reformatting.",
    tags: [
      "Upload Existing CV",
      "11+ ATS Ready Templates",
      "Instant Auto-Fill",
    ],
  },
  {
    number: "02",
    title: "AI-Powered Optimization",
    description:
      "Our fine-tuned LLM enhances your bullet points with high-impact metrics, action verbs, and relevant target keywords.",
    tags: [
      "Smart Keyword Matching",
      "Action Verb Suggestions",
      "Real-Time Preview",
    ],
  },
  {
    number: "03",
    title: "Customize & Personalize",
    description:
      "Fine-tune colors, fonts, section orders, and layouts with an intuitive live editor to match your personal brand.",
    tags: ["Custom Color Palettes", "Pro Typography", "ATS Clean Structure"],
  },
  {
    number: "04",
    title: "Export & Land Interviews",
    description:
      "Download a pristine, high-resolution vector PDF ready for job portals, recruiters, and LinkedIn direct apply.",
    tags: ["Instant Vector PDF", "No Watermarks", "Cover Letter Pairing"],
  },
];

const HowItWorks = () => {
  return (
    <section className="section-padding-y section-padding-x">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center space-y-4 max-w-3xl mx-auto mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#81FB84]/10 border border-[#81FB84]/30 text-[#81FB84] text-xs font-semibold uppercase tracking-wider">
          <Sparkles size={13} /> Effortless 4-Step Process
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white ">
          How CleverCV Works
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
          From blank page to a hired resume in under 10 minutes. Here is the
          simple step-by-step workflow.
        </p>
      </motion.div>

      {/* Steps List */}
      <div className="space-y-12 md:space-y-16">
        {steps.map((item, index) => {
          const isEven = index % 2 === 1;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className={`flex flex-col ${
                isEven ? "lg:flex-row-reverse" : "lg:flex-row"
              } items-center justify-between gap-8 lg:gap-14 bg-[#0E0E10] border border-[#262626] hover:border-[#81FB84]/40 rounded-3xl p-6 sm:p-10 shadow-xl transition-all duration-300`}
            >
              {/* Visual Preview */}
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-2xl overflow-hidden border border-[#262626] bg-[#141416] p-4 sm:p-6 shadow-inner group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#81FB84]/10 blur-3xl rounded-full pointer-events-none" />
                  <img
                    src={dummyimg}
                    alt={`Step ${item.number} preview`}
                    className="w-full h-auto object-cover rounded-xl border border-white/5 group-hover:scale-[1.02] transition duration-500"
                  />
                </div>
              </div>

              {/* Text Info */}
              <div className="w-full lg:w-1/2 space-y-5">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#16221c] border border-[#81FB84]/40 text-[#81FB84] text-lg font-bold shadow-md">
                  {item.number}
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#141416] border border-[#262626] hover:border-[#81FB84]/30 transition text-xs font-medium text-gray-300"
                    >
                      <CheckCircle2 size={13} className="text-[#81FB84]" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>

                <div className="pt-4">
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#81FB84] hover:text-[#a6fca9] transition group/link"
                  >
                    <span>Start Step {item.number}</span>
                    <ArrowRight
                      size={15}
                      className="group-hover/link:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;
