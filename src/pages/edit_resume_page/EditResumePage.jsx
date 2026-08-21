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
import { toast } from "sonner";
import StepDesign from "@/components/Edit_Resume_Components/StepDesign";
import { resumeDataEdits } from "@/lib/Data";
import TailorStep from "@/components/createResumeComponents/TailorStep";

const steps = [
  { title: "Personal Info", component: <StepOne /> },
  { title: "Experience", component: <StepTwo /> },
  { title: "Education", component: <StepThree /> },
  { title: "Skill", component: <StepFour /> },
  { title: "Language", component: <StepFive /> },
  { title: "Train", component: <StepSix /> },
  { title: "Tailor Your Document’s Voice", component: <TailorStep /> },
];

const EditResumePage = () => {
  const { resumeId } = useParams();
  const [activeStep1, setactiveStep1] = useState(0);
  const [activeTab, setActiveTab] = useState("content");
  const { allRedumeData, setAllResumeData, color } = useResume();
  const methods = useForm({ mode: "onChange" });
  const selectedResume = resumeDataEdits.find(
    (resume) => resume.id === Number(resumeId)
  );

  useEffect(() => {
    if (allRedumeData?.data) {
      methods.reset(allRedumeData.data);
    }
  }, [allRedumeData, methods]);

  const onSubmit = (data) => {
    const payload = {
      ...data,
      resume_color: color,
    };
    setAllResumeData({ data: payload });
    toast.success("Changes Applied Successfully!");
  };

  return (
    <div>
      <Link
        to={"/dashboard/create-new-resume"}
        className="flex items-center gap-2"
        state={{ step: 9 }}
      >
        <FaAngleLeft className="cursor-pointer text-xl p-1 border border-white/30 rounded-full" />
        <Title level="title32">Go Back</Title>
      </Link>

      <Title level="title22" className="mt-2">
        Let AI help improve your resume content.
      </Title>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="mt-3">
          <div className="mt-5 flex xlg:flex-row flex-col-reverse gap-5 md:gap-10 justify-between">
            {/* Left Image / Resume Preview */}
            <div className="overflow-x-auto">
              {selectedResume ? (
                selectedResume.cvComponet
              ) : (
                <p>No Resume Found</p>
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
                  Edit Content
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("design")}
                  className={`font-semibold text-center border w-full border-white/10 text-white px-2 py-2 rounded-md transition-colors duration-300 ${
                    activeTab === "design" ? "bg-linearbg" : "bg-transparent"
                  }`}
                >
                  Edit Design
                </button>
              </div>

              {/* Active Tab Content */}
              <div className="mt-3">
                {activeTab === "design" ? (
                  <StepDesign />
                ) : (
                  <>
                    {/* Step Nav */}
                    <div className="mt-3 flex flex-wrap items-center gap-4 border-b">
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
                    Apply Changes
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
