import React from "react";
import Marquee from "react-fast-marquee";
import MarqueeComponent from "../common/MarqueeComponent";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

// Static testimonials data
const testimonialsData = {
  data: {
    data: [
      {
        id: 1,
        name: "Sarah Johnson",
        designation: "Software Engineer @ Google",
        message:
          "CleverCV helped me land my dream job! The AI suggestions tailored my technical bullet points with exact metrics that recruiters loved.",
        rating: 5,
      },
      {
        id: 2,
        name: "Michael Chen",
        designation: "Marketing Lead @ Spotify",
        message:
          "I was amazed at how quickly I could create a polished resume. The templates are modern, sleek, and ATS-friendly.",
        rating: 5,
      },
      {
        id: 3,
        name: "Emma Wilson",
        designation: "Data Analyst @ Amazon",
        message:
          "The AI suggestions are a game-changer. I tailored 5 different resumes in minutes and got 3 interview invitations within a week.",
        rating: 5,
      },
      {
        id: 4,
        name: "James Rodriguez",
        designation: "Product Designer @ Stripe",
        message:
          "Beautiful typography and smart AI content rewrite. Hands down the best resume builder on the web.",
        rating: 5,
      },
      {
        id: 5,
        name: "Lisa Müller",
        designation: "HR Specialist & Tech Recruiter",
        message:
          "As an HR professional, I immediately notice resumes built with CleverCV. They are clean, well-spaced, and pass our ATS filters easily.",
        rating: 5,
      },
    ],
  },
};

const SeeWhat = () => {
  return (
    <section className=" overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center space-y-4 max-w-3xl mx-auto mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#81FB84]/10 border border-[#81FB84]/30 text-[#81FB84] text-xs font-semibold uppercase tracking-wider">
          <Sparkles size={13} /> User Success Stories
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white ">
          Loved by Job Seekers Worldwide
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
          See how candidates used CleverCV to land high-paying roles at top
          global companies.
        </p>
      </motion.div>

      {/* Marquee Carousel Streams */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <Marquee
          direction="right"
          speed={40}
          pauseOnHover
          gradient={true}
          gradientColor={["#08090A"]}
        >
          <MarqueeComponent data={testimonialsData} />
        </Marquee>
        <Marquee
          direction="left"
          speed={40}
          pauseOnHover
          gradient={true}
          gradientColor={["#08090A"]}
        >
          <MarqueeComponent data={testimonialsData} />
        </Marquee>
      </motion.div>
    </section>
  );
};

export default SeeWhat;
