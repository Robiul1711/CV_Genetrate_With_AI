import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import { useResume } from "@/providers/ResumeContext";
import dayjs from "dayjs";
import { useForm, useFormContext } from "react-hook-form";

const ResumeOneEdit = ({ data }) => {
  const { allRedumeData } = useResume();
  const resumeData = allRedumeData?.data || [];
  const { watch } = useFormContext();
  const resumeRef = useRef();
  const workExperiences = watch("work_experiences") || [];
   const educations = watch("educations");
  const handleDownload = () => {
    const element = resumeRef.current;

    const opt = {
      margin: 0,
      filename: "alex-stevens-resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="min-h-screen">
      <div className="text-center mb-4">
        <button
          onClick={handleDownload}
          className="bg-black border text-white px-5 py-2 rounded hover:bg-gray-800 transition-all"
        >
          Download as PDF
        </button>
      </div>
      <div
        ref={resumeRef}
        className="bg-white text-black px-4 py-8 w-[210mm]  mx-auto urbanist"
      >
        {/* Header */}
        <div className="text-center border-b border-[#D9D9D9] pb-5">
          <h1 className="text-[32px] font-light tracking-[7px] text-[#484848]">
            {watch("first_name") || resumeData?.first_name}
            <span className="font-semibold ">
              {watch("last_name") || resumeData?.last_name}
            </span>
          </h1>
        </div>
        <div>
          <p className="tracking-[3px] text-[#484848]  uppercase leading-[24px] text-center py-2 border-b mb-2 border-[#D9D9D9]">
            {watch("job_title") || resumeData?.job_title}
          </p>
        </div>

        {/* Body */}
        <div className="flex justify-between gap-5 mt-6">
          {/* Left Column */}
          <div className="w-[35%] space-y-6">
            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px]">
                ABOUT
              </h2>
              <p className="text-xs leading-[18px] text-[#171717]">
                {watch("about") || resumeData?.about}
              </p>
            </div>

            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px]">
                CONTACT
              </h2>
              <div className="space-y-3 ">
                <p className="text-xs  leading-[18px]">
                  {watch("phone_number") || resumeData?.phone_number}
                </p>
                <p className="text-xs">
                  {watch(`address`) || resumeData?.address}
                </p>
                <p className="text-xs">{watch(`email`) || resumeData?.email}</p>
                <p className="text-xs">
                  {watch(`linked_in_profile`) || resumeData?.linked_in_profile}
                </p>
                <p className="text-xs">
                  {watch(`xing_profile`) || resumeData?.xing_profile}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px]">
                LANGUAGE
              </h2>
              {resumeData?.languages &&
                resumeData.languages.length > 0 &&
                resumeData.languages.map((lang, index) => (
                  <p
                    key={index}
                    className="text-xs flex justify-between items-center"
                  >
                    {lang.language} <span>{lang.level}</span>
                  </p>
                ))}
              {/* <p className="text-xs flex justify-between items-center ">German <span>Native</span></p>
            <p className="text-xs flex justify-between items-center mt-2">English <span>Fluent</span> </p> */}
            </div>

            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px]">
                SKILL
              </h2>
              <ul className="text-xs space-y-3">
                {resumeData?.skills &&
                  resumeData.skills.length > 0 &&
                  resumeData.skills.map((skill, index) => (
                    <li key={index}>{skill?.skill}</li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="w-[1px] bg-[#D9D9D9]"></div>
          {/* Right Column */}
          <div className="w-[65%] space-y-6">
            <div className="flex-1">
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px]">
                EXPERIENCE PREVIEW
              </h2>

              {workExperiences?.length > 0 &&
                workExperiences.map((experience, index) => (
                  <div key={index} className="mt-4">
                    <p className="font-medium leading-[18px] text-xs">
                      {experience?.job_title || "Job Title"}
                    </p>
                    <p className="text-xs leading-[18px] font-medium flex justify-between items-center mt-1">
                      {experience?.company_name || "Company Name"}
                      <span>
                        {experience?.start_date
                          ? dayjs(experience.start_date).format("YYYY")
                          : "YYYY"}{" "}
                        –{" "}
                        {experience?.still_working_here
                          ? "Present"
                          : experience?.end_date
                          ? dayjs(experience.end_date).format("YYYY")
                          : "YYYY"}
                      </span>
                    </p>
                    <p className="text-xs leading-[20px] mt-2">
                      {experience?.responsibilities || "Responsibilities..."}
                    </p>
                  </div>
                ))}
            </div>

            <div>
      <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px]">
        EDUCATION
      </h2>
      {educations &&
        educations.length > 0 &&
        educations.map((education, index) => (
          <div key={index} className="mt-4">
            <p className="font-medium leading-[18px] text-xs">
              {education?.institute_name}
            </p>
            <p className="text-xs leading-[18px] font-medium flex justify-between items-center mt-1">
              {education?.degree}
              <span>
                {education?.start_date
                  ? dayjs(education.start_date).format("YYYY")
                  : ""}
                {" – "}
                {education?.currently_enrolled
                  ? "Present"
                  : education?.end_date
                  ? dayjs(education.end_date).format("YYYY")
                  : "YYYY"}
              </span>
            </p>
          </div>
        ))}
    </div>

            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px] ">
                TRAINING
              </h2>
              {resumeData?.courses_and_training_details &&
                resumeData.courses_and_training_details.length > 0 &&
                resumeData.courses_and_training_details.map(
                  (training, index) => (
                    <div key={index} className="mt-4">
                      <p className="font-medium leading-[18px] text-xs">
                        {training?.name_of_institute}
                      </p>
                      <p className="text-xs leading-[18px] font-medium flex justify-between items-center mt-1">
                        {training?.course_name}
                        <span>
                          {dayjs(training?.start_date).format("YYYY")} –{" "}
                          {dayjs(training?.end_date).format("YYYY")}
                        </span>
                      </p>
                    </div>
                  )
                )}
              <div className="">
                <p className="font-medium leading-[18px] text-xs">
                  Siemens Training Center, Berlin
                </p>
                <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                  Advanced Project Management Certification
                </p>
                <p className="text-xs leading-[20px]">
                  February 2021 – April 2021
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeOneEdit;
