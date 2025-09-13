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
import { useStatusCheck } from "@/components/common/useStatusCheck";

const UpdateExistingResumeEdit = () => {
  const { resumeId } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [activeTab, setActiveTab] = useState("edit");
  const { imageString, allRedumeData, setAllResumeData } = useResume();
  const axiosSecure = useAxiosSecure();
  const { language } = useEmail();

  const { data: status } = useStatusCheck();
  const steps = [
    {
      title: language === "en" ? "Personal Info" : "Persönliche Informationen",
      component: <StepOne />,
    },
    {
      title: language === "en" ? "Experience" : "Erfahrung",
      component: <StepTwo />,
    },
    {
      title: language === "en" ? "Education" : "Bildung",
      component: <StepThree />,
    },
    {
      title: language === "en" ? "Skill" : "Fähigkeiten",
      component: <StepFour />,
    },
    {
      title: language === "en" ? "Language" : "Sprache",
      component: <StepFive />,
    },
    {
      title: language === "en" ? "Training" : "Training",
      component: <StepSix />,
    },
  ];

  const methods = useForm({ mode: "onChange" });

  const selectedResume = resumeDataEdits.find(
    (resume) => resume.id === Number(resumeId)
  );

  useEffect(() => {
    if (allRedumeData?.data) {
      methods.reset(allRedumeData.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const IdSetupMutation = useMutation({
    mutationFn: async (body) => {
      const res = await axiosSecure.post(`/update-template-id/`, body);
      return res.data;
    },
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });

  const ResumeMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axiosSecure.post(`/create-resume/`, formData, {
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
      IdSetupMutation.mutate({ template_id: resumeId });
      updateToastSuccess(
        context.toastId,
        data?.message || "Resume Created Successfully!"
      );
    },
    onError: (error, _variables, context) => {
      const msg = error?.response?.data?.message || "Something went wrong!";
      updateToastError(context.toastId, msg);
    },
  });

  const onSubmit = (formData) => {
    const payload = {
      ...formData,
      profile_photo: imageString || "",
      resume_language: "en",
    };
    ResumeMutation.mutate(payload);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/dashboard/choose-resume"
          className="flex items-center gap-2 mb-2"
        >
          <FaAngleLeft className="cursor-pointer text-xl p-1 border border-white/30 rounded-full" />
          <Title level="title32">
            {language === "en" ? "Create New Resume" : "Lebenslauf bearbeiten"}
          </Title>
        </Link>
        <Title level="title22" className="text-white/80">
          {language === "en"
            ? "Let AI help improve your resume content."
            : "Lassen Sie sich von KI dabei helfen, den Inhalt Ihres Lebenslaufs zu verbessern."}
        </Title>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col-reverse lg:flex-row gap-5">
            {/* Left: CV Preview */}
            <div className="w-full lg:w-[70%] border border-[#262626] rounded-xl p-2 bg-[#0E0E10] overflow-hidden">
              {/* Mobile tab toggle */}
              <div className="sticky top-0 z-10 bg-[#0E0E10] py-2 mb-2 flex lg:hidden justify-center">
                <div className="flex p-1 rounded-xl bg-[#0E0E10] border border-[#262626]">
                  {["edit", "design"].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`font-semibold px-4 py-2 rounded-md text-sm transition-colors duration-300 ${
                        activeTab === tab
                          ? "bg-linearbg text-white"
                          : "text-white/70 hover:bg-linearbg"
                      }`}
                    >
                      {language === "en"
                        ? tab === "edit"
                          ? "Edit"
                          : "Design"
                        : tab === "edit"
                        ? "Bearbeiten"
                        : "Design"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-center items-center">
                {selectedResume ? (
                  <div className="w-full max-w-full max-h-[calc(100vh-150px)] overflow-auto flex justify-center">
                    {selectedResume.cvComponet}
                  </div>
                ) : (
                  <p className="text-white/70">
                    {language === "en"
                      ? "No Resume Selected"
                      : "Kein Lebenslauf ausgewählt"}
                  </p>
                )}
              </div>
            </div>

            {/* Right: Edit / Design */}
            <div className="w-full lg:w-[30%] flex flex-col">
              {/* Desktop tab toggle */}
              <div className="hidden lg:block p-4 rounded-xl bg-[#0E0E10] border border-[#262626] mb-5">
                <div className="flex gap-3">
                  {["edit", "design"].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`font-semibold w-full border border-white/10 text-white px-2 py-2 rounded-md transition-colors duration-300 ${
                        activeTab === tab ? "bg-linearbg" : "hover:bg-linearbg"
                      }`}
                    >
                      {language === "en"
                        ? tab === "edit"
                          ? "Edit Content"
                          : "Design"
                        : tab === "edit"
                        ? "Inhalt bearbeiten"
                        : "Design"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form / Design content */}
              <div className="bg-[#0E0E10] border border-[#262626] rounded-xl p-4 md:p-5 flex-1">
                {activeTab === "edit" ? (
                  <>
                    {/* Step Navigation */}
                    <div className="mb-6 overflow-x-auto">
                      <div className="flex min-w-max pb-2 border-b border-[#262626]">
                        {steps.map((step, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setActiveStep(index)}
                            className={`whitespace-nowrap px-3 py-1 mr-3 text-sm rounded-t-md transition-colors duration-300 ${
                              activeStep === index
                                ? "bg-linearbg text-white"
                                : "text-white/70 hover:bg-white/10"
                            }`}
                          >
                            {step.title}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="min-h-[400px]">
                      {steps[activeStep].component}
                    </div>
                  </>
                ) : (
                  <Design />
                )}
              </div>

              {/* Sticky Save button for small screens */}
              {/* <div className="mt-5 lg:static sticky bottom-0 bg-[#0A0A0A] p-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-linearbg text-white font-semibold rounded-md hover:opacity-90 transition-opacity"
                >
                  {language === "en" ? "Save Changes" : "Änderungen speichern"}
                </button>
              </div> */}
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default UpdateExistingResumeEdit;
