import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  Sparkles,
  Send,
  Check,
  MoveUpRight,
  MessageSquare,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const defaultFaqs = [
  {
    question: "How does the AI Resume Builder work?",
    answer:
      "Our AI analyzes your experience, skills, and industry standards to generate ATS-friendly resume content, bullet points, and summaries tailored to your target job role in seconds.",
  },
  {
    question: "Can I customize the resume templates?",
    answer:
      "Yes! You have complete freedom to customize colors, fonts, margins, section orders, and layouts to create a truly personalized resume.",
  },
  {
    question: "Is my personal data protected and secure?",
    answer:
      "Absolutely. We adhere to strict data privacy standards and GDPR compliance. Your information is encrypted and never shared with third parties without your permission.",
  },
  {
    question: "How do I download my resume or cover letter?",
    answer:
      "Once you finish editing, simply click the 'Download' button to export high-resolution, recruiter-ready PDF documents instantly.",
  },
  {
    question: "Can I generate resumes in multiple languages?",
    answer:
      "Yes, CleverCV supports multilingual resume generation and instant translation so you can easily apply for international career opportunities.",
  },
];

const ContactForm = () => {
  const [checked, setChecked] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    subject: "General Inquiry",
    message: "",
  });

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.message
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!checked) {
      toast.error("You must agree to the terms of service.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      toast.success(
        "Thank you! Your message has been sent successfully. We'll get back to you shortly.",
      );
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        subject: "General Inquiry",
        message: "",
      });
      setChecked(false);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="pt-8 md:pt-16 xl:pt-20">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="section-padding-x text-center mb-12 md:mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#81FB84]/30 bg-[#81FB84]/10 text-[#81FB84] text-xs md:text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          <span>We're Here to Help</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold  text-white mb-4">
          Get in Touch With{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-[#81FB84]">
            Clever CV
          </span>
        </h1>

      </motion.div>

      {/* Main Grid: Left Map & Contact Cards | Right Form */}
      <div className="section-padding-x grid lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20">
        {/* Left Side: 3D-styled Dark Map + Info Cards */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          {/* Futuristic Map Card */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0E0E10] shadow-2xl group hover:border-[#81FB84]/40 transition duration-300">
            {/* Map Header Overlay */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
              <div className="bg-[#08090A]/90 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-xl flex items-center gap-2.5 shadow-lg">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#81FB84] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#81FB84]"></span>
                </span>
                <span className="text-xs font-semibold text-white tracking-wide">
                  Global Headquarters
                </span>
              </div>
              <div className="bg-[#08090A]/90 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl text-[11px] text-gray-300 flex items-center gap-1.5 shadow-lg">
                <Globe className="w-3.5 h-3.5 text-[#81FB84]" />
                <span>Dhaka, BD</span>
              </div>
            </div>

            {/* Dark Styled Google Map */}
            <div className="h-[280px] sm:h-[320px] w-full relative">
              <iframe
                title="Clever CV Headquarters Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.1037628863673!2d90.404285!3d23.779313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c77094e9fc55%3A0x6b9d628f804597b2!2sMedona%20Tower%2C%2099%20Bir%20Uttam%20AK%20Khandakar%20Road%2C%20Dhaka%201212!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                className="w-full h-full border-0 filter grayscale invert contrast-125 brightness-90 opacity-80 group-hover:opacity-95 transition-opacity duration-300"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              {/* 3D Glowing Map Pin Radar Overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#81FB84]/20 animate-ping absolute -top-1 -left-1"></div>
                  <div className="w-8 h-8 rounded-full bg-[#81FB84] flex items-center justify-center shadow-lg shadow-[#81FB84]/50 border-2 border-white text-black">
                    <MapPin className="w-4 h-4 fill-black" />
                  </div>
                </div>
                <div className="mt-2 bg-black/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md border border-[#81FB84]/40 shadow-xl backdrop-blur-md">
                  Softvence HQ
                </div>
              </div>
            </div>

            {/* Map Footer Bar */}
            <div className="p-4 bg-gradient-to-b from-[#0E0E10] to-[#141418] border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#81FB84] shrink-0" />
                <span className="text-white font-medium">
                  Softvence, 4-7th Floor, Medona Tower, 99 Bir Uttam AK Khandakar Rd, Dhaka 1212
                </span>
              </div>
              <a
                href="https://maps.google.com/?q=Medona+Tower+99+Bir+Uttam+AK+Khandakar+Rd+Dhaka+1212"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#81FB84] hover:underline flex items-center gap-1 font-medium shrink-0 ml-2"
              >
                Directions <MoveUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>


          {/* Quick Contact Info Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Email Card */}
            <motion.div
              whileHover={{ y: -3 }}
              className="bg-[#0E0E10] border border-white/10 hover:border-[#81FB84]/40 p-4 rounded-2xl transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-[#81FB84]/10 border border-white/10 group-hover:border-[#81FB84]/30 flex items-center justify-center text-white group-hover:text-[#81FB84] mb-3 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">
                Email Support
              </h3>
              <p className="text-xs text-gray-400 mb-2">Reach us anytime</p>
              <a
                href="mailto:support@clever-cv.com"
                className="text-xs text-[#81FB84] hover:underline font-medium break-all"
              >
                support@clever-cv.com
              </a>
            </motion.div>

            {/* Phone Card */}
            <motion.div
              whileHover={{ y: -3 }}
              className="bg-[#0E0E10] border border-white/10 hover:border-[#81FB84]/40 p-4 rounded-2xl transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-[#81FB84]/10 border border-white/10 group-hover:border-[#81FB84]/30 flex items-center justify-center text-white group-hover:text-[#81FB84] mb-3 transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">
                Phone Line
              </h3>
              <p className="text-xs text-gray-400 mb-2">Mon - Fri, 9am - 6pm</p>
              <a
                href="tel:+493012345678"
                className="text-xs text-[#81FB84] hover:underline font-medium"
              >
                +49 (0) 30 1234 5678
              </a>
            </motion.div>
          </div>

          {/* Operating Hours Banner */}
          <div className="bg-gradient-to-r from-[#0E0E10] to-[#141418] border border-white/10 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#81FB84]/10 border border-[#81FB84]/20 flex items-center justify-center text-[#81FB84] flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Response Time</p>
              <p className="text-xs font-semibold text-white">
                Average response within{" "}
                <span className="text-[#81FB84]">2 hours</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Modern Glassmorphic Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="lg:col-span-7 bg-[#0E0E10] border border-white/10 hover:border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl relative transition-all"
        >
          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#81FB84]" />
                Send Us a Message
              </h2>
              <p className="text-xs md:text-sm text-gray-400 mt-1">
                Fill in the form below and our team will get back to you
                promptly.
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4 md:space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1.5">
                  First Name <span className="text-[#81FB84]">*</span>
                </label>
                <input
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  type="text"
                  placeholder="John"
                  className="w-full bg-black/60 border border-white/15 focus:border-[#81FB84] focus:ring-1 focus:ring-[#81FB84] px-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-500 outline-none transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1.5">
                  Last Name <span className="text-[#81FB84]">*</span>
                </label>
                <input
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Doe"
                  className="w-full bg-black/60 border border-white/15 focus:border-[#81FB84] focus:ring-1 focus:ring-[#81FB84] px-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-500 outline-none transition-all duration-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1.5">
                  Email Address <span className="text-[#81FB84]">*</span>
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="john.doe@example.com"
                  className="w-full bg-black/60 border border-white/15 focus:border-[#81FB84] focus:ring-1 focus:ring-[#81FB84] px-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-500 outline-none transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1.5">
                  Phone Number
                </label>
                <input
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-black/60 border border-white/15 focus:border-[#81FB84] focus:ring-1 focus:ring-[#81FB84] px-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-500 outline-none transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1.5">
                Topic / Subject
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-black/60 border border-white/15 focus:border-[#81FB84] focus:ring-1 focus:ring-[#81FB84] px-4 py-2.5 rounded-xl text-sm text-white outline-none transition-all duration-200"
              >
                <option value="General Inquiry" className="bg-[#0E0E10]">
                  General Inquiry
                </option>
                <option value="Pricing & Plans" className="bg-[#0E0E10]">
                  Pricing & Plans
                </option>
                <option value="AI Resume Assistance" className="bg-[#0E0E10]">
                  AI Resume Assistance
                </option>
                <option value="Technical Support" className="bg-[#0E0E10]">
                  Technical Support
                </option>
                <option
                  value="Enterprise / Partnership"
                  className="bg-[#0E0E10]"
                >
                  Enterprise / Partnership
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1.5">
                Your Message <span className="text-[#81FB84]">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Tell us how we can help you..."
                className="w-full bg-black/60 border border-white/15 focus:border-[#81FB84] focus:ring-1 focus:ring-[#81FB84] p-4 rounded-xl text-sm text-white placeholder-gray-500 outline-none transition-all duration-200 resize-none"
              />
            </div>

            {/* Terms Agreement */}
            <div className="flex items-center gap-3 pt-2">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <span
                  className={`w-5 h-5 flex justify-center items-center rounded-md border transition-colors ${
                    checked
                      ? "border-[#81FB84] bg-[#81FB84] text-black"
                      : "border-white/30 bg-black/60"
                  }`}
                >
                  {checked && <Check size={14} strokeWidth={3} />}
                </span>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  className="hidden"
                />
                <span className="text-xs md:text-sm text-gray-300">
                  I agree to the{" "}
                  <Link
                    to="/tearms-and-condition"
                    target="_blank"
                    className="text-[#81FB84] underline hover:text-green-400 transition-colors"
                  >
                    terms of service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy-policy"
                    target="_blank"
                    className="text-[#81FB84] underline hover:text-green-400 transition-colors"
                  >
                    privacy policy
                  </Link>
                  .
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white hover:bg-gray-200 text-black font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-white/10 disabled:opacity-50 disabled:cursor-not-allowed mt-4 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Frequently Asked Questions Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6 }}
        className="section-padding-x border-t border-white/10 pt-8 md:pt-16 xl:pt-20 pb-8 md:pb-16 xl:pb-20"
      >
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* FAQ Left Column */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="w-12 h-12 rounded-2xl bg-[#81FB84]/10 border border-[#81FB84]/20 flex items-center justify-center text-[#81FB84] mb-4">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Find fast answers to common questions about Clever CV's features,
              pricing, and AI engine.
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/ai-help"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#81FB84]/30 bg-[#81FB84]/10 text-[#81FB84] hover:bg-[#81FB84] hover:text-black transition-all duration-300 text-sm font-medium"
              >
                <span>Ask AI Assistant</span>
                <MoveUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* FAQ Right Column (Shadcn Accordion) */}
          <div className="lg:col-span-8">
            <Accordion
              type="single"
              collapsible
              defaultValue="item-0"
              className="w-full space-y-3.5"
            >
              {defaultFaqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="bg-[#0E0E10] border border-white/10 hover:border-[#81FB84]/40 rounded-2xl px-5 transition-all duration-300 shadow-md data-[state=open]:border-[#81FB84]/50 data-[state=open]:shadow-[0_0_20px_rgba(129,251,132,0.08)]"
                >
                  <AccordionTrigger className="text-left text-sm md:text-base font-semibold text-white hover:text-[#81FB84] py-5 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-3 pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactForm;
