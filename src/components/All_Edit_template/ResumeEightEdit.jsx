import React, { useEffect, useRef, useState } from "react";
import Image from "@/assets/images/placeholder-user.png";
import { useResume } from "@/providers/ResumeContext";
import { useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import DownloadButton from "../common/DownloadButton";
import { useEmail } from "@/hooks/useEmail";

import WaterMark from "@/assets/images/watermark.png";
import { useStatusCheck } from "../common/useStatusCheck";

const TitleSection = ({ name }) => {
  return (
    <h2 className="bg-[#FFFFFF] uppercase -ml-4 rounded-tr-[16px] py-1.5 w-[140px] flex justify-center items-center text-base text-[#0D0D0D] font-semibold leading-[20px] tracking-[2px]">
      {name}
    </h2>
  );
};

const TitleSection2 = ({ name }) => {
  return (
    <h2 className="bg-[#FFFFFF] px-2 uppercase absolute top-4 right-0 rounded-tl-[16px] py-1.5 w-[130px] flex justify-center items-center text-base text-[#0D0D0D] font-semibold leading-[20px] tracking-[2px]">
      {name}
    </h2>
  );
};

const SectionArea = ({ children, color }) => {
  return (
    <div
      className="bg-[#1F1F1F] rounded-t-[16px] rounded-bl-[16px] px-4 pb-2 pt-4 relative"
      style={{ backgroundColor: color }}
    >
      {children}
    </div>
  );
};

const ResumeEightEdit = () => {
  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;
  const { allRedumeData, color, setColor, font } = useResume();
  const { watch } = useFormContext();
  const formData = watch();
  const { language } = useEmail();

  const { data: status } = useStatusCheck();

  const resumeRef = useRef();
  const [profilePreview, setProfilePreview] = useState(Image);

  // Dynamic font map
  const fontMap = {
    inter: "Inter, sans-serif",
    poppins: "Poppins, sans-serif",
    urbanist: "Urbanist, sans-serif",
    roboto: "Roboto, sans-serif",
    lato: "Lato, sans-serif",
  };
  const appliedFont = fontMap[font] || "Urbanist, sans-serif";

  // Resume color
  const resume_color = color || allRedumeData?.data?.resume_color;

  // Merge form and context data
  const resumeData = {
    first_name: formData?.first_name || allRedumeData?.data?.first_name || "",
    last_name: formData?.last_name || allRedumeData?.data?.last_name || "",
    job_title: formData?.job_title || allRedumeData?.data?.job_title || "",
    about: formData?.about || allRedumeData?.data?.about || "",
    profile_photo:
      formData?.profile_photo || allRedumeData?.data?.profile_photo || "",
    phone_number:
      formData?.phone_number || allRedumeData?.data?.phone_number || "",
    email: formData?.email || allRedumeData?.data?.email || "",
    address: formData?.address || allRedumeData?.data?.address || "",
    linked_in_profile:
      formData?.linked_in_profile ||
      allRedumeData?.data?.linked_in_profile ||
      "",
    xing_profile:
      formData?.xing_profile || allRedumeData?.data?.xing_profile || "",
    educations: formData?.educations || allRedumeData?.data?.educations || [],
    skills: formData?.skills || allRedumeData?.data?.skills || [],
    languages: formData?.languages || allRedumeData?.data?.languages || [],
    work_experiences:
      formData?.work_experiences || allRedumeData?.data?.work_experiences || [],
    courses_and_training_details:
      formData?.courses_and_training_details ||
      allRedumeData?.data?.courses_and_training_details ||
      [],
  };

  // Set profile preview
  useEffect(() => {
    if (
      formData?.profile_photo &&
      !formData.profile_photo.startsWith("/media")
    ) {
      setProfilePreview(formData.profile_photo);
    } else if (resumeData.profile_photo) {
      setProfilePreview(VITE_IMG_URL + resumeData.profile_photo);
    } else {
      setProfilePreview(Image);
    }
  }, [formData?.profile_photo, resumeData.profile_photo]);

  useEffect(() => {
    setColor("");
  }, []);

  return (
    <div className="min-h-screen" style={{ fontFamily: appliedFont }}>
      <DownloadButton resumeRef={resumeRef} />
      <div
        ref={resumeRef}
        className="flex flex-col relative bg-[#404040] gap-3 w-[210mm] h-[297mm] overflow-hidden mx-auto"
      >
        {/* Header */}

        {status?.water_mark && (
          <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
            <img
              src={WaterMark}
              className="max-w-full max-h-full object-contain  z-[100]"
            />
          </div>
        )}
        <header
          className="bg-[#1F1F1F] pl-[153px] relative pt-[34px] pb-4 pr-[172px] w-full"
          style={{ backgroundColor: resume_color }}
        >
          <div className="flex flex-col gap-2 justify-end items-end w-full">
            <p className="text-[32px] font-[800] tracking-[4px] leading-[30px] text-[#FFC805]">
              {resumeData.first_name} {resumeData.last_name}
            </p>
            <p className="text-[#D7D7D7] text-sm font-medium capitalize leading-[20px] tracking-[1px]">
              {resumeData.job_title}
            </p>
          </div>
          <img
            src={profilePreview}
            alt="Profile"
            className="absolute top-4 right-4 z-50 w-[140px] h-[140px]"
          />
        </header>

        <div className="flex gap-3 w-full p-3 h-full">
          {/* Left Column */}
          <div className="flex flex-col gap-3 w-[75%]">
            {/* Profile */}
            <SectionArea color={resume_color}>
              <div className="flex flex-col gap-1">
                <TitleSection
                  name={
                    allRedumeData?.data?.resume_language === "Deutsch" ||
                    allRedumeData?.data?.resume_language === "German"
                      ? "Über mich"
                      : "About"
                  }
                />
                <p className="text-xs text-white font-normal leading-[18px]">
                  {resumeData.about}
                </p>
              </div>
            </SectionArea>

            {/* Experience */}
            {resumeData.work_experiences?.length > 0 && (
              <SectionArea color={resume_color}>
                <div className="flex flex-col gap-2">
                  <TitleSection
                    name={
                      allRedumeData?.data?.resume_language === "Deutsch" ||
                      allRedumeData?.data?.resume_language === "German"
                        ? "Erfahrung"
                        : "Experience"
                    }
                  />
                  <div className="flex flex-col gap-2 w-full">
                    {resumeData.work_experiences.map((exp, i) => (
                      <div key={i} className="flex flex-row gap-2 items-start">
                        <div className="w-[117px] flex flex-col gap-2">
                          <p className="text-white text-xs font-medium leading-[15px]">
                            {exp.company_name}
                          </p>
                          <p className="text-white text-xs font-normal leading-[15px]">
                            {dayjs(exp.start_date).format("YYYY")} –{" "}
                            {exp.end_date
                              ? dayjs(exp.end_date).format("YYYY")
                              : "Present"}
                          </p>
                        </div>
                        <div className="flex-1 flex-col gap-2">
                          <p className="text-sm font-semibold leading-[18px] text-[#FECB00]">
                            {exp.job_title}
                          </p>
                          <p className="text-xs text-white font-normal leading-[18px]">
                            {exp.responsibilities}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionArea>
            )}

            {/* Skills */}
            <SectionArea color={resume_color}>
              <div className="flex flex-col gap-2">
                <TitleSection
                  name={
                    allRedumeData?.data?.resume_language === "Deutsch" ||
                    allRedumeData?.data?.resume_language === "German"
                      ? "Fähigkeiten"
                      : "Skills"
                  }
                />
                <div className="grid grid-cols-2 gap-2">
                  {resumeData.skills.map((skill, i) => (
                    <div
                      key={i}
                      className="flex gap-2 items-center justify-between"
                    >
                      <p className="text-xs text-white font-normal leading-[18px]">
                        {skill.skill}
                      </p>
                      <div className="flex-1 rounded-[16px] bg-[#FECB00] h-1"></div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionArea>

            {/* Languages */}
            <SectionArea color={resume_color}>
              <div className="flex flex-col gap-2">
                <TitleSection
                  name={
                    allRedumeData?.data?.resume_language === "Deutsch" ||
                    allRedumeData?.data?.resume_language === "German"
                      ? "Sprachen"
                      : "Languages"
                  }
                />
                <div className="grid grid-cols-2">
                  {resumeData.languages.map((lang, i) => (
                    <div
                      key={i}
                      className="flex gap-2 items-center justify-between"
                    >
                      <p className="text-xs pl-4 pr-6 text-white font-normal leading-[18px]">
                        {lang.language}
                      </p>
                      <p className="text-xs text-white font-normal leading-[18px]">
                        {lang.level}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </SectionArea>

            {/* Training */}
            {resumeData.courses_and_training_details?.length > 0 && (
            <SectionArea color={resume_color}>
              <div className="flex flex-col gap-2">
                <TitleSection
                  name={
                    allRedumeData?.data?.resume_language === "Deutsch" ||
                    allRedumeData?.data?.resume_language === "German"
                      ? "Kurs und Training"
                      : "Training"
                  }
                />
                <div className="grid gap-1 grid-cols-1">
                  {resumeData.courses_and_training_details.map(
                    (training, i) => (
                      <div key={i} className="flex gap-2">
                        <div className="flex flex-col gap-1 w-[171px]">
                          <p className="text-xs text-white leading-[15px] font-medium">
                            {training.name_of_institute}
                          </p>
                          <p className="text-[10px] text-white font-normal">
                            {training.start_date} - {training.end_date}
                          </p>
                        </div>
                        <p className="text-xs w-[144px] text-[#FECB00] font-semibold leading-[18px]">
                          {training.course_name}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </SectionArea>
              
            )}
          </div>

          {/* Right Column */}
          <div className="w-[25%] mt-8 flex flex-col gap-3">
            {/* Education */}
            <SectionArea color={resume_color}>
              <div className="flex flex-col gap-2">
                <TitleSection2
                  name={
                    allRedumeData?.data?.resume_language === "Deutsch" ||
                    allRedumeData?.data?.resume_language === "German"
                      ? "Ausbildung"
                      : "Education"
                  }
                />
              </div>
              <div className="grid gap-2 mt-9">
                {resumeData.educations.map((edu, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <p className="text-[10px] text-white leading-[15px] font-normal">
                      {dayjs(edu.start_date).format("YYYY")} –{" "}
                      {edu.end_date ? dayjs(edu.end_date).format("YYYY") : "Present"}
                    </p>
                    <p className="text-[#FECB00] text-xs leading-[18px] font-semibold">
                      {edu.degree}
                    </p>
                    <p className="text-xs leading-[18px] font-medium text-white">
                      {edu.institute_name}
                    </p>
                  </div>
                ))}
              </div>
            </SectionArea>

            {/* Contact */}
            <SectionArea color={resume_color}>
              <div className="flex flex-col gap-2">
                <TitleSection2
                  name={
                    allRedumeData?.data?.resume_language === "Deutsch" ||
                    allRedumeData?.data?.resume_language === "German"
                      ? "Kontakt"
                      : "Contact"
                  }
                />
                <div className="grid gap-2 mt-9">
                  <div className="flex flex-col gap-1">
                    <p className="text-[#FECB00] text-xs font-semibold leading-[18px]">
                      {allRedumeData?.data?.resume_language === "Deutsch" ||
                      allRedumeData?.data?.resume_language === "German"
                        ? "Telefon"
                        : "Phone"}
                    </p>
                    <p className="text-[10px] font-normal leading-[16px] text-white">
                      +{resumeData.phone_number}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[#FECB00] text-xs font-semibold leading-[18px]">
                      {allRedumeData?.data?.resume_language === "Deutsch" ||
                      allRedumeData?.data?.resume_language === "German"
                        ? "Standort"
                        : "Location"}
                    </p>
                    <p className="text-[10px] font-normal leading-[16px] text-white">
                      {resumeData.address}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[#FECB00] text-xs font-semibold leading-[18px]">
                      {allRedumeData?.data?.resume_language === "Deutsch" ||
                      allRedumeData?.data?.resume_language === "German"
                        ? "E-Mail"
                        : "Email"}
                    </p>
                    <p className="text-[10px] font-normal leading-[16px] text-white">
                      {resumeData.email}
                    </p>
                  </div>
                  {resumeData.linked_in_profile && (
                    <div className="flex flex-col gap-1">
                      <p className="text-[#FECB00] text-xs font-semibold leading-[18px]">
                        LinkedIn
                      </p>
                      <a
                        href={resumeData.linked_in_profile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-normal leading-[16px] text-white break-words underline"
                      >
                        {resumeData.linked_in_profile}
                      </a>
                    </div>
                  )}
                  {resumeData.xing_profile && (
                    <div className="flex flex-col gap-1">
                      <p className="text-[#FECB00] text-xs font-semibold leading-[18px]">
                        Xing
                      </p>
                      <a
                        href={resumeData.xing_profile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-normal leading-[16px] text-white break-words underline"
                      >
                        {resumeData.xing_profile}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </SectionArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeEightEdit;
