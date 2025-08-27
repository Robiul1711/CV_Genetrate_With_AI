import React, { useRef, useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import user from "../../assets/images/user.png";
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

const ResumeSixEdit = () => {
  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;
  const { allRedumeData } = useResume();
  const { watch } = useFormContext();
  const resumeRef = useRef(null);
  const [profilePreview, setProfilePreview] = useState(user);

  const formData = watch();

  const resumeData = {
    first_name: formData.first_name || allRedumeData?.data?.first_name || "",
    last_name: formData.last_name || allRedumeData?.data?.last_name || "",
    job_title: formData.job_title || allRedumeData?.data?.job_title || "",
    profile_photo: formData.profile_photo || allRedumeData?.data?.profile_photo || "",
    phone_number: formData.phone_number || allRedumeData?.data?.phone_number || "",
    address: formData.address || allRedumeData?.data?.address || "",
    email: formData.email || allRedumeData?.data?.email || "",
    linked_in_profile: formData.linked_in_profile || allRedumeData?.data?.linked_in_profile || "",
    xing_profile: formData.xing_profile || allRedumeData?.data?.xing_profile || "",
    about: formData.about || allRedumeData?.data?.about || "",
    skills: formData.skills?.length ? formData.skills : allRedumeData?.data?.skills || [],
    work_experiences: formData.work_experiences?.length ? formData.work_experiences : allRedumeData?.data?.work_experiences || [],
    educations: formData.educations?.length ? formData.educations : allRedumeData?.data?.educations || [],
    courses_and_training_details: formData.courses_and_training_details?.length
      ? formData.courses_and_training_details
      : allRedumeData?.data?.courses_and_training_details || [],
    languages: formData.languages?.length ? formData.languages : allRedumeData?.data?.languages || [],
  };

  // Handle profile photo preview
  useEffect(() => {
    if (formData.profile_photo && !formData.profile_photo.startsWith("/media")) {
      setProfilePreview(formData.profile_photo);
      console.log("formdata")
    } else if (resumeData.profile_photo) {
      setProfilePreview(VITE_IMG_URL+resumeData.profile_photo);
       console.log("formdata")
    } else {
      setProfilePreview(user);
    }
  }, [formData.profile_photo, resumeData.profile_photo, VITE_IMG_URL]);



  return (
    <div className="min-h-screen">
        <DownloadButton resumeRef={resumeRef}  />

      <div
        ref={resumeRef}
        className="bg-white text-black w-[210mm] mx-auto !urbanist h-[297mm]"
      >
        {/* Header */}
        <div className="flex w-full relative justify-between px-12 py-9 bg-[#373739]">
          <div>
            <h1 className="text-[24px] font-bold tracking-[2px] text-[#fff] leading-tight">
              {resumeData.first_name} {resumeData.last_name}
            </h1>
            <p className="tracking-[3px] text-[#fff] uppercase leading-[24px] mt-2">
              {resumeData.job_title}
            </p>
          </div>
          <div className="w-[100px] h-[100px] shrink-0 absolute right-16 -bottom-12">
            <img
              src={profilePreview}
              alt={`${resumeData.first_name} ${resumeData.last_name}`}
              className="w-full h-full object-cover rounded-full border border-[#FF4089]"
            />
          </div>
        </div>

        {/* Body */}
        <div className="flex justify-between gap-5 px-6 py-8 mt-12">
          {/* Left Column */}
          <div className="w-[50%] space-y-4 rounded-md">
            {/* EXPERIENCE */}
            <div>
              <div className="flex pb-3 items-center gap-1">
                <h2 className="text-sm tracking-[2px] text-[#171717] font-semibold leading-[24px]">
                  EXPERIENCE
                </h2>
                <div className="flex-1 border-b-[2px] mt-2 border-[#D9D9D9] max-w-[100px]"></div>
              </div>
              <div className="border-l border-[#FF4089] pl-2 space-y-2">
                {resumeData.work_experiences.map((exp, i) => (
                  <div key={i}>
                    <p className="font-semibold leading-[18px] text-xs">{exp.job_title}</p>
                    <p className="text-xs leading-[18px] font-semibold flex justify-between items-center">
                      {exp.company_name}
                      <span>
                        {dayjs(exp.start_date).format("MMM YYYY")} -{" "}
                        {exp.end_date ? dayjs(exp.end_date).format("MMM YYYY") : "Present"}
                      </span>
                    </p>
                    <p className="text-xs leading-[20px] mt-2">{exp.responsibilities}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* EDUCATION */}
            <div>
              <div className="flex pb-3 items-center gap-1">
                <h2 className="text-sm tracking-[2px] text-[#171717] font-semibold leading-[24px]">
                  EDUCATION
                </h2>
                <div className="flex-1 border-b-[2px] mt-2 border-[#D9D9D9] max-w-[100px]"></div>
              </div>
              <div className="border-l border-[#FF4089] pl-2 space-y-2">
                {resumeData.educations.map((edu, i) => (
                  <div key={i} className="space-y-1">
                    <p className="font-semibold leading-[18px] text-xs">{edu.institute_name}</p>
                    <p className="text-xs leading-[18px] font-semibold flex justify-between items-center">{edu.degree}</p>
                    <p className="text-xs leading-[18px]">
                      {dayjs(edu.start_date).format("MMM YYYY")} – { edu?.end_date ? dayjs(edu.end_date).format("MMM YYYY") : "Present" }
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* TRAINING */}
            <div>
              <div className="flex pb-3 items-center gap-1">
                <h2 className="text-sm tracking-[2px] text-[#171717] font-semibold leading-[24px]">
                  TRAINING
                </h2>
                <div className="flex-1 border-b-[2px] mt-2 border-[#D9D9D9] max-w-[100px]"></div>
              </div>
              <div className="border-l border-[#FF4089] pl-2 space-y-2">
                {resumeData.courses_and_training_details.map((course, i) => (
                  <div key={i} className="space-y-1">
                    <p className="font-semibold leading-[18px] text-xs">{course.name_of_institute}</p>
                    <p className="text-xs leading-[18px] font-semibold flex justify-between items-center">{course.course_name}</p>
                    <p className="text-xs leading-[20px]">
                      {dayjs(course.start_date).format("MMM YYYY")} – {dayjs(course.end_date).format("MMM YYYY")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-r border-[#D9D9D9]"></div>

          {/* Right Column */}
          <div className="w-[50%] space-y-4">
            {/* ABOUT */}
            <div>
              <h2 className="text-sm tracking-[2px] text-center pb-3 text-[#171717] uppercase font-semibold leading-[24px]">
                ABOUT ME
              </h2>
              <p className="text-xs leading-[18px] text-[#171717]">{resumeData.about}</p>
            </div>

            <div className="border-b border-[#D9D9D9]"></div>

            {/* CONTACT */}
            <div className="text-center">
              <h2 className="text-sm tracking-[2px] pb-3 text-[#171717] font-semibold leading-[24px]">CONTACT</h2>
              <div className="space-y-3 text-center">
                <p className="text-xs flex flex-col items-center gap-1 leading-[18px]">
                  <FaPhoneAlt className="text-[#79819A] text-xl p-1 border-[#FF4089] border rounded-full" />
                  {resumeData.phone_number}
                </p>
                <p className="text-xs flex flex-col items-center gap-1">
                  <FaMapMarkerAlt className="text-[#79819A] text-xl p-1 border-[#FF4089] border rounded-full" />
                  {resumeData.address}
                </p>
                <p className="text-xs flex flex-col items-center gap-1">
                  <FaEnvelope className="text-[#79819A] text-xl p-1 border-[#FF4089] border rounded-full" />
                  {resumeData.email}
                </p>
                {resumeData.linked_in_profile && (
                  <a href={resumeData.linked_in_profile} target="_blank" className=" flex flex-col items-center justify-center">
                    <FaLinkedin className="text-[#79819A] text-xl p-1 border-[#FF4089] border rounded-full" />
                    <p className=" text-xs">{resumeData.linked_in_profile}</p>
                  </a>
                )}
                {resumeData.xing_profile && (
                  <a href={resumeData.xing_profile} target="_blank" className=" flex flex-col items-center justify-center">
                    <FaXing className="text-[#79819A] text-xl p-1 border-[#FF4089] border rounded-full" />
                    <p className=" text-xs">{resumeData.xing_profile}</p>
                  </a>
                )}
              </div>
            </div>

            {/* SKILL */}
            <div className="border-b border-[#D9D9D9]"></div>
            <div className="text-center">
              <h2 className="text-sm tracking-[2px] pb-3 text-[#171717] font-semibold leading-[24px]">SKILL</h2>
              <ul className="text-xs space-y-3">
                {resumeData.skills.map((skill, i) => (
                  <li key={i} className="flex flex-col items-center gap-1">
                    <span>{skill.skill}</span>
                    <div className="flex justify-center gap-2">
                      {[...Array(3)].map((_, idx) => (
                        <div key={idx} className="h-[12px] w-[12px] bg-[#606060] rounded-full"></div>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* LANGUAGES */}
            <div className="border-b border-[#D9D9D9]"></div>
            <div>
              <h2 className="text-sm tracking-[2px] text-center pb-3 text-[#171717] font-semibold leading-[24px]">LANGUAGE</h2>
              {resumeData.languages.map((lang, i) => (
                <p key={i} className="text-xs flex justify-between items-center">
                  {lang.language} <span>{lang.level}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeSixEdit;
