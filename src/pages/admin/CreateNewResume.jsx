import React, { useEffect, useState } from "react";
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
import { Edit, Loader2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import StepProgressBar from "@/components/common/StepProgressBar";
import { useForm, FormProvider } from "react-hook-form";
import SelectLangaugeStep from "@/components/createResumeComponents/SelectLangaugeStep";
import { toast } from "sonner";
import { useResume } from "@/providers/ResumeContext";
import { useEmail } from "@/hooks/useEmail";
import TailorStep from "@/components/createResumeComponents/TailorStep";

const CreateNewResume = () => {
  const { setAllResumeData, setImageSet } = useResume();
  const [resumeId, setResumeId] = useState(null);
  const [isCreatingResume, setIsCreatingResume] = useState(false);
  const { activeStep, setActiveStep } = useEmail();
  const methods = useForm({
    mode: "onChange",
  });
  const location = useLocation();

  useEffect(() => {
    if (location.state?.step) {
      setActiveStep(location.state.step);
    } else {
      setActiveStep(0);
    }
  }, [location.state, setActiveStep]);

  const steps = [
    {
      label: "Choose Your Goal",
      component: <Step1 />,
    },
    {
      label: "Personal Info",
      component: <Step2 />,
    },
    {
      label: "Experience",
      component: <Step3 />,
    },
    {
      label: "Education",
      component: <Step4 />,
    },
    {
      label: "Skills",
      component: <Step5 />,
    },
    {
      label: "Languages Proficiency",
      component: <Step6 />,
    },
    {
      label: "Certificate / Training",
      component: <Step7 />,
    },
    {
      label: "Language",
      component: <SelectLangaugeStep />,
    },
    {
      label: "Tailor Your Document’s Voice",
      component: <TailorStep />,
    },
    {
      label: "Choose Resume",
      component: (
        <Step8
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          resumeId={resumeId}
          setResumeId={setResumeId}
        />
      ),
    },
    {
      label: "Preview & Download",
      component: <Step9 resumeId={resumeId} setResumeId={setResumeId} />,
    },
  ];

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
  };
  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const onSubmit = (data) => {
    data.goal = String(data.goal || "").trim();

    if (activeStep === 8) {
      setIsCreatingResume(true);
      setTimeout(() => {
        setAllResumeData(data);
        setResumeId("demo-resume-1");
        toast.success("Resume Generated Successfully with AI!");
        setActiveStep(9);
        setIsCreatingResume(false);
      }, 1000);
    } else {
      handleNext();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* Header */}
        <div className="flex flex-col gap-2">
          <Title level="title32">Create New Resume</Title>
          <Title level="title22">Build your resume step-by-step with AI assistance</Title>
        </div>

        {/* Step Progress */}
        <StepProgressBar
          steps={steps.map((s) => s.label)}
          currentStep={activeStep + 1}
        />

        {/* Step Content */}
        <div className="mt-6">
          {isCreatingResume ? (
            <div className="flex flex-col items-center justify-center p-8">
              <Loader2 className="h-12 w-12 animate-spin text-white mb-4" />
              <p className="text-white text-lg">Generating Resume With AI...</p>
            </div>
          ) : (
            steps[activeStep].component
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex max-w-6xl w-full mx-auto justify-between items-center mt-10">
          {activeStep !== 0 ? (
            <button
              type="button"
              className="font-semibold border border-white text-white px-3 py-2 text-sm rounded-md hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleBack}
              disabled={activeStep === 0 || isCreatingResume}
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {activeStep === 8 ? (
            <button
              type="submit"
              className="font-semibold border border-white text-white px-3 py-2 text-sm rounded-md hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={isCreatingResume}
            >
              {isCreatingResume ? "Generating..." : "Generate Resume With AI"}
            </button>
          ) : activeStep === steps.length - 1 ? (
            <Link
              to={`/dashboard/edit-resume/${resumeId || "demo-resume-1"}`}
              className="font-semibold border border-white text-white px-3 py-2 text-sm rounded-md flex items-center gap-2 hover:bg-white hover:text-black transition-colors duration-300"
            >
              <Edit size={18} /> Edit Resume
            </Link>
          ) : activeStep === 9 ? null : (
            <button
              type="button"
              className="font-semibold border border-white bg-white text-black px-3 py-2 text-sm rounded-md hover:bg-[#69CA6A] hover:text-white transition-colors duration-300 disabled:cursor-not-allowed"
              onClick={methods.handleSubmit(() => handleNext())}
              disabled={isCreatingResume}
            >
              Next
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateNewResume;
