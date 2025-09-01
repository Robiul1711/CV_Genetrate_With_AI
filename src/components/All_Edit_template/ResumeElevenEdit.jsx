import React, { useEffect, useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import { useResume } from "@/providers/ResumeContext";
import { set, useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import DownloadButton from "../common/DownloadButton";
import {
  FaEnvelope,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaXing,
} from "react-icons/fa";
import { useEmail } from "@/hooks/useEmail";

const ResumeElevenEdit = () => {
  const { allRedumeData,color, setColor } = useResume();
  const { watch } = useFormContext();
  const formData = watch();
  const resumeRef = useRef(null);
const { language } = useEmail();
  const [profilePreview, setProfilePreview] = useState("");

  // Merge formData and context data
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
    work_experiences:
      formData?.work_experiences || allRedumeData?.data?.work_experiences || [],
    courses_and_training_details:
      formData?.courses_and_training_details ||
      allRedumeData?.data?.courses_and_training_details ||
      [],
    languages: formData?.languages || allRedumeData?.data?.languages || [],
  };

  // Handle profile preview if needed
  useEffect(() => {
    const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;
    if (
      formData?.profile_photo &&
      !formData.profile_photo.startsWith("/media")
    ) {
      setProfilePreview(formData.profile_photo);
    } else if (resumeData.profile_photo) {
      setProfilePreview(
        import.meta.env.VITE_IMG_URL + resumeData.profile_photo
      );
    } else {
      setProfilePreview("");
    }
  }, [formData?.profile_photo, resumeData.profile_photo]);

  useEffect(() => {
    setColor('');
  },[]);
  return (
    <div className="min-h-screen">
      <DownloadButton resumeRef={resumeRef} />

      <div
        ref={resumeRef}
        className="bg-white text-black px-4 py-8 w-[210mm] mx-auto !urbanist h-[297mm] overflow-hidden"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-[32px] font-bold tracking-[2px] text-[#484848]">
            {resumeData.first_name} {resumeData.last_name}
          </h1>
        </div>
        <p className="tracking-[3px] text-[#484848] uppercase leading-[24px] text-center py-2 border-b mb-2 border-[#D9D9D9]" style={{ borderColor: color }}>
          {resumeData.job_title}
        </p>

        {/* Body */}
        <div className="flex justify-between gap-5 mt-6 h-full">
          {/* Left Column */}
          <div className="w-[40%] space-y-6">
            <div>
              <h2 className="text-sm font-medium uppercase tracking-[2px] py-1 bg-[#696969] mb-3 text-[#fff] text-center leading-[24px]" style={{ backgroundColor: color }}>
                {language === "en" ? "About Me" : "Über mich"}
              </h2>
              <p className="text-xs leading-[18px] text-[#171717]">
                {resumeData.about}
              </p>
            </div>

            <div>
              <h2 className="text-sm font-medium uppercase tracking-[2px] py-1 bg-[#696969] mb-3 text-[#fff] text-center leading-[24px]" style={{ backgroundColor: color }}>
                {language === "en" ? "Contact" : "Kontakt"}
              </h2>
              <div className="space-y-3">
                <p className="text-xs flex items-center gap-1">
                  <FaPhoneAlt className="text-[12px]" />
                  {resumeData.phone_number}
                </p>

                <p className="text-xs flex items-center gap-1">
                  <FaMapMarkerAlt className="text-[12px]" />
                  {resumeData.address}
                </p>

                <p className="text-xs flex items-center gap-1">
                  <FaEnvelope className="text-[12px]" />
                  {resumeData.email}
                </p>

                <div className="space-y-3 flex flex-col">
                  {resumeData.linked_in_profile && (
                    <a
                      href={resumeData.linked_in_profile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs flex items-center gap-1"
                    >
                      <FaLinkedin className="text-[12px]" />
                      {resumeData.linked_in_profile}
                    </a>
                  )}

                  {resumeData.xing_profile && (
                    <a
                      href={resumeData.xing_profile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs flex items-center gap-1"
                    >
                      <FaXing className="text-[12px]" />
                      {resumeData.xing_profile}
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-medium uppercase tracking-[2px] py-1 bg-[#696969] text-[#fff] text-center leading-[24px]" style={{ backgroundColor: color }}>
                {language === "en" ? "Education" : "Bildung"}
              </h2>
              {resumeData.educations.map((edu, idx) => (
                <div key={idx} className="mt-3">
                  <p className="font-medium leading-[18px] text-xs">
                    {edu.institute_name}
                  </p>
                  <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                    {edu.degree}
                  </p>
                  <p className="text-xs leading-[18px]">
                    {dayjs(edu.start_date).format("MMMM YYYY")} -{" "}
                    {dayjs(edu.end_date).format("MMMM YYYY")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-[1px] bg-[#D9D9D9]" style={{ backgroundColor: color }}></div>

          {/* Right Column */}
          <div className="w-[60%] space-y-6">
            {/* Experience */}
            <div>
              <h2 className="text-sm font-medium uppercase tracking-[2px] py-1 bg-[#696969] mb-3 text-[#fff] text-center leading-[24px]" style={{ backgroundColor: color }}>
                {language === "de" ? "Erfahrung" : "Experience"}
              </h2>
              {resumeData.work_experiences.map((exp, idx) => (
                <div key={idx} className="mt-3">
                  <p className="font-medium leading-[18px] text-xs">
                    {exp.job_title}
                  </p>
                  <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                    {exp.company_name}{" "}
                    <span>
                      {dayjs(exp.start_date).format("YYYY")} -{" "}
                      {dayjs(exp.end_date).format("YYYY")}
                    </span>
                  </p>
                  <p className="text-xs leading-[20px] mt-2">
                    {exp.responsibilities}
                  </p>
                </div>
              ))}
            </div>

            {/* Training */}
            <div>
              <h2 className="text-sm font-medium uppercase tracking-[2px] py-1 bg-[#696969] mb-3 text-[#fff] text-center leading-[24px]" style={{ backgroundColor: color }}>
                {language === "de" ? "Ausbildung" : "Training"}
              </h2>
              {resumeData.courses_and_training_details.map((training, idx) => (
                <div key={idx} className="mt-3">
                  <p className="font-medium leading-[18px] text-xs">
                    {training.course_name}
                  </p>
                  <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                    {training.name_of_institute}
                  </p>
                  <p className="text-xs leading-[20px]">
                    {dayjs(training.start_date).format("MMMM YYYY")} -{" "}
                    {dayjs(training.end_date).format("MMMM YYYY")}
                  </p>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-sm font-medium uppercase tracking-[2px] py-1 bg-[#696969] mb-3 text-[#fff] text-center leading-[24px]" style={{ backgroundColor: color }}>
                {language === "de" ? "Fertigkeiten" : "Skills"}
              </h2>
              <ul className="text-xs space-y-3">
                {resumeData.skills.map((skill, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    {skill.skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* Languages */}
            <div>
              <h2 className="text-sm font-medium uppercase tracking-[2px] py-1 bg-[#696969] mb-3 text-[#fff] text-center leading-[24px]" style={{ backgroundColor: color }}>
                {language === "de" ? "Sprachen" : "Languages"}
              </h2>
              <ul className="text-xs space-y-3">
                {resumeData.languages.map((lang, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    {lang.language} - {lang.level}
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

export default ResumeElevenEdit;
