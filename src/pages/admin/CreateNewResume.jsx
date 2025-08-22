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
import { Edit, Loader2 } from "lucide-react"; // Added Loader2 for loading indicator
import { Link } from "react-router-dom";
import StepProgressBar from "@/components/common/StepProgressBar";
import { useForm, FormProvider } from "react-hook-form";
import SelectLangaugeStep from "@/components/createResumeComponents/SelectLangaugeStep";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useResume } from "@/providers/ResumeContext";
import {
  showLoadingToast,
  updateToastError,
  updateToastSuccess,
} from "@/lib/utils";

const CreateNewResume = () => {
  const { setAllResumeData } = useResume();
  const [activeStep, setActiveStep] = useState(0);
  const [resumeId, setResumeId] = useState(null);
  const [isCreatingResume, setIsCreatingResume] = useState(false); // New loading state
  const axiosSecure = useAxiosSecure();
  
  // Initialize resumeData state
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      work_experiences: [],
    },
  });

  const ResumeMutation = useMutation({
    mutationFn: async (formData) => {
      setIsCreatingResume(true); // Set loading state when API call starts
      const response = await axiosSecure.post("/create-resume/", formData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    },

    onMutate: () => {
      const toastId = showLoadingToast("Creating Resume...");
      return { toastId };
    },

    onSuccess: (data, _variables, context) => {
      setAllResumeData(data);
      setResumeId(data.id || data.resumeId); // Set the resume ID from response if available

      // ✅ Replace loading toast with success
      updateToastSuccess(
        context.toastId,
        data?.message || "Resume Created Successfully!"
      );
      
      // ✅ Only advance to next step after successful API call
      setActiveStep(8);
      setIsCreatingResume(false); // Clear loading state
    },

    onError: (error, _variables, context) => {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong!";

      // ✅ Replace loading toast with error
      updateToastError(context.toastId, errorMessage);
      setIsCreatingResume(false); // Clear loading state even on error
    },
  });

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
    console.log("✅ Final Form Data:", data);
    data.goal = String(data.goal).trim();

    if (activeStep === 7) {
      ResumeMutation.mutate(data);
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
        <div className="mt-6">
          {isCreatingResume ? (
            <div className="flex flex-col items-center justify-center p-8">
              <Loader2 className="h-12 w-12 animate-spin text-white mb-4" />
              <p className="text-white text-lg">Generating your resume with AI...</p>
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
              className="font-semibold border border-white text-white  px-3 py-2 text-sm rounded-md hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleBack}
              disabled={activeStep === 0 || isCreatingResume}
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
                className="font-semibold border border-white text-white  px-3 py-2 text-sm rounded-md hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={isCreatingResume}
              >
                {isCreatingResume ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Resume With AI"
                )}
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
              disabled={isCreatingResume || activeStep === steps.length - 1}
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