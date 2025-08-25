import React, { useEffect, useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import { useResume } from "@/providers/ResumeContext";
import { useFormContext } from "react-hook-form";
import dayjs from "dayjs";

const ResumeElevenEdit = () => {
  const { allRedumeData } = useResume();
  const { watch } = useFormContext();
  const formData = watch();
  const resumeRef = useRef(null);

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
      formData?.linked_in_profile || allRedumeData?.data?.linked_in_profile || "",
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
    if (formData?.profile_photo && !formData.profile_photo.startsWith("/media")) {
      setProfilePreview(formData.profile_photo);
    } else if (resumeData.profile_photo) {
      setProfilePreview(import.meta.env.VITE_IMG_URL + resumeData.profile_photo);
    } else {
      setProfilePreview("");
    }
  }, [formData?.profile_photo, resumeData.profile_photo]);

  const handleDownload = () => {
    if (!resumeRef.current) return;
    const opt = {
      margin: 0,
      filename: `${resumeData.first_name}-${resumeData.last_name}-resume.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(resumeRef.current).save();
  };

  return (
    <div className="min-h-screen">
      <div className="text-center mb-4">
        <button
          onClick={handleDownload}
          className="bg-black border text-white px-5 py-2 rounded hover:bg-gray-800 transition-all"
        >
          Download as PDF
        </button>
      </div>

      <div ref={resumeRef} className="bg-white text-black px-4 py-8 w-[210mm] mx-auto !urbanist">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-[32px] font-bold tracking-[2px] text-[#484848]">
            {resumeData.first_name} {resumeData.last_name}
          </h1>
        </div>
        <p className="tracking-[3px] text-[#484848] uppercase leading-[24px] text-center py-2 border-b mb-2 border-[#D9D9D9]">
          {resumeData.job_title}
        </p>

        {/* Body */}
        <div className="flex justify-between gap-5 mt-6">
          {/* Left Column */}
          <div className="w-[40%] space-y-6">
            <div>
              <h2 className="text-sm font-medium tracking-[2px] py-1 bg-[#696969] mb-3 text-[#fff] text-center leading-[24px]">
                ABOUT
              </h2>
              <p className="text-xs leading-[18px] text-[#171717]">{resumeData.about}</p>
            </div>

            <div>
              <h2 className="text-sm font-medium tracking-[2px] py-1 bg-[#696969] mb-3 text-[#fff] text-center leading-[24px]">
                CONTACT
              </h2>
              <div className="space-y-3">
                <p className="text-xs leading-[18px]">{resumeData.phone_number}</p>
                <p className="text-xs">{resumeData.address}</p>
                <p className="text-xs">{resumeData.email}</p>
                <div className="space-y-3 flex flex-col">
                  {resumeData.linked_in_profile && (
                    <a href={resumeData.linked_in_profile} target="_blank" className="text-xs">
                      {resumeData.linked_in_profile}
                    </a>
                  )}
                  {resumeData.xing_profile && (
                    <a href={resumeData.xing_profile} target="_blank" className="text-xs">
                      {resumeData.xing_profile}
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-medium tracking-[2px] py-1 bg-[#696969] text-[#fff] text-center leading-[24px]">
                EDUCATION
              </h2>
              {resumeData.educations.map((edu, idx) => (
                <div key={idx} className="mt-3">
                  <p className="font-medium leading-[18px] text-xs">{edu.institute_name}</p>
                  <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                    {edu.degree}
                  </p>
                  <p className="text-xs leading-[18px]">
                    {dayjs(edu.start_date).format("MMMM YYYY")} - {dayjs(edu.end_date).format("MMMM YYYY")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-[1px] bg-[#D9D9D9]"></div>

          {/* Right Column */}
          <div className="w-[60%] space-y-6">
            {/* Experience */}
            <div>
              <h2 className="text-sm font-medium tracking-[2px] py-1 bg-[#696969] mb-3 text-[#fff] text-center leading-[24px]">
                EXPERIENCE
              </h2>
              {resumeData.work_experiences.map((exp, idx) => (
                <div key={idx} className="mt-3">
                  <p className="font-medium leading-[18px] text-xs">{exp.job_title}</p>
                  <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                    {exp.company_name}{" "}
                    <span>
                      {dayjs(exp.start_date).format("YYYY")} - {dayjs(exp.end_date).format("YYYY")}
                    </span>
                  </p>
                  <p className="text-xs leading-[20px] mt-2">{exp.responsibilities}</p>
                </div>
              ))}
            </div>

            {/* Training */}
            <div>
              <h2 className="text-sm font-medium tracking-[2px] py-1 bg-[#696969] mb-3 text-[#fff] text-center leading-[24px]">
                TRAINING
              </h2>
              {resumeData.courses_and_training_details.map((training, idx) => (
                <div key={idx} className="mt-3">
                  <p className="font-medium leading-[18px] text-xs">{training.course_name}</p>
                  <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                    {training.name_of_institute}
                  </p>
                  <p className="text-xs leading-[20px]">
                    {dayjs(training.start_date).format("MMMM YYYY")} - {dayjs(training.end_date).format("MMMM YYYY")}
                  </p>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-sm font-medium tracking-[2px] py-1 bg-[#696969] mb-3 text-[#fff] text-center leading-[24px]">
                SKILL
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
              <h2 className="text-sm font-medium tracking-[2px] py-1 bg-[#696969] mb-3 text-[#fff] text-center leading-[24px]">
                LANGUAGE
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
