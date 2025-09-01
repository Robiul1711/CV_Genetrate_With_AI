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
import { Edit, Loader2 } from "lucide-react";
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
import { useEmail } from "@/hooks/useEmail";
import Parameter from "@/components/createResumeComponents/Parameter";
import Tailor_Modal from "@/components/createResumeComponents/Tailor_Modal";

const textMap = {
  en: {
    pageTitle: "Create New Resume",
    pageSubTitle: "Build your resume step-by-step with AI assistance",
    next: "Next",
    back: "Back",
    generate: "Generate Resume With AI",
    generating: "Generating...",
    chooseTemplate: "Choose Resume Template",
    editResume: "Edit Resume",
  },
  de: {
    pageTitle: "Neuen Lebenslauf erstellen",
    pageSubTitle:
      "Erstellen Sie Ihren Lebenslauf Schritt für Schritt mit KI-Unterstützung",
    next: "Weiter",
    back: "Zurück",
    generate: "Lebenslauf mit KI generieren",
    generating: "Wird generiert...",
    chooseTemplate: "Lebenslaufvorlage auswählen",
    editResume: "Lebenslauf bearbeiten",
  },
};

const CreateNewResume = () => {
  const { setAllResumeData } = useResume();
  const [activeStep, setActiveStep] = useState(0);
  const [resumeId, setResumeId] = useState(null);
  const [isCreatingResume, setIsCreatingResume] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { language } = useEmail(); // 'en' or 'de'

  const methods = useForm({
    mode: "onChange",
    defaultValues: { work_experiences: [], resume_language: "en" },
  });

  const resume_language = language;
  const t = textMap[resume_language];

  const ResumeMutation = useMutation({
    mutationFn: async (formData) => {
      setIsCreatingResume(true);
      const response = await axiosSecure.post("/create-resume/", formData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    },
    onMutate: () => ({ toastId: showLoadingToast(t.generate) }),
    onSuccess: (data, _variables, context) => {
      setAllResumeData(data);
      setResumeId(data.id || data.resumeId);
      updateToastSuccess(
        context.toastId,
        data?.message || "Resume Created Successfully!"
      );
      setActiveStep(8);
      setIsCreatingResume(false);
    },
    onError: (error, _variables, context) => {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong!";
      updateToastError(context.toastId, errorMessage);
      setIsCreatingResume(false);
    },
  });

  const steps = [
    {
      label: resume_language === "de" ? "Ziel wählen" : "Choose Your Goal",
      component: <Step1 />,
    },
    {
      label: resume_language === "de" ? "Persönliche Infos" : "Personal Info",
      component: <Step2 />,
    },
    {
      label: resume_language === "de" ? "Erfahrung" : "Experience",
      component: <Step3 />,
    },
    {
      label: resume_language === "de" ? "Bildung" : "Education",
      component: <Step4 />,
    },
    {
      label: resume_language === "de" ? "Fähigkeiten" : "Skills",
      component: <Step5 />,
    },
    {
      label:
        resume_language === "de" ? "Sprachkenntnisse" : "Languages Proficiency",
      component: <Step6 />,
    },
    {
      label:
        resume_language === "de"
          ? "Zertifikate / Training"
          : "Certificate / Train",
      component: <Step7 />,
    },

    {
      label: resume_language === "de" ? "Sprache" : "Language",
      component: <SelectLangaugeStep />,
    },
    {
      label: resume_language === "de" ? "Lebenslauf wählen" : "Choose Resume",
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
      label:
        resume_language === "de" ? "Vorschau & Download" : "Preview & Download",
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
    data.goal = String(data.goal).trim();
    console.log(data);
    if (activeStep === 7) ResumeMutation.mutate(data);
    else handleNext();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* Header */}
        <div className="flex flex-col gap-2">
          <Title level="title32">{t.pageTitle}</Title>
          <Title level="title22">{t.pageSubTitle}</Title>
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
              <p className="text-white text-lg">{t.generating}</p>
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
              {t.back}
            </button>
          ) : (
            <div />
          )}

          {activeStep === 7 ? (
            <button
              type="submit"
              className="font-semibold border border-white text-white px-3 py-2 text-sm rounded-md hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={isCreatingResume}
            >
              {isCreatingResume ? (
                <>
                  {/* <Loader2 className="h-4 w-4 animate-spin" /> */}
                  {t.generating}
                </>
              ) : (
                t.generate
              )}
            </button>
          ) : activeStep === steps.length - 1 ? (
            <Link
              to={`/dashboard/edit-resume/${resumeId}`}
              className="font-semibold border border-white text-white px-3 py-2 text-sm rounded-md flex items-center gap-2 hover:bg-white hover:text-black transition-colors duration-300"
            >
              <Edit size={18} /> {t.editResume}
            </Link>
          ) : (
            <button
              type="button"
              className="font-semibold border border-white bg-white text-black px-3 py-2 text-sm rounded-md hover:bg-[#69CA6A] hover:text-white transition-colors duration-300 disabled:cursor-not-allowed"
              onClick={methods.handleSubmit(() => handleNext())}
              disabled={isCreatingResume}
            >
              {activeStep === 8 ? t.chooseTemplate : t.next}
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateNewResume;
