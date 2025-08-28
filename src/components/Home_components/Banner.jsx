import React from "react";
import banner from "@/assets/images/banner.png";
import users from "../../assets/images/users.png";
import { AiTwotoneThunderbolt } from "react-icons/ai";
import { FaArrowRightLong } from "react-icons/fa6";
import { BannerLineIcon, EditIcon, UpgradeIcon } from "../AllIcons/HomeIcons";
import { Link } from "react-router-dom";
import { UseLangauge } from "@/hooks/UseLangauge";
import { useEmail } from "@/hooks/useEmail";

const Banner = () => {
  const { selectedLanguage } = UseLangauge();
  const { language } = useEmail();

  // Static text based on language
  const content = {
    en: {
      title: "Build Your Perfect Resume",
      sub_title: "Smarter, Faster, with AI to land your dream job.",
      createResume: "Create your Resume",
      upgradeResume: "Upgrade your Resume",
      usersText: "Loved by over 3 million users",
    },
    de: {
      title: "Erstellen Sie Ihren perfekten Lebenslauf",
      sub_title:
        "Schneller, intelligenter, mit KI, um Ihren Traumjob zu bekommen.",
      createResume: "Lebenslauf erstellen",
      upgradeResume: "Lebenslauf aktualisieren",
      usersText: "Geliebt von über 3 Millionen Nutzern",
    },
  };

  const text = content[language] || content.en; // fallback to English

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

        <div className="relative">
          <h1 className="text-[24px] md:text-[45px] font-bold w-full">
            {text.title}
          </h1>
          {/* Optional: Uncomment if you want the line icon */}
          {/* <span className="absolute top-[45%] left-[88%] md:left-[94%] -translate-x-1/2 -translate-y-1/2">
            <BannerLineIcon />
          </span> */}
        </div>

        <p className="max-w-[700px] text-primary">{text.sub_title}</p>

        <div className="flex flex-col md:flex-row items-center gap-5">
          <Link
            to={"/dashboard/create-new-resume"}
            className="flex items-center gap-2 px-6 py-2 md:py-3 rounded-xl border hover:border-[#1b461c]"
          >
            {text.createResume} <EditIcon />
          </Link>
          <Link
            to={"/dashboard/update-existing-resume"}
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
