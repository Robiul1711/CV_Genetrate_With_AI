import React, { useEffect, useRef, useState } from "react";
import user from "@/assets/images/placeholder-user.png";
import {
  FaPhoneAlt,
  FaLinkedin,
  FaMapMarkerAlt,
  FaEnvelope,
  FaXing,
} from "react-icons/fa";
import dayjs from "dayjs";
import { useResume } from "@/providers/ResumeContext";
import { useFormContext } from "react-hook-form";
import DownloadButton from "../common/DownloadButton";

import WaterMark from "@/assets/images/watermark.png";
import { useStatusCheck } from "../common/useStatusCheck";

const ResumeFourEdit = () => {
  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;
  const { allRedumeData, color, setColor, font } = useResume();
  const { watch } = useFormContext();
  const resumeRef = useRef();
  const [profilePreview, setProfilePreview] = useState(user);  const formData = watch();

  // Map selected font to actual CSS font-family
  const fontMap = {
    inter: "Inter, sans-serif",
    poppins: "Poppins, sans-serif",
    urbanist: "Urbanist, sans-serif",
    roboto: "Roboto, sans-serif",
    lato: "Lato, sans-serif",
  };
  const appliedFont = fontMap[font] || "Urbanist, sans-serif";

  const { data: status } = useStatusCheck();

  const resumeData = {
    first_name: formData.first_name || allRedumeData?.data?.first_name || "",
    last_name: formData.last_name || allRedumeData?.data?.last_name || "",
    resume_color: color || allRedumeData?.data?.resume_color || "",
    job_title: formData.job_title || allRedumeData?.data?.job_title || "",
    profile_photo:
      formData.profile_photo || allRedumeData?.data?.profile_photo || "",
    phone_number:
      formData.phone_number || allRedumeData?.data?.phone_number || "",
    address: formData.address || allRedumeData?.data?.address || "",
    email: formData.email || allRedumeData?.data?.email || "",
    linked_in_profile:
      formData.linked_in_profile ||
      allRedumeData?.data?.linked_in_profile ||
      "",
    xing_profile:
      formData.xing_profile || allRedumeData?.data?.xing_profile || "",
    about: formData.about || allRedumeData?.data?.about || "",
    skills: formData.skills?.length
      ? formData.skills
      : allRedumeData?.data?.skills || [],
    work_experiences: formData.work_experiences?.length
      ? formData.work_experiences
      : allRedumeData?.data?.work_experiences || [],
    educations: formData.educations?.length
      ? formData.educations
      : allRedumeData?.data?.educations || [],
    courses_and_training_details: formData.courses_and_training_details?.length
      ? formData.courses_and_training_details
      : allRedumeData?.data?.courses_and_training_details || [],
    languages: formData.languages?.length
      ? formData.languages
      : allRedumeData?.data?.languages || [],
  };

  useEffect(() => {
    if (
      formData.profile_photo &&
      !formData.profile_photo.startsWith("/media")
    ) {
      setProfilePreview(formData.profile_photo);
    } else if (resumeData.profile_photo) {
      setProfilePreview(VITE_IMG_URL + resumeData.profile_photo);
    } else {
      setProfilePreview(user);
    }
  }, [formData.profile_photo, resumeData.profile_photo, VITE_IMG_URL]);

  useEffect(() => {
    setColor("");
  }, []);

  return (
    <div className="min-h-screen" style={{ fontFamily: appliedFont }}>
      <DownloadButton resumeRef={resumeRef} />

      <div
        ref={resumeRef}
        className="bg-white text-black relative px-5 py-8 w-[210mm] mx-auto h-[297mm] overflow-hidden"
        style={{ fontFamily: appliedFont }}
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
        <div
          style={{ backgroundColor: resumeData?.resume_color || color || "" }}
          className="flex p-2 w-full justify-between items-start gap-4"
        >
          <div className="w-[80%]">
            <h1 className="text-[24px] font-light tracking-[2px] text-[#484848] leading-tight">
              {resumeData?.first_name} <br />
              <span className="font-semibold">{resumeData?.last_name}</span>
            </h1>
            <p className="tracking-[3px] text-[#484848] border-y border-[#D9D9D9] py-2 uppercase leading-[24px] mt-2">
              {resumeData?.job_title}
            </p>
          </div>
          <div className="w-[100px] h-[100px] shrink-0">
            <img
              src={profilePreview}
              alt="Profile"
              className="w-full h-full object-cover rounded-full border border-[#D9D9D9]"
            />
          </div>
        </div>

        <div className="border-b border-[#D9D9D9] mt-6"></div>

        <div className="flex justify-between gap-5 mt-6 h-full">
          {/* Left Column */}
          <div
            style={{ backgroundColor: resumeData?.resume_color || color || "" }}
            className="w-[40%] space-y-3 p-2 rounded-md"
          >
            {/* CONTACT */}
            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px] uppercase">
                {allRedumeData?.data?.resume_language === "Deutsch" ||
                allRedumeData?.data?.resume_language === "German"
                  ? "Kontakt"
                  : "Contact"}
              </h2>
              <div className="space-y-3">
                <p className="text-xs flex items-center gap-2 leading-[18px]">
                  <FaPhoneAlt className="text-[12px]" />{" "}
                 +{resumeData?.phone_number}
                </p>
                <p className="text-xs flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[12px]" />{" "}
                  {resumeData?.address}
                </p>
                <p className="text-xs flex items-center gap-2">
                  <FaEnvelope className="text-[12px]" /> {resumeData?.email}
                </p>
                {resumeData?.linked_in_profile && (
                  <a
                    href={resumeData?.linked_in_profile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs flex items-center gap-2"
                  >
                    <FaLinkedin className="text-[12px]" />{" "}
                    {resumeData?.linked_in_profile}
                  </a>
                )}
                {resumeData?.xing_profile && (
                  <a
                    href={resumeData?.xing_profile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs flex items-center gap-2"
                  >
                    <FaXing className="text-[12px]" />{" "}
                    {resumeData?.xing_profile}
                  </a>
                )}
              </div>
            </div>

            <div className="border-b border-[#D9D9D9]"></div>

            {/* TRAINING */}
            {resumeData?.courses_and_training_details?.length > 0 && (
              <>
              
              <div>
                <h2 className="text-sm tracking-[2px] text-[#666] leading-[24px] uppercase">
                  {allRedumeData?.data?.resume_language === "Deutsch" ||
                  allRedumeData?.data?.resume_language === "German"
                    ? "Kurs und Training"
                    : "Training"}
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

            {/* SKILL */}
            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px] uppercase">
                {allRedumeData?.data?.resume_language === "Deutsch" ||
                allRedumeData?.data?.resume_language === "German"
                  ? "Fertigkeiten"
                  : "Skills"}
              </h2>
              <ul className="text-xs  flex gap-3 flex-wrap">
                {resumeData?.skills?.map((skill, index) => (
                  <li key={index}>{skill.skill}</li>
                ))}
              </ul>
            </div>

            <div className="border-b border-[#D9D9D9]"></div>

            {/* LANGUAGE */}
            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px] uppercase">
                {allRedumeData?.data?.resume_language === "Deutsch" ||
                allRedumeData?.data?.resume_language === "German"
                  ? "Sprachen"
                  : "Languages"}
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
            {/* ABOUT */}
            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px] uppercase">
                {allRedumeData?.data?.resume_language === "Deutsch" ||
                allRedumeData?.data?.resume_language === "German"
                  ? "Über mich"
                  : "About Me"}
              </h2>
              <p className="text-xs leading-[18px] text-[#171717]">
                {resumeData?.about}
              </p>
            </div>

            <div className="border-b border-[#D9D9D9]"></div>

            {/* EXPERIENCE */}
            {resumeData.work_experiences?.length > 0 && (
              <div>
                <h2 className="text-sm tracking-[2px] text-[#666] leading-[24px] uppercase">
                  {allRedumeData?.data?.resume_language === "Deutsch" ||
                  allRedumeData?.data?.resume_language === "German"
                    ? "Erfahrung"
                    : "Experience"}
                </h2>
                {resumeData?.work_experiences?.map((experience, index) => (
                  <div key={index} className="mt-3">
                    <p className="font-medium leading-[18px] text-xs">
                      {experience.job_title}
                    </p>
                    <p className="text-xs leading-[18px] font-medium flex justify-between items-center mt-1">
                      {experience.company_name}{" "}
                      <span>
                        {dayjs(experience.start_date).format("MMM YYYY")} –{" "}
                        {experience.end_date
                          ? dayjs(experience.end_date).format("MMM YYYY")
                          : "Present"}
                      </span>
                    </p>
                    <p className="text-xs leading-[20px] mt-2">
                      {experience.responsibilities}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="border-b border-[#D9D9D9]"></div>

            {/* EDUCATION */}
            <div>
              <h2 className="text-sm tracking-[2px] text-[#666] leading-[24px] uppercase">
                {allRedumeData?.data?.resume_language === "Deutsch" ||
                allRedumeData?.data?.resume_language === "German"
                  ? "Ausbildung"
                  : "Education"}
              </h2>
              {resumeData?.educations?.map((education, index) => (
                <div key={index} className="mt-3">
                  <p className="font-medium leading-[18px] text-xs">
                    {education.degree}
                  </p>
                  <p className="text-xs leading-[18px] font-medium mt-1">
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

export default ResumeFourEdit;
