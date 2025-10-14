import React, { useRef } from "react";
import CvImage from "@/assets/images/cv7.png";
import html2pdf from "html2pdf.js";
import {
  AddressIcon,
  EmailIcon,
  LinkdinIcon,
  PhoneIcon,
  XingIcon,
} from "../common/CustomIcons";
import { useResume } from "@/providers/ResumeContext";
import dayjs from "dayjs";
import DownloadButton from "../common/DownloadButton";
import WaterMark from "@/assets/images/watermark.png";
import { useStatusCheck } from "../common/useStatusCheck";
const ResumeSeven = () => {
  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;
  const { allRedumeData } = useResume();
  const resumeData = allRedumeData?.data || [];
  const resumeRef = useRef();
  const { data: status } = useStatusCheck();
  return (
    <div className=" min-h-screen">
      <DownloadButton resumeRef={resumeRef} />
      <div
        ref={resumeRef}
        className="flex flex-col relative bg-white mt-10 py-5 gap-4 w-[210mm] mx-auto shadow-lg h-[297mm] overflow-hidden"
      >

         {status?.water_mark && (
          <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
            <img
              src={WaterMark}
              className="max-w-full max-h-full object-contain opacity-80"
            />
          </div>
        )}
        <header className="w-full text-center justify-center items-center flex flex-col gap-1">
          <h1 className="text-[32px] uppercase !urbanist font-bold leading-[48px] tracking-[12px] text-[#484848]">
            {resumeData?.first_name} {resumeData?.last_name}
          </h1>

          <p className="leading-[24px] tracking-[3px] uppercase text-[#484848] font-normal text-base !urbanist">
            {resumeData?.job_title}
          </p>
        </header>

        <div className="flex w-full px-6 justify-between items-center gap-5">
          <div className="w-1/3 flex flex-col gap-4">
            <p className="!urbanist text-center  leading-[20px] tracking-[2px] text-[#0D0D0D] text-sm font-semibold uppercase">
              {allRedumeData?.data?.resume_language === "Deutsch" || resumeData?.resume_language === "German"
                ? "Über mich" : "About Me"
                }
            </p>

            <p className="text-[#171717] italic !playfair text-xs font-normal text-center">
              {resumeData?.about}
            </p>
          </div>

          <div className="w-[100px] h-[100px] rounded-full aspect-square border-2 border-[#E0D5C9] overflow-hidden">
            <img
              src={VITE_IMG_URL + resumeData?.profile_photo || CvImage}
              className="w-full h-full object-cover"
              alt="Alex Stevens"
            />
          </div>

          <div className="w-1/3 flex flex-col gap-1">
            <p className="!urbanist text-center uppercase leading-[20px] tracking-[2px] text-[#0D0D0D] text-sm font-semibold">
              {allRedumeData?.data?.resume_language === "Deutsch" || resumeData?.resume_language === "German"
                ? "Kontakt" : "Contact"
                }
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 aspect-square rounded-full flex justify-center items-center bg-[#E0D5C9]">
                  <PhoneIcon className="size-3" />
                </div>
                <p className="leading-[12px] !playfair font-normal text-xs text-[#171717] italic">
                  +{resumeData?.phone_number}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 aspect-square rounded-full flex justify-center items-center bg-[#E0D5C9]">
                  <AddressIcon className="size-3" />
                </div>
                <p className="leading-[12px] font-normal !playfair text-xs text-[#171717] italic">
                  {resumeData?.address}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <div className="w-5 h-5 aspect-square rounded-full flex justify-center items-center bg-[#E0D5C9]">
                  <EmailIcon className="size-3" />
                </div>
                <p className="leading-[12px] font-normal !playfair text-xs text-[#171717] italic">
                  {resumeData?.email}
                </p>
              </div>
              {resumeData?.linked_in_profile && (
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 aspect-square rounded-full flex justify-center items-center bg-[#E0D5C9]">
                    <LinkdinIcon className="size-3" />
                  </div>
                  <a
                    href={resumeData?.linked_in_profile}
                    target="_blank"
                    className="leading-[12px] font-normal !playfair text-xs text-[#171717] italic"
                  >
                    {resumeData?.linked_in_profile}
                  </a>
                </div>
              )}
              {resumeData?.xing_profile && (
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 aspect-square rounded-full flex justify-center items-center bg-[#E0D5C9]">
                    <XingIcon className="size-3" />
                  </div>
                  <a
                    href={resumeData?.xing_profile}
                    target="_blank"
                    className="leading-[12px] font-normal !playfair text-xs text-[#171717] italic"
                  >
                    {resumeData?.xing_profile}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-6 relative">
          <div className="w-full bg-white border relative z-30 border-[#9A9A9A]">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-[#E1E2E6] text-center text-[#171717] !urbanist font-semibold leading-[15px] tracking-[2px] py-[10px]">
              <div className="py-[10px] border-r border-gray-300 uppercase">
                {allRedumeData?.data?.resume_language === "Deutsch" || resumeData?.resume_language === "German"
                  ?"Ausbildung" : "Education"
                   }
              </div>
              <div className="py-[10px] border-r border-gray-300 uppercase">
                {allRedumeData?.data?.resume_language === "Deutsch" || resumeData?.resume_language === "German"
                  ? "Fähigkeiten" : "Skills"
                  }
              </div>
              <div className="py-[10px]">
                {allRedumeData?.data?.resume_language === "Deutsch" || resumeData?.resume_language === "German"
                  ? "Sachverstand" : "Expertise"
                  }
              </div>
            </div>

            {/* Table Content */}
            <div className="grid grid-cols-3 text-sm px-4 py-6 z-50">
              {/* Education Column */}
              <div className="flex flex-col gap-3">
                {resumeData?.educations?.map((edu, index) => (
                  <div key={index} className="flex flex-col text-center gap-1">
                    <p className="text-[#171717] text-xs !playfair font-medium leading-[15px]">
                      {edu?.degree}
                    </p>
                    <p className="text-[#171717] text-xs italic !playfair font-normal leading-[15px]">
                      {edu?.institute_name}
                    </p>
                    <p className="text-[#171717] text-xs italic !playfair font-normal leading-[15px]">
                      {dayjs(edu?.start_date).format("MMM YYYY")} -{" "}
                      {dayjs(edu?.end_date).format("MMM YYYY")}
                    </p>
                  </div>
                ))}
              </div>
              {/* professional skills */}
              <div className="flex flex-col items-center gap-2 px-2">
                {resumeData?.skills?.map((skill, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <p className="text-[#0D0D0D] w-[75px] text-xs !playfair font-normal italic leading-[15px]">
                      {skill?.skill}
                    </p>
                    {/* <span className="w-[80px] h-1 bg-[#E0D5C9] rounded-[16px]"></span> */}
                  </div>
                ))}
              </div>

              {/* Expertise */}

              <div className="flex flex-col items-center ml-6 gap-2">
                {resumeData?.languages?.map((exp, index) => (
                  <div key={index} className="flex gap-4">
                    <p className="text-xs font-normal leading-[15px] text-[#171717]">
                      {exp?.language}
                    </p>
                    <p className="text-xs font-normal leading-[15px] text-[#171717]">
                      {exp?.level}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {resumeData.work_experiences?.length > 0 && (
            <div className="absolute z-50 -bottom-5  border-[1px] border-[#9A9A9A] bg-[#F7F7F7] left-10 px-[60px] py-[10px] text-[#171717] !urbanist text-xs uppercase font-semibold leading-[15px] tracking-[2px]">
              {allRedumeData?.data?.resume_language === "Deutsch" || resumeData?.resume_language === "German"
                ? "Arbeits Erfahrung" : "Work Experience"
                }
            </div>
          )}
        {resumeData?.courses_and_training_details?.length > 0 && (
          
          <div className="absolute z-50 -bottom-5 border-[1px] border-[#9A9A9A] bg-[#F7F7F7] right-10 px-[60px] py-[10px] text-[#171717] !urbanist text-xs uppercase font-semibold leading-[15px] tracking-[2px]">
            {allRedumeData?.data?.resume_language === "Deutsch" || resumeData?.resume_language === "German"
              ?"Kurs und Training" : "TRAINING"
              }
          </div>
        )}

          <div className="absolute h-[65%] top-16 w-[100px] border-[1px] border-[#9A9A9A] z-20 left-3 bg-[#E1E2E6]"></div>
          <div className="absolute h-[65%] top-16 w-[100px] z-20 right-3 bg-[#E1E2E6] border-[1px] border-[#9A9A9A]"></div>
        </div>
        <div className="w-full grid grid-cols-2 px-6 mt-4 gap-4">
          {/* Work Experience */}
          <div className="grid grid-cols-1 gap-4">
            {resumeData?.work_experiences?.map((exp, index) => (
              <div
                key={index}
                className="bg-[#F8F8F8] rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col gap-3"
              >
                {/* Top Row: Company + Dates */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-center sm:text-left gap-1">
                  <p className="text-[#171717] text-sm font-semibold !playfair italic">
                    {exp?.company_name}
                  </p>
                  <p className="text-[#171717] text-xs italic font-normal">
                    {dayjs(exp?.start_date).format("MMM YYYY")} –{" "}
                    {exp?.end_date
                      ? dayjs(exp?.end_date).format("MMM YYYY")
                      : "Present"}
                  </p>
                </div>

                {/* Position */}
                <p className="text-[#171717] text-sm italic font-semibold !playfair leading-[18px]">
                  {exp?.job_title}
                </p>

                {/* Responsibilities */}
                <p className="text-[#171717] text-xs italic font-normal leading-[16px] text-justify">
                  {exp?.responsibilities}
                </p>
              </div>
            ))}
          </div>

          {/* Trainings */}
          <div className="grid grid-cols-1 gap-4">
            {resumeData?.courses_and_training_details?.map((exp, index) => (
              <div
                key={index}
                className="bg-[#F8F8F8] rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col gap-3"
              >
                {/* Top Row: Institute + Dates */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-center sm:text-left gap-1">
                  <p className="text-[#171717] text-sm font-semibold !playfair italic">
                    {exp?.name_of_institute}
                  </p>
                  <p className="text-[#171717] text-xs italic font-normal">
                    {dayjs(exp?.start_date).format("MMM YYYY")} –{" "}
                    {exp?.end_date
                      ? dayjs(exp?.end_date).format("MMM YYYY")
                      : "Ongoing"}
                  </p>
                </div>

                {/* Course Name */}
                <p className="text-[#171717] text-sm italic font-semibold !playfair leading-[18px]">
                  {exp?.course_name}
                </p>

                {/* Description */}
                <p className="text-[#171717] text-xs italic font-normal leading-[16px] text-justify">
                  {exp?.description ||
                    "Completed intensive training in advanced project management methodologies, risk assessment, and stakeholder management."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeSeven;
