import React, { useState } from "react";
import Title from "@/components/common/Title";
import { FaAngleLeft } from "react-icons/fa6";
import resume from "../../assets/images/resume.png";
import StepOne from "@/components/Edit_Resume_Components/StepOne";
import StepTwo from "@/components/Edit_Resume_Components/StepTwo";
import StepThree from "@/components/Edit_Resume_Components/StepThree";
import StepFour from "@/components/Edit_Resume_Components/StepFour";
import StepFive from "@/components/Edit_Resume_Components/StepFive";
import StepSix from "@/components/Edit_Resume_Components/StepSix";
import { Link } from "react-router-dom";

const steps = [
  { title: "Personal Info", component: <StepOne /> },
  { title: "Experience", component: <StepTwo /> },
  { title: "Education", component: <StepThree /> },
  { title: "Skill", component: <StepFour /> },
  { title: "Language", component: <StepFive /> },
  { title: "Train", component: <StepSix /> },
];

const EditResumePage = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div>
      <Link to={"/dashboard/create-New-resume"} className="flex items-center gap-2">
        <FaAngleLeft className="cursor-pointer text-3xl p-1 border border-white/30 rounded-full" />
        <Title level="title32">Edit Resume</Title>
      </Link>

      <Title level="title22" className="mt-2">
        Let AI help improve your resume content.
      </Title>

      <div className="md:mt-10 mt-5 flex flex-col md:flex-row gap-5 md:gap-10 justify-between">
        {/* Left Image */}
        <div className="md:w-1/2">
          <img src={resume} alt="resume" />
        </div>

        {/* Right Content */}
        <div className="md:w-1/2">
          {/* Top buttons */}
          <div className="lg:p-6 p-3 rounded-xl bg-[#0E0E10] flex items-center justify-center gap-6 border border-[#262626]">
            <button className="font-semibold border w-full border-white/10 text-white md:py-4  px-2 py-2 text-lg rounded-md bg-linearbg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              Edit Content
            </button>
            <Link to={"/dashboard/edit-design"} className="font-semibold border text-center w-full border-white/10 text-white md:py-4  px-2 py-2 text-lg rounded-md  hover:bg-linearbg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              Design
            </Link>
          </div>

          {/* Step Nav */}
          <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-0   sm:justify-between border-b ">
            {steps.map((step, index) => (
              <Title
                key={index}
                level="title14"
                className={`cursor-pointer pb-1 border-b-2  ${
                  activeStep === index
                    ? "border-[#fff] text-white bg-linearbg"
                    : "border-transparent text-white/70"
                }`}
                onClick={() => setActiveStep(index)}
              >
                {step.title}
              </Title>
            ))}
          </div>

          {/* Active Step */}
          <div className="mt-10">
            {steps[activeStep].component}

            <button className="font-semibold border bg-white mt-4 md:mt-8 w-full border-white/30 text-black md:py-4 md:px-16 px-8 py-2 text-lg rounded-md hover:bg-black hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditResumePage;
