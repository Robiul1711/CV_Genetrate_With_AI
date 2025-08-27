import React, { useEffect, useRef, useState } from "react";
import Cv9 from "@/assets/images/cv9.png";
import { PhoneIcon } from "lucide-react";
import html2pdf from "html2pdf.js";
import {
  AddressIcon,
  AkabakaIcon,
  EmailIcon,
  LinkdinIcon,
  XingIcon,
} from "../common/CustomIcons";
import { useResume } from "@/providers/ResumeContext";
import { useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import DownloadButton from "../common/DownloadButton";

const ResumeNineEdit = () => {
  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;
  const { allRedumeData } = useResume();
  const { watch } = useFormContext();
  const formData = watch();
  const [profilePreview, setProfilePreview] = useState(Cv9);

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
  };

  // Set profile photo preview
  useEffect(() => {
    if (formData?.profile_photo && !formData.profile_photo.startsWith("/media")) {
      setProfilePreview(formData.profile_photo);
    } else if (resumeData.profile_photo) {
      setProfilePreview(VITE_IMG_URL + resumeData.profile_photo);
    } else {
      setProfilePreview(Cv9);
    }
  }, [formData?.profile_photo, resumeData.profile_photo]);

      const resumeRef = useRef();


  return (
    <div className=" min-h-screen">

              <DownloadButton resumeRef={resumeRef}  />

      <div ref={resumeRef} className="flex flex-col gap-4 p-6 bg-white w-[210mm] h-[297mm] overflow-hidden mx-auto mt-10">
      {/* Header */}
      <div className="flex flex-col z-10 justify-center items-center gap-4">
        <p className="text-[#0D0D0D] text-xs font-medium !urbanist tracking-[8px] leading-[12px]">
          The resume of
        </p>
        <h1 className="text-[32px] tracking-[7px] playfair leading-[48px] text-[#0D0D0D] font-bold">
          {resumeData.first_name} {resumeData.last_name}
        </h1>
      </div>

      <div className="w-full flex gap-6">
        {/* Profile Image */}
        <div className="w-1/3 relative h-[200px] -mt-5">
          <div className="absolute inset-0 bg-[#F7DCD1]"></div>
          <div className="w-[133px] h-[166px] relative top-16 left-20">
            <img
              src={profilePreview}
              className="w-full h-full object-cover rounded-lg"
              alt="Profile"
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 flex flex-col gap-4 relative">
          <p className="px-6 text-[#0D0D0D] text-xs !urbanist font-medium leading-[12px] tracking-[8px] uppercase">
            {resumeData.job_title}
          </p>
          <div className="px-6 flex flex-col gap-2 z-40">
            <p className="text-[#171717] !urbanist font-normal text-xs leading-[18px]">
              {resumeData.about}
            </p>

            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-2 max-w-[400px]">
              <div className="flex items-center gap-[6px]">
                <div className="w-5 h-5 rounded-full aspect-square flex justify-center items-center bg-[#E0D5C9]">
                  <PhoneIcon className="size-3" />
                </div>
                <p className="leading-[12px] text-[#171717] font-normal italic text-xs !playfair">
                  {resumeData.phone_number}
                </p>
              </div>

              <div className="flex items-center gap-[6px]">
                <div className="w-5 h-5 rounded-full aspect-square flex justify-center items-center bg-[#E0D5C9]">
                  <AddressIcon className="size-3" />
                </div>
                <p className="leading-[12px] text-[#171717] font-normal italic text-xs !playfair">
                  {resumeData.address}
                </p>
              </div>

              <div className="flex items-center gap-[6px]">
                <div className="w-5 h-5 rounded-full aspect-square flex justify-center items-center bg-[#E0D5C9]">
                  <EmailIcon className="size-3" />
                </div>
                <p className="leading-[12px] text-[#171717] font-normal italic text-xs !playfair">
                  {resumeData.email}
                </p>
              </div>

              {resumeData.linked_in_profile && (
                <div className="flex items-center gap-[6px]">
                  <div className="w-5 h-5 rounded-full aspect-square flex justify-center items-center bg-[#E0D5C9]">
                    <LinkdinIcon className="size-3" />
                  </div>
                  <a
                    href={resumeData.linked_in_profile}
                    target="_blank"
                    className="leading-[12px] text-[#171717] font-normal italic text-xs !playfair"
                  >
                    {resumeData.linked_in_profile}
                  </a>
                </div>
              )}

              {resumeData.xing_profile && (
                <div className="flex items-center gap-[6px]">
                  <div className="w-5 h-5 rounded-full aspect-square flex justify-center items-center bg-[#E0D5C9]">
                    <XingIcon className="size-3" />
                  </div>
                  <a
                    href={resumeData.xing_profile}
                    target="_blank"
                    className="leading-[12px] text-[#171717] font-normal italic text-xs !playfair"
                  >
                    {resumeData.xing_profile}
                  </a>
                </div>
              )}
            </div>
          </div>
          <span>
            <AkabakaIcon />
          </span>
        </div>
      </div>

      {/* Education and Experience */}
      <div className="flex flex-row gap-4 mt-2">
        <div className="w-[250px] p-6 bg-[#B0B3AC] flex flex-col gap-3">
          <p className="uppercase text-sm font-medium leading-5 text-white !urbanist text-center">
            Education
          </p>
          <div className="flex flex-col gap-3">
            {resumeData.educations.map((edu, index) => (
              <div key={index} className="flex flex-col gap-1">
                <p className="leading-5 text-sm text-white font-medium !urbanist">
                  {edu.institute_name}
                </p>
                <p className="leading-4 text-xs text-white font-normal !urbanist">
                  {edu.degree}
                </p>
                <p className="leading-4 text-xs text-white font-normal !urbanist">
                  {dayjs(edu.start_date).format("MMM YYYY")} -{" "}
                  {dayjs(edu.end_date).format("MMM YYYY")}
                </p>
              </div>
            ))}
            <div className="flex justify-center items-center">
              <AkabakaIcon />
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div className="w-[90%] px-[60px] py-6 bg-[#293946] text-center">
            <p className="leading-4 tracking-[2px] !urbanist text-sm font-semibold text-white uppercase">
              Experience
            </p>
          </div>
          <div className="flex flex-col gap-3 pr-6">
            {resumeData.work_experiences.map((exp, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 w-full justify-between">
                    <p className="text-sm font-semibold leading-5 !urbanist text-[#171717]">
                      {exp.job_title}
                    </p>
                    <p className="text-xs font-semibold leading-5 !urbanist text-[#171717]">
                      {dayjs(exp.start_date).format("MMM YYYY")} -{" "}
                      {dayjs(exp.end_date).format("MMM YYYY")}
                    </p>
                  </div>
                  <p className="leading-4 !urbanist text-xs text-[#171717] font-medium">
                    {exp.company_name}
                  </p>
                </div>
                <p className="leading-4 !urbanist text-xs text-[#171717] font-normal pr-4">
                  {exp.responsibilities}
                </p>
              </div>
            ))}
            <span>
              <AkabakaIcon />
            </span>
          </div>
        </div>
      </div>

      {/* Skills and Trainings */}
      <div className="flex gap-4 mt-4">
        <div className="flex flex-col w-[250px] gap-3">
          <p className="leading-5 text-sm font-medium text-[#0D0D0D] uppercase !urbanist">
            Key Skills
          </p>
          <div className="flex flex-col gap-1">
            {resumeData.skills.map((skill, index) => (
              <p
                key={index}
                className="leading-5 text-xs !urbanist font-normal text-[#171717] capitalize"
              >
                {skill.skill}
              </p>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1 -mt-12">
          <div className="w-[90%] px-[60px] py-6 bg-[#293946] text-center">
            <p className="leading-4 tracking-[2px] !urbanist text-sm font-semibold text-white uppercase">
              Training
            </p>
          </div>
          <div className="flex flex-col gap-3 pr-4">
            {resumeData.courses_and_training_details.map((training, index) => (
              <div key={index} className="flex flex-col gap-1">
                <div className="flex items-center gap-2 w-full justify-between">
                  <p className="text-sm font-semibold leading-5 !urbanist text-[#171717]">
                    {training.name_of_institute}
                  </p>
                  <p className="text-xs font-semibold leading-5 !urbanist text-[#171717]">
                    {dayjs(training.start_date).format("MMM YYYY")} -{" "}
                    {dayjs(training.end_date).format("MMM YYYY")}
                  </p>
                </div>
                <p className="leading-4 !urbanist text-xs text-[#171717] font-medium">
                  {training.course_name}
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

export default ResumeNineEdit;
