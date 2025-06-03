import React from "react";
import plan1 from "../../assets/images/plan1.png";
import plan2 from "../../assets/images/plan2.png";
import plan3 from "../../assets/images/plan3.png";
import plan4 from "../../assets/images/plan4.png";
import { DotIcon } from "../AllIcons/HomeIcons";

const planOne = [
  {
    plan: "Choose Your Path.",
    title: "Start from scratch or upload your existing resume.",
    detail:
      "The AI instantly generates a resume and/or cover letter tailored to your industry and the job market. You get 3–5 design variants to choose from, each editable.",
    list: [
      "AI Resume Builder (Create from zero)",
      "AI Cover Letter Generator",
      "AI Resume Optimizer (Upload & improve)",
    ],
    img: plan1,
  },
];
const planTwo = [
  {
    plan: "Fill In Your Details.",
    title: "Simple, guided steps tailored to your job goals.",
    detail:
      "Fill out a guided form with your work experience, education, and career goals—or let the AI extract this automatically from your uploaded resume.",
    list: [
      "You can also enter a target job title or company to personalize the tone and style of your application.",
      "Add multiple languages to create localized versions of your resume in seconds.",
    ],
    img: plan2,
  },
];
const planThree = [
  {
    plan: "AI Builds & Designs Your Resume..",
    title: "Watch AI turn your data into a job-winning document.",
    detail:
      "Fill out a guided form with your work experience, education, and career goals—or let the AI extract this automatically from your uploaded resume.",
    list: [
      "Customize colors, fonts, and layout",
      "Edit any text live",
      "Translate into other languages",
    ],
    img: plan3,
  },
];
const planFour = [
  {
    plan: "Download your Resume or Cover letter.",
    title: "Export bundle everything into one file",
    detail:
      "Once satisfied, download your resume and cover letter in PDF or Word format. You can even generate a complete application package including",
    list: ["Resume", "Cover Letter"],
    img: plan4,
  },
];

const HowItWorks = () => {
  return (
    <div className="">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-[28px] md:text-[48px] font-bold">How It Works</h1>
        <p className="md:text-xl text-[#9B9B9B] pt-2 ">
          Next generation no-code. Beyond natural language. Why type when you
          can click?
        </p>
      </div>

      <div className="mt-8 md:mt-16 space-y-20">
        <div>
          {planOne.map((item, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row justify-between w-full items-center gap-12"
            >
              <div className="w-full lg:w-1/2 ">
                <div className="relative">
                  <div className="absolute bottom-0 left-0 w-full h-[100px] md:h-[150px] bg-banner rounded-2xl"></div>
                  <img
                    src={item.img}
                    alt="Plan illustration"
                    className="w-full border border-[#171718] rounded-2xl"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="inline-flex items-center justify-center w-12 h-12 text-2xl md:text-3xl font-medium border border-[#81FB84]/20 rounded-full">
                      {index + 1}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-medium">
                      {item.plan}
                    </h2>
                  </div>
                  <p className="text-[20px] md:text-[28px] text-[#F1F1F1] pt-2">
                    {item.title}
                  </p>
                  <p className="text-lg md:text-xl text-[#9B9B9B] pt-4">
                    {item.detail}
                  </p>
                  <ul className="md:text-xl text-[#F1F1F1] pt-4 space-y-2">
                    {item.list.map((listItem, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <DotIcon /> {listItem}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="flex items-center gap-2 px-6 md:px-8 py-2 md:py-4 rounded-lg mt-8 md:mt-10 border">
                  Get Started Now
                </button>
              </div>
            </div>
          ))}
        </div>
        <div>
          {planTwo.map((item, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row justify-between w-full items-center gap-12"
            >
              <div className="w-full lg:w-1/2">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="inline-flex items-center justify-center w-12 h-12 text-2xl md:text-3xl font-medium border border-[#81FB84]/20 rounded-full">
                      {index + 2}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-medium">
                      {item.plan}
                    </h2>
                  </div>
                  <p className="text-[20px] md:text-[28px] text-[#F1F1F1] pt-2">
                    {item.title}
                  </p>
                  <p className="text-lg md:text-xl text-[#9B9B9B] pt-4">
                    {item.detail}
                  </p>
                  <ul className="md:text-xl text-[#F1F1F1] pt-4 space-y-2">
                    {item.list.map((listItem, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <DotIcon /> {listItem}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="flex items-center gap-2 px-6 md:px-8 py-2 md:py-4 rounded-lg mt-8 md:mt-10  border">
                  Get Started Now
                </button>
              </div>
              <div className="w-full lg:w-1/2 ">
                <div className="relative">
                  <div className="absolute bottom-0 left-0 w-full h-[100px] md:h-[150px] bg-banner rounded-2xl"></div>
                  <img
                    src={item.img}
                    alt="Plan illustration"
                    className="w-full border border-[#171718] rounded-2xl"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          {planThree.map((item, index) => (
            <div
              key={index}
              className="flex flex-col-reverse lg:flex-row justify-between w-full items-center gap-12"
            >
              <div className="w-full lg:w-1/2 ">
                <div className="relative">
                  <div className="absolute bottom-0 left-0 w-full h-[100px] md:h-[150px] bg-banner rounded-2xl"></div>
                  <img
                    src={item.img}
                    alt="Plan illustration"
                    className="w-full border border-[#171718] rounded-2xl"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="inline-flex items-center justify-center  w-[55px] sm:w-12 h-12 text-2xl md:text-3xl font-medium border border-[#81FB84]/20 rounded-full">
                      {index + 3}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-medium">
                      {item.plan}
                    </h2>
                  </div>
                  <p className=" text-[20px] md:text-[28px] text-[#F1F1F1] pt-2">
                    {item.title}
                  </p>
                  <p className="text-lg md:text-xl text-[#9B9B9B] pt-4">
                    {item.detail}
                  </p>
                  <ul className="  md:text-xl text-[#F1F1F1] pt-4 space-y-2">
                    {item.list.map((listItem, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <DotIcon /> {listItem}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="flex items-center gap-2 px-6 md:px-8 py-2 md:py-4 rounded-lg mt-8 md:mt-10  border">
                  Get Started Now
                </button>
              </div>
            </div>
          ))}
        </div>
        <div>
          {planFour.map((item, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row justify-between w-full items-center gap-12"
            >
              <div className="w-full lg:w-1/2">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="inline-flex items-center justify-center w-[62px] sm:w-12 h-12 text-2xl md:text-3xl font-medium border border-[#81FB84]/20 rounded-full">
                      {index + 4}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-medium">
                      {item.plan}
                    </h2>
                  </div>
                  <p className="text-[20px] md:text-[28px] text-[#F1F1F1] pt-2">
                    {item.title}
                  </p>
                  <p className="text-lg md:text-xl text-[#9B9B9B] pt-4">
                    {item.detail}
                  </p>
                  <ul className="md:text-xl text-[#F1F1F1] pt-4 space-y-2">
                    {item.list.map((listItem, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <DotIcon /> {listItem}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="flex items-center gap-2 px-6 md:px-8 py-2 md:py-4 rounded-lg mt-8 md:mt-10  border">
                  Get Started Now
                </button>
              </div>
              <div className="w-full lg:w-1/2 ">
                <div className="relative">
                  <div className="absolute bottom-0 left-0 w-full h-[100px] md:h-[150px] bg-banner rounded-2xl"></div>
                  <img
                    src={item.img}
                    alt="Plan illustration"
                    className="w-full border border-[#171718] rounded-2xl"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
