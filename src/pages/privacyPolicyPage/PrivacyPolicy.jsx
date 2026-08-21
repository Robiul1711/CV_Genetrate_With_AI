import Title from "@/components/common/Title";
import React from "react";
import { ScrollRestoration } from "react-router-dom";

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
    <div className="section-padding-x section-padding-y space-y-4">
      <ScrollRestoration />

      <Title level="title48">
        Privacy Policy – Clever CV
      </Title>

      <Title level="title16">{content.lastUpdated}</Title>
      <Title level="title16">{content.intro}</Title>

      {content.sections.map((section, idx) => (
        <div key={idx} className="mt-8 space-y-4">
          <Title level="title32">{section.title}</Title>
          {section.description && (
            <Title level="title16">{section.description}</Title>
          )}
          {section.items && (
            <ul className="list-disc list-inside space-y-2 text-[17px]">
              {section.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default PrivacyPolicy;
