import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import {
  FaPhoneAlt,
  FaLinkedin,
  FaMapMarkerAlt,
  FaEnvelope,
  FaXing,
} from "react-icons/fa";
import { useResume } from "@/providers/ResumeContext";
import dayjs from "dayjs";
import DownloadButton from "../common/DownloadButton";
const ResumeTwo = () => {
  const { allRedumeData } = useResume();
  const resumeData = allRedumeData?.data || [];
  const resumeRef = useRef();



  return (
    <div className="min-h-screen ">
         <DownloadButton resumeRef={resumeRef}  />
      <div
        ref={resumeRef}
        className="bg-white text-black px-4 py-8 w-[210mm] mx-auto h-[297mm] overflow-hidden "
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-[32px] font-light tracking-[7px] text-[#484848] !playfair">
            {resumeData.first_name}
            <span className="font-semibold "> {resumeData.last_name}</span>
          </h1>
        </div>
        <div>
          <p className="tracking-[3px] text-[#484848]  uppercase leading-[24px] text-center  mb-2 border-[#D9D9D9]">
            {resumeData.job_title}
          </p>
        </div>
        <div className="border-b border-[#D9D9D9] max-w-[100px] mx-auto mt-4"></div>

        {/* Body */}
        <div className="flex justify-between gap-5 mt-6 h-full">
          {/* Left Column */}
          <div className="w-[40%] space-y-6">
            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px]">
                ABOUT
              </h2>
              <p className="text-xs leading-[18px] text-[#171717]">
                {resumeData.about}
              </p>
            </div>

            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px]">
                CONTACT
              </h2>
              <div className="space-y-3">
                <p className="text-xs flex items-center gap-2 leading-[18px]">
                  <FaPhoneAlt className="text-[12px] text-[#666]" />
                  {resumeData.phone_number}
                </p>
                <p className="text-xs flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[12px] text-[#666]" />
                  {resumeData.address}
                </p>
                <p className="text-xs flex items-center gap-2">
                  <FaEnvelope className="text-[12px] text-[#666]" />
                  alexstevens@gmail.com
                </p>
                {resumeData.linked_in_profile && (
                  <p className="text-xs flex items-center gap-2">
                    <FaLinkedin className="text-[12px] text-[#666]" />
                    {resumeData.linked_in_profile}
                  </p>
                )}
                {resumeData.xing_profile && (
                  <p className="text-xs flex items-center gap-2">
                    <FaXing className="text-[12px] text-[#666]" />
                    {resumeData.xing_profile}
                  </p>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-sm tracking-[2px]  text-[#666] leading-[24px]">
                EDUCATION
              </h2>
              {resumeData.educations &&
                resumeData.educations.length > 0 &&
                resumeData.educations.map((edu, index) => (
                  <div key={index} className="mt-4">
                    <p className="font-medium leading-[18px] text-xs">
                      {edu.institute_name}
                    </p>
                    <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                      {edu.degree}
                    </p>
                    <p className="text-xs leading-[18px]">
                      {dayjs(edu.start_date).format("YYYY")} –{" "}
                      {dayjs(edu.end_date).format("YYYY")}
                    </p>
                  </div>
                ))}
            </div>
          </div>
          <div className="w-[1px] bg-[#D9D9D9]"></div>
          {/* Right Column */}
          <div className="w-[60%] space-y-3">
          {
            resumeData.work_experiences?.length > 0 &&(
                <div>
              <h2 className="text-sm tracking-[2px]  text-[#666] leading-[24px]">
                EXPERIENCE
              </h2>
              {resumeData.work_experiences &&
                resumeData.work_experiences.length > 0 &&
                resumeData.work_experiences.map((exp, index) => (
                  <div key={index} className="mt-4">
                    <p className="font-medium leading-[18px] text-xs">
                      {exp.job_title}
                    </p>
                    <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                      {exp.company_name}
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
            <div className="border-b border-[#D9D9D9] "></div>
            <div>
              <h2 className="text-sm tracking-[2px]  text-[#666] leading-[24px] ">
                TRAINING
              </h2>
              {
                resumeData.courses_and_training_details &&
                resumeData.courses_and_training_details.length > 0 &&
                resumeData.courses_and_training_details.map((edu, index) => (
                  <div key={index} className="mt-4">
                    <p className="font-medium leading-[18px] text-xs">
                      {edu.name_of_institute}
                    </p>
                    <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                      {edu.course_name}
                    </p>
                    <p className="text-xs leading-[18px]">
                      {dayjs(edu.start_date).format("YYYY")} –{" "}
                      {dayjs(edu.end_date).format("YYYY")}
                    </p>
                  </div>
                ))
              }

            </div>
            <div className="border-b border-[#D9D9D9] "></div>
            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px]">
                SKILL
              </h2>
                 <ul className="text-xs  flex gap-3 flex-wrap">
                {
                resumeData.skills && resumeData.skills.length > 0
                  ? resumeData.skills.map((skill, index) => (
                      <li key={index}>{skill?.skill}</li>
                    ))
                  : "No skills listed"
                }
               
              </ul>
            </div>
            <div className="border-b border-[#D9D9D9] "></div>
            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px]">
                LANGUAGE
              </h2>
              {
                resumeData.languages && resumeData.languages.length > 0
                  ? resumeData.languages.map((lang, index) => (
                      <p key={index} className="text-xs flex justify-between items-center mb-3">
                        {lang.language} <span>{lang.level}</span>
                      </p>
                    ))
                  : "No languages listed"
              }
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTwo;
