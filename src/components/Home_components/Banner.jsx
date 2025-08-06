import React from "react";
import banner from "@/assets/images/banner.png";
import users from "../../assets/images/users.png";
import { AiTwotoneThunderbolt } from "react-icons/ai";
import { FaArrowRightLong } from "react-icons/fa6";
import { BannerLineIcon, EditIcon, UpgradeIcon } from "../AllIcons/HomeIcons";
import { Link } from "react-router-dom";
import { UseLangauge } from "@/hooks/UseLangauge";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useEmail } from "@/hooks/useEmail";
import { useQuery } from "@tanstack/react-query";
const Banner = () => {
  const { selectedLanguage } = UseLangauge();
  const IMG_URL = import.meta.env.VITE_IMG_URL;
  const axiosPublic = useAxiosPublic();
  const { language } = useEmail();
  const { data } = useQuery({
    queryKey: ["hero", language], // important: include language in key for refetch
    queryFn: () =>
      axiosPublic.get("/hero-section", {
        params: { lan: language },
      }),
  });
  console.log(data?.data?.data);
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
          <h1 className="text-[24px]  md:text-[45px]  font-bold w-full ">
            Build Your Perfect{" "}
            <span className="italic font-semibold font-Playfair">Resume</span>{" "}
            <br /> Smarter, Faster, with AI.
          </h1>

          <span className="absolute top-[45%]  xxs:left-[99%]  left-[88%] md:left-[94%]     xlg:left-[94%] -translate-x-1/2 -translate-y-1/2">
            <BannerLineIcon />
          </span>
        </div>

        <p className="max-w-[700px]  text-primary ">
          {data?.data?.data?.sub_title}
        </p>
        <div className="flex flex-col md:flex-row items-center gap-5">
          <Link
            to={"/dashboard/create-new-resume"}
            className="flex items-center gap-2 px-6 py-2 md:py-3  rounded-xl border hover:border-[#1b461c]"
          >
            Create your Resume <EditIcon />
          </Link>
          <Link
            to={"dashboard/update-existing-resume"}
            className="flex items-center gap-2 px-6 py-2  md:py-3  rounded-xl border hover:border-[#1b461c]"
          >
            Upgrade your Resume
            <UpgradeIcon />
          </Link>
        </div>
        <p className="flex items-center gap-2 p-2 rounded-full border">
          {" "}
          <img src={users} alt="" />
          Loved by over 3 million users
        </p>
      </div>
      <div className="">
        <img
          src={IMG_URL + data?.data?.data?.banner}
          alt="Banner"
          className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-xl"
        />
      </div>
    </div>
  );
};

export default Banner;
