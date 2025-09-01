import Title from "@/components/common/Title";
import { useEmail } from "@/hooks/useEmail";
import React from "react";
import { ScrollRestoration } from "react-router-dom";

const PrivacyPolicy = () => {
  const { language } = useEmail();

  // ✅ Content in English and German
  const content = {
    en: {
      lastUpdated: "Last Updated: May 16, 2025",
      intro:
        "Clever-CV values your privacy. This policy explains how we collect, use, and protect your personal data.",
      sections: [
        {
          title: "1. Data We Collect",
          items: [
            "Personal information (name, email, location)",
            "Uploaded documents (resumes, cover letters, certificates)",
            "Responses in resume questionnaire",
            "Payment details (handled securely via Stripe or PayPal)",
            "Usage data (analytics, device/browser)",
          ],
        },
        {
          title: "2. How We Use Your Data",
          items: [
            "To generate and optimize resumes and application materials",
            "To provide AI-based language improvement and feedback",
            "To personalize design and content suggestions",
            "To process payments and manage your account",
            "To improve our services through analytics",
          ],
        },
        {
          title: "3. AI and Third-Party Services",
          description:
            "We use third-party APIs for AI processing and transcription:",
          items: [
            "OpenAI API for resume writing",
            "Claude AI for interview feedback",
            "Google Speech-to-Text API for voice recognition",
            "Firebase for user authentication",
            "AWS S3 for file storage",
          ],
        },
        {
          title: "4. Data Sharing",
          description: "You have the right to:",
          items: [
            "Service providers (e.g., hosting, analytics, payments)",
            "Legal authorities (if required by law)",
          ],
        },
        {
          title: "5. Your Rights (GDPR)",
          description: "You have the right to:",
          items: [
            "Access and download your data",
            "Request correction or deletion",
            "Withdraw consent",
            "Firebase for user authentication",
            "File a complaint with a Data Protection Authority",
          ],
        },
        {
          title: "6. Cookies and Tracking",
          description:
            "Clever-CV uses cookies to improve functionality and analytics. You may manage cookie preferences in your browser settings.",
        },
        {
          title: "7. Data Retention",
          description:
            "Your data will be retained for as long as your account is active or as required by law. Inactive accounts may be purged after 12 months of inactivity",
        },
        {
          title: "8. Security Measures",
          description:
            "We implement encryption, firewalls, and secure storage practices to protect your data.",
        },
        {
          title: "9. Policy Updates",
          description:
            "We may revise this policy. Major changes will be communicated via email or platform notices.",
        },
        {
          title: "10. Contact Us",
          description: "For any data protection inquiries or access requests: privacy@clever-cv.ai",
        },
      ],
    },
    de: {
      lastUpdated: "Zuletzt aktualisiert: 16. Mai 2025",
      intro:
        "Clever-CV schützt Ihre Privatsphäre. Diese Richtlinie erklärt, wie wir Ihre persönlichen Daten erfassen, verwenden und schützen.",
      sections: [
        {
          title: "1. Gesammelte Daten",
          items: [
            "Personenbezogene Informationen (Name, E-Mail, Standort)",
            "Hochgeladene Dokumente (Lebensläufe, Anschreiben, Zertifikate)",
            "Antworten im Lebenslauf-Fragebogen",
            "Zahlungsdetails (sicher über Stripe oder PayPal verarbeitet)",
            "Nutzungsdaten (Analysen, Gerät/Browser)",
          ],
        },
        {
          title: "2. Verwendung Ihrer Daten",
          items: [
            "Erstellung und Optimierung von Lebensläufen und Bewerbungsunterlagen",
            "Bereitstellung KI-basierter Sprachverbesserung und Feedback",
            "Personalisierung von Design- und Inhaltsempfehlungen",
            "Verarbeitung von Zahlungen und Verwaltung Ihres Kontos",
            "Verbesserung unserer Dienste durch Analysen",
          ],
        },
        {
          title: "3. KI- und Drittanbieter-Services",
          description:
            "Wir verwenden Drittanbieter-APIs für KI-Verarbeitung und Transkription:",
          items: [
            "OpenAI API für Lebenslauf-Erstellung",
            "Claude AI für Interview-Feedback",
            "Google Speech-to-Text API für Spracherkennung",
            "Firebase für Benutzer-Authentifizierung",
            "AWS S3 für Dateispeicherung",
          ],
        },
        {
          title: "4. Datenweitergabe",
          description: "Sie haben das Recht auf:",
          items: [
            "Dienstleister (z. B. Hosting, Analysen, Zahlungen)",
            "Gesetzliche Behörden (wenn gesetzlich vorgeschrieben)",
          ],
        },
        {
          title: "5. Ihre Rechte (DSGVO)",
          description: "Sie haben das Recht auf:",
          items: [
            "Zugriff und Download Ihrer Daten",
            "Anforderung von Korrektur oder Löschung",
            "Widerruf Ihrer Einwilligung",
            "Firebase für Benutzer-Authentifizierung",
            "Einreichen einer Beschwerde bei der Datenschutzbehörde",
          ],
        },
        {
          title: "6. Cookies und Tracking",
          description:
            "Clever-CV verwendet Cookies zur Verbesserung der Funktionalität und Analyse. Sie können Ihre Cookie-Einstellungen im Browser verwalten.",
        },
        {
          title: "7. Datenaufbewahrung",
          description:
            "Ihre Daten werden so lange aufbewahrt, wie Ihr Konto aktiv ist oder gesetzlich vorgeschrieben. Inaktive Konten können nach 12 Monaten Inaktivität gelöscht werden.",
        },
        {
          title: "8. Sicherheitsmaßnahmen",
          description:
            "Wir implementieren Verschlüsselung, Firewalls und sichere Speicherpraktiken zum Schutz Ihrer Daten.",
        },
        {
          title: "9. Richtlinien-Updates",
          description:
            "Wir können diese Richtlinie überarbeiten. Wichtige Änderungen werden per E-Mail oder Plattformhinweis kommuniziert.",
        },
        {
          title: "10. Kontakt",
          description:
            "Bei Datenschutzanfragen oder Zugriffsanforderungen: privacy@clever-cv.ai",
        },
      ],
    },
  };

  const current = language === "de" ? content.de : content.en;

  return (
    <div className="section-padding-x section-padding-y space-y-4">
      <ScrollRestoration />

      <Title level="title48">
        {language === "de" ? "Datenschutzrichtlinie" : "Privacy Policy"} – Clever CV
      </Title>

      <Title level="title16">{current.lastUpdated}</Title>

      <Title level="title16">{current.intro}</Title>

      {current.sections.map((section, idx) => (
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
