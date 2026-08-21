import React, { useEffect, useRef } from "react";
import html2pdf from "html2pdf.js";
import { useResume } from "@/providers/ResumeContext";
import dayjs from "dayjs";
import { useFormContext } from "react-hook-form";
import DownloadButton from "../common/DownloadButton";
import { useEmail } from "@/hooks/useEmail";
import WaterMark from "@/assets/images/watermark.png";


const ResumeOneEdit = () => {
  const { allRedumeData, color, setColor, font, setFont } = useResume();

  const { watch } = useFormContext();
  const resumeRef = useRef();
  const { language } = useEmail();

  const formValues = watch();

  const first_name =
    formValues.first_name || allRedumeData?.data?.first_name || "";
  const resume_color = color || allRedumeData?.data?.resume_color || "";
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

  const workExperiences =
    formValues.work_experiences || allRedumeData?.data?.work_experiences || [];
  const educations =
    formValues.educations || allRedumeData?.data?.educations || [];
  const skills = formValues.skills || allRedumeData?.data?.skills || [];
  const languages =
    formValues.languages || allRedumeData?.data?.languages || [];
  const traingings = formValues?.courses_and_training_details || [];

  useEffect(() => {
    if (!color) setColor(""); // optional: reset color on mount
  }, []);



  // Mapping font variable to className
  const fontMap = {
    inter: "Inter, sans-serif",
    poppins: "Poppins, sans-serif",
    urbanist: "Urbanist, sans-serif",
    roboto: "Roboto, sans-serif",
    lato: "Lato, sans-serif",
  };



  const appliedFontFamily = fontMap[font] || "Urbanist, sans-serif";
  return (
    <div className={`min-h-screen ${appliedFontFamily}`}>
      <DownloadButton resumeRef={resumeRef} />

      <div
        ref={resumeRef}
        className="bg-white relative  text-black py-8 w-[210mm] mx-auto h-[297mm] overflow-hidden"
        style={{ fontFamily: appliedFontFamily }} // fallback inline style
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

        <div className="text-center border-b border-[#D9D9D9] pb-5">
          <h1 className="text-[32px] font-light tracking-[7px] text-[#484848]">
            {first_name} <span className="font-semibold">{last_name}</span>
          </h1>
        </div>

        <p className="tracking-[3px] text-[#484848] uppercase leading-[24px] text-center py-2 border-b mb-2 border-[#D9D9D9]">
          {job_title}
        </p>

        <div className="flex justify-between gap-2 h-full">
          {/* Left Column */}
          <div
            className="w-[35%] space-y-6 px-4 rounded-r pt-4"
            style={{ backgroundColor: color ? color : resume_color }}
          >
            {/* About */}
            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px] uppercase">
                {allRedumeData?.data?.resume_language === "Deutsch" ||
                allRedumeData?.data?.resume_language === "German"
                  ? "Über mich"
                  : "About"}
              </h2>
              <p className="text-xs leading-[18px] text-[#171717]">{about}</p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px] uppercase">
                {allRedumeData?.data?.resume_language === "Deutsch" ||
                allRedumeData?.data?.resume_language === "German"
                  ? "Kontakt"
                  : "Contact"}
              </h2>
              <div className="space-y-3">
                <p className="text-xs">+{phone_number}</p>
                <p className="text-xs">{address}</p>
                <p className="text-xs">{email}</p>
                <p className="text-xs">{linked_in_profile}</p>
                <p className="text-xs">{xing_profile}</p>
              </div>
            </div>

            {/* Languages */}
            {languages?.length > 0 && (
              <div>
                <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px] uppercase">
                  {allRedumeData?.data?.resume_language === "Deutsch" ||
                  allRedumeData?.data?.resume_language === "German"
                    ? "Sprachen"
                    : "Languages"}
                </h2>
                {languages.map((lang, idx) => (
                  <p key={idx} className="text-xs flex justify-between">
                    {lang.language} <span>{lang.level}</span>
                  </p>
                ))}
              </div>
            )}

            {/* Skills */}
            {skills?.length > 0 && (
              <div>
                <h2 className="text-sm tracking-[2px] text-[#666] leading-[24px] uppercase">
                  {allRedumeData?.data?.resume_language === "Deutsch" ||
                  allRedumeData?.data?.resume_language === "German"
                    ? "Fähigkeiten"
                    : "Skills"}
                </h2>
                <ul className="text-xs  flex gap-3 flex-wrap">
                  {skills.map((skill, idx) => (
                    <li key={idx}>{skill?.skill}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="w-[1px] bg-[#D9D9D9]" />

          {/* Right Column */}
          <div className="w-[65%] space-y-6 px-4 pt-4">
            {/* Experience */}
            {workExperiences?.length > 0 && (
              <div>
                <h2 className="text-sm tracking-[2px] text-[#666] uppercase">
                  {allRedumeData?.data?.resume_language === "Deutsch" ||
                  allRedumeData?.data?.resume_language === "German"
                    ? "Berufserfahrung"
                    : "Work Experience"}
                </h2>
                {workExperiences.map((exp, idx) => (
                  <div key={idx} className="mt-4">
                    <p className="font-medium text-sm">{exp.job_title}</p>
                    <p className="text-xs flex justify-between items-center mt-1">
                      {exp.company_name}
                      <span>
                        {exp.start_date
                          ? dayjs(exp.start_date).format("YYYY")
                          : "YYYY"}{" "}
                        –{" "}
                        {exp.still_working_here
                          ? "Present"
                          : exp.end_date
                          ? dayjs(exp.end_date).format("YYYY")
                          : "YYYY"}
                      </span>
                    </p>
                    <p className="text-xs mt-2">{exp.responsibilities}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {educations?.length > 0 && (
              <div>
                <h2 className="text-sm tracking-[2px]  text-[#666] uppercase">
                  {allRedumeData?.data?.resume_language === "Deutsch" ||
                  allRedumeData?.data?.resume_language === "German"
                    ? "Ausbildung"
                    : "Education"}
                </h2>
                {educations.map((edu, idx) => (
                  <div key={idx} className="mt-4">
                    <p className="font-medium text-sm">{edu.institute_name}</p>
                    <p className="text-xs flex justify-between items-center mt-1">
                      {edu.degree}
                      <span>
                        {edu.start_date
                          ? dayjs(edu.start_date).format("YYYY")
                          : ""}{" "}
                        –{" "}
                        {edu.currently_enrolled
                          ? "Present"
                          : edu.end_date
                          ? dayjs(edu.end_date).format("YYYY")
                          : "YYYY"}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Trainings */}
            {traingings?.length > 0 && (
              <div>
                <h2 className="text-sm tracking-[2px] text-[#666] uppercase">
                  {allRedumeData?.data?.resume_language === "Deutsch" ||
                  allRedumeData?.data?.resume_language === "German"
                    ? "Kurs und Training"
                    : "Trainings"}
                </h2>
                {traingings.map((exp, idx) => (
                  <div key={idx} className="mt-4">
                    <p className="font-medium text-sm">{exp.course_name}</p>
                    <p className="text-xs flex justify-between items-center mt-1">
                      {exp.name_of_institute}
                      <span>
                        {exp.start_date
                          ? dayjs(exp.start_date).format("YYYY")
                          : "YYYY"}{" "}
                        –{" "}
                        {exp.still_working_here
                          ? "Present"
                          : exp.end_date
                          ? dayjs(exp.end_date).format("YYYY")
                          : "YYYY"}
                      </span>
                    </p>
                    <p className="text-xs mt-2">{exp.responsibilities}</p>
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

export default ResumeOneEdit;
