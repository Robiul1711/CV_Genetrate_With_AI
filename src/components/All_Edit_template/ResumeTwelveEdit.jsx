import React, { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";

import {
  FaPhoneAlt,
  FaLinkedin,
  FaMapMarkerAlt,
  FaEnvelope,
  FaXing,
  FaDownload,
} from "react-icons/fa";
import dayjs from "dayjs";
import { useResume } from "@/providers/ResumeContext";
import { useFormContext } from "react-hook-form";
import { useEmail } from "@/hooks/useEmail";
import dummyuser from "@/assets/images/userdummy.png";
const ResumeTwelveEdit = () => {
  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;
  const { allRedumeData, color } = useResume();
  const { watch } = useFormContext();
  const resumeRef = useRef();
  const [profilePreview, setProfilePreview] = useState(dummyuser);
  const formData = watch();
  const { language } = useEmail();
  const resumeData = {
    first_name: formData.first_name || allRedumeData?.data?.first_name || "",
    last_name: formData.last_name || allRedumeData?.data?.last_name || "",
    job_title: formData.job_title || allRedumeData?.data?.job_title || "",
    profile_photo:
      formData.profile_photo || allRedumeData?.data?.profile_photo || "",
    phone_number:
      formData.phone_number || allRedumeData?.data?.phone_number || "",
    address: formData.address || allRedumeData?.data?.address || "",
    email: formData.email || allRedumeData?.data?.email || "",
    linked_in_profile:
      formData.linked_in_profile ||
      allRedumeData?.data?.linked_in_profile ||
      "",
    xing_profile:
      formData.xing_profile || allRedumeData?.data?.xing_profile || "",
    about: formData.about || allRedumeData?.data?.about || "",
    skills: formData.skills?.length
      ? formData.skills
      : allRedumeData?.data?.skills || [],
    work_experiences: formData.work_experiences?.length
      ? formData.work_experiences
      : allRedumeData?.data?.work_experiences || [],
    educations: formData.educations?.length
      ? formData.educations
      : allRedumeData?.data?.educations || [],
    courses_and_training_details: formData.courses_and_training_details?.length
      ? formData.courses_and_training_details
      : allRedumeData?.data?.courses_and_training_details || [],
    languages: formData.languages?.length
      ? formData.languages
      : allRedumeData?.data?.languages || [],
  };

  // Handle profile photo preview
  useEffect(() => {
    if (
      formData.profile_photo &&
      !formData.profile_photo.startsWith("/media")
    ) {
      setProfilePreview(formData.profile_photo);
    } else if (resumeData.profile_photo) {
      setProfilePreview(VITE_IMG_URL + resumeData.profile_photo);
    } else {
      setProfilePreview(dummyuser);
    }
  }, [formData.profile_photo, resumeData.profile_photo, VITE_IMG_URL]);

  // Get contrasting color for dark/light background
  const getContrastColor = (hexColor) => {
    if (!hexColor) return "#000000";
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000000" : "#ffffff"; // dark background => white text, light => black
  };

  // Adjust color slightly for borders/icons
  const adjustColor = (hexColor, amount) => {
    if (!hexColor) return "#000000";
    let r = Math.max(
      0,
      Math.min(255, parseInt(hexColor.slice(1, 3), 16) + amount)
    );
    let g = Math.max(
      0,
      Math.min(255, parseInt(hexColor.slice(3, 5), 16) + amount)
    );
    let b = Math.max(
      0,
      Math.min(255, parseInt(hexColor.slice(5, 7), 16) + amount)
    );
    return `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  };

  const textColor = getContrastColor(color); // main text color
  const sectionTitleColor = textColor; // section title same for visibility
  const borderColor = adjustColor(color, textColor === "#ffffff" ? 80 : -60); // lighter for dark, darker for light
  const iconColor = adjustColor(color, textColor === "#ffffff" ? 60 : -80);

  // Download PDF
  const handleDownload = async () => {
    const element = resumeRef.current;
    if (!element) return;
    try {
      const dataUrl = await toPng(element, {
        cacheBust: true,
        backgroundColor: color || "#ffffff",
      });
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (element.offsetHeight * pdfWidth) / element.offsetWidth;
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Resume.pdf");
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Download Button */}
      <button
        type="button"
        onClick={handleDownload}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-lg mb-4 flex items-center gap-2"
      >
        <FaDownload />{" "}
        {language === "en" ? "Download PDF" : "PDF herunterladen"}
      </button>

      <div
        ref={resumeRef}
        className="px-5 py-8 w-[210mm] mx-auto urbanist h-[297mm] "
        style={{ backgroundColor: color || "#ffffff" }}
      >
        {/* HEADER */}
        <div className="flex w-full justify-between items-start gap-4">
          <div className="w-[80%]">
            <h1
              className="text-[24px] font-light tracking-[2px] leading-tight"
              style={{ color: textColor }}
            >
              {resumeData?.first_name} <br />
              <span className="font-semibold">{resumeData?.last_name}</span>
            </h1>
            <p
              className="tracking-[3px] border-y py-2 uppercase leading-[24px] mt-2 font-semibold"
              style={{ borderColor: borderColor, color: textColor }}
            >
              {resumeData?.job_title}
            </p>
          </div>
          <div className="w-[100px] h-[100px] shrink-0">
            <img
              src={profilePreview}
              alt="Profile"
              className="w-full h-full object-cover rounded-full border"
              style={{ borderColor: borderColor }}
            />
          </div>
        </div>

        <div
          className="border-b mt-6"
          style={{ borderColor: borderColor }}
        ></div>

        <div className="flex justify-between gap-5 mt-6 h-full">
          {/* LEFT SIDE */}
          <div className="w-[40%] space-y-3 rounded-md">
            {/* CONTACT */}
            <div>
              <h2
                className="text-sm tracking-[2px] pb-3 leading-[24px] font-semibold uppercase"
                style={{ color: sectionTitleColor }}
              >
                CONTACT
              </h2>
              <div className="space-y-3">
                <p
                  className="text-xs flex items-center gap-2 leading-[18px]"
                  style={{ color: textColor }}
                >
                  <FaPhoneAlt
                    className="text-[12px]"
                    style={{ color: iconColor }}
                  />{" "}
                  {resumeData?.phone_number}
                </p>
                <p
                  className="text-xs flex items-center gap-2"
                  style={{ color: textColor }}
                >
                  <FaMapMarkerAlt
                    className="text-[12px]"
                    style={{ color: iconColor }}
                  />{" "}
                  {resumeData?.address}
                </p>
                <p
                  className="text-xs flex items-center gap-2"
                  style={{ color: textColor }}
                >
                  <FaEnvelope
                    className="text-[12px]"
                    style={{ color: iconColor }}
                  />{" "}
                  {resumeData?.email}
                </p>
                {resumeData?.linked_in_profile && (
                  <a
                    href={resumeData?.linked_in_profile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs flex items-center gap-2"
                    style={{ color: textColor }}
                  >
                    <FaLinkedin
                      className="text-[12px]"
                      style={{ color: iconColor }}
                    />{" "}
                    {resumeData?.linked_in_profile}
                  </a>
                )}
                {resumeData?.xing_profile && (
                  <a
                    href={resumeData?.xing_profile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs flex items-center gap-2"
                    style={{ color: textColor }}
                  >
                    <FaXing
                      className="text-[12px]"
                      style={{ color: iconColor }}
                    />{" "}
                    {resumeData?.xing_profile}
                  </a>
                )}
              </div>
            </div>

            <div
              className="border-b"
              style={{ borderColor: borderColor }}
            ></div>

            {/* TRAINING */}
            <div>
              <h2
                className="text-sm tracking-[2px] leading-[24px] font-semibold uppercase"
                style={{ color: sectionTitleColor }}
              >
                TRAINING
              </h2>
              {resumeData?.courses_and_training_details?.map(
                (training, index) => (
                  <div key={index} className="mt-3">
                    <p
                      className="font-medium leading-[18px] text-xs"
                      style={{ color: textColor }}
                    >
                      {training.course_name}
                    </p>
                    <p
                      className="text-xs leading-[18px] font-medium"
                      style={{ color: textColor }}
                    >
                      {training.name_of_institute}
                    </p>
                    <p
                      className="text-xs leading-[20px]"
                      style={{ color: textColor }}
                    >
                      {dayjs(training.start_date).format("MMMM YYYY")} –{" "}
                      {training.end_date
                        ? dayjs(training.end_date).format("MMMM YYYY")
                        : "Present"}
                    </p>
                  </div>
                )
              )}
            </div>

            <div
              className="border-b"
              style={{ borderColor: borderColor }}
            ></div>

            {/* SKILLS */}
            <div>
              <h2
                className="text-sm tracking-[2px] pb-3 leading-[24px] font-semibold uppercase"
                style={{ color: sectionTitleColor }}
              >
                SKILLS
              </h2>
              <ul className="text-xs  flex flex-wrap gap-2">
                {resumeData?.skills?.map((skill, index) => (
                  <li key={index} style={{ color: textColor }}>
                    {skill.skill},
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="border-b"
              style={{ borderColor: borderColor }}
            ></div>

            {/* LANGUAGE */}
            <div>
              <h2
                className="text-sm tracking-[2px] pb-3 leading-[24px] font-semibold uppercase"
                style={{ color: sectionTitleColor }}
              >
                LANGUAGE
              </h2>
              {resumeData?.languages?.map((language, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-xs py-1 border-b"
                  style={{ borderColor: borderColor }}
                >
                  <span className="font-medium" style={{ color: textColor }}>
                    {language.language}
                  </span>
                  <span style={{ color: textColor }}>{language.level}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="w-[1px]"
            style={{ backgroundColor: borderColor }}
          ></div>

          {/* RIGHT SIDE */}
          <div className="w-[60%] space-y-3">
            {/* ABOUT */}
            <div>
              <h2
                className="text-sm tracking-[2px] pb-3 leading-[24px] font-semibold uppercase"
                style={{ color: sectionTitleColor }}
              >
                ABOUT
              </h2>
              <p
                className="text-xs leading-[18px]"
                style={{ color: textColor }}
              >
                {resumeData?.about}
              </p>
            </div>

            <div
              className="border-b"
              style={{ borderColor: borderColor }}
            ></div>

            {/* EXPERIENCE */}
            <div>
              <h2
                className="text-sm tracking-[2px] leading-[24px] font-semibold uppercase"
                style={{ color: sectionTitleColor }}
              >
                EXPERIENCE
              </h2>
              {resumeData?.work_experiences?.map((experience, index) => (
                <div key={index} className="mt-3">
                  <p
                    className="font-medium leading-[18px] text-xs"
                    style={{ color: textColor }}
                  >
                    {experience.job_title}
                  </p>
                  <p
                    className="text-xs leading-[18px] font-medium flex justify-between items-center mt-1"
                    style={{ color: textColor }}
                  >
                    {experience.company_name}{" "}
                    <span>
                      {dayjs(experience.start_date).format("MMM YYYY")} –{" "}
                      {experience.end_date
                        ? dayjs(experience.end_date).format("MMM YYYY")
                        : "Present"}
                    </span>
                  </p>
                  <p
                    className="text-xs leading-[20px] mt-2"
                    style={{ color: textColor }}
                  >
                    {experience.responsibilities}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="border-b"
              style={{ borderColor: borderColor }}
            ></div>

            {/* EDUCATION */}
            <div>
              <h2
                className="text-sm tracking-[2px] leading-[24px] font-semibold uppercase"
                style={{ color: sectionTitleColor }}
              >
                EDUCATION
              </h2>
              {resumeData?.educations?.map((education, index) => (
                <div key={index} className="mt-3">
                  <p
                    className="font-medium leading-[18px] text-xs"
                    style={{ color: textColor }}
                  >
                    {education.degree}
                  </p>
                  <p
                    className="text-xs leading-[18px] font-medium mt-1"
                    style={{ color: textColor }}
                  >
                    {education.institute_name}
                  </p>
                  <p className="text-xs mt-1" style={{ color: textColor }}>
                    {dayjs(education.start_date).format("MMM YYYY")} –{" "}
                    {education.end_date
                      ? dayjs(education.end_date).format("MMM YYYY")
                      : "Present"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTwelveEdit;
