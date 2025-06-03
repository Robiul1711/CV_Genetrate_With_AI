import React from "react";
import {
  Application,
  Assistant,
  CoachIcon,
  CreateIcon,
  Multilingual,
  Optimizer,
  ResumeUpdate,
  UpgradeIcon,
} from "../AllIcons/HomeIcons";
import { icons } from "lucide-react";

const data = [
  {
    id: 1,
    icons: <ResumeUpdate />,
    title: "AI Resume Builder",
    desc: "Start from zero and build a job-winning resume in minutes—guided by AI, personalized for your goals, and tailored to the job market.",
  },
  {
    id: 2,
    icons: <CreateIcon />,
    title: "AI Resume Builder",
    desc: "Start from zero and build a job-winning resume in minutes—guided by AI, personalized for your goals, and tailored to the job market.",
  },
  {
    id: 3,
    icons: <Optimizer />,
    title: "AI Resume Builder",
    desc: "Start from zero and build a job-winning resume in minutes—guided by AI, personalized for your goals, and tailored to the job market.",
  },
  {
    id: 4,
    icons: <Multilingual />,
    title: "AI Resume Builder",
    desc: "Start from zero and build a job-winning resume in minutes—guided by AI, personalized for your goals, and tailored to the job market.",
  },
  {
    id: 5,
    icons: <Application />,
    title: "AI Resume Builder",
    desc: "Start from zero and build a job-winning resume in minutes—guided by AI, personalized for your goals, and tailored to the job market.",
  },
  {
    id: 6,
    icons: <Assistant />,
    title: "AI Resume Builder",
    desc: "Start from zero and build a job-winning resume in minutes—guided by AI, personalized for your goals, and tailored to the job market.",
  },
];
const OurFeatures = () => {
  return (
    <div className="py-12 md:py-16 lg:py-24 xl:py-28">
      <div className="flex items-center justify-center">
        <p className="flex items-center gap-2 text-3xl font-medium">
          <UpgradeIcon />
          Our Features
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 md:mt-16">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-[#0E0E10] rounded-[32px] p-6 md:p-10 "
          >
            <span className="border rounded-2xl md:rounded-3xl p-4 md:p-6 inline-block">
              {item.icons}
            </span>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-medium pt-6 md:pt-8 lg:pt-12 xl:pt-20">
              {item.title}
            </h1>
            <p className="sm:text-xl lg:text-2xl text-[#9B9B9B] pt-2">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-center text-center flex-col">
        <div className="bg-[#0E0E10] rounded-[32px] p-6 md:p-10 w-full ">
          <span className="border rounded-3xl p-6 inline-block">
            <Assistant />
          </span>
          <h1 className="text-xl md:text-3xl font-medium pt-6 md:pt-8 lg:pt-12 xl:pt-20">
            Interview Coach
          </h1>
          <p className="text-lg md:text-2xl text-[#9B9B9B] pt-2 max-w-[840px]  mx-auto">
            Practice with AI-powered mock interviews. Master your interview
            skills with personalized AI feedback. Get ready for your dream job
            with realistic practice sessions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center mt-8">
            <input
              type="email"
              placeholder="Your Email"
              className="bg-[#0E0E10] text-white placeholder-gray-400 px-6 py-3 text-sm md:text-base rounded-lg border w-full sm:max-w-sm focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200"
            />
            <button className="font-medium px-5 md:px-7 py-2.5 md:py-3 text-sm md:text-base rounded-lg bg-white text-dark border border-white hover:bg-gray-200 transition-colors duration-200">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurFeatures;
