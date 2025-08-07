import React from "react";
import {
  AllPackageIcon,
  CDPRIcon,
  CustomerIcon,
  DesignIcon,
  FastCvIcon,
  JobIcon,
  MultilingualIcon,
  TransparentIcon,
  TrustpilotIcon,
} from "../AllIcons/HomeIcons";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useEmail } from "@/hooks/useEmail";
import { useQuery } from "@tanstack/react-query";

const whyChoose = [
  {
    id: 1,
    icon: <JobIcon />,
    title: "Create resumes that get interviews",
    desc: "Backed by data, designed for results",
  },
  {
    id: 2,
    icon: <FastCvIcon />,
    title: "Create resumes that get interviews",
    desc: "Backed by data, designed for results",
  },
  {
    id: 3,
    icon: <CDPRIcon />,
    title: "Create resumes that get interviews",
    desc: "Backed by data, designed for results",
  },
  {
    id: 4,
    icon: <MultilingualIcon />,
    title: "Create resumes that get interviews",
    desc: "Backed by data, designed for results",
  },
  {
    id: 5,
    icon: <TransparentIcon />,
    title: "Create resumes that get interviews",
    desc: "Backed by data, designed for results",
  },
  {
    id: 6,
    icon: <CustomerIcon />,
    title: "Create resumes that get interviews",
    desc: "Backed by data, designed for results",
  },
  {
    id: 7,
    icon: <TrustpilotIcon />,
    title: "Create resumes that get interviews",
    desc: "Backed by data, designed for results",
  },
  {
    id: 8,
    icon: <AllPackageIcon />,
    title: "Create resumes that get interviews",
    desc: "Backed by data, designed for results",
  },
  {
    id: 9,
    icon: <DesignIcon />,
    title: "Create resumes that get interviews",
    desc: "Backed by data, designed for results",
  },
];
const CleverCV = () => {
  const IMG_URL = import.meta.env.VITE_IMG_URL
  const axiosPublic = useAxiosPublic();
const { language } = useEmail();
  const {data} = useQuery({
    queryKey: ['benefits', language],
    queryFn: () => axiosPublic.get('/benefits',{
      params:{lan:language},
    })
  })

  return (
    <div className="pb-6 mt-10 lg:mt-0 md:pb-8 ">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-[24px] md:text-[28px] font-bold">
          Why Choose Clever CV?
        </h1>
        <p className="text-[15px] md:text-base text-[#9B9B9B] pt-1 ">
          Build resumes that get interviews – backed by data, designed for
          results.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4 lg:gap-6">
        {data?.data?.data?.map((item,index) => (
          <div
            key={index}
            className="p-4 rounded-xl border border-[#262626] hover:border hover:border-white duration-300 transition-all transform"
          >
            {console.log(item.logo)}
           <img src={IMG_URL+item.logo} alt="" />
            <h1 className=" font-bold mt-4">{item.title}</h1>
            <p className=" text-[#9B9B9B] text-sm pt-1">{item.sub_title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CleverCV;
