import { useEmail } from "@/hooks/useEmail";
import { useResume } from "@/providers/ResumeContext";
import React from "react";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github.css";
import rehypeHighlight from "rehype-highlight";

export default function CoverLetter({ resumeRef }) {
  const { coverLetter } = useResume();
  const { language } = useEmail();
  const cover = coverLetter?.data;
  
  // Replace single newlines with two spaces and a newline (Markdown line break)
  // Replace double newlines with paragraph breaks
  const processedContent = (cover?.cover_letter_content )
    .replace(/\n\n/g, '<br/><br/>')  // Double newlines for paragraphs
    .replace(/\n/g, '  \n');  // Single newlines with spaces for line breaks

  return (
    <div
      ref={resumeRef}
      className=" w-[210mm] h-[297mm] bg-white shadow-lg p-[25mm] mx-auto !outfit"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#2E2E48]">
          {cover?.first_name} {cover?.last_name}
        </h1>
        <p className="text-[#516CF7] font-medium text-lg">{cover?.job_title}</p>

        {/* Contact Info */}
        <div className="mt-2 flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <MdEmail className="text-[#79819A]" />
            <div>
              <p className="text-sm text-[#47516B]">{cover?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <MdPhone className="text-[#79819A]" />
            <div>
              <p className="text-sm text-[#47516B]">{cover?.phone_number}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <MdLocationOn className="text-[#79819A]" />
            <div>
              <p className="text-sm text-[#47516B]">{cover?.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-6 border"></div>

      {/* Body */}
      <div className="text-sm leading-relaxed">
        <p className="text-[#2E2E48] font-medium flex items-end justify-end my-2">
          {new Date().toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>

        {/* Markdown Body */}
        <div className="prose-sm mt-6 prose-p:mb-4 prose-h2:mt-8 prose-h2:mb-4 prose-h3:mt-6 prose-h3:mb-3 tracking-[0.5px] leading-[24px] text-[#000]">
          <ReactMarkdown
            children={processedContent}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
          />
        </div>
      </div>
    </div>
  );
}