import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import user from "../../assets/images/user.png";
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
const ResumeFive = () => {
  const { allRedumeData } = useResume();
  const resumeData = allRedumeData?.data || [];
  const resumeRef = useRef();

  



  return (
    <div className="min-h-screen  ">
         <DownloadButton resumeRef={resumeRef}  />
      <div
        ref={resumeRef}
        className="bg-white text-black px-5  w-[210mm] h-[297mm] mx-auto !urbanist"
      >
        {/* Body */}
        <div className="flex justify-between gap-5 h-full ">
          {/* Left Column */}
          <div className="w-[40%] space-y-6  rounded-md py-10">
            {/* Header */}
            <div className="flex w-full flex-col text-center">
              {/* Left: Name and Title */}
              <div className="text-[64px] font-bold tracking-[2px]">
                {`${resumeData.first_name?.charAt(0) || ""}${
                  resumeData.last_name?.charAt(0) || ""
                }`}
              </div>
              <h1 className="text-[32px] font-light tracking-[2px] text-[#484848] leading-tight">
                {resumeData.first_name}{" "}
                <span className="font-semibold">{resumeData.last_name}</span>
              </h1>
              <p className="tracking-[3px] text-[#484848] py-2 uppercase leading-[24px] ">
                {resumeData.job_title}
              </p>
              <div className="border-b-[2px] max-w-[100px] mx-auto w-full border-[#0D0D0D] "></div>
            </div>
            <div>
              <div className="space-y-3 ">
                <p className="text-xs flex items-center gap-2 leading-[18px]">
                  <FaPhoneAlt className="text-[12px] " />
                  {resumeData.phone_number}
                </p>
                <p className="text-xs flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[12px]" />
                  {resumeData.address}
                </p>
                <p className="text-xs flex items-center gap-2">
                  <FaEnvelope className="text-[12px]" />
                  {resumeData.email}
                </p>
                {
                  resumeData.linked_in_profile && (
                  <a href={resumeData.linked_in_profile} target="_blank" className="text-xs flex items-center gap-2">
                    <FaLinkedin className="text-[12px]" />
                    {resumeData.linked_in_profile}
                  </a>
                  )
                }
                
                {resumeData.xing_profile && (
                  <a
                    href={resumeData.xing_profile}
                    target="_blank"
                    className="text-xs flex items-center gap-2"
                  >
                    <FaXing className="text-[12px]" />
                    {resumeData.xing_profile}
                  </a>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <h2 className="text-sm font-semibold tracking-[2px] pb-3 text-[#0D0D0D] leading-[24px]">
                SKILL
              </h2>
              <ul className="text-xs space-y-3 text-center">
                {resumeData.skills?.map((skill, index) => (
                  <li key={index} className="flex justify-center">
                    <span className="">
                      {skill?.skill}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-center justify-center">
              <h2 className="text-sm font-semibold tracking-[2px]  text-[#0D0D0D] leading-[24px]">
                EDUCATION
              </h2>
              {
                resumeData.educations && resumeData.educations.length > 0 && (
                <div className="space-y-3 mt-3">
                  {resumeData.educations.map((edu, index) => (
                    <div key={index} className="text-center">
                      <p className="font-medium leading-[18px] text-xs">
                        {edu.institute_name}
                      </p>
                      <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                        {edu.degree}
                          </p>
                        <p className="text-xs leading-[18px]">
                          {dayjs(edu.start_date).format("MMM YYYY")} -{" "}
                          {dayjs(edu.end_date).format("MMM YYYY")}
                        </p>
                    
                    </div>
                  ))}
                </div>
                )
              }

            </div>
          </div>
          <div className="w-[1px] bg-[#0D0D0D]"></div>
          {/* Right Column */}
          <div className="w-[60%] space-y-6 py-8 mt-8">
            <div>
              <h2 className="text-sm font-semibold tracking-[2px] pb-3 text-[#0D0D0D] leading-[24px]">
                ABOUT
              </h2>
              <p className="text-xs leading-[18px] text-[#171717]">
                {resumeData.about}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-[2px]  text-[#0D0D0D] leading-[24px]">
                EXPERIENCE
              </h2>
              {
                resumeData.work_experiences && resumeData.work_experiences.length > 0 && (
                <div className="space-y-3 mt-3">
                  {resumeData.work_experiences.map((exp, index) => (
                    <div key={index}>
                      <p className="font-medium leading-[18px] text-xs">
                        {exp.job_title}
                      </p>
                      <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                        {exp.company_name}{" "}
                        <span>
                          {dayjs(exp.start_date).format("YYYY")} –{" "}
                          {dayjs(exp.end_date).format("YYYY")}
                        </span>
                      </p>
                      <p className="text-xs leading-[20px] mt-2">
                        {exp.responsibilities}
                      </p>
                    </div>
                  ))}
                </div>
                )
              }

            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-[2px] text-[#0D0D0D] leading-[24px] ">
                TRAINING
              </h2>
          {
                resumeData.courses_and_training_details && resumeData.courses_and_training_details.length > 0 && (
                  resumeData.courses_and_training_details.map((training, index) => (
                    <div key={index} className="mt-3">
                <p className="font-medium leading-[18px] text-xs">
                  {training.course_name}
                </p>
                <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                {                  training.name_of_institute}
                </p>
                <p className="text-xs leading-[20px]">
                  {dayjs(training.start_date).format("MMM YYYY")} –{" "}
                  {dayjs(training.end_date).format("MMM YYYY")}
                </p>
              </div>
                  ))
                )
          }
              
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-[2px]  text-[#0D0D0D] leading-[24px]">
                LANGUAGE
              </h2>
             
              {resumeData.languages && resumeData.languages.length > 0 && (
                resumeData.languages.map((lang, index) => (
                  <div key={index} className="mt-3">
                    <p className="text-xs flex justify-between items-center mt-2">
                      {lang.language} <span>{lang.level}</span>
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeFive;
