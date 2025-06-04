import React, { useState } from "react";
import Title from "@/components/common/Title";
import Step1 from "@/components/createResumeComponents/Step1";
import Step2 from "@/components/createResumeComponents/Step2";
import Step3 from "@/components/createResumeComponents/Step3";
import Step4 from "@/components/createResumeComponents/Step4";
import Step5 from "@/components/createResumeComponents/Step5";
import Step6 from "@/components/createResumeComponents/Step6";
import Step7 from "@/components/createResumeComponents/Step7";
import Step8 from "@/components/createResumeComponents/Step8";
import Step9 from "@/components/createResumeComponents/Step9";
import AddEducation from "@/components/createResumeComponents/AddEducation";
import AddLangauge from "@/components/createResumeComponents/AddLangauge";
import AddCourse from "@/components/createResumeComponents/AddCourse";
import Tailor_Modal from "@/components/createResumeComponents/Tailor_Modal";
import Generating_Modal from "@/components/createResumeComponents/Generating_Modal";
import AddWork from "@/components/createResumeComponents/AddWork";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";
import StepProgressBar from "@/components/common/StepProgressBar";

const CreateNewResume = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: "Choose Your Goal", component: <Step1 /> },
    { label: "Personal Info", component: <Step2 /> },
    {
      label: "Experience",
      component: (
        <>
          <Step3 />
          {/* <AddWork /> */}
        </>
      ),
    },
    {
      label: "Education",
      component: (
        <>
          <Step4 />
          {/* <AddEducation /> */}
        </>
      ),
    },
    { label: "Skills", component: <Step5 /> },
    {
      label: "Languages",
      component: (
        <>
          <Step6 />
          {/* <AddLangauge /> */}
        </>
      ),
    },
    {
      label: "Certificate / Train",
      component: (
        <>
          <Step7 />
          {/* <AddCourse /> */}
        </>
      ),
    },
    {
      label: "Choose Resume",
      component: (
        <Step8 activeStep={activeStep} setActiveStep={setActiveStep} />
      ),
    },
    {
      label: "Preview & Download",
      component: (
        <>
          <Step9 />
          {/* <Tailor_Modal /> */}
          {/* <Generating_Modal /> */}
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
        <Title level="title32">Create New Resume</Title>
        <Title level="title22">
          Build your resume step-by-step with AI assistance
        </Title>
      </div>

      {/* Step Progress Bar */}
      <StepProgressBar
        steps={steps.map((step) => step.label)}
        currentStep={activeStep + 1} // 1-based index
      />

      {/* Current Step Content */}
      <div className="mt-8">{steps[activeStep].component}</div>

      {/* Navigation Buttons */}
      <div className="flex max-w-6xl w-full mx-auto justify-between items-center mt-10">
        <button
          className="font-semibold border border-white text-white md:py-4 md:px-16 px-8 py-2 text-lg rounded-md hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Back
        </button>
        {activeStep === 6 ? (
          <Tailor_Modal activeStep={activeStep} setActiveStep={setActiveStep} />
        ) : (
          <button
            className={`font-semibold border-white  bg-white text-black  ${
              activeStep === steps.length - 1
                ? ""
                : "md:py-4 md:px-16 px-8 py-2  "
            }text-lg rounded-md hover:bg-[#69CA6A] hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={handleNext}
            // disabled={activeStep >= steps.length - 1}
          >
            {activeStep === steps.length - 1 ? (
              <Link
                to="/dashboard/edit-resume"
                className={`flex items-center gap-2  ${
                  activeStep === steps.length - 1
                    ? "md:py-4 md:px-16 px-8 py-2"
                    : ""
                }`}
              >
                <Edit size={18} /> Edit Resume
              </Link>
            ) : activeStep === 6 ? (
              "Generate Resume With AI"
            ) : activeStep === 7 || activeStep === 8 ? (
              "Generating Resume..."
            ) : (
              "Next"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateNewResume;
