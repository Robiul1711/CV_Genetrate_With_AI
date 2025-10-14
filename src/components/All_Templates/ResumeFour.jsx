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
import WaterMark from "@/assets/images/watermark.png";
import { useStatusCheck } from "../common/useStatusCheck";
const ResumeFour = () => {
  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;
  const { allRedumeData } = useResume();
  const resumeData = allRedumeData?.data || [];

  const { data: status } = useStatusCheck();
  const resumeRef = useRef();

  return (
    <div className="min-h-screen  !text-black ">
      <DownloadButton resumeRef={resumeRef} />
      <div
        ref={resumeRef}
        className="bg-white text-black relative px-5 py-8  w-[210mm]  h-[297mm] overflow-hidden mx-auto urbanist"
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
        <div className="flex w-full justify-between items-start gap-4">
          {/* Left: Name and Title */}
          <div className="w-[80%]">
            <h1 className="text-[24px] font-light tracking-[2px] text-[#484848] leading-tight">
              {resumeData?.first_name} <br />
              <span className="font-semibold">{resumeData?.last_name}</span>
            </h1>
            <p className="tracking-[3px] text-[#484848] border-y border-[#D9D9D9] py-2 uppercase leading-[24px] mt-2">
              {resumeData?.job_title}
            </p>
          </div>

          {/* Right: Profile Image */}
          <div className="w-[100px] h-[100px] shrink-0">
            <img
              src={
                resumeData?.profile_photo === null
                  ? user
                  : VITE_IMG_URL + resumeData?.profile_photo
              }
              alt="Alex Stevens"
              className="w-full h-full object-cover rounded-full border border-[#D9D9D9]"
            />
          </div>
        </div>

        {/* Body */}
        <div className="flex justify-between h-full gap-5 mt-6">
          {/* Left Column */}
          <div className="w-[40%] space-y-3 rounded-md">
            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px]">
                {allRedumeData?.data?.resume_language === "Deutsch" || allRedumeData?.data?.resume_language === "German"
                  ? "KONTAKT"
                  : "CONTACT"}
              </h2>
              <div className="space-y-3">
                <p className="text-xs flex items-center gap-2 leading-[18px]">
                  <FaPhoneAlt className="text-[12px]" />
                  +{resumeData?.phone_number}
                </p>
                <p className="text-xs flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[12px]" />
                  {resumeData?.address}
                </p>
                <p className="text-xs flex items-center gap-2">
                  <FaEnvelope className="text-[12px]" />
                  {resumeData?.email}
                </p>
                {resumeData?.linked_in_profile && (
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

            <div className="border-b border-[#D9D9D9] "></div>
{/* Education */}
{resumeData?.courses_and_training_details?.length > 0 && (
  <>
            <div>
              <h2 className="text-sm tracking-[2px] text-[#666] leading-[24px] uppercase">
                {allRedumeData?.data?.resume_language === "Deutsch" || allRedumeData?.data?.resume_language === "German"
                  ? "Kurs und Training"
                  : "TRAINING"}
              </h2>
              {resumeData?.courses_and_training_details?.map(
                (training, index) => (
                  <div key={index} className="mt-3">
                    <p className="font-medium leading-[18px] text-xs">
                      {training.course_name}
                    </p>
                    <p className="text-xs leading-[18px] font-medium">
                      {training.name_of_institute}
                    </p>
                    <p className="text-xs leading-[20px]">
                      {dayjs(training.start_date).format("MMMM YYYY")} –{" "}
                      {training.end_date
                        ? dayjs(training.end_date).format("MMMM YYYY")
                        : "Present"}
                    </p>
                  </div>
                )
              )}
            </div>

            <div className="border-b border-[#D9D9D9]"></div>
  </>
)}

            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px] uppercase">
                {allRedumeData?.data?.resume_language === "Deutsch" || allRedumeData?.data?.resume_language === "German"
                  ? "FÄHIGKEITEN"
                  : "SKILLS"}
              </h2>
              <ul className="text-xs flex gap-3 flex-wrap">
                {resumeData?.skills?.map((skill, index) => (
                  <li key={index}>{skill.skill}</li>
                ))}
              </ul>
            </div>

            <div className="border-b border-[#D9D9D9] "></div>

            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px] uppercase">
                {allRedumeData?.data?.resume_language === "Deutsch" || allRedumeData?.data?.resume_language === "German"
                  ? "SPRACHEN"
                  : "LANGUAGES"}
              </h2>
              {resumeData?.languages?.map((language, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-xs py-1 border-b border-gray-200/20"
                >
                  <span className="font-medium text-gray-800">
                    {language.language}
                  </span>
                  <span className="text-gray-600">{language.level}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-[1px] bg-[#D9D9D9]"></div>

          {/* Right Column */}
          <div className="w-[60%] space-y-3">
            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px] uppercase">
                {allRedumeData?.data?.resume_language === "Deutsch" || allRedumeData?.data?.resume_language === "German"
                  ? "ÜBER MICH"
                  : "ABOUT"}
              </h2>
              <p className="text-xs leading-[18px] text-[#171717]">
                {resumeData?.about}
              </p>
            </div>

            <div className="border-b border-[#D9D9D9] "></div>

            {resumeData.work_experiences?.length > 0 && (
              <div>
                <h2 className="text-sm tracking-[2px] text-[#666] leading-[24px] uppercase">
                  {allRedumeData?.data?.resume_language === "Deutsch" || allRedumeData?.data?.resume_language === "German"
                    ? "BERUFSERFAHRUNG"
                    : "WORK EXPERIENCE"}
                </h2>
                {resumeData?.work_experiences?.map((exp, index) => (
                  <div key={index} className="mt-3">
                    <p className="font-medium leading-[18px] text-xs">
                      {exp.job_title}
                    </p>
                    <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                      {exp.company_name}
                      <span>
                        {dayjs(exp.start_date).format("MMM YYYY")} –{" "}
                        {exp.end_date
                          ? dayjs(exp.end_date).format("MMM YYYY")
                          : "Present"}
                      </span>
                    </p>
                    <p className="text-xs leading-[20px] mt-2">
                      {exp.responsibilities}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="border-b border-[#D9D9D9] "></div>

            <div>
              <h2 className="text-sm tracking-[2px] text-[#666] leading-[24px] uppercase">
                {allRedumeData?.data?.resume_language === "Deutsch" || allRedumeData?.data?.resume_language === "German"
                  ? "AUSBILDUNG"
                  : "EDUCATION"}
              </h2>
              {resumeData?.educations?.map((education, index) => (
                <div key={index} className="mt-3">
                  <p className="font-medium leading-[18px] text-xs">
                    {education.degree}
                  </p>
                  <p className="text-xs leading-[18px]">
                    {education.institute_name}
                  </p>
                  <p className="text-xs mt-1">
                    {dayjs(education.start_date).format("MMM YYYY")} –{" "}
                    {education.end_date
                      ? dayjs(education.end_date).format("MMM YYYY")
                      : "Present"}
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

export default ResumeFour;
