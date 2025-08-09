import React from "react";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

export default function CoverLetter() {
  return (
    <div className="w-[210mm] h-[297mm] bg-white shadow-lg py-12 px-20 mx-auto !outfit">
      {/* Header */}
      <div className="">
        <h1 className="text-2xl font-bold text-[#2E2E48]">Angelo Libero</h1>
        <p className="text-[#516CF7] font-medium text-lg">Full-Stack Designer</p>

        {/* Contact Info */}
        <div className="mt-8 flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <MdEmail className="text-[#79819A] text-3xl p-1.5 bg-[#79819A]/20 rounded-full" />
            <div>
              <p className="text-xs text-[#79819A]">Email</p>
              <p className="text-sm text-[#47516B]">angelo.libero@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MdPhone className="text-[#79819A] text-3xl p-1.5 bg-[#79819A]/20 rounded-full" />
            <div>
              <p className="text-xs text-[#79819A]">Phone</p>
              <p className="text-sm text-[#47516B]">(+39) 333 0123 765</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MdLocationOn className="text-[#79819A] text-3xl p-1.5 bg-[#79819A]/20 rounded-full" />
            <div>
              <p className="text-xs text-[#79819A]">Address</p>
              <p className="text-sm text-[#47516B]">Bologna, Italy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="py-6"></div>

      {/* Body */}
      <div className=" text-sm text-gray-800 leading-relaxed">
        <p className="text-[#2E2E48] font-medium">[Today’s Date]</p>
        <p className="mt-2 text-[#2E2E48] font-medium">Dear [Manager’s Name]</p>

        <p className="mt-6 tracking-[0.5px] leading-[16px] text-[#47516B]">
          Omnis minima inventore minus. Aut et incidunt. Aut fugiat culpa illum
          optio dolorum aut maxime ipsa. Laborum incidunt enim consectetur
          perspiciatis. Dolore ullam dolor impedit dolorum recusandae facilis
          quo et. Et ipsam vel sunt qui ut officia voluptatem.
        </p>


        <div className="mt-8 text-[#2E2E48] font-medium">
          <p>Sincerely,</p>
          <p className="mt-1">Angelo Libero</p>
        </div>
      </div>
    </div>
  );
}
