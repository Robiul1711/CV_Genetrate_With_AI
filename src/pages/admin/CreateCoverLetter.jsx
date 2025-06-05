import React, { useState } from "react";
import Title from "@/components/common/Title";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";
import StepProgressBar from "@/components/common/StepProgressBar";
import Step_2 from "@/components/CreateCoverLetterComponents/Step_2";
import Step_3 from "@/components/CreateCoverLetterComponents/Step_3";
import Step_4 from "@/components/CreateCoverLetterComponents/Step_4";
import Step_5 from "@/components/CreateCoverLetterComponents/Step_5";
import Step_6 from "@/components/CreateCoverLetterComponents/Step_6";
import Step_1 from "@/components/CreateCoverLetterComponents/Step_1";
import { FaAngleLeft } from "react-icons/fa6";
import Tailor_Modal from "@/components/createResumeComponents/Tailor_Modal";
import Tailor_Modal2 from "@/components/createResumeComponents/Tailor_Modal2";

const CreateCoverLetter = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: "Basic Information", component: <Step_1 /> },
    { label: "Job Application Details", component: <Step_2 /> },
    {
      label: "Upload Resume",
      component: (
        <>
          <Step_3 />
        </>
      ),
    },
    {
      label: "Why You’re a Good Fit",
      component: (
        <>
          <Step_4 />
        </>
      ),
    },
    { label: "Language", component: <Step_5 /> },
    {
      label: " Preview & Download",
      component: (
        <>
          <Step_6 />
        </>
      ),
    },
  ];

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-2">
        <Link to={"/dashboard/edit-resume"} className="flex items-center gap-2">
          {activeStep === steps.length - 1 && (
            <FaAngleLeft className="cursor-pointer text-3xl p-1 border border-white/30 rounded-full" />
          )}

          <Title level="title32">Create AI-Powered Cover Letter</Title>
        </Link>
        <Title level="title22">
          Get a professionally tailored cover letter aligned with your resume
          and the German job market — generated in seconds.
        </Title>
      </div>

      {/* Step Progress Bar */}
      <StepProgressBar
        steps={steps.map((step) => step.label)}
        currentStep={activeStep + 1} // 1-based index
      />

      {/* Current Step Content */}
      <div className="">{steps[activeStep].component}</div>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap gap-2 max-w-6xl w-full mx-auto justify-between items-center mt-6">
        {
          activeStep !==0 ?
        <button
          className={`font-semibold  text-white  text-lg rounded-md hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed  ${
            activeStep === steps.length - 1
              ? " "
              : " px-8 py-2 border border-white"
          }`}
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          {activeStep === steps.length - 1 ? "" : "Back"}
        </button>
        :
        <div/>

        }
{
  activeStep===4 ?
   <Tailor_Modal2 activeStep={activeStep} setActiveStep={setActiveStep} />
   : 
        <button
          className={`font-semibold border-white bg-white text-black ${
            activeStep === steps.length - 1 ? "" : " px-8 py-2"
          } text-lg rounded-md hover:bg-[#69CA6A] hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
          onClick={handleNext}
          disabled={activeStep >= steps.length - 1}
        >
          {activeStep === steps.length - 1
            ? ""
            : activeStep === 4
            ? "Combine & Continue"
            : "Next"}
        </button>
}
      </div>
    </div>
  );
};

export default CreateCoverLetter;
