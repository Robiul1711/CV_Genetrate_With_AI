import React from "react";
import starBG from "../../assets/images/starBG.png";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEmail } from "@/hooks/useEmail";
import useAxiosPublic from "@/hooks/useAxiosPublic";

const ReadyToLand = () => {
  const axiosPublic = useAxiosPublic();
  const {  language } = useEmail();
    const { data, isLoading, error } = useQuery({
    queryKey: ['global-cta', language],
    queryFn: () => axiosPublic.get('/global-cta', {
      params: { lan: language },
    })
  });
  const cta = data?.data?.data
  return (
    <div className="relative pb-28 h-[360px] md:h-[300px]  overflow-hidden">
      {/* Background Image */}
      <img
        src={starBG}
        alt="Stars Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Content Overlay */}
      <div className="absolute top-1/2 left-1/2 w-full max-w-5xl p-5 -translate-x-1/2 -translate-y-1/2 text-center flex flex-col items-center z-10">
        <h1 className="text-[24px] md:text-[28px]  font-bold leading-snug text-white">
          {cta?.title}
        </h1>
        <p className="text-[15px] md:text-base text-[#9B9B9B] pt-4 max-w-2xl">
          {cta?.description}
        </p>
        <div className="flex items-center gap-5">
          <Link
            to="/dashboard/create-new-resume"
            className="mt-10 px-6  py-3  rounded-xl text-sm md:text-base border border-[#81FB84]/20 text-white hover:bg-white hover:text-dark transition-all duration-300 font-medium"
          >
            {cta?.button_text}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReadyToLand;
