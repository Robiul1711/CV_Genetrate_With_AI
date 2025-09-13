import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import { useResume } from "@/providers/ResumeContext";
import dayjs from "dayjs";
import DownloadButton from "../common/DownloadButton";

const ResumeOne = () => {
  const { allRedumeData } = useResume();
  const resumeData = allRedumeData?.data || [];

  const resumeRef = useRef();

 

  return (
    <div className="min-h-screen">
       <DownloadButton resumeRef={resumeRef}
        />
      <div
        ref={resumeRef}
        className="bg-white text-black px-4 py-8 w-[210mm]  mx-auto urbanist  h-[297mm] overflow-hidden"
      >
        {/* Header */}
        <div className="text-center border-b border-[#D9D9D9] pb-5">
          <h1 className="text-[32px] font-light tracking-[7px] text-[#484848]">
            {resumeData?.first_name}{" "}
            <span className="font-semibold ">{resumeData?.last_name}</span>
          </h1>
        </div>
        <div>
          <p className="tracking-[3px] text-[#484848]  uppercase leading-[24px] text-center py-2 border-b mb-2 border-[#D9D9D9]">
            {resumeData?.job_title}
          </p>
        </div>

        {/* Body */}
        <div className="flex justify-between gap-5 mt-6 h-full">
          {/* Left Column */}
          <div className="w-[35%] space-y-6">
            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px] uppercase">
               {allRedumeData?.data?.resume_language === "en" ? "ABOUT ME" : "ÜBER MICH"}
              </h2>
              <p className="text-xs leading-[18px] text-[#171717]">
                {resumeData?.about}
              </p>
            </div>

            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px] uppercase">
               {allRedumeData?.data?.resume_language === "en" ? "CONTACT" : "KONTAKT"}
              </h2>
              <div className="space-y-3 ">
                <p className="text-xs  leading-[18px]">
                  {resumeData?.phone_number}
                </p>
                <p className="text-xs">{resumeData?.address}</p>
                <p className="text-xs">{resumeData?.email}</p>
                <p className="text-xs">{resumeData?.linked_in_profile}</p>
                <p className="text-xs">{resumeData?.xing_profile}</p>
              </div>
            </div>

            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px] uppercase">
             {allRedumeData?.data?.resume_language === "en" ? "LANGUAGES" : "SPRACHEN"}
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
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px] uppercase">
                {allRedumeData?.data?.resume_language === "en" ? "SKILLS" : "FÄHIGKEITEN"}
              </h2>
                <ul className="text-xs  flex gap-3 flex-wrap">
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
            {
              resumeData.work_experiences?.length > 0 &&(
                <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px] uppercase">
               {allRedumeData?.data?.resume_language === "en" ? "WORK EXPERIENCE" : "BERUFSERFAHRUNG"}
              </h2>

              {resumeData?.work_experiences &&
                resumeData.work_experiences.length > 0 &&
                resumeData.work_experiences.map((experience, index) => (
                  <div key={index} className="mt-4">
                    <p className="font-medium leading-[18px] text-xs">
                      {experience?.job_title}
                    </p>
                    <p className="text-xs leading-[18px] font-medium flex justify-between items-center mt-1">
                      {experience?.company_name}
                      <span>
                        {dayjs(experience?.start_date).format("YYYY")} –{" "}
                        {dayjs(experience?.end_date).format("YYYY")}
                      </span>
                    </p>
                    <p className="text-xs leading-[20px] mt-2">
                      {experience?.responsibilities}
                    </p>
                  </div>
                ))}
            
            </div>
              )
            }

            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px] uppercase">
               {allRedumeData?.data?.resume_language === "en" ? "EDUCATION" : "AUSBILDUNG"}
              </h2>
              {
                resumeData?.educations &&
                resumeData.educations.length > 0 &&
                resumeData.educations.map((education, index) => (
                  <div key={index} className="mt-4">
                    <p className="font-medium leading-[18px] text-xs">
                      {education?.institute_name}
                    </p>
                    <p className="text-xs leading-[18px] font-medium flex justify-between items-center mt-1">
                      {education?.degree}
                      <span>
                        {dayjs(education?.start_date).format("YYYY")} –{" "}
                        {dayjs(education?.end_date).format("YYYY")}
                      </span>
                    </p>
                  </div>
                ))
              }
 

            </div>

            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px] uppercase">
              {allRedumeData?.data?.resume_language === "en" ? "TRAINING" : "Schulung"}
              </h2>
              {
                resumeData?.courses_and_training_details &&
                resumeData.courses_and_training_details.length > 0 &&
                resumeData.courses_and_training_details.map((training, index) => (
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
                ))
              }
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

export default ResumeOne;
