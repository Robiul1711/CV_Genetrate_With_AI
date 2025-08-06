import React from "react";

import { DotIcon } from "../AllIcons/HomeIcons";
import { Link } from "react-router-dom";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useEmail } from "@/hooks/useEmail";
import { useQuery } from "@tanstack/react-query";


const HowItWorks = () => {
  const IMG_URL = import.meta.env.VITE_IMG_URL;
  const axiosPublic = useAxiosPublic();
  const { language } = useEmail();

  const { data } = useQuery({
    queryKey: ["how-it-works", language],
    queryFn: () =>
      axiosPublic.get("/how-it-works", {
        params: { lan: language },
      }),
  });

  const apiSteps = data?.data?.data || [];

  // Merge API steps with fallback steps
  const steps = [...apiSteps];

  return (
    <div className="py-10">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-[25px] md:text-[28px] font-bold">How It Works</h1>
        <p className="text-[15px] text-[#9B9B9B] pt-1 max-w-2xl">
          Next generation no-code. Beyond natural language. Why type when you
          can click?
        </p>
      </div>

      <div className="mt-12 md:mt-20 space-y-20">
        {steps.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              index % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"
            } justify-between items-center gap-6 md:gap-16`}
          >
            {/* Left or Right Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div className="absolute bottom-0 left-0 w-full h-[100px] md:h-[150px] bg-banner rounded-2xl"></div>
                <img
                  src={item.side_image ? IMG_URL + item.side_image : item.img}
                  alt="Plan illustration"
                  className="w-full border border-[#171718] rounded-2xl p-6 md:p-10 relative z-10"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="w-full lg:w-1/2">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="inline-flex items-center justify-center size-10 text-base md:text-xl font-medium border border-[#81FB84]/20 rounded-full">
                    {index + 1}
                  </span>
                  <h2 className="text-[22px] md:text-3xl font-medium">
                    {item.plan || item.title}
                  </h2>
                </div>
                <p className="text-[16px] md:text-[20px] text-[#F1F1F1] pt-2">
                  {item.title}
                </p>
                <p className="text-[15px] md:text-base text-[#9B9B9B] pt-4">
                  {item.detail || item.short_description}
                </p>
                <ul className="md:text-xl text-[#F1F1F1] pt-4 space-y-2">
                  {(item.list || item.features || []).map((listItem, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm">
                      <DotIcon /> {listItem}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to={`/sign-in`}
                className="text-[15px] md:text-base inline-block items-center gap-2 px-6 py-2 md:py-3 rounded-lg mt-8 md:mt-10 border hover:border-[#1b461c]"
              >
                Get Started Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
