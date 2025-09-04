import React, { useEffect, useRef } from "react";
import html2pdf from "html2pdf.js";
import {
  FaPhoneAlt,
  FaLinkedin,
  FaMapMarkerAlt,
  FaEnvelope,
  FaXing,
} from "react-icons/fa";
import { useResume } from "@/providers/ResumeContext";
import { useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import DownloadButton from "../common/DownloadButton";
import { useEmail } from "@/hooks/useEmail";

const ResumeThreeEdit = () => {
  const { watch } = useFormContext();
  const { allRedumeData, color,setColor } = useResume();
  const resumeRef = useRef();
const {language}=useEmail()
  // Watch form values
  const formValues = watch();
  const resumeData = allRedumeData?.data || {};

  // Merge form values with context fallback
  const firstName = formValues.first_name || resumeData.first_name || "";
  const resume_color = color || allRedumeData?.data?.resume_color || "";
  const lastName = formValues.last_name || resumeData.last_name || "";
  const jobTitle = formValues.job_title || resumeData.job_title || "";
  const about = formValues.about || resumeData.about || "";
  const phone = formValues.phone_number || resumeData.phone_number || "";
  const address = formValues.address || resumeData.address || "";
  const email = formValues.email || resumeData.email || "";
  const linkedIn = formValues.linked_in_profile || resumeData.linked_in_profile || "";
  const xing = formValues.xing_profile || resumeData.xing_profile || "";
  const skills = formValues.skills?.length ? formValues.skills : resumeData.skills || [];
  const languages = formValues.languages?.length ? formValues.languages : resumeData.languages || [];
  const experiences = formValues.work_experiences?.length ? formValues.work_experiences : resumeData.work_experiences || [];
  const educations = formValues.educations?.length ? formValues.educations : resumeData.educations || [];
  const trainings = formValues.courses_and_training_details?.length
    ? formValues.courses_and_training_details
    : resumeData.courses_and_training_details || [];

useEffect(() => {
  setColor('')
},[])
  return (
    <div className="min-h-screen">
       <DownloadButton resumeRef={resumeRef}  />

      <div ref={resumeRef} className="bg-white text-black px-5 py-8 w-[210mm] mx-auto h-[297mm] overflow-hidden">
        {/* Header */}
        <div className="flex w-full justify-between">
          <div className="w-[60%]">
            <h1 className="text-[32px] font-bold tracking-[2px] text-[#484848] urbanist">
              {firstName} <span className="font-semibold">{lastName}</span>
            </h1>
            <p className="tracking-[3px] text-[#484848] uppercase leading-[24px]">
              {jobTitle}
            </p>
          </div>
          <div className="space-y-3 w-[40%]">
            {phone && (
              <p className="text-xs flex items-center gap-2"><FaPhoneAlt /> {phone}</p>
            )}
            {address && (
              <p className="text-xs flex items-center gap-2"><FaMapMarkerAlt /> {address}</p>
            )}
            {email && (
              <p className="text-xs flex items-center gap-2"><FaEnvelope /> {email}</p>
            )}
            {linkedIn && (
              <p className="text-xs flex items-center gap-2"><FaLinkedin /> {linkedIn}</p>
            )}
            {xing && (
              <p className="text-xs flex items-center gap-2"><FaXing /> {xing}</p>
            )}
          </div>
        </div>

        <div className="border-b border-[#D9D9D9] mt-6"></div>

        {/* Body */}
        <div className="flex justify-between gap-5 mt-6 h-full">
          {/* Left Column */}
          <div className="w-[45%] space-y-3  p-4 rounded-md"
          style={{ backgroundColor: resume_color || color || "#F5F5F5" }}
          >
            {about && (
              <div>
                <h2 className="text-sm tracking-[2px] pb-3 text-[#666] uppercase">
              {language === "de" ? "Über mich" : "About Me"}
                </h2>
                <p className="text-xs text-[#171717]">{about}</p>
              </div>
            )}

            {trainings.length > 0 && (
              <div>
                <h2 className="text-sm tracking-[2px] text-[#666] uppercase">
              {language === "de" ? "AUSBILDUNGEN" : "Trainings"}
                </h2>
                {trainings.map((t, i) => (
                  <div key={i} className="mt-4">
                    <p className="font-medium text-xs">{t.name_of_institute}</p>
                    <p className="text-xs font-medium">{t.course_name}</p>
                    <p className="text-xs">
                      {dayjs(t.start_date).format("YYYY")} – {dayjs(t.end_date).format("YYYY")}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {skills.length > 0 && (
              <div>
                <h2 className="text-sm tracking-[2px] pb-3 text-[#666] uppercase">
              {language === "de" ? "Fähigkeiten" : "Skills"}
                </h2>
                <ul className="text-xs space-y-3">
                  {skills.map((s, i) => (<li key={i}>{s.skill}</li>))}
                </ul>
              </div>
            )}

            {languages.length > 0 && (
              <div>
                <h2 className="text-sm tracking-[2px] text-[#666] uppercase">
              {language === "de" ? "Sprachen" : "Languages"}
                </h2>
                {languages.map((lang, i) => (
                  <p key={i} className="text-xs flex justify-between items-center">
                    {lang.language} <span>{lang.level}</span>
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="w-[55%] space-y-3">
            {experiences.length > 0 && (
              <div>
                <h2 className="text-sm tracking-[2px] text-[#666] uppercase">
              {language === "de" ? "Berufserfahrung" : "Work Experience"}
                </h2>
                {experiences.map((exp, i) => (
                  <div key={i} className="mt-4">
                    <p className="font-medium text-xs">{exp.job_title}</p>
                    <p className="text-xs font-medium flex justify-between items-center">
                      {exp.company_name}
                      <span>
                        {dayjs(exp.start_date).format("YYYY")} – {dayjs(exp.end_date).format("YYYY")}
                      </span>
                    </p>
                    <p className="text-xs mt-2">{exp.responsibilities}</p>
                  </div>
                ))}
              </div>
            )}

            {educations.length > 0 && (
              <div>
                <h2 className="text-sm tracking-[2px] pb-3 text-[#666] uppercase">
              {language === "de" ? "Ausbildung" : "Education"}
                </h2>
                {educations.map((edu, i) => (
                  <div key={i} className="mt-4">
                    <p className="font-medium text-xs">{edu.institute_name}</p>
                    <p className="text-xs font-medium">{edu.degree}</p>
                    <p className="text-xs">
                      {dayjs(edu.start_date).format("MMMM YYYY")} – {dayjs(edu.end_date).format("MMMM YYYY")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeThreeEdit;