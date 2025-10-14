import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import {
  FaPhoneAlt,
  FaLinkedin,
  FaMapMarkerAlt,
  FaEnvelope,
  FaXing,
} from "react-icons/fa";
import dayjs from "dayjs";
import { useResume } from "@/providers/ResumeContext";
import DownloadButton from "../common/DownloadButton";
import WaterMark from "@/assets/images/watermark.png";
import { useStatusCheck } from "../common/useStatusCheck";
const ResumeThree = () => {
  const { allRedumeData } = useResume();
  const resumeData = allRedumeData?.data || [];
  const resumeRef = useRef();

  const { data: status } = useStatusCheck();
 

  return (
    <div className="min-h-screen  ">
         <DownloadButton resumeRef={resumeRef}  />
      <div
        ref={resumeRef}
        className="bg-white text-black px-5 relative py-8 w-[210mm]  mx-auto h-[297mm] overflow-hidden "
      >
        {/* Header */}
         {status?.water_mark && (
          <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
            <img
              src={WaterMark}
              className="max-w-full max-h-full object-contain opacity-80"
            />
          </div>
        )}
        <div className="flex w-full justify-between">
          <div className="w-[60%]">
            <div className="">
              <h1 className="text-[32px] font-bold tracking-[2px] text-[#484848] urbanist">
                {resumeData.first_name}{" "}
                <span className="font-semibold ">{resumeData.last_name}</span>
              </h1>
            </div>
            <div>
              <p className="tracking-[3px] text-[#484848]  uppercase leading-[24px] ">
                {resumeData.job_title}
              </p>
            </div>
          </div>
          <div className="space-y-3 w-[40%]">
            <p className="text-xs flex items-center gap-2 leading-[18px]">
              <FaPhoneAlt className="text-[12px] " />
              +{resumeData.phone_number}
            </p>
            <p className="text-xs flex items-center gap-2">
              <FaMapMarkerAlt className="text-[12px]" />
              {resumeData.address}
            </p>
            <p className="text-xs flex items-center gap-2">
              <FaEnvelope className="text-[12px]" />
              {resumeData.email}
            </p>
            {resumeData.linked_in_profile && (
              <p className="text-xs flex items-center gap-2">
                <FaLinkedin className="text-[12px]" />
                {resumeData.linked_in_profile}
              </p>
            )}

            {resumeData.xing_profile && (
              <p className="text-xs flex items-center gap-2">
                <FaXing className="text-[12px]" />
                {resumeData.xing_profile}
              </p>
            )}
          </div>
        </div>
        <div className="border-b border-[#D9D9D9] mt-6"></div>
{/* Body */}
<div className="flex justify-between gap-5 mt-6 h-full">
  {/* Left Column */}
  <div className="w-[45%] space-y-3 bg-[#F5F5F5] p-4 rounded-md">
    <div>
      <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px]">
        {allRedumeData?.data?.resume_language === "Deutsch" || allRedumeData?.data?.resume_language === "German" ? "Über mich" : "About Me"}
      </h2>
      <p className="text-xs leading-[18px] text-[#171717]">
        {resumeData.about}
      </p>
    </div>
    <div className="border-b border-[#D9D9D9] "></div>
{/* Experience */}
{resumeData.courses_and_training_details?.length > 0 && (
  <>
    <div>
      <h2 className="text-sm tracking-[2px] text-[#666] leading-[24px]">
        {allRedumeData?.data?.resume_language === "Deutsch" || allRedumeData?.data?.resume_language === "German" ?  "Kurs und Training" : "Training"}
      </h2>
      {resumeData.courses_and_training_details?.length > 0 &&
        resumeData.courses_and_training_details.map((training, index) => (
          <div key={index} className="mt-2">
            <p className="font-medium leading-[18px] text-xs">
              {training.name_of_institute}
            </p>
            <p className="text-xs leading-[18px] font-medium">
              {training.course_name}
            </p>
            <p className="text-xs leading-[20px]">
              {dayjs(training.start_date).format("YYYY")} –{" "}
              {dayjs(training.end_date).format("YYYY")}
            </p>
          </div>
        ))}
    </div>
  
    <div className="border-b border-[#D9D9D9] "></div>
  </>
)}


    <div>
      <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px] uppercase">
        {allRedumeData?.data?.resume_language === "Deutsch" || allRedumeData?.data?.resume_language === "German" ? "Fähigkeiten" : "Skills"}
      </h2>
      <ul className="text-xs flex gap-3 flex-wrap">
        {resumeData.skills?.length > 0 &&
          resumeData.skills.map((skill, index) => (
            <li key={index}>{skill?.skill}</li>
          ))}
      </ul>
    </div>

    <div className="border-b border-[#D9D9D9] "></div>

    <div>
      <h2 className="text-sm tracking-[2px] text-[#666] leading-[24px] uppercase">
        {allRedumeData?.data?.resume_language === "Deutsch" || allRedumeData?.data?.resume_language === "German" ?  "Sprachen" : "Languages"}
      </h2>
      {resumeData.languages?.length > 0 &&
        resumeData.languages.map((lang, index) => (
          <p key={index} className="text-xs flex justify-between items-center mt-2">
            {lang.language} <span>{lang.level}</span>
          </p>
        ))}
    </div>
  </div>

  {/* Right Column */}
  <div className="w-[55%] space-y-3">
    {resumeData.work_experiences?.length > 0 && (
      <div>
        <h2 className="text-sm tracking-[2px] text-[#666] leading-[24px] uppercase">
          {allRedumeData?.data?.resume_language === "Deutsch" || allRedumeData?.data?.resume_language === "German" ? "Berufserfahrung" : "Work Experience"}
        </h2>
        {resumeData.work_experiences.map((exp, index) => (
          <div key={index} className="mt-2">
            <p className="font-medium leading-[18px] text-xs">{exp.job_title}</p>
            <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
              {exp.company_name}
              <span>
                {dayjs(exp.start_date).format("YYYY")} – {dayjs(exp.end_date).format("YYYY")}
              </span>
            </p>
            <p className="text-xs leading-[20px] mt-2">{exp.responsibilities}</p>
          </div>
        ))}
      </div>
    )}

    <div className="border-b border-[#D9D9D9] "></div>

    <div>
      <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px] uppercase">
        {allRedumeData?.data?.resume_language === "Deutsch" || allRedumeData?.data?.resume_language === "German" ? "Bildung" : "Education"}
      </h2>
      {resumeData.educations?.length > 0 &&
        resumeData.educations.map((edu, index) => (
          <div key={index} className=" space-y-1">
            <p className="font-medium leading-[18px] text-xs">{edu.institute_name}</p>
            <p className="text-xs leading-[18px] font-medium">{edu.degree}</p>
            <p className="text-xs leading-[18px]">
              {dayjs(edu.start_date).format("MMMM YYYY")} – {dayjs(edu.end_date).format("MMMM YYYY")}
            </p>
          </div>
        ))}
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default ResumeThree;
