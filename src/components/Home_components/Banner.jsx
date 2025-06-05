import React from "react";
import banner from "../../assets/images/banner.png";
import users from "../../assets/images/users.png";
import { AiTwotoneThunderbolt } from "react-icons/ai";
import { FaArrowRightLong } from "react-icons/fa6";
import { BannerLineIcon, EditIcon, UpgradeIcon } from "../AllIcons/HomeIcons";
import { Link } from "react-router-dom";
import { UseLangauge } from "@/hooks/UseLangauge";
const Banner = () => {
  const {selectedLanguage}=UseLangauge();

  return (
    <div className="py-10 md:py-16 lg:py-20">
      <div className="flex flex-col gap-6 items-center justify-center  text-center">
        <div className="border border-[#d0d6de] hover:border-[#1b461c] duration-300 p-0.5 rounded-full">
          <div className="flex items-center gap-2 p-2 rounded-full border hover:border-[#1b461c] duration-300 text-sm md:text-lg">
            <AiTwotoneThunderbolt />
            Smarter resumes. Better job prospects.
            <FaArrowRightLong className="text-2xl bg-dark p-1 rounded-full" />
          </div>
        </div>
        <div className="relative">
          <h1 className="text-[24px] md:text-[46px] lg:text-[55px] xl:text-[68px] font-bold w-full max-w-[956px]">
            Build Your Perfect{" "}
            <span className="italic font-semibold font-Playfair">Resume</span>{" "}
            Smarter, Faster, with AI.
          </h1>
          {
            selectedLanguage === "en" ? (
              <span className="absolute top-[45%] left-[82%] xmd:left-[65%] hidden xs:block xxs:hidden md:block lg:left-[82%] -translate-x-1/2 -translate-y-1/2">
                <BannerLineIcon />
              </span>
            ) : (
              null
            )
          }
      
        </div>

        <p className="max-w-[600px] md:text-xl text-primary ">
          Professional resumes made easy — create or upgrade with real-time
          smart suggestions.
        </p>
        <div className="flex flex-col md:flex-row items-center gap-5">
          <Link to={"/dashboard/create-new-resume"} className="flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl border hover:border-[#1b461c]">
            Create your Resume <EditIcon />
          </Link>
          <Link to={"dashboard/update-existing-resume"} className="flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl border hover:border-[#1b461c]">
           Upgrade your Resume<UpgradeIcon />
          </Link>
        </div>
        <p className="flex items-center gap-2 p-2 rounded-full border">
          {" "}
          <img src={users} alt="" />
          Loved by over 3 million users
        </p>
      </div>
      <div className="">
        <img src={banner} alt="" className="w-full" />
      </div>
    </div>
  );
};

export default Banner;
