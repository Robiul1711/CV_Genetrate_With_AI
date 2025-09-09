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
import { useEmail } from "@/hooks/useEmail";
import StepDesign from "@/components/Edit_Resume_Components/StepDesign";
import { resumeDataEdits } from "@/lib/Data";

const stepsData = (language) => [
  {
    title: language === "de" ? "Persönliche Infos" : "Personal Info",
    component: <StepOne />,
  },
  {
    title: language === "de" ? "Erfahrung" : "Experience",
    component: <StepTwo />,
  },
  {
    title: language === "de" ? "Bildung" : "Education",
    component: <StepThree />,
  },
  {
    title: language === "de" ? "Fähigkeiten" : "Skill",
    component: <StepFour />,
  },
  {
    title: language === "de" ? "Sprache" : "Language",
    component: <StepFive />,
  },
  { title: language === "de" ? "Schulungen" : "Train", component: <StepSix /> },
];

const EditResumePage = () => {
  const { language, setActiveStep, activeStep } = useEmail(); // Get current language
  const { resumeId } = useParams();
  const [activeStep1, setactiveStep1] = useState(0);
  const [activeTab, setActiveTab] = useState("content"); // "content" or "design"
  const { imageString, allRedumeData, setAllResumeData, color, setColor } =
    useResume();
  const axiosSecure = useAxiosSecure();
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

  console.log(methods.watch());

  const ResumeMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axiosSecure.put(
        `/update-resume/${allRedumeData?.data?.id}/`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    },
    onMutate: () => {
      const toastId = showLoadingToast(
        language === "de" ? "Lebenslauf wird erstellt..." : "Creating Resume..."
      );
      return { toastId };
    },
    onSuccess: (data, _variables, context) => {
      setAllResumeData(data);
      updateToastSuccess(
        context.toastId,
        data?.message ||
          (language === "de"
            ? "Lebenslauf erfolgreich erstellt!"
            : "Resume Created Successfully!")
      );
    },
    onError: (error, _variables, context) => {
      const errorMessage =
        error?.response?.data?.message ||
        (language === "de"
          ? "Etwas ist schiefgelaufen!"
          : "Something went wrong!");
      updateToastError(context.toastId, errorMessage);
    },
  });

  const onSubmit = (data) => {
    const payload = {
      ...data,
      resume_language: language || "en",
      resume_color: color,
    };

    if (data.work_experiences && Array.isArray(data.work_experiences)) {
      data.work_experiences = data.work_experiences.filter(
        (exp) =>
          exp.job_title.trim() !== "" ||
          exp.company_name.trim() !== "" ||
          exp.start_date.trim() !== "" ||
          exp.end_date !== null ||
          exp.still_working_here === true ||
          exp.responsibilities.trim() !== ""
      );

      // If nothing left after filtering, remove work_experiences
      if (data.work_experiences.length === 0) {
        delete data.work_experiences;
      }
    }

    if (data.profile_photo && data.profile_photo.startsWith("/media")) {
      delete payload.profile_photo;
    }

    console.log(payload?.profile_photo);
    ResumeMutation.mutate(payload);
  };

  const steps = stepsData(language);

  return (
    <div>
      <Link
        to={"/dashboard/create-New-resume"}
        className="flex items-center gap-2"
        state={{ step: 9 }}
      >
        <FaAngleLeft className="cursor-pointer text-xl p-1 border border-white/30 rounded-full" />
        <Title level="title32">
          {language === "de" ? "Zurück" : "Go Back"}
        </Title>
      </Link>

      <Title level="title22" className="mt-2">
        {language === "de"
          ? "Lassen Sie KI Ihren Lebenslauf verbessern."
          : "Let AI help improve your resume content."}
      </Title>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="mt-3">
          <div className="mt-5 flex xl:flex-row flex-col-reverse gap-5 md:gap-10 justify-between">
            {/* Left Image / Resume Preview */}
            <div className=" overflow-x-auto">
              {selectedResume ? (
                selectedResume.cvComponet
              ) : (
                <p>
                  {language === "de"
                    ? "Kein Lebenslauf gefunden"
                    : "No Resume Found"}
                </p>
              )}
            </div>

            {/* Right Content */}
            <div className="flex-1">
              {/* Tab Buttons */}
              <div className="lg:p-4 p-2 rounded-xl bg-[#0E0E10] flex items-center justify-center gap-3 border border-[#262626]">
                <button
                  type="button"
                  onClick={() => setActiveTab("content")}
                  className={`font-semibold text-center border w-full border-white/10 text-white px-2 py-2 rounded-md transition-colors duration-300 ${
                    activeTab === "content" ? "bg-linearbg" : "bg-transparent"
                  }`}
                >
                  {language === "de" ? "Inhalt bearbeiten" : "Edit Content"}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("design")}
                  className={`font-semibold text-center border w-full border-white/10 text-white px-2 py-2 rounded-md transition-colors duration-300 ${
                    activeTab === "design" ? "bg-linearbg" : "bg-transparent"
                  }`}
                >
                  {language === "de" ? "Design bearbeiten" : "Edit Design"}
                </button>
              </div>

              {/* Active Tab Content */}
              <div className="mt-3">
                {activeTab === "design" ? (
                  <StepDesign />
                ) : (
                  <>
                    {/* Step Nav */}
                    <div className="mt-3 flex flex-wrap items-center gap-4 sm:gap-0 sm:justify-between border-b">
                      {steps.map((step, index) => (
                        <Title
                          key={index}
                          level="title14"
                          className={`cursor-pointer pb-1 border-b-2 ${
                            activeStep1 === index
                              ? "border-[#fff] text-white bg-linearbg"
                              : "border-transparent text-white/70"
                          } text-sm`}
                          onClick={() => setactiveStep1(index)}
                        >
                          {step.title}
                        </Title>
                      ))}
                    </div>

                    {/* Active Step */}
                    <div>{steps[activeStep1].component}</div>
                  </>
                )}

                {/* Submit button only for content tab */}
                {activeTab === "content" && (
                  <button
                    type="submit"
                    className="font-semibold border bg-white mt-4 md:mt-4 w-full border-white/30 text-black px-4 py-2 text-sm rounded-md hover:bg-black hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {language === "de"
                      ? "Änderungen übernehmen"
                      : "Apply Changes"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditResumePage;
