import { useResume } from "@/providers/ResumeContext";
import React from "react";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

export default function CoverLetter({resumeRef}) {
  const { coverLetter } = useResume();
  const cover = coverLetter?.data;
  console.log(cover);
  return (
    <div ref={resumeRef} className="w-[210mm]  bg-white shadow-lg py-12 px-20 mx-auto !outfit">
      {/* Header */}
      <div className="">
        <h1 className="text-2xl font-bold text-[#2E2E48]">
          {cover?.first_name} {cover?.last_name}
        </h1>
        <p className="text-[#516CF7] font-medium text-lg">{cover?.job_title}</p>

        {/* Contact Info */}
        <div className="mt-8 flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <MdEmail className="text-[#79819A] text-3xl p-1.5 bg-[#79819A]/20 rounded-full" />
            <div>
              <p className="text-xs text-[#79819A]">Email</p>
              <p className="text-sm text-[#47516B]">{cover?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MdPhone className="text-[#79819A] text-3xl p-1.5 bg-[#79819A]/20 rounded-full" />
            <div>
              <p className="text-xs text-[#79819A]">Phone</p>
              <p className="text-sm text-[#47516B]">{cover?.phone_number}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MdLocationOn className="text-[#79819A] text-3xl p-1.5 bg-[#79819A]/20 rounded-full" />
            <div>
              <p className="text-xs text-[#79819A]">Address</p>
              <p className="text-sm text-[#47516B]">{cover?.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="py-6"></div>

      {/* Body */}
      <div className=" text-sm text-gray-800 leading-relaxed">
        <p className="text-[#2E2E48] font-medium">
          {new Date().toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>

        <p className="mt-2 text-[#2E2E48] font-medium">Dear [Manager’s Name]</p>

        <p className="mt-6 tracking-[0.5px] leading-[16px] text-[#47516B]">
          {cover?.resume_content}
        </p>

        <div className="mt-8 text-[#2E2E48] font-medium">
          <p>Sincerely,</p>
          <p className="mt-1">Angelo Libero</p>
        </div>
      </div>
    </div>
  );
}
