import React, { useEffect, useRef } from "react";
import { FaPhoneAlt, FaLinkedin, FaMapMarkerAlt, FaEnvelope, FaXing } from "react-icons/fa";
import { useResume } from "@/providers/ResumeContext";
import { useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import DownloadButton from "../common/DownloadButton";
import { useEmail } from "@/hooks/useEmail";
import { useStatusCheck } from "../common/useStatusCheck";
import WaterMark from "@/assets/images/watermark.png";
const ResumeTwoEdit = () => {
  const { allRedumeData, color, setColor, font } = useResume();
  const { watch } = useFormContext();
  const resumeRef = useRef();
  const { language } = useEmail();
  const formValues = watch();

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

  // Merge form values with API/context fallback
  const first_name = formValues.first_name || allRedumeData?.data?.first_name || "";
  const last_name = formValues.last_name || allRedumeData?.data?.last_name || "";
  const job_title = formValues.job_title || allRedumeData?.data?.job_title || "";
  const about = formValues.about || allRedumeData?.data?.about || "";
  const phone_number = formValues.phone_number || allRedumeData?.data?.phone_number || "";
  const address = formValues.address || allRedumeData?.data?.address || "";
  const email = formValues.email || allRedumeData?.data?.email || "";
  const linked_in_profile = formValues.linked_in_profile || allRedumeData?.data?.linked_in_profile || "";
  const xing_profile = formValues.xing_profile || allRedumeData?.data?.xing_profile || "";
  const educations = formValues.educations || allRedumeData?.data?.educations || [];
  const work_experiences = formValues.work_experiences || allRedumeData?.data?.work_experiences || [];
  const courses_and_training_details = formValues.courses_and_training_details || allRedumeData?.data?.courses_and_training_details || [];
  const skills = formValues.skills || allRedumeData?.data?.skills || [];
  const languages = formValues.languages || allRedumeData?.data?.languages || [];
  const resume_color = color || allRedumeData?.data?.resume_color || "";

  useEffect(() => {
    setColor("");
  }, []);

  return (
    <div className="min-h-screen" style={{ fontFamily: appliedFont }}>
      {/* Download Button */}
      <DownloadButton resumeRef={resumeRef} />

      {/* Resume Container */}
      <div
        ref={resumeRef}
        className="bg-white text-black  relative py-8 w-[210mm] h-[297mm] overflow-hidden mx-auto"
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
        <div className="text-center">
          <h1
            style={{ color: resume_color }}
            className="text-[32px] font-light tracking-[7px]"
          >
            {first_name} <span className="font-semibold">{last_name}</span>
          </h1>
        </div>
        <p
          style={{ color: resume_color }}
          className="tracking-[3px] uppercase leading-[24px] text-center mb-2"
        >
          {job_title}
        </p>
        <div className="border-b border-[#D9D9D9] max-w-[100px] mx-auto mt-4"></div>

        <div className="flex justify-between gap-5 h-full">
          {/* Left Column */}
          <div
            className="w-[40%] space-y-6 px-4 rounded-r pt-6"
            style={{ backgroundColor: resume_color }}
          >
            {/* About */}
            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] uppercase">
                {allRedumeData?.data?.resume_language === "Deutsch" ? "Über mich" : "About Me"}
              </h2>
              <p className="text-xs leading-[18px] text-[#171717]">{about}</p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] uppercase">
                {allRedumeData?.data?.resume_language === "Deutsch" ? "Kontakt" : "Contact"}
              </h2>
              <div className="space-y-3">
                <p className="text-xs flex items-center gap-2">
                  <FaPhoneAlt className="text-[12px] text-[#666]" /> {phone_number}
                </p>
                <p className="text-xs flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[12px] text-[#666]" /> {address}
                </p>
                <p className="text-xs flex items-center gap-2">
                  <FaEnvelope className="text-[12px] text-[#666]" /> {email}
                </p>
                {linked_in_profile && (
                  <p className="text-xs flex items-center gap-2">
                    <FaLinkedin className="text-[12px] text-[#666]" /> {linked_in_profile}
                  </p>
                )}
                {xing_profile && (
                  <p className="text-xs flex items-center gap-2">
                    <FaXing className="text-[12px] text-[#666]" /> {xing_profile}
                  </p>
                )}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-sm tracking-[2px] text-[#666] uppercase">
                {allRedumeData?.data?.resume_language === "Deutsch" ? "Ausbildung" : "Education"}
              </h2>
              {educations.map((edu, idx) => (
                <div key={idx} className="mt-4">
                  <p className="font-medium text-xs">{edu.institute_name}</p>
                  <p className="text-xs font-medium py-0.5">{edu.degree}</p>
                  <p className="text-xs">
                    {edu.start_date ? dayjs(edu.start_date).format("YYYY") : ""} –{" "}
                    {edu.end_date ? dayjs(edu.end_date).format("YYYY") : ""}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="w-[1px] bg-[#D9D9D9] mt-6"></div>

          {/* Right Column */}
          <div className="w-[60%] space-y-3 px-4 pt-6">
            {/* Work Experience */}
            {work_experiences?.length > 0 && (
              <div>
                <h2 className="text-sm tracking-[2px] text-[#666] uppercase">
                  {allRedumeData?.data?.resume_language === "Deutsch" ? "Berufserfahrung" : "Work Experience"}
                </h2>
                {work_experiences.map((exp, idx) => (
                  <div key={idx} className="mt-4">
                    <p className="font-medium text-xs">{exp.job_title}</p>
                    <p className="text-xs font-medium flex justify-between py-1">
                      {exp.company_name}
                      <span>
                        {exp.start_date ? dayjs(exp.start_date).format("YYYY") : ""} –{" "}
                        {exp.end_date ? dayjs(exp.end_date).format("YYYY") : ""}
                      </span>
                    </p>
                    <p className="text-xs mt-2">{exp.responsibilities}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="border-b border-[#D9D9D9]"></div>

            {/* Courses/Training */}
            <div>
              <h2 className="text-sm tracking-[2px] text-[#666] uppercase">
                {allRedumeData?.data?.resume_language === "Deutsch" ? "AUSBILDUNGEN" : "Trainings"}
              </h2>
              {courses_and_training_details.map((course, idx) => (
                <div key={idx} className="mt-4 flex flex-col gap-2">
                  <p className="font-medium text-xs">{course.name_of_institute}</p>
                  <p className="text-xs font-medium">{course.course_name}</p>
                  <p className="text-xs">
                    {course.start_date ? dayjs(course.start_date).format("YYYY") : ""} –{" "}
                    {course.end_date ? dayjs(course.end_date).format("YYYY") : ""}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-b border-[#D9D9D9]"></div>

            {/* Skills */}
            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] uppercase">
                {allRedumeData?.data?.resume_language === "Deutsch" ? "Fähigkeiten" : "Skills"}
              </h2>
                 <ul className="text-xs  flex gap-3 flex-wrap">
                {skills.length > 0 ? skills.map((s, idx) => <li key={idx}>{s.skill}</li>) : "No skills listed"}
              </ul>
            </div>

            <div className="border-b border-[#D9D9D9]"></div>

            {/* Languages */}
            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] uppercase">
                {allRedumeData?.data?.resume_language === "Deutsch" ? "Sprachen" : "Languages"}
              </h2>
              {languages.length > 0
                ? languages.map((lang, idx) => (
                    <p key={idx} className="text-xs flex justify-between mb-3">
                      {lang.language} <span>{lang.level}</span>
                    </p>
                  ))
                : "No languages listed"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTwoEdit;
