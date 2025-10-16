import React from "react";
import banner from "@/assets/images/banner.png";
import users from "../../assets/images/users.png";
import { AiTwotoneThunderbolt } from "react-icons/ai";
import { FaArrowRightLong } from "react-icons/fa6";
import { BannerLineIcon, EditIcon, UpgradeIcon } from "../AllIcons/HomeIcons";
import { Link } from "react-router-dom";
import { UseLangauge } from "@/hooks/UseLangauge";
import { useEmail } from "@/hooks/useEmail";
import { useStatusCheck } from "../common/useStatusCheck";

const Banner = () => {
  const { selectedLanguage } = UseLangauge();
  const { language } = useEmail();
  const { data: status } = useStatusCheck();

  // Static text based on language
  const content = {
    en: {
      title: "Build Your Perfect Resume",
      sub_title: "Smarter, Faster, with AI.",
      description:
        "Professional resumes made easy — create or upgrade with real-time smart suggestions.",
      createResume: "Create your Resume",
      upgradeResume: "Upgrade your Resume",
      usersText: "Loved by over 3 million users",
    },
    de: {
      title: "Erstellen Sie Ihren perfekten Lebenslauf",
      sub_title: "Intelligenter, schneller, mit KI.",
      description:
        "Professionelle Lebensläufe leicht gemacht – erstellen oder aktualisieren Sie sie mit intelligenten Vorschlägen in Echtzeit.",
      createResume: "Lebenslauf erstellen",
      upgradeResume: "Lebenslauf aktualisieren",
      usersText: "Geliebt von über 3 Millionen Nutzern",
    },
  };

  const text = content[language] || content.en; // fallback to English
  const createResumePath =
    status?.has_subscription === false &&
    status?.has_pay_per_download_credits === false
      ? "/price"
      : "/dashboard/create-new-resume";
  const updateResumePath =
    status?.has_subscription === false &&
    status?.has_pay_per_download_credits === false
      ? "/price"
      : "/dashboard/update-existing-resume";

  return (
    <div className="py-10 md:py-16 lg:py-20">
      <div className="flex flex-col gap-6 items-center justify-center text-center">
        <div className="border border-[#d0d6de] hover:border-[#1b461c] duration-300 p-0.5 rounded-full">
          <div className="flex items-center gap-2 p-2 rounded-full border hover:border-[#1b461c] duration-300 text-sm md:text-lg">
            <AiTwotoneThunderbolt />
            {language === "de"
              ? "Intelligentere Lebensläufe. Bessere Jobchancen."
              : "Smarter resumes. Better job prospects."}
            <FaArrowRightLong className="text-2xl bg-dark p-1 rounded-full" />
          </div>
        </div>

        <div className="relative ">
          <div className="text-[24px] md:text-[45px] font-bold w-full">
            {text.title}
            <p className="max-w-[700px] mx-auto w-full">{text.sub_title}</p>
          </div>
          <p className="text-[#EBEBEB] sm:text-lg  md:text-xl  max-w-[600px] py-3 md:py-5 mx-auto w-full">
            {text.description}
          </p>
          {/* Optional: Uncomment if you want the line icon */}
          {/* <span className="absolute top-[45%] left-[88%] md:left-[94%] -translate-x-1/2 -translate-y-1/2">
            <BannerLineIcon />
          </span> */}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-5">
          <Link
            to={createResumePath}
            className="flex items-center gap-2 px-6 py-2 md:py-3 rounded-xl border hover:border-[#1b461c]"
          >
            {text.createResume} <EditIcon />
          </Link>
          <Link
            to={updateResumePath}
            className="flex items-center gap-2 px-6 py-2 md:py-3 rounded-xl border hover:border-[#1b461c]"
          >
            {text.upgradeResume} <UpgradeIcon />
          </Link>
        </div>

        <p className="flex items-center gap-2 p-2 rounded-full border">
          <img src={users} alt="Users" />
          {text.usersText}
        </p>
      </div>

      <div>
        <img
          src={banner}
          alt="Banner"
          className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-xl"
        />
      </div>
    </div>
  );
};

export default Banner;
