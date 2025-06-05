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
  return (
    <div className="pb-12 mt-10 lg:mt-0 md:pb-8 ">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-[28px]  font-bold">
          Why Choose Clever CV?
        </h1>
        <p className=" text-[#9B9B9B] pt-1 ">
          Build resumes that get interviews – backed by data, designed for
          results.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4 lg:gap-6">
        {whyChoose.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl border border-[#262626] hover:border hover:border-white duration-300 transition-all transform"
          >
            <span>{item.icon}</span>
            <h1 className=" font-bold mt-4">
              {item.title}
            </h1>
            <p className=" text-[#9B9B9B] text-sm pt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CleverCV;
