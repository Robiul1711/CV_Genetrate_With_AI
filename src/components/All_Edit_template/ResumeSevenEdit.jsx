import React, { useRef, useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import dayjs from "dayjs";
import {
  AddressIcon,
  EmailIcon,
  LinkdinIcon,
  PhoneIcon,
  XingIcon,
} from "../common/CustomIcons";
import { useResume } from "@/providers/ResumeContext";
import { useFormContext } from "react-hook-form";
import CvImage from "@/assets/images/cv7.png";
import user from "@/assets/images/user.png";

const ResumeSevenEdit = () => {
  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;
  const { allRedumeData } = useResume();
  const { watch } = useFormContext();
  const resumeRef = useRef(null);
  const [profilePreview, setProfilePreview] = useState(user);

  const formData = watch();

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

  useEffect(() => {
    if (formData?.profile_photo && !formData.profile_photo.startsWith("/media")) {
      setProfilePreview(formData.profile_photo);
    } else if (resumeData.profile_photo) {
      setProfilePreview(VITE_IMG_URL + resumeData.profile_photo);
    } else {
      setProfilePreview(user);
    }
  }, [formData?.profile_photo, resumeData.profile_photo]);

  const handleDownload = () => {
    if (!resumeRef.current) return;
    const element = resumeRef.current;
    const options = {
      filename: `${resumeData.first_name || "Resume"}_CV.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().from(element).set(options).save();
  };

  return (
    <div className=" ">
      <button
        onClick={handleDownload}
        className="bg-pink-500 text-white px-4 py-2 rounded mb-4"
      >
        Download PDF
      </button>

      <div
        ref={resumeRef}
        className="flex flex-col bg-white mt-10 py-5 gap-4 w-[210mm] mx-auto shadow-lg"
      >
        {/* Header */}
        <header className="w-full text-center flex flex-col gap-1">
          <h1 className="text-[32px] uppercase font-bold tracking-[12px] text-[#484848]">
            {resumeData.first_name} {resumeData.last_name}
          </h1>
          <p className="tracking-[3px] uppercase text-[#484848] text-base">
            {resumeData.job_title}
          </p>
        </header>

        {/* Profile / Photo / Contact */}
        <div className="flex w-full px-6 justify-between items-center gap-5">
          <div className="w-1/3 text-center">
            <p className="uppercase text-sm font-semibold">Profile</p>
            <p className="italic text-xs !text-black">{resumeData.about}</p>
          </div>

          <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-2 border-[#E0D5C9]">
            <img
              src={profilePreview || CvImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-1/3 flex flex-col gap-1">
            <p className="uppercase text-sm font-semibold text-center !text-black">Contact</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <PhoneIcon className="size-3 " />
                <span className="text-xs italic !text-black">{resumeData.phone_number}</span>
              </div>
              <div className="flex items-center gap-1">
                <AddressIcon className="size-3" />
                <span className="text-xs italic !text-black">{resumeData.address}</span>
              </div>
              <div className="flex items-center gap-1">
                <EmailIcon className="size-3" />
                <span className="text-xs italic !text-black">{resumeData.email}</span>
              </div>
              {resumeData.linked_in_profile && (
                <div className="flex items-center gap-1">
                  <LinkdinIcon className="size-3" />
                  <a
                    href={resumeData.linked_in_profile}
                    target="_blank"
                    className="text-xs italic !text-black"
                  >
                    {resumeData.linked_in_profile}
                  </a>
                </div>
              )}
              {resumeData.xing_profile && (
                <div className="flex items-center gap-1 !text-black">
                  <XingIcon className="size-3 !text-black "/>
                  <a
                    href={resumeData.xing_profile}
                    target="_blank"
                    className="text-xs italic !text-black"
                  >
                    {resumeData.xing_profile}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Education / Skills / Languages */}
        <div className="px-6">
          <div className="grid grid-cols-3 bg-[#E1E2E6] !text-black text-center font-semibold py-2 border border-[#9A9A9A]">
            <div>Education</div>
            <div>Professional Skills</div>
            <div>Expertise</div>
          </div>

          <div className="grid grid-cols-3 text-sm px-4 py-6 border border-[#9A9A9A] border-t-0">
            <div className="flex flex-col gap-3">
              {resumeData.educations.map((edu, i) => (
                <div key={i} className="text-center">
                  <p className="font-medium text-xs !text-black">{edu.degree}</p>
                  <p className="italic text-xs !text-black">{edu.institute_name}</p>
                  <p className="italic text-xs !text-black">
                    {dayjs(edu.start_date).format("MMM YYYY")} - {dayjs(edu.end_date).format("MMM YYYY")}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-2">
              {resumeData.skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-4">
                  <p className="w-[75px] italic text-xs !text-black">{skill.skill}</p>
                  <span className="w-[80px] h-1 bg-[#E0D5C9] rounded !text-black"></span>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-2">
              {resumeData.languages.map((lang, i) => (
                <div key={i} className="flex gap-4">
                  <p className="text-xs !text-black">{lang.language}</p>
                  <p className="text-xs !text-black">{lang.level}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Work Experience / Trainings */}
        <div className="w-full grid grid-cols-2 px-6 mt-4 gap-4">
          <div className="grid grid-cols-1 gap-4">
            {resumeData.work_experiences.map((exp, i) => (
              <div
                key={i}
                className="bg-[#F8F8F8] rounded-lg shadow-sm border p-4 flex flex-col gap-3"
              >
                <div className="flex justify-between text-xs italic">
                  <p className="font-semibold !text-black">{exp.company_name}</p>
                  <p className="!text-black">
                    {dayjs(exp.start_date).format("MMM YYYY")} – {exp.end_date ? dayjs(exp.end_date).format("MMM YYYY") : "Present"}
                  </p>
                </div>
                <p className="italic font-semibold text-sm !text-black">{exp.job_title}</p>
                <p className="italic text-xs text-justify !text-black">{exp.responsibilities}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4">
            {resumeData.courses_and_training_details.map((training, i) => (
              <div
                key={i}
                className="bg-[#F8F8F8] rounded-lg shadow-sm border p-4 flex flex-col gap-3"
              >
                <div className="flex justify-between text-xs italic">
                  <p className="font-semibold !text-black">{training.name_of_institute}</p>
                  <p className="!text-black">
                    {dayjs(training.start_date).format("MMM YYYY")} – {training.end_date ? dayjs(training.end_date).format("MMM YYYY") : "Ongoing"}
                  </p>
                </div>
                <p className="italic font-semibold text-sm !text-black">{training.course_name}</p>
                <p className="italic text-xs text-justify !text-black">{training.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeSevenEdit;