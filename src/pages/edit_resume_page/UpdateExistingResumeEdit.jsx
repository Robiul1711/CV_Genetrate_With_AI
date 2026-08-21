import React, { useEffect, useState } from "react";
import Title from "@/components/common/Title";
import StepOne from "@/components/Edit_Resume_Components/StepOne";
import StepTwo from "@/components/Edit_Resume_Components/StepTwo";
import StepThree from "@/components/Edit_Resume_Components/StepThree";
import StepFour from "@/components/Edit_Resume_Components/StepFour";
import StepFive from "@/components/Edit_Resume_Components/StepFive";
import StepSix from "@/components/Edit_Resume_Components/StepSix";
import { Link, useParams } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import { FormProvider, useForm } from "react-hook-form";
import { useResume } from "@/providers/ResumeContext";
import Design from "./Design";
import { resumeDataEdits } from "@/lib/Data";
import { toast } from "sonner";

const steps = [
  { title: "Personal Info", component: <StepOne /> },
  { title: "Experience", component: <StepTwo /> },
  { title: "Education", component: <StepThree /> },
  { title: "Skill", component: <StepFour /> },
  { title: "Language", component: <StepFive /> },
  { title: "Training", component: <StepSix /> },
];

const UpdateExistingResumeEdit = () => {
  const { resumeId } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [activeTab, setActiveTab] = useState("edit");
  const { allRedumeData, setAllResumeData } = useResume();

  const methods = useForm({ mode: "onChange" });

  const selectedResume = resumeDataEdits.find(
    (resume) => resume.id === Number(resumeId)
  );

  useEffect(() => {
    if (allRedumeData?.data) {
      methods.reset(allRedumeData.data);
    }
  }, [allRedumeData, methods]);

  const onSubmit = (formData) => {
    setAllResumeData({ data: formData });
    toast.success("Resume Updated Successfully!");
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
          <Title level="title32">Create New Resume</Title>
        </Link>
        <Title level="title22" className="text-white/80">
          Let AI help improve your resume content.
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
                      {tab === "edit" ? "Edit" : "Design"}
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
                  <p className="text-white/70">No Resume Selected</p>
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
                      {tab === "edit" ? "Edit Content" : "Design"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form / Design content */}
              <div className="bg-[#0E0E10] border border-[#262626] rounded-xl p-4 md:p-5 flex-1">
                {activeTab === "edit" ? (
                  <>
                    {/* Step Navigation */}
                    <div className="mb-6">
                      <div className="flex flex-wrap pb-2 border-b border-[#262326] gap-2">
                        {steps.map((step, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setActiveStep(index)}
                            className={`whitespace-nowrap px-3 py-1 text-sm rounded-md transition-colors duration-300 ${
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
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default UpdateExistingResumeEdit;
