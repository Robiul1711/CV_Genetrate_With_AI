import Title from "@/components/common/Title";
import React from "react";
import { ScrollRestoration } from "react-router-dom";

const TearmsAndCondition = () => {
  return (
    <div className="section-padding-x section-padding-y space-y-4">
      <ScrollRestoration />
      <Title level="title48">Terms and Conditions – Clever CV</Title>
      <Title level="title16">Last Updated: May 16, 2025</Title>
      <Title level="title16">
        Clever-CV values your privacy. This policy explains how we collect, use,
        and protect your personal data.
      </Title>
      <div className="mt-8 space-y-4">
        <Title level="title32">1. Introduction</Title>
        <Title level="title16">
          Welcome to Clever-CV, a platform that enables users to create,
          optimize, and manage professional resumes, cover letters, and
          application packages using AI-based tools. These Terms and Conditions
          govern your use of our website and services. By accessing or using
          Clever-CV, you agree to these Terms.
        </Title>
      </div>
      <div className="mt-8 space-y-4">
        <Title level="title32">2. Services Provided</Title>
        <Title level="title24">You have the right to:</Title>
        <ul className="list-disc list-inside space-y-2 text-[17px]">
          <li>AI-powered resume and cover letter generation</li>
          <li>Resume optimization and translation</li>
          <li>Interview coaching features (beta)</li>
          <li>Exporting documents in PDF and DOCX</li>
          <li>Optional premium features and downloadable templates</li>
        </ul>
      </div>
      <div className="mt-8 space-y-4">
        <Title level="title32">3. User Obligations</Title>
        <Title level="title24">You agree to:</Title>
        <ul className="list-disc list-inside space-y-2 text-[17px]">
          <li>Provide accurate and lawful personal information</li>
          <li>Use the platform solely for personal job application purposes</li>
          <li>
            Not upload content that is unlawful, misleading, or infringes on
            third-party rights
          </li>
          <li>
            Respect the intellectual property rights of Clever-CV and its
            partners
          </li>
        </ul>
      </div>
      <div className="mt-8 space-y-4">
        <Title level="title32">4. Account and Access</Title>

        <ul className="list-disc list-inside space-y-2 text-[17px]">
          <li>You must be at least 16 years old to register.</li>
          <li>You are responsible for safeguarding your login credentials.</li>
          <li>
            Clever-CV reserves the right to suspend or terminate access for
            violations of these Terms.
          </li>
        </ul>
      </div>
      <div className="mt-8 space-y-4">
        <Title level="title32">5. Payment and Subscriptions</Title>
        <ul className="list-disc list-inside space-y-2 text-[17px]">
          <li>
            Some features are free, while others require a one-time payment or
            subscription.
          </li>
          <li>Payments are handled via Stripe and PayPal.</li>
          <li>
            Subscriptions auto-renew unless canceled before the renewal date.
          </li>
          <li>Firebase for user authentication</li>
          <li>
            Refunds are only issued for technical errors or as required by law.
          </li>
        </ul>
      </div>
      <div className="mt-8 space-y-4">
        <Title level="title32">6. Document Storage</Title>
        <ul className="list-disc list-inside space-y-2 text-[17px]">
          <li>
            Clever-CV may update or modify features, services, and pricing.
            Major changes will be announced in advance.
          </li>
        </ul>
      </div>
      <div className="mt-8 space-y-4">
        <Title level="title32">7. Data Retention</Title>
        <ul className="list-disc list-inside space-y-2 text-[17px]">
          <li>
            Clever-CV may update or modify features, services, and pricing.
            Major changes will be announced in advance.
          </li>
        </ul>
      </div>
      <div className="mt-8 space-y-4">
        <Title level="title32">8. Security Measures</Title>
        <ul className="list-disc list-inside space-y-2 text-[17px]">
          <li>
            Clever-CV may update or modify features, services, and pricing.
            Major changes will be announced in advance.
          </li>
        </ul>
      </div>

      <div className="mt-8 space-y-4">
        <Title level="title32">9. Limitation of Liability</Title>
        <ul className="list-disc list-inside space-y-2 text-[17px]">
          <li>
            Clever-CV is not responsible for any job outcomes or decisions made
            by employers. We do not guarantee employment or interview success.
          </li>
        </ul>
      </div>

      <div className="mt-8 space-y-4">
        <Title level="title32">10. Governing Law</Title>
        <ul className="list-disc list-inside space-y-2 text-[17px]">
          <li>
            These Terms are governed by the laws of Germany. Any disputes shall
            be resolved in German courts, unless otherwise required by local
            laws.
          </li>
        </ul>
      </div>
      <div className="mt-8 space-y-4">
        <Title level="title32">11. Contact</Title>
        <ul className="list-disc list-inside space-y-2 text-[17px]">
          <li>For questions or support, email us at:</li>
        </ul>
        <Title level="title16">support@clever-cv.ai</Title>
      </div>
    </div>
  );
};

export default TearmsAndCondition;
