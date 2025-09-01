import React, { useEffect, useState, useRef } from "react";
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
import { useEmail } from "@/hooks/useEmail";

const ResumeTenEdit = () => {
  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;
  const { allRedumeData, color,setColor } = useResume();
  const { watch } = useFormContext();
  const formData = watch();
  const resumeRef = useRef(null);
  const [profilePreview, setProfilePreview] = useState(user);
 const { language } = useEmail();
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

  // Handle profile photo preview
  useEffect(() => {
    if (
      formData?.profile_photo &&
      !formData.profile_photo.startsWith("/media")
    ) {
      setProfilePreview(formData.profile_photo);
    } else if (resumeData.profile_photo) {
      setProfilePreview(VITE_IMG_URL + resumeData.profile_photo);
    } else {
      setProfilePreview(user);
    }
  }, [formData?.profile_photo, resumeData.profile_photo]);

  // PDF download
useEffect(() => {
  setColor('')
},[])
  return (
    <div className="min-h-screen">
      <DownloadButton resumeRef={resumeRef} />

      <div
        ref={resumeRef}
        className="bg-white text-black w-[210mm] mx-auto !urbanist h-[297mm] overflow-hidden "
      >
        {/* Left Column */}
        <div className="flex justify-between w-full h-full ">
          <div
            className="w-[40%] space-y-6 text-white py-10"
            style={{ backgroundColor: color || "#1B1E2F" }}
          >
            {/* Profile Image */}
            <div className="w-[100px] h-[100px] mx-auto shrink-0">
              <img
                src={profilePreview}
                alt={`${resumeData.first_name} ${resumeData.last_name}`}
                className="w-full h-full object-cover rounded-full border border-[#D9D9D9]"
              />
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-sm uppercase font-semibold tracking-[2px] mb-3 leading-[24px] bg-[#fff]/15 px-4 py-2 border-l-[5px] border-[#FECB00]">
                {language === "en" ? "Contact" : "Kontakt"}
              </h2>
              <div className="px-4 space-y-2">
                <p className="text-xs flex items-center gap-2">
                  <FaPhoneAlt className="text-[12px]" />
                  {resumeData.phone_number}
                </p>
                <p className="text-xs flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[12px]" />
                  {resumeData.address}
                </p>
                <p className="text-xs flex items-center gap-2">
                  <FaEnvelope className="text-[12px]" />
                  {resumeData.email}
                </p>
                {resumeData.linked_in_profile && (
                  <a
                    href={resumeData.linked_in_profile}
                    target="_blank"
                    className="text-xs flex items-center gap-2"
                  >
                    <FaLinkedin className="text-[12px]" />
                    {resumeData.linked_in_profile}
                  </a>
                )}
                {resumeData.xing_profile && (
                  <a
                    href={resumeData.xing_profile}
                    target="_blank"
                    className="text-xs flex items-center gap-2"
                  >
                    <FaXing className="text-[12px]" />
                    {resumeData.xing_profile}
                  </a>
                )}
              </div>
            </div>

            {/* Training */}
            <div>
              <h2 className="text-sm uppercase font-semibold tracking-[2px] mb-3 leading-[24px] bg-[#fff]/15 px-4 py-2 border-l-[5px] border-[#FECB00]">
                {language === "en" ? "Training" : "Training"}
              </h2>
              <div className="space-y-3">
                {resumeData.courses_and_training_details.map(
                  (training, idx) => (
                    <div key={idx} className="px-4 space-y-1">
                      <p className="font-medium leading-[18px] text-xs">
                        {training.name_of_institute}
                      </p>
                      <p className="text-xs leading-[18px] font-medium">
                        {training.course_name}
                      </p>
                      <p className="text-xs leading-[20px]">
                        {dayjs(training.start_date).format("MMMM YYYY")} –{" "}
                        {training.end_date
                          ? dayjs(training.end_date).format("MMMM YYYY")
                          : "Present"}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Languages */}
            <div>
              <h2 className="text-sm uppercase font-semibold tracking-[2px] mb-3 leading-[24px] bg-[#fff]/15 px-4 py-2 border-l-[5px] border-[#FECB00]">
                {language === "en" ? "Languages" : "Sprachen"}
              </h2>
              <div className="space-y-3 px-4">
                {resumeData.languages.map((lang, idx) => (
                  <p
                    key={idx}
                    className="text-xs flex justify-between items-center"
                  >
                    {lang.language} <span>{lang.level}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-sm uppercase font-semibold tracking-[2px] mb-3 leading-[24px] bg-[#fff]/15 px-4 py-2 border-l-[5px] border-[#FECB00]">
                {language === "en" ? "Skills" : "Fähigkeiten"}
              </h2>
              <ul className="text-xs space-y-3 list-disc list-inside px-4">
                {resumeData.skills.map((skill, idx) => (
                  <li key={idx}>{skill.skill}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-[60%] space-y-6 py-8 mt-8">
            <div className="bg-[#F7F7F7] px-4 py-5 border-l-[5px] border-[#FECB00]">
              <h2 className="text-2xl font-bold tracking-[0.5px] pb-3 text-[#0D0D0D] leading-[24px]">
                {resumeData.first_name} {resumeData.last_name}
              </h2>
              <p className="text-2xl font-normal leading-[24px] text-[#171717]">
                {resumeData.job_title}
              </p>
            </div>

            {/* About */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[2px] mb-3 text-[#0D0D0D] leading-[24px] bg-[#F7F7F7] px-4 py-2 border-l-[5px] border-[#FECB00]">
                {language === "en" ? "About" : "Über mich"}
              </h2>
              <p className="text-xs leading-[18px] text-[#171717] px-4">
                {resumeData.about}
              </p>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[2px] mb-3 leading-[24px] bg-[#F7F7F7] px-4 py-2 border-l-[5px] border-[#FECB00]">
                {language === "en" ? "Education" : "Ausbildung"}
              </h2>
              <div className="space-y-3 px-4">
                {resumeData.educations.map((edu, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="font-medium leading-[18px] text-xs">
                      {edu.institute_name}
                    </p>
                    <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                      {edu.degree}
                    </p>
                    <p className="text-xs leading-[18px]">
                      {dayjs(edu.start_date).format("MMMM YYYY")} –{" "}
                      {edu.end_date
                        ? dayjs(edu.end_date).format("MMMM YYYY")
                        : "Present"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-sm font-semibold tracking-[2px] uppercase mb-3 leading-[24px] bg-[#F7F7F7] px-4 py-2 border-l-[5px] border-[#FECB00]">
                {language === "en" ? "Experience" : "Erfahrung"}
              </h2>
              <div className="space-y-3 px-4">
                {resumeData.work_experiences.map((exp, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="font-medium leading-[18px] text-xs">
                      {exp.job_title}
                    </p>
                    <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                      {exp.company_name}
                      <span>
                        {dayjs(exp.start_date).format("MMM YYYY")} –{" "}
                        {exp.end_date
                          ? dayjs(exp.end_date).format("MMM YYYY")
                          : "Present"}
                      </span>
                    </p>
                    <p className="text-xs leading-[20px] mt-2">
                      {exp.responsibilities}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTenEdit;
