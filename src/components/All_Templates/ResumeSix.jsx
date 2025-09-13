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
const ResumeSix = () => {
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
        className="bg-white text-black relative  w-[210mm] mx-auto !urbanist h-[297mm] overflow-hidden"
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
        <div className="flex w-full relative justify-between px-12 py-9 bg-[#373739]">
          {/* Left: Name and Title */}
          <div className="">
            <h1 className="text-[24px] font-bold tracking-[2px] text-[#fff] leading-tight">
              {resumeData?.first_name} {resumeData?.last_name}
            </h1>
            <p className="tracking-[3px] text-[#fff]  uppercase leading-[24px] mt-2">
              {resumeData?.job_title}
            </p>
          </div>

          {/* Right: Profile Image */}
          <div className="w-[100px] h-[100px] shrink-0 absolute right-16 -bottom-12">
            <img
              src={VITE_IMG_URL + resumeData?.profile_photo || user}
              alt="Alex Stevens"
              className="w-full h-full object-cover rounded-full border border-[#FF4089]"
            />
          </div>
        </div>

        {/* Body */}
        <div className="flex justify-between gap-5 px-6 py-8 mt-12 h-full">
          {/* Left Column */}
          <div className="w-[50%] space-y-4  rounded-md">
           {
            resumeData.work_experiences?.length > 0 &&(
               <div>
              <div className="flex pb-3 items-center gap-1">
                <h2 className="text-sm tracking-[2px]  text-[#171717] font-semibold leading-[24px] uppercase">
                  {allRedumeData?.data?.resume_language === "en" ? "Work Experience" : "Arbeitserfahrung"}
                </h2>
                <div className="flex-1 border-b-[2px] mt-2 border-[#D9D9D9] max-w-[100px]"></div>
              </div>
              <div className=" border-l border-[#FF4089] pl-2 space-y-2">
                {resumeData?.work_experiences?.map((experience, index) => (
                  <div key={index}>
                    <p className="font-semibold leading-[18px]  text-xs">
                      {experience?.job_title}
                    </p>
                    <p className="text-xs leading-[18px] font-semibold flex justify-between items-center">
                      {experience?.company_name}
                      <span>
                        {dayjs(experience?.start_date).format("MMM YYYY")} -{" "}
                        {dayjs(experience?.end_date).format("MMM YYYY")}
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

            <div>
              <div className="flex pb-3 items-center gap-1">
                <h2 className="text-sm tracking-[2px]  text-[#171717] font-semibold leading-[24px] uppercase">
                 {allRedumeData?.data?.resume_language === "en" ? "Education" : "Ausbildung"}
                </h2>
                <div className="flex-1 border-b-[2px] mt-2 border-[#D9D9D9] max-w-[100px]"></div>
              </div>
              <div className=" border-l border-[#FF4089] pl-2 space-y-2">
                {resumeData?.educations?.map((education, index) => (
                  <div key={index} className="space-y-1">
                    <p className="font-semibold leading-[18px] text-xs">
                      {education?.institute_name}
                    </p>
                    <p className="text-xs leading-[18px] font-semibold flex justify-between items-center">
                      {education?.degree}
                    </p>
                    <p className="text-xs leading-[18px]">
                      {dayjs(education?.start_date).format("MMM YYYY")} –{" "}
                      {dayjs(education?.end_date).format("MMM YYYY")}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex pb-3 items-center gap-1">
                <h2 className="text-sm tracking-[2px]  text-[#171717] font-semibold leading-[24px] uppercase">
               {allRedumeData?.data?.resume_language === "en" ? "Courses and Training" : "Kurse und Schulungen"}
                </h2>
                <div className="flex-1 border-b-[2px] mt-2 border-[#D9D9D9] max-w-[100px]"></div>
              </div>
              <div className=" border-l border-[#FF4089] pl-2 space-y-2">
                {resumeData?.courses_and_training_details?.map(
                  (training, index) => (
                    <div key={index} className="space-y-1">
                      <p className="font-semibold leading-[18px] text-xs">
                        {training?.name_of_institute}
                      </p>
                      <p className="text-xs leading-[18px] font-semibold flex justify-between items-center">
                        {training?.course_name}
                      </p>
                      <p className="text-xs leading-[20px]">
                        {dayjs(training?.start_date).format("MMM YYYY")} –{" "}
                        {dayjs(training?.end_date).format("MMM YYYY")}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="border-r border-[#D9D9D9]"></div>
          {/* Right Column */}
          <div className="w-[50%] space-y-4">
            <div>
              <h2 className="text-sm tracking-[2px] text-center pb-3 text-[#171717] uppercase font-semibold leading-[24px] ">
                {allRedumeData?.data?.resume_language === "en" ? "About Me" : "Über mich"}
              </h2>
              <p className="text-xs leading-[18px] text-[#171717]">
                {resumeData?.about}
              </p>
            </div>
            <div className="border-b border-[#D9D9D9]"></div>
            <div className="text-center">
              <h2 className="text-sm  tracking-[2px] pb-3 text-[#171717] font-semibold leading-[24px] uppercase">
              {allRedumeData?.data?.resume_language === "en" ? "Contact" : "Kontakt"}
              </h2>
              <div className="space-y-3 text-center ">
                <p className="text-xs flex flex-col items-center gap-1 leading-[18px]">
                  <FaPhoneAlt className="text-[#79819A] text-xl p-1 border-[#FF4089] border rounded-full" />
                  {resumeData?.phone_number}
                </p>
                <p className="text-xs flex flex-col items-center gap-1">
                  <FaMapMarkerAlt className="text-[#79819A] text-xl p-1 border-[#FF4089] border rounded-full" />
                  {resumeData?.address}
                </p>
                <p className="text-xs flex flex-col items-center gap-1">
                  <FaEnvelope className="text-[#79819A] text-xl p-1 border-[#FF4089] border rounded-full" />
                  {resumeData?.email}
                </p>
                {resumeData?.linked_in_profile && (
                  <a
                    href={resumeData?.linked_in_profile}
                    target="_blank"
                    className="text-xs flex flex-col items-center gap-1"
                  >
                    <FaLinkedin className="text-[#79819A] text-xl p-1 border-[#FF4089] border rounded-full" />
                    {resumeData?.linked_in_profile}
                  </a>
                )}
                {resumeData?.xing_profile && (
                  <a
                    href={resumeData?.xing_profile}
                    target="_blank"
                    className="text-xs flex flex-col items-center gap-1"
                  >
                    <FaXing className="text-[#79819A] text-xl p-1 border-[#FF4089] border rounded-full" />
                    {resumeData?.xing_profile}
                  </a>
                )}
              </div>
            </div>
            <div className="border-b border-[#D9D9D9]"></div>
            <div className="text-center">
              <h2 className="text-sm tracking-[2px] pb-3 text-[#171717] font-semibold leading-[24px] uppercase">
               {allRedumeData?.data?.resume_language === "en" ? "Skills" : "Fähigkeiten"}
              </h2>
              <ul className="text-xs space-y-3">
                {resumeData?.skills?.map((skill, index) => (
                  <li key={index} className="flex flex-col items-center gap-1">
                    <span>{skill?.skill}</span>
                    <div className="flex justify-center gap-2">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="h-[12px] w-[12px] bg-[#606060] rounded-full"
                        ></div>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-b border-[#D9D9D9]"></div>
            <div>
              <h2 className="text-sm tracking-[2px] text-center pb-3 text-[#171717] font-semibold leading-[24px] uppercase">
               {allRedumeData?.data?.resume_language === "en" ? "Languages" : "Sprachen"}
              </h2>
              {resumeData?.languages?.map((language, index) => (
                <p className="text-xs flex justify-between items-center ">
                  {language?.language} <span>{language?.level}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeSix;
