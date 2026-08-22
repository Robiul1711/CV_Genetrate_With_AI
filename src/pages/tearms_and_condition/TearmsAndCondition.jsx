import Title from "@/components/common/Title";
import React from "react";
import { ScrollRestoration } from "react-router-dom";
import { motion } from "framer-motion";

const content = {
  lastUpdated: "Last Updated: May 16, 2025",
  intro:
    "Welcome to Clever-CV. These Terms and Conditions govern your use of our website and services. By accessing or using Clever-CV, you agree to these Terms.",
  sections: [
    {
      title: "1. Introduction",
      description:
        "Clever-CV enables users to create, optimize, and manage professional resumes, cover letters, and application packages using AI-based tools.",
    },
    {
      title: "2. Services Provided",
      items: [
        "AI-powered resume and cover letter generation",
        "Resume optimization and formatting",
        "Interview coaching features (beta)",
        "Exporting documents in PDF format",
        "Customization and editing tools",
        "Premium features and downloadable templates",
      ],
    },
    {
      title: "3. User Accounts",
      items: [
        "You must provide accurate, current, and complete information during registration.",
        "You are responsible for safeguarding your account credentials.",
        "You may not transfer or share your account with anyone else.",
      ],
    },
    {
      title: "4. Subscription and Payments",
      items: [
        "Certain features are accessible via paid subscription or pay-per-download credits.",
        "Payments are processed securely via third-party providers.",
        "Subscriptions renew automatically unless cancelled before the renewal date.",
      ],
    },
    {
      title: "5. Intellectual Property",
      items: [
        "You retain all ownership of the content you input and generate.",
        "Clever-CV and its templates, code, and brand are the property of Clever-CV.",
      ],
    },
    {
      title: "6. Acceptable Use",
      items: [
        "Do not use the platform for unlawful or deceptive activities.",
        "Do not attempt to disrupt or compromise platform security.",
      ],
    },
    {
      title: "7. Disclaimer of Warranties",
      description:
        "Our services are provided 'as is' without warranties of any kind regarding job placement or hiring guarantees.",
    },
    {
      title: "8. Limitation of Liability",
      description:
        "To the maximum extent permitted by law, Clever-CV shall not be liable for indirect or consequential damages.",
    },
    {
      title: "9. Modifications to Terms",
      description:
        "We reserve the right to modify these Terms at any time with updated timestamps.",
    },
    {
      title: "10. Contact",
      description: "For questions or support, email us at: support@clever-cv.com",
    },
  ],
};

const TermsAndConditions = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="section-padding-x section-padding-y space-y-4 max-w-4xl mx-auto"
    >
      <ScrollRestoration />

      <Title level="title48">
        Terms and Conditions – Clever CV
      </Title>

      <Title level="title16" className="text-gray-400">{content.lastUpdated}</Title>
      <Title level="title16" className="text-gray-300">{content.intro}</Title>

      {content.sections.map((section, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mt-8 space-y-4 bg-[#0E0E10] border border-[#262626] rounded-2xl p-6 hover:border-[#81FB84]/30 transition"
        >
          <Title level="title32" className="text-[#81FB84]">{section.title}</Title>
          {section.description && <Title level="title16" className="text-gray-300">{section.description}</Title>}
          {section.items && (
            <ul className="list-disc list-inside space-y-2 text-[15px] text-gray-300">
              {section.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TermsAndConditions;

