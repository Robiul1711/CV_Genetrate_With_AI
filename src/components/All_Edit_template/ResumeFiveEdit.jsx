import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import {
  FaPhoneAlt,
  FaLinkedin,
  FaMapMarkerAlt,
  FaEnvelope,
  FaXing,
} from "react-icons/fa";
import dayjs from "dayjs";
import { useFormContext } from "react-hook-form";
import { useResume } from "@/providers/ResumeContext";

const ResumeFiveEdit = () => {
  const { watch } = useFormContext();
  const { allRedumeData } = useResume();
  const resumeData = allRedumeData?.data || {};
  const resumeRef = useRef();

  // Watch form values and fallback to context if empty
  const first_name = watch("first_name") || resumeData.first_name;
  const last_name = watch("last_name") || resumeData.last_name;
  const job_title = watch("job_title") || resumeData.job_title;
  const about = watch("about") || resumeData.about;
  const phone_number = watch("phone_number") || resumeData.phone_number;
  const address = watch("address") || resumeData.address;
  const email = watch("email") || resumeData.email;
  const linked_in_profile = watch("linked_in_profile") || resumeData.linked_in_profile;
  const xing_profile = watch("xing_profile") || resumeData.xing_profile;
  const skills = watch("skills") || resumeData.skills || [];
  const educations = watch("educations") || resumeData.educations || [];
  const work_experiences = watch("work_experiences") || resumeData.work_experiences || [];
  const trainings = watch("courses_and_training_details") || resumeData.courses_and_training_details || [];
  const languages = watch("languages") || resumeData.languages || [];

  const handleDownload = () => {
    const element = resumeRef.current;
    const opt = {
      margin: 0,
      filename: "alex-stevens-resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
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
      <div
        ref={resumeRef}
        className="bg-white text-black px-5 w-[210mm] mx-auto !urbanist"
      >
        <div className="flex justify-between gap-5">
          {/* Left Column */}
          <div className="w-[40%] space-y-6 rounded-md py-10">
            <div className="flex w-full flex-col text-center">
              <div className="text-[64px] font-bold tracking-[2px]">
                {`${first_name?.charAt(0) || ""}${last_name?.charAt(0) || ""}`}
              </div>
              <h1 className="text-[32px] font-light tracking-[2px] text-[#484848] leading-tight">
                {first_name} <span className="font-semibold">{last_name}</span>
              </h1>
              <p className="tracking-[3px] text-[#484848] py-2 uppercase leading-[24px]">
                {job_title}
              </p>
              <div className="border-b-[2px] max-w-[100px] mx-auto w-full border-[#0D0D0D]"></div>
            </div>
            <div className="space-y-3">
              <p className="text-xs flex items-center gap-2"><FaPhoneAlt className="text-[12px]" />{phone_number}</p>
              <p className="text-xs flex items-center gap-2"><FaMapMarkerAlt className="text-[12px]" />{address}</p>
              <p className="text-xs flex items-center gap-2"><FaEnvelope className="text-[12px]" />{email}</p>
              {linked_in_profile && (<a href={linked_in_profile} target="_blank" className="text-xs flex items-center gap-2"><FaLinkedin className="text-[12px]" />{linked_in_profile}</a>)}
              {xing_profile && (<a href={xing_profile} target="_blank" className="text-xs flex items-center gap-2"><FaXing className="text-[12px]" />{xing_profile}</a>)}
            </div>

            <div className="flex flex-col items-center justify-center">
              <h2 className="text-sm font-semibold tracking-[2px] pb-3 text-[#0D0D0D] leading-[24px]">SKILL</h2>
              <ul className="text-xs space-y-3 text-center">
                {skills.map((s, i) => (<li key={i}>{s.skill}</li>))}
              </ul>
            </div>

            <div className="flex flex-col items-center justify-center">
              <h2 className="text-sm font-semibold tracking-[2px] text-[#0D0D0D] leading-[24px]">EDUCATION</h2>
              <div className="space-y-3 mt-3">
                {educations.map((edu, i) => (
                  <div key={i} className="text-center">
                    <p className="font-medium text-xs">{edu.institute_name}</p>
                    <p className="text-xs font-medium">{edu.degree}</p>
                    <p className="text-xs">{dayjs(edu.start_date).format("MMM YYYY")} - {edu.end_date ? dayjs(edu.end_date).format("MMM YYYY") : "Present"}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-[1px] bg-[#0D0D0D]"></div>
          {/* Right Column */}
          <div className="w-[60%] space-y-6 py-8 mt-8">
            <div>
              <h2 className="text-sm font-semibold tracking-[2px] pb-3 text-[#0D0D0D] leading-[24px]">ABOUT</h2>
              <p className="text-xs leading-[18px]">{about}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-[2px] pb-3 text-[#0D0D0D] leading-[24px]">EXPERIENCE</h2>
              <div className="space-y-3 mt-3">
                {work_experiences.map((exp, i) => (
                  <div key={i}>
                    <p className="font-medium text-xs">{exp.job_title}</p>
                    <p className="text-xs font-medium flex justify-between"><span>{exp.company_name}</span><span>{dayjs(exp.start_date).format("YYYY")} – {exp.end_date ? dayjs(exp.end_date).format("YYYY") : "Present"}</span></p>
                    <p className="text-xs mt-2">{exp.responsibilities}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-[2px] pb-3 text-[#0D0D0D] leading-[24px]">TRAINING</h2>
              <div className="space-y-3 mt-3">
                {trainings.map((t, i) => (
                  <div key={i}>
                    <p className="font-medium text-xs">{t.course_name}</p>
                    <p className="text-xs font-medium">{t.name_of_institute}</p>
                    <p className="text-xs">{dayjs(t.start_date).format("MMM YYYY")} – {t.end_date ? dayjs(t.end_date).format("MMM YYYY") : "Present"}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-[2px] pb-3 text-[#0D0D0D] leading-[24px]">LANGUAGE</h2>
              <div className="space-y-2 mt-3">
                {languages.map((l, i) => (
                  <p key={i} className="text-xs flex justify-between">{l.language}<span>{l.level}</span></p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeFiveEdit;