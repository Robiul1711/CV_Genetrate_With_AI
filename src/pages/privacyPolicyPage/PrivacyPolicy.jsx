import Title from "@/components/common/Title";
import React from "react";
import { ScrollRestoration } from "react-router-dom";
import { motion } from "framer-motion";

const content = {
  lastUpdated: "Last Updated: May 16, 2025",
  intro:
    "Clever-CV is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal data.",
  sections: [
    {
      title: "1. Information We Collect",
      items: [
        "Personal details (name, email address, phone number)",
        "Uploaded documents (resumes, cover letters, certifications)",
        "Questionnaire responses and career history input",
        "Payment details (processed securely via Stripe)",
        "Usage data (device and browser analytics)",
      ],
    },
    {
      title: "2. How We Use Your Information",
      items: [
        "To provide AI-generated resume and cover letter content",
        "To process payments and manage user accounts",
        "To enhance and optimize platform performance",
        "To send essential updates and support responses",
      ],
    },
    {
      title: "3. Legal Basis for Processing",
      description:
        "We process data on the basis of contract fulfillment, legal compliance, user consent, and legitimate interests.",
    },
    {
      title: "4. Third-Party Sharing",
      description:
        "We do not sell your data. We share data only with essential service providers such as secure payment gateways and cloud hosting partners.",
    },
    {
      title: "5. Your Rights",
      items: [
        "Right to access your stored personal information",
        "Right to rectification or deletion of your data",
        "Right to data portability and consent withdrawal",
      ],
    },
    {
      title: "6. Cookies and Tracking",
      description:
        "Clever-CV uses cookies to improve functionality and analytics. You may manage cookie preferences in your browser settings.",
    },
    {
      title: "7. Data Retention & Security",
      description:
        "We implement encryption, firewalls, and secure storage practices to protect your data.",
    },
    {
      title: "8. Contact Us",
      description: "For any data protection inquiries: privacy@clever-cv.com",
    },
  ],
};

const PrivacyPolicy = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="section-padding-x section-padding-y space-y-4 max-w-4xl mx-auto"
    >
      <ScrollRestoration />

      <Title level="title48">
        Privacy Policy – Clever CV
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
          {section.description && (
            <Title level="title16" className="text-gray-300">{section.description}</Title>
          )}
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

export default PrivacyPolicy;

