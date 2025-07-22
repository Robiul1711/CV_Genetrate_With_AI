import React from "react";
import {
  Application,
  Assistant,
  CreateIcon,
  Multilingual,
  Optimizer,
  ResumeUpdate,
  UpgradeIcon,
} from "../AllIcons/HomeIcons";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useEmail } from "@/hooks/useEmail";

const OurFeatures = () => {
  const IMG_URL = import.meta.env.VITE_IMG_URL;
  const axiosPublic=useAxiosPublic();
  const { language } = useEmail();
    const { data } = useQuery({
    queryKey: ['ourFeatures', language], // important: include language in key for refetch
    queryFn: () =>
      axiosPublic.get('/features', {
        params: { lan: language },
      }),
  });


  return (
    <div className="py-12 md:py-16 lg:py-24 xl:py-28">
      <div className="flex items-center justify-center">
        <p className="flex items-center gap-2 text-[25px] md:text-3xl font-medium">
          <UpgradeIcon />
          Our Features
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 mt-10 md:mt-16">
        {data?.data?.data?.map((item) => (
          <div
            key={item.id}
            className="bg-[#0E0E10] rounded-[32px] p-6  hover:border border border-transparent hover:border-white duration-300 transition-all transform"
          >
       <img src={IMG_URL+item.logo} className="border rounded-xl lg:rounded-2xl xl:rounded-3xl p-2.5 inline-block" alt="" />
            <h1 className="text-lg md:text-xl font-medium pt-4 xl:pt-16">
              {item.title}
            </h1>
            <p className="text-[13px] md:text-base text-[#9B9B9B] pt-2">
              {item.short_description}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex max-w-[840px] mx-auto items-center justify-center text-center flex-col">
        <div className="bg-[#0E0E10] relative rounded-[32px] p-6 md:p-10 w-full hover:border border border-transparent hover:border-white duration-300 transition-all transform">
          <button className="absolute  text-[13px] md:text-sm font-light top-0 right-1 py-2 px-3  bg-[#131316] rounded-[32px]">
            Comming Soon
          </button>
          <span className="border rounded-xl lg:rounded-2xl xl:rounded-3xl p-2.5 md:p-4 inline-block">
            <Assistant />
          </span>
          <h1 className="text-lg md:text-3xl font-medium pt-6 md:pt-8 lg:pt-8 xl:pt-16">
            Interview Coach
          </h1>
          <p className="text-[13px] md:text-lg  text-[#9B9B9B] pt-2 max-w-[840px]  mx-auto">
            Practice with AI-powered mock interviews. Master your interview
            skills with personalized AI feedback. Get ready for your dream job
            with realistic practice sessions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center mt-8">
            <input
              type="email"
              placeholder="Your Email"
              className="bg-[#0E0E10] text-white placeholder-gray-400 px-6 py-2.5 md:py-3 text-sm md:text-base rounded-lg border w-full sm:max-w-sm focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200"
            />
            <button className="font-medium px-5 md:px-7 py-2 md:py-3 text-sm md:text-base rounded-lg bg-white text-dark border border-white hover:bg-gray-200 transition-colors duration-200">
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurFeatures;
