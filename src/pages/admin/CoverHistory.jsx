import { useResume } from "@/providers/ResumeContext";
import React from "react";
import { FaFileAlt, FaGlobe } from "react-icons/fa";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { toast } from "sonner";

const mockCoverLetters = [
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    created_at: new Date().toISOString(),
    cover_letter_language: "English",
    template_id: "1",
  },
];

export default function CoverHistory() {
  const navigate = useNavigate();
  const { setCoverLetter } = useResume();

  const handleClick = (templateData) => {
    setCoverLetter({ data: templateData });
    navigate(`/dashboard/cover-history/${templateData?.template_id}`);
  };

  const handleDelete = (id) => {
    toast.success("Cover Letter deleted successfully!");
  };

  return (
    <div className="space-y-4 p-4 bg-black">
      {mockCoverLetters.map((resume, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-sm hover:shadow-md transition"
        >
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <FaFileAlt className="text-white text-3xl" />
            <div>
              <h2 className="text-white font-medium">
                {resume.first_name} {resume.last_name}
              </h2>
              <p className="text-sm text-gray-400">
                Created: {dayjs(resume.created_at).format("YYYY-MM-DD")}
              </p>
            </div>
          </div>

          {/* Language */}
          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-800 text-gray-200 text-sm rounded-lg border border-zinc-700">
            {resume.cover_letter_language}
            <FaGlobe className="ml-1" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleClick(resume)}
              className="flex items-center gap-1 px-3 py-1 rounded-lg border border-zinc-700 text-gray-200 hover:bg-zinc-800 transition"
            >
              <FiEye /> View
            </button>
            <button
              onClick={() => handleDelete(resume.id)}
              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-red-900/30 text-red-500 border border-red-700 hover:bg-red-900/50 transition"
            >
              <FiTrash2 /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
