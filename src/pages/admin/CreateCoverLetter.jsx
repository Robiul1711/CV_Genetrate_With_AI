import React, { useState } from "react";
import Title from "@/components/common/Title";
import { Link } from "react-router-dom";
import StepProgressBar from "@/components/common/StepProgressBar";
import Step_1 from "@/components/CreateCoverLetterComponents/Step_1";
import Step_2 from "@/components/CreateCoverLetterComponents/Step_2";
import Step_3 from "@/components/CreateCoverLetterComponents/Step_3";
import Step_4 from "@/components/CreateCoverLetterComponents/Step_4";
import Step_5 from "@/components/CreateCoverLetterComponents/Step_5";
import Step_6 from "@/components/CreateCoverLetterComponents/Step_6";
import AddAnotherCourses from "@/components/CreateCoverLetterComponents/AddAnotherCourses";
import { FaAngleLeft } from "react-icons/fa6";
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
import { useEmail } from "@/hooks/useEmail";

const CreateCoverLetter = () => {
  const methods = useForm({ mode: "onChange" });
  const { coverLetter, setCoverLetter } = useResume();
  const [activeStep, setActiveStep] = useState(0);
  const axiosSecure = useAxiosSecure();
  const { language } = useEmail();

  const texts = {
    en: {
      title: "Create AI-Powered Cover Letter",
      subtitle:
        "Get a professionally tailored cover letter aligned with your resume and the German job market — generated in seconds.",
      back: "Back",
      next: "Next",
      combineContinue: "Combine & Continue",
      toastSuccess: "Cover letter Created Successfully!",
      toastLoading: "Creating Cover Letter...",
      toastError: "Something went wrong!",
      steps: [
        "Basic Information",
        "Job Application Details",
        "Upload Resume",
        "Why You’re a Good Fit",
        "Language",
        "Tailor Your Document’s Voice",
        "Preview & Download",
      ],
    },
    de: {
      title: "Erstellen Sie ein KI-gestütztes Anschreiben",
      subtitle:
        "Erhalten Sie ein professionell angepasstes Anschreiben, das auf Ihren Lebenslauf und den deutschen Arbeitsmarkt abgestimmt ist – in Sekundenschnelle generiert.",
      back: "Zurück",
      next: "Weiter",
      combineContinue: "Kombinieren & Fortfahren",
      toastSuccess: "Anschreiben erfolgreich erstellt!",
      toastLoading: "Anschreiben wird erstellt...",
      toastError: "Etwas ist schiefgelaufen!",
      steps: [
        "Basisinformationen",
        "Bewerbungsdetails",
        "Lebenslauf hochladen",
        "Warum Sie geeignet sind",
        "Sprache",
        "Passen Sie den Ton Ihres Dokuments an",
        "Vorschau & Download",
      ],
    },
  };

  const t = language === "de" ? texts.de : texts.en;

  const CoverMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axiosSecure.post("/create-cover-letter/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onMutate: () => {
      const toastId = showLoadingToast(t.toastLoading);
      return { toastId };
    },
    onSuccess: (data, _variables, context) => {
      setCoverLetter(data);
      updateToastSuccess(context.toastId, t.toastSuccess);
    },
    onError: (error, _variables, context) => {
      // console.log(error);
      toast.error(error?.response?.data?.message || t.toastError);
      updateToastError(context.toastId, t.toastError);
    },
  });

  const steps = [
    { label: t.steps[0], component: <Step_1 /> },
    { label: t.steps[1], component: <Step_2 /> },
    { label: t.steps[2], component: <Step_3 /> },
    { label: t.steps[3], component: <Step_4 /> },
    { label: t.steps[4], component: <Step_5 /> },
    { label: t.steps[5], component: <AddAnotherCourses /> },
    { label: t.steps[6], component: <Step_6 /> },
  ];

  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (!isValid) return;

    // Only call API when moving from AddAnotherCourses → Step 6
    if (activeStep === 5) {
      const allData = methods.getValues();
      const formData = new FormData();

      Object.keys(allData).forEach((key) => {
        if (key === "upload_resume" && allData[key]?.[0]) {
          formData.append(key, allData[key][0]);
        } else {
          formData.append(key, allData[key] ?? "");
        }
      });

      CoverMutation.mutate(formData, {
        onSuccess: () => setActiveStep((prev) => prev + 1),
      });
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  return (
    <FormProvider {...methods}>
      <div>
        {/* Header */}
        <div className="flex flex-col gap-2">
          <p  className="flex items-center gap-2">
            {/* {activeStep === steps.length - 1 && (
              <FaAngleLeft className="cursor-pointer text-3xl p-1 border border-white/30 rounded-full" />
            )} */}
            <Title level="title32">{t.title}</Title>
          </p>
          <Title level="title22">{t.subtitle}</Title>
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
              {activeStep === steps.length - 1 ? "" : t.back}
            </button>
          ) : (
            <div />
          )}

          {activeStep < steps.length - 1 && (
            <button
              type="button"
              className="font-semibold border-white bg-white text-black px-8 py-2 text-xs rounded-md hover:bg-[#69CA6A] hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleNext}
              disabled={CoverMutation.isLoading}
            >
              {activeStep === 5 ? t.combineContinue : t.next}
            </button>
          )}
        </div>
      </div>
    </FormProvider>
  );
};

export default CreateCoverLetter;
