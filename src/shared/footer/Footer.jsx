import React from "react";
import footer from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaMedium } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { useEmail } from "@/hooks/useEmail";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useStatusCheck } from "@/components/common/useStatusCheck";

const Footer = () => {
  const { language } = useEmail();
  const axiosPublic = useAxiosPublic();
  const { data: status } = useStatusCheck();


        const createResumePath =
    (status?.has_subscription === false && status?.has_pay_per_download_credits === false) 
      ? "/price"
      : "/dashboard/create-new-resume";
      const updateCoverPath =
       (status?.has_subscription === false && status?.has_pay_per_download_credits === false) 
      ? "/price"
      : "/dashboard/create-cover-letter";
  const { data: socialData, isLoading } = useQuery({
    queryKey: ["social-links"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/social-media/`);
      return res.data;
    },
  });
  const { data: footerData, isLoading: footerLoading } = useQuery({
    queryKey: ["footer-data"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/about-system/?lan=${language}`);
      return res.data;
    },
  });

  console.log(footerData?.data);



  const texts = {
    en: {
      company: "Company",
      service: "Service",
      home: "Home",
      pricing: "Pricing",
      contact: "Contact",
      aiResumeBuilder: "AI Resume Builder",
      aiResumeOptimizer: "AI Resume Optimizer",
      createCoverLetter: "Create Cover Letter",
      multilingualResume: "Multilingual Resume",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      imprint: "Imprint",
      description:
        "CleverCV is an AI-powered resume and cover letter builder that helps you stand out with confidence. Whether you're starting from scratch or improving an existing CV, our platform gives you step-by-step guidance, smart design suggestions, and powerful language enhancements.",
      copyright: " FutureTech. All rights reserved.",
    },
    de: {
      company: "Unternehmen",
      service: "Dienstleistungen",
      home: "Startseite",
      pricing: "Preise",
      contact: "Kontakt",
      aiResumeBuilder: "KI-Lebenslauf-Builder",
      aiResumeOptimizer: "KI-Lebenslauf-Optimierer",
      createCoverLetter: "Anschreiben erstellen",
      multilingualResume: "Mehrsprachiger Lebenslauf",
      privacyPolicy: "Datenschutzrichtlinie",
      termsOfService: "Nutzungsbedingungen",
      imprint: "Impressum",
      description:
        "CleverCV ist ein KI-gestützter Lebenslauf- und Anschreiben-Builder, der Ihnen hilft, selbstbewusst hervorzustechen. Egal, ob Sie von Grund auf beginnen oder einen bestehenden Lebenslauf verbessern, unsere Plattform bietet Schritt-für-Schritt-Anleitungen, intelligente Designvorschläge und leistungsstarke Sprachverbesserungen.",
      copyright: " FutureTech. Alle Rechte vorbehalten.",
    },
  };

  const t = texts[language] || texts.en;

  return (
    <div className="bg-Primary w-full section-padding-x pt-10 md:pt-[70px] pb-5 md:pb-10">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:justify-between gap-10">
        {/* Left: Logo & Description */}
        <div className="w-full md:w-[40%]">
          <Link to={"/"}>
            <img
              src={`${import.meta.env.VITE_IMG_URL}/${footerData?.data?.logo}`}
              alt="icon"
              className="mb-4 w-[40px] md:w-[60px] text-white cursor-pointer"
            />
          </Link>
          <p className="text-[15px] md:text-base text-[#666] leading-relaxed">
            {footerData?.data?.description}
          </p>
        </div>

        {/* Right: Links */}
        <div className="md:w-full lg:w-[60%] grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Company */}
          <div className="flex justify-start md:justify-end">
            <ul className="text-[#666] space-y-3">
              <p className="text-white text-[18px] md:text-[20px] font-semibold mb-5">
                {t.company}
              </p>
              <li>
                <Link
                  to="/"
                  className="text-[15px] md:text-base hover:text-white"
                >
                  {t.home}
                </Link>
              </li>
              <li>
                <Link
                  to="/price"
                  className="text-[15px] md:text-base hover:text-white"
                >
                  {t.pricing}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-[15px] md:text-base hover:text-white"
                >
                  {t.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Service */}
          <div className="flex justify-start md:justify-end">
            <ul className="text-[#666] space-y-3 flex flex-col items-start">
              <p className="text-white text-[18px] md:text-[20px] font-semibold mb-3">
                {t.service}
              </p>
              <Link
                to={createResumePath}
                className="text-[15px] md:text-base hover:text-white"
              >
                {t.aiResumeBuilder}
              </Link>
              {/* <Link
                to={createResumePath}
                className="text-[15px] md:text-base hover:text-white"
              >
                {t.aiResumeOptimizer}
              </Link> */}
              <Link
                to={updateCoverPath}
                className="text-[15px] md:text-base hover:text-white"
              >
                {t.createCoverLetter}
              </Link>
              {/* <Link
       to={createResumePath}
                className="text-[15px] md:text-base hover:text-white"
              >
                {t.multilingualResume}
              </Link> */}
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-5 lg:my-8 border-[#666]/50" />

      {/* Bottom Section */}
      <div className="flex flex-col lg:flex-row flex-wrap justify-center lg:justify-between items-center gap-5 text-center w-full">
        {/* Left Text */}
        <div className="flex flex-wrap justify-center gap-4 text-[#666] md:text-[16px]">
          <Link to={"/privacy-policy"}>
            <p className="underline text-[15px] md:text-base hover:text-white">
              {t.privacyPolicy}
            </p>
          </Link>
          <Link to={"/tearms-and-condition"}>
            <p className="underline text-[15px] md:text-base hover:text-white">
              {t.termsOfService}
            </p>
          </Link>
          <Link to={"/imprint"}>
            <p className="underline text-[15px] md:text-base hover:text-white">
              {t.imprint}
            </p>
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-5 items-center justify-center">
          {socialData?.data?.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`${import.meta.env.VITE_IMG_URL}${item.icon}`}
                alt={item.name}
                className="w-6 h-6 md:w-8 md:h-8 object-contain"
              />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-[15px] md:text-base text-[#666] text-center">
          <p>
            {footerData?.data?.copyright}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
