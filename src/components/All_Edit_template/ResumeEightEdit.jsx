import React, { useEffect, useState } from "react";
import Image from "@/assets/images/cv8.png";
import { useResume } from "@/providers/ResumeContext";
import { useFormContext } from "react-hook-form";
import dayjs from "dayjs";

const ResumeEightEdit = () => {
  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;
  const { allRedumeData } = useResume();
  const { watch } = useFormContext();
  const formData = watch();
  const [profilePreview, setProfilePreview] = useState(Image);

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
    languages: formData?.languages || allRedumeData?.data?.languages || [],
    work_experiences:
      formData?.work_experiences ||
      allRedumeData?.data?.work_experiences ||
      [],
    courses_and_training_details:
      formData?.courses_and_training_details ||
      allRedumeData?.data?.courses_and_training_details ||
      [],
  };

  // Set profile photo preview
  useEffect(() => {
    if (formData?.profile_photo && !formData.profile_photo.startsWith("/media")) {
      setProfilePreview(formData.profile_photo);
    } else if (resumeData.profile_photo) {
      setProfilePreview(VITE_IMG_URL + resumeData.profile_photo);
    } else {
      setProfilePreview(Image);
    }
  }, [formData?.profile_photo, resumeData.profile_photo]);

  return (
    <div className="flex flex-col bg-[#404040] gap-3 w-[210mm] mx-auto mt-10 shadow-lg">
      {/* Header */}
      <header className="bg-[#1F1F1F] pl-[153px] relative pt-[34px] pb-4 pr-[172px] w-full">
        <div className="flex flex-col gap-2 justify-end items-end w-full">
          <p className="text-[32px] font-[800] !urbanist tracking-[4px] leading-[30px] text-[#FFC805]">
            {resumeData.first_name} {resumeData.last_name}
          </p>
          <p className="text-[#D7D7D7] !urbanist text-sm font-medium capitalize leading-[20px] tracking-[1px]">
            {resumeData.job_title}
          </p>
        </div>
        <img
          src={profilePreview}
          alt="Profile"
          className="absolute top-4 right-4 z-50 w-[140px] h-[140px] rounded-full object-cover border-4 border-[#FFC805]"
        />
      </header>

      {/* Content */}
      <div className="flex gap-3 w-full p-3">
        {/* Left Side */}
        <div className="flex flex-col justify-between gap-3 w-[75%]">
          {/* Profile */}
          <div className="bg-[#1F1F1F] rounded-t-[16px] rounded-bl-[16px] px-4 pb-2 pt-4 relative">
            <h2 className="bg-[#FFFFFF] -ml-4 rounded-tr-[16px] py-1.5 w-[140px] flex justify-center items-center text-base text-[#0D0D0D] font-semibold leading-[20px] tracking-[2px]">
              Profile
            </h2>
            <p className="text-xs text-white font-normal leading-[18px] !urbanist">
              {resumeData.about}
            </p>
          </div>

          {/* Work Experience */}
          <div className="bg-[#1F1F1F] rounded-lg p-4 flex flex-col gap-3">
            <h2 className="text-[#FFC805] text-lg font-bold tracking-[2px] mb-2">
              Experience
            </h2>
            {resumeData.work_experiences.map((exp, i) => (
              <div key={i} className="text-white text-xs border-b border-[#333] pb-2">
                <p className="font-semibold">{exp.job_title}</p>
                <p className="italic">{exp.company_name}</p>
                <p>
                  {dayjs(exp.start_date).format("MMM YYYY")} –{" "}
                  {exp.end_date ? dayjs(exp.end_date).format("MMM YYYY") : "Present"}
                </p>
                <p>{exp.responsibilities}</p>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="bg-[#1F1F1F] rounded-lg p-4 flex flex-col gap-2">
            <h2 className="text-[#FFC805] text-lg font-bold tracking-[2px] mb-2">
              Skills
            </h2>
            {resumeData.skills.map((skill, i) => (
              <p key={i} className="text-white text-xs">
                {skill.skill}
              </p>
            ))}
          </div>

          {/* Languages */}
          <div className="bg-[#1F1F1F] rounded-lg p-4 flex flex-col gap-2">
            <h2 className="text-[#FFC805] text-lg font-bold tracking-[2px] mb-2">
              Languages
            </h2>
            {resumeData.languages.map((lang, i) => (
              <p key={i} className="text-white text-xs">
                {lang.language} - {lang.level}
              </p>
            ))}
          </div>

          {/* Trainings */}
          <div className="bg-[#1F1F1F] rounded-lg p-4 flex flex-col gap-2">
            <h2 className="text-[#FFC805] text-lg font-bold tracking-[2px] mb-2">
              Trainings
            </h2>
            {resumeData.courses_and_training_details.map((training, i) => (
              <div key={i} className="text-white text-xs border-b border-[#333] pb-2">
                <p className="font-semibold">{training.course_name}</p>
                <p className="italic">{training.name_of_institute}</p>
                <p>
                  {dayjs(training.start_date).format("MMM YYYY")} –{" "}
                  {training.end_date ? dayjs(training.end_date).format("MMM YYYY") : "Ongoing"}
                </p>
                <p>{training.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="w-[25%] mt-8 flex flex-col gap-3">
          {/* Education */}
          <div className="bg-[#1F1F1F] rounded-lg p-4 flex flex-col gap-3">
            <h2 className="text-[#FFC805] text-lg font-bold tracking-[2px] mb-2">
              Education
            </h2>
            {resumeData.educations.map((edu, i) => (
              <div key={i} className="text-white text-xs border-b border-[#333] pb-2">
                <p className="font-semibold">{edu.degree}</p>
                <p className="italic">{edu.institute_name}</p>
                <p>
                  {dayjs(edu.start_date).format("MMM YYYY")} –{" "}
                  {dayjs(edu.end_date).format("MMM YYYY")}
                </p>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="bg-[#1F1F1F] rounded-lg p-4 flex flex-col gap-2">
            <h2 className="text-[#FFC805] text-lg font-bold tracking-[2px] mb-2">
              Contact
            </h2>
            <p className="text-white text-xs">{resumeData.phone_number}</p>
            <p className="text-white text-xs">{resumeData.email}</p>
            <p className="text-white text-xs">{resumeData.address}</p>
            {resumeData.linked_in_profile && (
              <a
                href={resumeData.linked_in_profile}
                target="_blank"
                className="text-[#FFC805] text-xs underline"
              >
                LinkedIn
              </a>
            )}
            {resumeData.xing_profile && (
              <a
                href={resumeData.xing_profile}
                target="_blank"
                className="text-[#FFC805] text-xs underline"
              >
                Xing
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeEightEdit;
