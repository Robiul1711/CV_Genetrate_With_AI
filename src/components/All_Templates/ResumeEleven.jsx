import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import { useResume } from "@/providers/ResumeContext";
import dayjs from "dayjs";
import DownloadButton from "../common/DownloadButton";
import WaterMark from "@/assets/images/watermark.png";
import { useStatusCheck } from "../common/useStatusCheck";
const ResumeEleven = () => {
  const { allRedumeData } = useResume();
  const resumeData = allRedumeData?.data || [];
  const resumeRef = useRef();

  const { data: status } = useStatusCheck();
 

  return (
    <div className="min-h-screen ">
         <DownloadButton resumeRef={resumeRef}  />
      <div
        ref={resumeRef}
        className="bg-white text-black relative px-4 py-8 w-[210mm] h-[297mm] overflow-hidden  mx-auto !urbanist"
      >
         {status?.water_mark && (
          <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
            <img
              src={WaterMark}
              className="max-w-full max-h-full object-contain opacity-80"
            />
          </div>
        )}
        {/* Header */}
        <div className="text-center ">
          <h1 className="text-[32px] font-bold tracking-[2px] text-[#484848] ">
            {resumeData?.first_name} {resumeData?.last_name}
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
          <div className="w-[40%] space-y-6">
            <div>
              <h2 className="text-sm font-medium tracking-[2px] py-1 bg-[#696969] mb-3 text-[#fff] text-center leading-[24px]">
            {allRedumeData?.data?.resume_language === "Deutsch" || allRedumeData?.data?.resume_language === "German" ? "ÜBER MICH" : "ABOUT ME" }
              </h2>
              <p className="text-xs leading-[18px] text-[#171717]">
                {resumeData?.about}
              </p>
            </div>

            <div>
              <h2 className="text-sm font-medium tracking-[2px] py-1 bg-[#696969] mb-3 text-[#fff] text-center leading-[24px]">
                {allRedumeData?.data?.resume_language === "Deutsch" || allRedumeData?.data?.resume_language === "German" ? "KONTAKT" : "CONTACT"}
              </h2>
              <div className="space-y-3 ">
                <p className="text-xs  leading-[18px]">
                  +{resumeData?.phone_number}
                </p>
                <p className="text-xs">{resumeData?.address}</p>
                <p className="text-xs">{resumeData?.email}</p>
                <div className="space-y-3 flex flex-col">
                  {resumeData?.linked_in_profile && (
                    <a
                      href={resumeData?.linked_in_profile}
                      target="_blank"
                      className="text-xs"
                    >
                      {resumeData?.linked_in_profile}
                    </a>
                  )}
                  {resumeData?.xing_profile && (
                    <a
                      href={resumeData?.xing_profile}
                      target="_blank"
                      className="text-xs"
                    >
                      {resumeData?.xing_profile}
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-sm font-medium tracking-[2px] py-1 bg-[#696969]  text-[#fff] text-center leading-[24px]">
               {allRedumeData?.data?.resume_language === "Deutsch" || allRedumeData?.data?.resume_language === "German" ? "AUSBILDUNG" : "EDUCATION" }
              </h2>

              {resumeData?.educations?.map((edu, index) => (
                <div className="mt-3">
                  <p className="font-medium leading-[18px] text-xs">
                    {edu?.institute_name}
                  </p>
                  <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                    {edu?.degree}
                  </p>
                  <p className="text-xs leading-[18px]">
                    {dayjs(edu?.start_date).format("MMMM YYYY")} -{" "}
                    {dayjs(edu?.end_date).format("MMMM YYYY")}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-[1px] bg-[#D9D9D9]"></div>
          {/* Right Column */}
          <div className="w-[60%] space-y-6">
            {
              resumeData.work_experiences?.length > 0 &&(
                <div>
              <h2 className="text-sm font-medium tracking-[2px] py-1 bg-[#696969] mb-3 text-[#fff] text-center leading-[24px]">
               {allRedumeData?.data?.resume_language === "Deutsch" || allRedumeData?.data?.resume_language === "German" ?  "ARBEITSBEREICH" : "WORK EXPERIENCE"}
              </h2>
              {resumeData?.work_experiences?.map((exp, index) => (
                <div key={index} className="mt-3">
                  <p className="font-medium leading-[18px] text-xs">
                    {exp?.job_title}
                  </p>
                  <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                    {exp?.company_name}{" "}
                    <span>{`${dayjs(exp?.start_date).format("YYYY")} - ${dayjs(
                      exp?.end_date
                    ).format("YYYY")}`}</span>
                    {/* Bavaria Tech Systems AG, Munich <span>2015 – 2018</span> */}
                  </p>
                  <p className="text-xs leading-[20px] mt-2">
                    {exp?.responsibilities}
                  </p>
                </div>
              ))}
            </div>
              )
            }
{
 resumeData?.courses_and_training_details?.length > 0 &&(
            <div>
              <h2 className="text-sm font-medium tracking-[2px] py-1 bg-[#696969] mb-3 text-[#fff] text-center leading-[24px]">
              {allRedumeData?.data?.resume_language === "Deutsch" || allRedumeData?.data?.resume_language === "German" ? "Kurs und Training" : "COURSES AND TRAINING" }
              </h2>
              {resumeData?.courses_and_training_details?.map(
                (training, index) => (
                  <div key={index} className="mt-3">
                    <p className="font-medium leading-[18px] text-xs">
                      {training?.course_name}
                    </p>
                    <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                      {training?.name_of_institute}
                    </p>
                    <p className="text-xs leading-[20px]">
                      {dayjs(training?.start_date).format("MMMM YYYY")} -{" "}
                      {dayjs(training?.end_date).format("MMMM YYYY")}
                    </p>
                  </div>
                )
              )}
            </div>
  
)}

            <div>
              <h2 className="text-sm font-medium tracking-[2px] py-1 bg-[#696969] mb-3 text-[#fff] text-center leading-[24px]">
             {allRedumeData?.data?.resume_language === "Deutsch" || allRedumeData?.data?.resume_language === "German" ?  "FÄHIGKEITEN" : "SKILLS"}
              </h2>
                 <ul className="text-xs  flex gap-3 flex-wrap">
                {resumeData?.skills?.map((skill, index) => (
                  <li key={index} className="flex justify-between items-center">
                    {skill?.skill}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-medium tracking-[2px] py-1 bg-[#696969] mb-3 text-[#fff] text-center leading-[24px]">
             {allRedumeData?.data?.resume_language === "Deutsch" || allRedumeData?.data?.resume_language === "German" ?"SPRACHEN" :"LANGUAGES" }
              </h2>
              <ul className="text-xs space-y-3">
                {resumeData?.languages?.map((lang, index) => (
                  <li key={index} className="flex justify-between items-center">
                    {lang?.language} - {lang?.level}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeEleven;
