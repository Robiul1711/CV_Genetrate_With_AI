import Title from "@/components/common/Title";
import { useEmail } from "@/hooks/useEmail";
import React from "react";
import { ScrollRestoration } from "react-router-dom";

const TermsAndConditions = () => {
  const { language } = useEmail();

  // ✅ English and German content
  const content = {
    en: {
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
            "Resume optimization and translation",
            "Interview coaching features (beta)",
            "Exporting documents in PDF and DOCX",
            "Customization and editing tools",
            "Optional premium features and downloadable templates",
          ],
        },
        {
          title: "3. User Obligations",
          description: "You agree to:",
          items: [
            "Provide accurate and lawful personal information",
            "Use the platform solely for personal job application purposes",
            "Not upload content that is unlawful, misleading, or infringes on third-party rights",
            "Respect the intellectual property rights of Clever-CV and its partners",
          ],
        },
        {
          title: "4. Account and Access",
          items: [
            "You must be at least 16 years old to register.",
            "You are responsible for safeguarding your login credentials.",
            "Clever-CV reserves the right to suspend or terminate access for violations of these Terms.",
          ],
        },
        {
          title: "5. Payment and Subscriptions",
          items: [
            "Some features are free, while others require a one-time payment or subscription.",
            "Payments are handled via Stripe and PayPal.",
            "Subscriptions auto-renew unless canceled before the renewal date.",
            "Refunds are only issued for technical errors or as required by law.",
          ],
        },
        {
          title: "6. Document Storage",
          description:
            "User files (resumes, templates, etc.) are securely stored on AWS S3.",
        },
        {
          title: "7. Intellectual Property",
          items: [
            "All templates, designs, and tools are the intellectual property of Clever-CV.",
            "You retain rights over your personal information and uploaded content.",
          ],
        },
        {
          title: "8. Modifications to the Service",
          description:
            "Clever-CV may update or modify features, services, and pricing. Major changes will be announced in advance.",
        },
        {
          title: "9. Limitation of Liability",
          description:
            "Clever-CV is not responsible for any job outcomes or decisions made by employers. We do not guarantee employment or interview success.",
        },
        {
          title: "10. Governing Law",
          description:
            "These Terms are governed by the laws of Germany. Any disputes shall be resolved in German courts, unless otherwise required by local laws.",
        },
        {
          title: "11. Contact",
          description: "For questions or support, email us at: support@clever-cv.ai",
        },
      ],
    },
    de: {
      lastUpdated: "Zuletzt aktualisiert: 16. Mai 2025",
      intro:
        "Willkommen bei Clever-CV. Diese Allgemeinen Geschäftsbedingungen regeln die Nutzung unserer Website und Dienste. Durch den Zugriff auf oder die Nutzung von Clever-CV stimmen Sie diesen Bedingungen zu.",
      sections: [
        {
          title: "1. Einführung",
          description:
            "Clever-CV ermöglicht Benutzern die Erstellung, Optimierung und Verwaltung professioneller Lebensläufe, Anschreiben und Bewerbungsunterlagen mithilfe KI-basierter Tools.",
        },
        {
          title: "2. angebotene Dienste",
          items: [
            "KI-gestützte Erstellung von Lebensläufen und Anschreiben",
            "Optimierung und Übersetzung von Lebensläufen",
            "Interview-Coaching-Funktionen (Beta)",
            "Export von Dokumenten im PDF- und DOCX-Format",
            "Anpassungs- und Bearbeitungsfunktionen",
            "Optionale Premiumfunktionen und herunterladbare Vorlagen",
          ],
        },
        {
          title: "3. Pflichten der Nutzer",
          description: "Sie verpflichten sich:",
          items: [
            "korrekte und rechtmäßige persönliche Angaben zu machen",
            "die Plattform ausschließlich für private Bewerbungszwecke zu nutzen",
            "keine rechtswidrigen, irreführenden oder rechtsverletzenden Inhalte hochzuladen",
            "die geistigen Eigentumsrechte von Clever-CV und Partnern zu respektieren",
          ],
        },
        {
          title: "4. Konto und Zugang",
          items: [
            "Sie müssen mindestens 16 Jahre alt sein, um sich zu registrieren.",
            "Sie sind für die Sicherheit Ihrer Zugangsdaten verantwortlich.",
            "Clever-CV behält sich das Recht vor, den Zugang bei Verstößen gegen diese Bedingungen zu sperren oder zu beenden.",
          ],
        },
        {
          title: "5. Zahlungen und Abonnements",
          items: [
            "Einige Funktionen sind kostenlos, andere erfordern eine einmalige Zahlung oder ein Abonnement.",
            "Zahlungen erfolgen über Stripe oder PayPal.",
            "Abonnements verlängern sich automatisch, sofern sie nicht vor dem Verlängerungsdatum gekündigt werden.",
            "Rückerstattungen erfolgen nur bei technischen Fehlern oder wenn gesetzlich vorgeschrieben.",
          ],
        },
        {
          title: "6. Dokumentenspeicherung",
          description: "Benutzerdokumente (Lebensläufe, Vorlagen usw.) werden sicher auf AWS S3 gespeichert.",
        },
        {
          title: "7. Geistiges Eigentum",
          items: [
            "Alle Vorlagen, Designs und Tools sind geistiges Eigentum von Clever-CV.",
            "Sie behalten die Rechte an Ihren persönlichen Informationen und hochgeladenen Inhalten.",
          ],
        },
        {
          title: "8. Änderungen am Dienst",
          description: "Clever-CV kann Funktionen, Dienste und Preise aktualisieren oder ändern. Wichtige Änderungen werden im Voraus angekündigt.",
        },
        {
          title: "9. Haftungsbeschränkung",
          description:
            "Clever-CV übernimmt keine Verantwortung für Bewerbungsergebnisse oder Arbeitgeberentscheidungen. Eine Jobgarantie oder Einladung zum Vorstellungsgespräch wird nicht gegeben.",
        },
        {
          title: "10. Anwendbares Recht",
          description: "Diese AGB unterliegen deutschem Recht. Streitigkeiten werden vor deutschen Gerichten geregelt, sofern nicht anders gesetzlich vorgeschrieben.",
        },
        {
          title: "11. Kontakt",
          description: "Bei Fragen oder Supportanfragen: support@clevercv.ai",
        },
      ],
    },
  };

  const current = language === "de" ? content.de : content.en;

  return (
    <div className="section-padding-x section-padding-y space-y-4">
      <ScrollRestoration />

      <Title level="title48">
        {language === "de" ? "Allgemeine Geschäftsbedingungen" : "Terms and Conditions"} – Clever CV
      </Title>

      <Title level="title16">{current.lastUpdated}</Title>
      <Title level="title16">{current.intro}</Title>

      {current.sections.map((section, idx) => (
        <div key={idx} className="mt-8 space-y-4">
          <Title level="title32">{section.title}</Title>
          {section.description && <Title level="title16">{section.description}</Title>}
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

export default TermsAndConditions;
