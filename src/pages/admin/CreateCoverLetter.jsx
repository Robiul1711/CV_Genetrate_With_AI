import React, { useState } from "react";
import Title from "@/components/common/Title";
import StepProgressBar from "@/components/common/StepProgressBar";
import Step_1 from "@/components/CreateCoverLetterComponents/Step_1";
import Step_2 from "@/components/CreateCoverLetterComponents/Step_2";
import Step_3 from "@/components/CreateCoverLetterComponents/Step_3";
import Step_4 from "@/components/CreateCoverLetterComponents/Step_4";
import Step_5 from "@/components/CreateCoverLetterComponents/Step_5";
import Step_6 from "@/components/CreateCoverLetterComponents/Step_6";
import AddAnotherCourses from "@/components/CreateCoverLetterComponents/AddAnotherCourses";
import { FormProvider, useForm } from "react-hook-form";
import { useResume } from "@/providers/ResumeContext";

const steps = [
  { label: "Basic Information", component: <Step_1 /> },
  { label: "Job Application Details", component: <Step_2 /> },
  { label: "Upload Resume", component: <Step_3 /> },
  { label: "Why You’re a Good Fit", component: <Step_4 /> },
  { label: "Language", component: <Step_5 /> },
  { label: "Tailor Your Document’s Voice", component: <AddAnotherCourses /> },
  { label: "Preview & Download", component: <Step_6 /> },
];

const CreateCoverLetter = () => {
  const methods = useForm({ mode: "onChange" });
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (!isValid) return;
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  return (
    <FormProvider {...methods}>
      <div>
        {/* Header */}
        <div className="flex flex-col gap-2">
          <p className="flex items-center gap-2">
            <Title level="title32">Create AI-Powered Cover Letter</Title>
          </p>
          <Title level="title22">
            Get a professionally tailored cover letter aligned with your resume and target job market — generated in seconds.
          </Title>
        </div>

        {/* Step Progress Bar */}
        <StepProgressBar
          steps={steps.map((step) => step.label)}
          currentStep={activeStep + 1}
        />

        {/* Current Step Content */}
        <div>{steps[activeStep].component}</div>

        {/* Navigation Buttons */}
        <div className="flex flex-wrap gap-2 max-w-6xl w-full mx-auto justify-between items-center mt-6">
          {activeStep !== 0 ? (
            <button
              type="button"
              className={`font-semibold text-white text-xs rounded-md hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                activeStep === steps.length - 1 ? "" : "px-8 py-2 border border-white"
              }`}
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {activeStep === steps.length - 1 ? "" : "Back"}
            </button>
          ) : (
            <div />
          )}

          {activeStep < steps.length - 1 && (
            <button
              type="button"
              className="font-semibold border-white bg-white text-black px-8 py-2 text-xs rounded-md hover:bg-[#69CA6A] hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleNext}
            >
              {activeStep === 5 ? "Combine & Continue" : "Next"}
            </button>
          )}
        </div>
      </div>
    </FormProvider>
  );
};

export default CreateCoverLetter;
