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
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";
import StepProgressBar from "@/components/common/StepProgressBar";
import { useForm, FormProvider } from "react-hook-form";
import SelectLangaugeStep from "@/components/createResumeComponents/SelectLangaugeStep";

const CreateNewResume = () => {
  const methods = useForm({
    mode: "onChange",
  });

  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: "Choose Your Goal", component: <Step1 /> },
    { label: "Personal Info", component: <Step2 /> },
    {
      label: "Experience",
      component: <Step3 />,
    },
    {
      label: "Education",
      component: <Step4 />,
    },
    { label: "Skills", component: <Step5 /> },
    {
      label: "Languages Proficiency",
      component: <Step6 />,
    },
    {
      label: "Certificate / Train",
      component: <Step7 />,
    },
    {
      label: "Language",
      component: <SelectLangaugeStep />,
    },
    {
      label: "Choose Resume",
      component: (
        <Step8 activeStep={activeStep} setActiveStep={setActiveStep} />
      ),
    },
    {
      label: "Preview & Download",
      component: <Step9 />,
    },
  ];

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };
  const onSubmit = (data) => {
    console.log("✅ Final Form Data:", data);

    if (activeStep === 7) {
      setActiveStep(8);
    } else {
      console.log("🎉 All steps completed. Submitting final data...");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
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
          currentStep={activeStep + 1}
        />

        {/* Current Step Content */}
        <div className="mt-6">{steps[activeStep].component}</div>

        {/* Navigation Buttons */}
        <div className="flex max-w-6xl w-full mx-auto justify-between items-center mt-10">
          {activeStep !== 0 ? (
            <button
              type="button"
              className="font-semibold border border-white text-white  px-3 py-2 text-sm rounded-md hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {activeStep === 7 ? (
            <>
              <button
                type="submit"
                className="font-semibold border border-white text-white  px-3 py-2 text-sm rounded-md hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate Resume With AI
              </button>
            </>
          ) : (
            <button
              type="button"
              className={`font-semibold border-white  bg-white text-black  ${
                activeStep === steps.length - 1 ? "" : " px-3 py-2  "
              }text-sm rounded-md hover:bg-[#69CA6A] hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
              onClick={methods.handleSubmit(() => {
                if (activeStep < 9) {
                  handleNext();
                }
              })}
            >
              {activeStep === steps.length - 1 ? (
                <Link
                  to="/dashboard/edit-resume"
                  className={`flex items-center gap-2  ${
                    activeStep === steps.length - 1 ? " px-3 py-2" : ""
                  }`}
                >
                  <Edit size={18} /> Edit Resume
                </Link>
              ) : activeStep === 9 ? (
                "Generate Resume With AI"
              ) : activeStep === 8 || activeStep === 9 ? (
                "Choose Resume Template"
              ) : (
                "Next"
              )}
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateNewResume;
