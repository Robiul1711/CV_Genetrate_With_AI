import Title from "@/components/common/Title";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="section-padding-x section-padding-y space-y-4">
      <Title level="title48">Privacy Policy – Clever CV</Title>
      <Title level="title16">Last Updated: May 16, 2025</Title>
      <Title level="title16">
        Clever-CV values your privacy. This policy explains how we collect, use,
        and protect your personal data.
      </Title>
      <div className="mt-8 space-y-4">
        <Title level="title32">1. Data We Collect</Title>
        <ul className="list-disc list-inside space-y-2 text-[17px]">
          <li>Personal information (name, email, location)</li>
          <li>Uploaded documents (resumes, cover letters, certificates)</li>
          <li>Responses in resume questionnaire</li>
          <li>Payment details (handled securely via Stripe or PayPal)</li>
          <li>Usage data (analytics, device/browser)</li>
        </ul>
      </div>
      <div className="mt-8 space-y-4">
        <Title level="title32">2. How We Use Your Data</Title>
        <ul className="list-disc list-inside space-y-2 text-[17px]">
          <li>To generate and optimize resumes and application materials</li>
          <li>To provide AI-based language improvement and feedback</li>
          <li>To personalize design and content suggestions</li>
          <li>To process payments and manage your account</li>
          <li>To improve our services through analytics</li>
        </ul>
      </div>
      <div className="mt-8 space-y-4">
        <Title level="title32">3. AI and Third-Party Services</Title>
        <Title level="title24">
          We use third-party APIs for AI processing and transcription:
        </Title>
        <ul className="list-disc list-inside space-y-2 text-[17px]">
          <li>OpenAI API for resume writing</li>
          <li>Claude AI for interview feedback</li>
          <li>Google Speech-to-Text API for voice recognition</li>
          <li>Firebase for user authentication</li>
          <li>AWS S3 for file storage</li>
        </ul>
      </div>
      <div className="mt-8 space-y-4">
        <Title level="title32">4. Data Sharing</Title>
        <Title level="title24">You have the right to:</Title>
        <ul className="list-disc list-inside space-y-2 text-[17px]">
          <li>Service providers (e.g., hosting, analytics, payments)</li>
          <li>Legal authorities (if required by law)</li>
        </ul>
      </div>
      <div className="mt-8 space-y-4">
        <Title level="title32">5. Your Rights (GDPR)</Title>
        <Title level="title24">You have the right to:</Title>
        <ul className="list-disc list-inside space-y-2 text-[17px]">
          <li>Access and download your data</li>
          <li>Request correction or deletion</li>
          <li>Withdraw consent</li>
          <li>Firebase for user authentication</li>
          <li>File a complaint with a Data Protection Authority</li>
        </ul>
      </div>
      <div className="mt-8 space-y-4">
        <Title level="title32">6. Cookies and Tracking</Title>
        <Title level="title16">
          Clever-CV uses cookies to improve functionality and analytics. You may
          manage cookie preferences in your browser settings.
        </Title>
      </div>
      <div className="mt-8 space-y-4">
        <Title level="title32">7. Data Retention</Title>
        <Title level="title16">
          Your data will be retained for as long as your account is active or as
          required by law. Inactive accounts may be purged after 12 months of
          inactivity
        </Title>
      </div>
      <div className="mt-8 space-y-4">
        <Title level="title32">8. Security Measures</Title>
        <Title level="title16">
          We implement encryption, firewalls, and secure storage practices to
          protect your data.
        </Title>
      </div>

      <div className="mt-8 space-y-4">
        <Title level="title32">9. Policy Updates</Title>
        <Title level="title16">
          We may revise this policy. Major changes will be communicated via
          email or platform notices.
        </Title>
      </div>

      <div className="mt-8 space-y-4">
        <Title level="title32">10. Contact Us</Title>
        <Title level="title16">
          For any data protection inquiries or access requests: <br />
          privacy@clever-cv.ai.
        </Title>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
