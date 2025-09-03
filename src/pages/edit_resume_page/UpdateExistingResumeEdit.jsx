import React, { useEffect, useState } from "react";
import Title from "@/components/common/Title";
import { FaAngleLeft } from "react-icons/fa6";
import StepOne from "@/components/Edit_Resume_Components/StepOne";
import StepTwo from "@/components/Edit_Resume_Components/StepTwo";
import StepThree from "@/components/Edit_Resume_Components/StepThree";
import StepFour from "@/components/Edit_Resume_Components/StepFour";
import StepFive from "@/components/Edit_Resume_Components/StepFive";
import StepSix from "@/components/Edit_Resume_Components/StepSix";
import { Link, useParams } from "react-router-dom";
import ResumeOneEdit from "@/components/All_Edit_template/ResumeOneEdit";
import { useResume } from "@/providers/ResumeContext";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import {
  showLoadingToast,
  updateToastError,
  updateToastSuccess,
} from "@/lib/utils";
import Design from "./Design";
import { useEmail } from "@/hooks/useEmail";
import { resumeDataEdits } from "@/lib/Data";
// Import the Design component


const UpdateExistingResumeEdit = () => {
  const { resumeId } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [activeTab, setActiveTab] = useState("edit"); // 'edit' or 'design'
  const { imageString, allRedumeData, setAllResumeData } = useResume();
  const axiosSecure = useAxiosSecure();
  const { language } = useEmail();
  const data = allRedumeData?.data;
   // Dynamic steps based on language
  const steps = [
    {
      title:
        language === "en" ? "Personal Info" : "Persönliche Informationen",
      component: <StepOne />,
    },
    { title: language === "en" ? "Experience" : "Erfahrung", component: <StepTwo /> },
    { title: language === "en" ? "Education" : "Bildung", component: <StepThree /> },
    { title: language === "en" ? "Skill" : "Fähigkeiten", component: <StepFour /> },
    { title: language === "en" ? "Language" : "Sprache", component: <StepFive /> },
    { title: language === "en" ? "Train" : "Training", component: <StepSix /> },
  ];

  const methods = useForm({
    mode: "onChange",
  });

  const selectedResume = resumeDataEdits.find(
    (resume) => resume.id === Number(resumeId)
  );

  useEffect(() => {
    if (allRedumeData?.data) {
      methods.reset(allRedumeData.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run only once

  const IdSetupMutation = useMutation({
    mutationFn: async (body) => {
      const res = await axiosSecure.post(`/update-template-id/`, body);
      return res.data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const ResumeMutation = useMutation({
    mutationFn: async (formData) => {
      // Set loading state when API call starts
      const response = await axiosSecure.post(`/create-resume/}/`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    },

    onMutate: () => {
      const toastId = showLoadingToast("Creating Resume...");
      return { toastId };
    },

    onSuccess: (data, _variables, context) => {
      console.log(data);
      setAllResumeData(data);
      // Set the resume ID from response if available
      IdSetupMutation.mutate({ template_id: resumeId });
      // ✅ Replace loading toast with success
      updateToastSuccess(
        context.toastId,
        data?.message || "Resume Created Successfully!"
      );
    },

    onError: (error, _variables, context) => {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message || "Something went wrong!";

      // ✅ Replace loading toast with error
      updateToastError(context.toastId, errorMessage);
    },
  });

  const onSubmit = (data) => {
    console.log("✅ Final Form Data:", data);

    const payload = {
      ...data,
      profile_photo: imageString || "",
      resume_language: "en",
    };
    ResumeMutation.mutate(payload);
  };

  return (
    <div>
      <Link
        to={"/dashboard/create-New-resume"}
        className="flex items-center gap-2"
      >
        <FaAngleLeft className="cursor-pointer text-xl p-1 border border-white/30 rounded-full" />
        <Title level="title32">
          {language === "en" ? "Create New Resume" : "Lebenslauf bearbeiten"}
        </Title>
      </Link>

      <Title level="title22" className="mt-2">
        {language === "en"
          ? "Let AI help improve your resume content."
          : "Lassen Sie sich von KI dabei helfen, den Inhalt Ihres Lebenslaufs zu verbessern."}
      </Title>

      <FormProvider {...methods} className=" ">
        <form onSubmit={methods.handleSubmit(onSubmit)} className="mt-3">
          <div className="mt-5 flex flex-col lg:flex-row gap-5 lg:gap-10 justify-between">
            {/* Left Image / PDF */}
            <div className="lg:w-1/2 w-full max-h-[80vh] overflow-y-auto border border-[#262626] rounded-xl p-2 bg-[#0E0E10]">
              {selectedResume ? (
                selectedResume.cvComponet
              ) : (
                <p className="text-white/70">
                  {language === "en"
                    ? "No Resume Selected"
                    : "Kein Lebenslauf ausgewählt"}
                </p>
              )}
            </div>

            {/* Right Content */}
            <div className="lg:w-1/2 w-full">
              {/* Top buttons - Tab Navigation */}
              <div className="lg:p-4 p-2 rounded-xl bg-[#0E0E10] flex items-center justify-center gap-3 border border-[#262626]">
                <button
                  type="button"
                  className={`font-semibold text-center border w-full border-white/10 text-white px-2 py-2 rounded-md transition-colors duration-300 ${
                    activeTab === "edit" ? "bg-linearbg" : "hover:bg-linearbg"
                  }`}
                  onClick={() => setActiveTab("edit")}
                >
                  {language === "en" ? "Edit Content" : "Inhalt bearbeiten"}
                </button>
                <button
                  type="button"
                  className={`font-semibold border text-center w-full border-white/10 text-white px-2 py-2 rounded-md transition-colors duration-300 ${
                    activeTab === "design" ? "bg-linearbg" : "hover:bg-linearbg"
                  }`}
                  onClick={() => setActiveTab("design")}
                >
                  {language === "en" ? "Design" : "Design"}
                </button>
              </div>

              {/* Content based on active tab */}
              {activeTab === "edit" ? (
                <>
                  {/* Step Nav */}
                  <div className="mt-3 flex flex-wrap items-center gap-4 sm:gap-0 sm:justify-between border-b">
                    {steps.map((step, index) => (
                      <Title
                        key={index}
                        level="title14"
                        className={`cursor-pointer pb-1 border-b-2 ${
                          activeStep === index
                            ? "border-[#fff] text-white bg-linearbg"
                            : "border-transparent text-white/70"
                        } text-sm`}
                        onClick={() => setActiveStep(index)}
                      >
                        {step.title}
                      </Title>
                    ))}
                  </div>

                  {/* Active Step */}
                  <div>{steps[activeStep].component}</div>
                </>
              ) : (
                <Design />
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default UpdateExistingResumeEdit;
