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
import AddAnotherCourses from "@/components/CreateCoverLetterComponents/AddAnotherCourses";
import { FormProvider, useForm } from "react-hook-form";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useResume } from "@/providers/ResumeContext";
import {
  showLoadingToast,
  updateToastError,
  updateToastSuccess,
} from "@/lib/utils";
const CreateCoverLetter = () => {
  const methods = useForm({
    mode: "onChange",
  });
  const { coverLetter, setCoverLetter } = useResume();
  const [activeStep, setActiveStep] = useState(0);
  const axiosSecure = useAxiosSecure();
  const CoverMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axiosSecure.post(
        "/create-cover-letter/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    },

    onMutate: () => {
      const toastId = showLoadingToast("Creating Cover Letter...");
      return { toastId };
    },
    onSuccess: (data, _variables, context) => {
    
      setCoverLetter(data);
      // console.log(data);
      updateToastSuccess(
        context.toastId,
         "Cover letter Created Successfully!"
      );
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
       updateToastError(context.toastId, errorMessage);
    },
  });

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
    { label: "Add Another Courses", component: <AddAnotherCourses /> },
    {
      label: " Preview & Download",
      component: (
        <>
          <Step_6 />
        </>
      ),
    },
  ];

  // const handleNext = async () => {
  //   const isValid = await methods.trigger();
  //   if (isValid && step < 5) {
  //     setStep((prev) => prev + 1);
  //   }
  // };
  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (!isValid) return;

    if (activeStep === 5) {
      // Step 5 is "Add Another Courses"
      const allData = methods.getValues();
      console.log("📤 Posting data at step 5:", allData);

      const formData = new FormData();
      Object.keys(allData).forEach((key) => {
        if (key === "upload_resume" && allData[key]?.[0]) {
          // Append file
          formData.append(key, allData[key][0]);
        } else {
          formData.append(key, allData[key] ?? "");
        }
      });

      CoverMutation.mutate(formData, {
        onSuccess: () => {
          setActiveStep((prev) => prev + 1); // move to Preview
        },
      });
    } else if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };
  const onSubmit = (data) => {
    console.log("✅ Final Form Data:", data);
    CoverMutation.mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* Header */}
        <div className="flex flex-col gap-2">
          <Link
            to={"/dashboard/edit-resume"}
            className="flex items-center gap-2"
          >
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
          {activeStep !== 0 ? (
            <button
              className={`font-semibold  text-white  text-xs rounded-md hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed  ${
                activeStep === steps.length - 1
                  ? " "
                  : " px-8 py-2 border border-white"
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
              type="button" // prevent form submit on non-final steps
              className="font-semibold border-white bg-white text-black px-8 py-2 text-xs rounded-md hover:bg-[#69CA6A] hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleNext}
              disabled={CoverMutation.isLoading}
            >
              {activeStep === 5 ? "Combine & Continue" : "Next"}
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateCoverLetter;
