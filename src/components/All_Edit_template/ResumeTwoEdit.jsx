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


const ResumeTwoEdit = () => {
  const { allRedumeData , color, setColor} = useResume();
  const { watch } = useFormContext();
  const formValues = watch();
  const resumeRef = useRef();
const {language}=useEmail()

  // Merge form values with API/context fallback
  const first_name =
    formValues.first_name || allRedumeData?.data?.first_name || "";
    const resume_color = color || allRedumeData?.data?.resume_color || '';
  const last_name =
    formValues.last_name || allRedumeData?.data?.last_name || "";
  const job_title =
    formValues.job_title || allRedumeData?.data?.job_title || "";
  const about = formValues.about || allRedumeData?.data?.about || "";
  const phone_number =
    formValues.phone_number || allRedumeData?.data?.phone_number || "";
  const address = formValues.address || allRedumeData?.data?.address || "";
  const email = formValues.email || allRedumeData?.data?.email || "";
  const linked_in_profile =
    formValues.linked_in_profile ||
    allRedumeData?.data?.linked_in_profile ||
    "";
  const xing_profile =
    formValues.xing_profile || allRedumeData?.data?.xing_profile || "";

  const educations =
    formValues.educations || allRedumeData?.data?.educations || [];
  const work_experiences =
    formValues.work_experiences || allRedumeData?.data?.work_experiences || [];
  const courses_and_training_details =
    formValues.courses_and_training_details ||
    allRedumeData?.data?.courses_and_training_details ||
    [];
  const skills = formValues.skills || allRedumeData?.data?.skills || [];
  const languages =
    formValues.languages || allRedumeData?.data?.languages || [];

useEffect(() => {
  setColor('')
},[])
console.log(resume_color);
  return (
    <div className="min-h-screen">
        <DownloadButton resumeRef={resumeRef}  />

      <div
        ref={resumeRef}
        className="bg-white text-black  py-8 w-[210mm] h-[297mm] overflow-hidden mx-auto"
      >
        {/* Header */}
        <div   className="text-center">
          <h1 style={{color: resume_color || color || ""}} className="text-[32px] font-light tracking-[7px] text-[#484848] !playfair">
            {first_name} <span className="font-semibold">{last_name}</span>
          </h1>
        </div>
        <p style={{color: resume_color || color || ""}} className="tracking-[3px] text-[#484848] uppercase leading-[24px] text-center mb-2">
          {job_title}
        </p>
        <div className="border-b border-[#D9D9D9] max-w-[100px] mx-auto mt-4"></div>

        <div className="flex justify-between gap-5  h-full">
          {/* Left Column */}
          <div className="w-[40%] space-y-6 px-4 rounded-r pt-6"
          style={{backgroundColor: resume_color || color || ""}}
          >
            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] uppercase">
                {language === "de" ? "Über mich" : "About Me"}
              </h2>
              <p className="text-xs leading-[18px] text-[#171717]">{about}</p>
            </div>

            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] uppercase">
                {language === "de" ? "Kontakt" : "Contact"}
              </h2>
              <div className="space-y-3">
                <p className="text-xs flex items-center gap-2">
                  <FaPhoneAlt className="text-[12px] text-[#666]" />{" "}
                  {phone_number}
                </p>
                <p className="text-xs flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[12px] text-[#666]" />{" "}
                  {address}
                </p>
                <p className="text-xs flex items-center gap-2">
                  <FaEnvelope className="text-[12px] text-[#666]" /> {email}
                </p>
                {linked_in_profile && (
                  <p className="text-xs flex items-center gap-2">
                    <FaLinkedin className="text-[12px] text-[#666]" />{" "}
                    {linked_in_profile}
                  </p>
                )}
                {xing_profile && (
                  <p className="text-xs flex items-center gap-2">
                    <FaXing className="text-[12px] text-[#666]" />{" "}
                    {xing_profile}
                  </p>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-sm tracking-[2px] text-[#666] uppercase">
                {language === "de" ? "Ausbildung" : "Education"}
              </h2>
              {educations.map((edu, idx) => (
                <div key={idx} className="mt-4">
                  <p className="font-medium text-xs">{edu.institute_name}</p>
                  <p className="text-xs font-medium">{edu.degree}</p>
                  <p className="text-xs">
                    {edu.start_date ? dayjs(edu.start_date).format("YYYY") : ""}{" "}
                    – {edu.end_date ? dayjs(edu.end_date).format("YYYY") : ""}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-[1px] bg-[#D9D9D9] mt-6"></div>

          {/* Right Column */}
          <div className="w-[60%] space-y-3 px-4 pt-6">
            <div>
              <h2 className="text-sm tracking-[2px] text-[#666] uppercase">
                {language === "de" ? "Berufserfahrung" : "Work Experience"}
              </h2>
              {work_experiences.map((exp, idx) => (
                <div key={idx} className="mt-4">
                  <p className="font-medium text-xs">{exp.job_title}</p>
                  <p className="text-xs font-medium flex justify-between">
                    {exp.company_name}
                    <span>
                      {exp.start_date
                        ? dayjs(exp.start_date).format("YYYY")
                        : ""}{" "}
                      – {exp.end_date ? dayjs(exp.end_date).format("YYYY") : ""}
                    </span>
                  </p>
                  <p className="text-xs mt-2">{exp.responsibilities}</p>
                </div>
              ))}
            </div>

            <div className="border-b border-[#D9D9D9]"></div>

            <div>
              <h2 className="text-sm tracking-[2px] text-[#666] uppercase">
                {language === "de" ? "  AUSBILDUNGEN" : "  Trainings"}
              </h2>
              {courses_and_training_details.map((course, idx) => (
                <div key={idx} className="mt-4">
                  <p className="font-medium text-xs">
                    {course.name_of_institute}
                  </p>
                  <p className="text-xs font-medium">{course.course_name}</p>
                  <p className="text-xs">
                    {course.start_date
                      ? dayjs(course.start_date).format("YYYY")
                      : ""}{" "}
                    –{" "}
                    {course.end_date
                      ? dayjs(course.end_date).format("YYYY")
                      : ""}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-b border-[#D9D9D9]"></div>

            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] uppercase">
                {language === "de" ? "  Fähigkeiten" : "  Skills"}
              </h2>
              <ul className="text-xs space-y-3">
                {skills.length > 0
                  ? skills.map((s, idx) => <li key={idx}>{s.skill}</li>)
                  : "No skills listed"}
              </ul>
            </div>

            <div className="border-b border-[#D9D9D9]"></div>

            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] uppercase">
                {language === "de" ? "  Sprachen" : "  Languages"}
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
