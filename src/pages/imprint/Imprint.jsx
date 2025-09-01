import Title from "@/components/common/Title";
import { useEmail } from "@/hooks/useEmail"; // assuming this hook provides language
import React from "react";
import { ScrollRestoration } from "react-router-dom";

const Imprint = () => {
  const { language } = useEmail(); // 'en' or 'de'

  // Define content in English and German
  const content = {
    en: {
      pageTitle: "Imprint – Clever CV",
      intro:
        "Welcome to Clever-CV. Below you will find the legally required information about our company.",
      companyInfoTitle: "Company Information",
      companyName: "Company Name: Clever-CV GmbH",
      address: "Address: Example Street 12, 12345 Berlin, Germany",
      phone: "Phone: +49 30 12345678",
      email: "Email: contact@clever-cv.com",
      legalRepTitle: "Legal Representatives",
      managingDirector: "Managing Director: John Doe",
      commercialRegister: "Commercial Register: HRB 123456, Berlin",
      vatId: "VAT ID: DE123456789",
      disclaimerTitle: "Disclaimer",
      disclaimer1:
        "The content of this website is for general information purposes only.",
      disclaimer2:
        "We do not accept liability for the accuracy or completeness of the information.",
      contactTitle: "Contact Us",
      contactIntro: "If you have any questions or concerns, please contact us at:",
    },
    de: {
      pageTitle: "Impressum – Clever CV",
      intro:
        "Willkommen bei Clever-CV. Nachfolgend finden Sie die gesetzlich vorgeschriebenen Informationen über unser Unternehmen.",
      companyInfoTitle: "Unternehmensinformationen",
      companyName: "Firmenname: Clever-CV GmbH",
      address: "Adresse: Beispielstraße 12, 12345 Berlin, Deutschland",
      phone: "Telefon: +49 30 12345678",
      email: "E-Mail: contact@clever-cv.com",
      legalRepTitle: "Gesetzliche Vertreter",
      managingDirector: "Geschäftsführer: John Doe",
      commercialRegister: "Handelsregister: HRB 123456, Berlin",
      vatId: "USt-ID: DE123456789",
      disclaimerTitle: "Haftungsausschluss",
      disclaimer1:
        "Die Inhalte dieser Website dienen nur allgemeinen Informationszwecken.",
      disclaimer2:
        "Wir übernehmen keine Haftung für die Richtigkeit oder Vollständigkeit der Informationen.",
      contactTitle: "Kontakt",
      contactIntro:
        "Wenn Sie Fragen oder Bedenken haben, kontaktieren Sie uns bitte unter:",
    },
  };

  const t = content[language || "en"]; // default to English

  return (
    <div className="section-padding-x section-padding-y space-y-6">
      <ScrollRestoration />

      <Title level="title48">{t.pageTitle}</Title>
      <Title level="title16" className="my-2">
        {t.intro}
      </Title>

      <div className="mt-8 space-y-4">
        <Title level="title32">{t.companyInfoTitle}</Title>
        <Title level="title16">{t.companyName}</Title>
        <Title level="title16">{t.address}</Title>
        <Title level="title16">{t.phone}</Title>
        <Title level="title16">{t.email}</Title>
      </div>

      <div className="mt-8 space-y-4">
        <Title level="title32">{t.legalRepTitle}</Title>
        <Title level="title16">{t.managingDirector}</Title>
        <Title level="title16">{t.commercialRegister}</Title>
        <Title level="title16">{t.vatId}</Title>
      </div>

      <div className="mt-8 space-y-4">
        <Title level="title32">{t.disclaimerTitle}</Title>
        <Title level="title16">{t.disclaimer1}</Title>
        <Title level="title16">{t.disclaimer2}</Title>
      </div>

      <div className="mt-8 space-y-4">
        <Title level="title32">{t.contactTitle}</Title>
        <Title level="title16">{t.contactIntro}</Title>
        <Title level="title16">{t.email}</Title>
        <Title level="title16">{t.phone}</Title>
      </div>
    </div>
  );
};

export default Imprint;
