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
import { useResume } from "@/providers/ResumeContext";
import dayjs from "dayjs";
import DownloadButton from "../common/DownloadButton";
import WaterMark from "@/assets/images/watermark.png";
import { useStatusCheck } from "../common/useStatusCheck";
const ResumeTen = () => {
  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;
  const { allRedumeData } = useResume();
  const resumeData = allRedumeData?.data || [];
  const resumeRef = useRef();

  const { data: status } = useStatusCheck();
  

  return (
    <div className="min-h-screen  ">
         <DownloadButton resumeRef={resumeRef}  />
      <div
        ref={resumeRef}
        className="bg-white text-black w-[210mm] relative  mx-auto  !urbanist h-[297mm] overflow-hidden"
      >
         {status?.water_mark && (
          <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
            <img
              src={WaterMark}
              className="max-w-full max-h-full object-contain opacity-80"
            />
          </div>
        )}
        {/* Body */}
        <div className="flex justify-between  w-full h-full">
          {/* Left Column */}
          <div className="w-[40%] space-y-6 bg-[#1B1E2F]  text-white py-10 ">
            {/* Header */}
            <div className="w-[100px] h-[100px] mx-auto shrink-0">
              <img
                src={VITE_IMG_URL + resumeData?.profile_photo || user}
                alt="Alex Stevens"
                className="w-full h-full object-cover rounded-full border border-[#D9D9D9]"
              />
            </div>
            <div>
              <div className="space-y-3 ">
                <h2 className="text-sm font-semibold tracking-[2px] mb-3  leading-[24px] bg-[#fff]/15 px-4 py-2 border-l-[5px] border-[#FECB00]">
                 {allRedumeData?.data?.resume_language === "en" ? "CONTACT" : "KONTAKT"}
                </h2>
                <div className="px-4 space-y-2">
                  <p className="text-xs flex items-center gap-2 leading-[18px] ">
                    <FaPhoneAlt className="text-[12px] " />
                    {resumeData?.phone_number}
                  </p>
                  <p className="text-xs flex items-center gap-2">
                    <FaMapMarkerAlt className="text-[12px]" />
                    {resumeData?.address}
                  </p>
                  <p className="text-xs flex items-center gap-2">
                    <FaEnvelope className="text-[12px]" />
                    {resumeData?.email}
                  </p>
                  {resumeData?.xing_profile && (
                    <a
                      href={resumeData?.linked_in_profile}
                      target="_blank"
                      className="text-xs flex items-center gap-2"
                    >
                      <FaLinkedin className="text-[12px]" />
                      {resumeData?.linked_in_profile}
                    </a>
                  )}
                  {resumeData?.xing_profile && (
                    <a
                      href={resumeData?.xing_profile}
                      target="_blank"
                      className="text-xs flex items-center gap-2"
                    >
                      <FaXing className="text-[12px]" />
                      {resumeData?.xing_profile}
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold tracking-[2px] mb-3  leading-[24px] bg-[#fff]/15 px-4 py-2 border-l-[5px] border-[#FECB00]">
                {allRedumeData?.data?.resume_language === "en" ? "TRAINING" : "AUSBILDUNG"}
              </h2>
              <div className="space-y-3">
                {resumeData?.courses_and_training_details?.map(
                  (training, index) => (
                    <div key={index} className="px-4 space-y-1">
                      <p className="font-medium leading-[18px] text-xs">
                        {training?.name_of_institute}
                      </p>
                      <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                        {training?.course_name}
                      </p>
                      <p className="text-xs leading-[20px]">
                        {dayjs(training?.start_date).format("MMMM YYYY")} –{" "}
                        {training?.end_date
                          ? dayjs(training?.end_date).format("MMMM YYYY")
                          : "Present"}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-[2px] mb-3  leading-[24px] bg-[#fff]/15 px-4 py-2 border-l-[5px] border-[#FECB00]">
                {allRedumeData?.data?.resume_language === "en" ? "LANGUAGES" : "SPRACHEN"}
              </h2>
              <div className="space-y-3 px-4">
                {resumeData?.languages?.map((language, index) => (
                  <p
                    key={index}
                    className="text-xs flex justify-between items-center "
                  >
                    {language?.language} <span>{language?.level}</span>
                  </p>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-sm font-semibold tracking-[2px] mb-3  leading-[24px] bg-[#fff]/15 px-4 py-2 border-l-[5px] border-[#FECB00]">
               {allRedumeData?.data?.resume_language === "en" ? "SKILLS" : "FÄHIGKEITEN"}
              </h2>
              <ul className="text-xs space-y-3 list-disc list-inside px-4">
                {resumeData?.skills?.map((skill, index) => (
                  <li key={index} className="">
                    {skill?.skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Right Column */}
          <div className="w-[60%] space-y-6 py-8 mt-8  ">
            <div className="bg-[#F7F7F7] px-4 py-5 border-l-[5px] border-[#FECB00]">
              <h2 className="text-2xl font-bold tracking-[0.5px] pb-3 text-[#0D0D0D] leading-[24px]">
                {resumeData?.first_name} {resumeData?.last_name}
              </h2>
              <p className="text-2xl font-normal leading-[24px] text-[#171717]">
                {resumeData?.job_title}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-[2px] mb-3 text-[#0D0D0D] leading-[24px] bg-[#F7F7F7] px-4 py-2 border-l-[5px] border-[#FECB00]">
           {allRedumeData?.data?.resume_language === "en" ? "ABOUT ME" : "ÜBER MICH"}
              </h2>
              <p className="text-xs leading-[18px] text-[#171717] px-4">
                {resumeData?.about}
              </p>
            </div>

            <div className="flex flex-col  justify-center">
              <h2 className="text-sm font-semibold tracking-[2px] mb-3  leading-[24px] bg-[#F7F7F7] px-4 py-2 border-l-[5px] border-[#FECB00]">
                EDUCATION
              </h2>
              <div className="space-y-3 px-4">
                {resumeData?.educations?.map((education, index) => (
                  <div key={index} className="space-y-1">
                    <p className="font-medium leading-[18px] text-xs">
                      {education?.institute_name}
                    </p>
                    <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                      {education?.degree}
                    </p>
                    <p className="text-xs leading-[18px]">
                      {dayjs(education?.start_date).format("MMMM YYYY")} –{" "}
                      {education?.end_date
                        ? dayjs(education?.end_date).format("MMMM YYYY")
                        : "Present"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
           {
            resumeData.work_experiences.length > 0 &&(
               <div>
              <h2 className="text-sm font-semibold tracking-[2px] mb-3  leading-[24px] uppercase bg-[#F7F7F7] px-4 py-2 border-l-[5px] border-[#FECB00]">
               {allRedumeData?.data?.resume_language === "en" ? "WORK EXPERIENCE" : "ARBEITserfahrung"  }
              </h2>
              <div className="space-y-3 px-4">
                {resumeData?.work_experiences?.map((experience, index) => (
                  <div key={index} className="space-y-1">
                    <p className="font-medium leading-[18px] text-xs">
                      {experience?.job_title}
                    </p>
                    <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                      {experience?.company_name}
                      <span>
                        {dayjs(experience?.start_date).format("MMM YYYY")} –{" "}
                        {experience?.end_date
                          ? dayjs(experience?.end_date).format("MMM YYYY")
                          : "Present"}
                      </span>
                    </p>
                    <p className="text-xs leading-[20px] mt-2">
                      {experience?.responsibilities}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            )
           }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTen;
