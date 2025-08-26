import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import { useResume } from "@/providers/ResumeContext";
import dayjs from "dayjs";
import { useFormContext } from "react-hook-form";
import DownloadButton from "../common/DownloadButton";

const ResumeOneEdit = () => {
  const { allRedumeData } = useResume();
  const { watch } = useFormContext();
  const resumeRef = useRef();

  // Get all values from form context
  const formValues = watch();

  // Use form values with fallback to API data
  const first_name =
    formValues.first_name || allRedumeData?.data?.first_name || "";
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



  return (
    <div className="min-h-screen">
             <DownloadButton resumeRef={resumeRef}  />

      <div
        ref={resumeRef}
        className="bg-white text-black px-4 py-8 w-[210mm] mx-auto urbanist"
      >
        {/* Header */}
        <div className="text-center border-b border-[#D9D9D9] pb-5">
          <h1 className="text-[32px] font-light tracking-[7px] text-[#484848]">
            {first_name} <span className="font-semibold">{last_name}</span>
          </h1>
        </div>
        <p className="tracking-[3px] text-[#484848] uppercase leading-[24px] text-center py-2 border-b mb-2 border-[#D9D9D9]">
          {job_title}
        </p>

        <div className="flex justify-between gap-5 mt-6">
          {/* Left Column */}
          <div className="w-[35%] space-y-6">
            {/* About */}
            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px]">
                ABOUT
              </h2>
              <p className="text-xs leading-[18px] text-[#171717]">{about}</p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px]">
                CONTACT
              </h2>
              <div className="space-y-3">
                <p className="text-xs">{phone_number}</p>
                <p className="text-xs">{address}</p>
                <p className="text-xs">{email}</p>
                <p className="text-xs">{linked_in_profile}</p>
                <p className="text-xs">{xing_profile}</p>
              </div>
            </div>

            {/* Language */}
            {languages?.length > 0 && (
              <div>
                <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px]">
                  LANGUAGE
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
                <h2 className="text-sm tracking-[2px] pb-3 text-[#666] leading-[24px]">
                  SKILL
                </h2>
                <ul className="text-xs space-y-3">
                  {skills.map((skill, idx) => (
                    <li key={idx}>{skill?.skill}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="w-[1px] bg-[#D9D9D9]" />

          {/* Right Column */}
          <div className="w-[65%] space-y-6">
            {/* Experience */}
            {workExperiences?.length > 0 && (
              <div>
                <h2 className="text-sm tracking-[2px] pb-3 text-[#666]">
                  EXPERIENCE
                </h2>
                {workExperiences.map((exp, idx) => (
                  <div key={idx} className="mt-4">
                    <p className="font-medium text-xs">{exp.job_title}</p>
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
                <h2 className="text-sm tracking-[2px] pb-3 text-[#666]">
                  EDUCATION
                </h2>
                {educations.map((edu, idx) => (
                  <div key={idx} className="mt-4">
                    <p className="font-medium text-xs">{edu.institute_name}</p>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeOneEdit;
