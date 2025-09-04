// import React from "react";
// import Title from "@/components/common/Title";
// import { ImageAssets } from "@/lib/ImageProvider";
// import ResumeOneEdit from "@/components/All_Edit_template/ResumeOneEdit";
// import ResumeTwoEdit from "@/components/All_Edit_template/ResumeTwoEdit";
// import ResumeThreeEdit from "@/components/All_Edit_template/ResumThreeEdit";
// import ResumeFourEdit from "@/components/All_Edit_template/ResumeFourEdit";
// import ResumeFiveEdit from "@/components/All_Edit_template/ResumeFiveEdit";
// import ResumeSixEdit from "@/components/All_Edit_template/ResumeSixEdit";
// import ResumeSevenEdit from "@/components/All_Edit_template/ResumeSevenEdit";
// import ResumeEightEdit from "@/components/All_Edit_template/ResumeEightEdit";
// import ResumeNineEdit from "@/components/All_Edit_template/ResumeNineEdit";
// import ResumeTenEdit from "@/components/All_Edit_template/ResumeTenEdit";
// import ResumeElevenEdit from "@/components/All_Edit_template/ResumeElevenEdit";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "@/hooks/useAxiosSecure";
// import { FaEdit } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useResume } from "@/providers/ResumeContext";
// import { useEmail } from "@/hooks/useEmail";

// // Resume data array
// export const resumeData = [
//   { id: 1, title: "Resume 1", resume: ImageAssets.Resume1, cvComponet: <ResumeOneEdit /> },
//   { id: 2, title: "Resume 2", resume: ImageAssets.Resume2, cvComponet: <ResumeTwoEdit /> },
//   { id: 3, title: "Resume 3", resume: ImageAssets.Resume3, cvComponet: <ResumeThreeEdit /> },
//   { id: 4, title: "Resume 4", resume: ImageAssets.Resume4, cvComponet: <ResumeFourEdit /> },
//   { id: 5, title: "Resume 5", resume: ImageAssets.Resume5, cvComponet: <ResumeFiveEdit /> },
//   { id: 6, title: "Resume 6", resume: ImageAssets.Resume6, cvComponet: <ResumeSixEdit /> },
//   { id: 7, title: "Resume 7", resume: ImageAssets.Resume9, cvComponet: <ResumeSevenEdit /> },
//   { id: 8, title: "Resume 8", resume: ImageAssets.Resume8, cvComponet: <ResumeEightEdit /> },
//   { id: 9, title: "Resume 9", resume: ImageAssets.Resume10, cvComponet: <ResumeNineEdit /> },
//   { id: 10, title: "Resume 10", resume: ImageAssets.Resume7, cvComponet: <ResumeTenEdit /> },
//   { id: 11, title: "Resume 11", resume: ImageAssets.Resume11, cvComponet: <ResumeElevenEdit /> },
// ];

// const History = () => {
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();
//   const { setAllResumeData } = useResume();
//   const { language } = useEmail(); // get current language

//   // Translation text map
//   const texts = {
//     en: {
//       loading: "Loading your documents...",
//       noResume: "No resume found",
//       noResumeDesc: "You have not created any resumes yet.",
//       noDocs: "No documents found",
//       noDocsDesc: "You haven't created any documents yet.",
//       header: "Your Generated Documents",
//     },
//     de: {
//       loading: "Ihre Dokumente werden geladen...",
//       noResume: "Kein Lebenslauf gefunden",
//       noResumeDesc: "Sie haben noch keinen Lebenslauf erstellt.",
//       noDocs: "Keine Dokumente gefunden",
//       noDocsDesc: "Sie haben noch keine Dokumente erstellt.",
//       header: "Ihre erstellten Dokumente",
//     },
//   };

//   const t = language === "de" ? texts.de : texts.en;

//   // Fetch resume history from API
//   const { data: allCvData, isLoading, error } = useQuery({
//     queryKey: ["all-cv-data"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/resume-histories/");
//       return res.data;
//     },
//   });

//   const handleClick = (templateData) => {
//     setAllResumeData({ data: templateData });
//     navigate(`/dashboard/edit-resume/${templateData?.template_id}`);
//   };

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="flex flex-col items-center gap-4 mt-10 px-4">
//         <Title level="title40">{t.loading}</Title>
//         <div className="grid grid-cols-3 gap-6 w-full">
//           {Array(6)
//             .fill(0)
//             .map((_, i) => (
//               <div
//                 key={i}
//                 className="w-full h-48 bg-gray-200 animate-pulse rounded-md"
//               />
//             ))}
//         </div>
//       </div>
//     );
//   }

//   // Error state if no resume found
//   if (error?.response?.data?.message === "No resume found for this user") {
//     return (
//       <div className="flex flex-col items-center gap-4 mt-10 px-4">
//         <Title level="title40">{t.noResume}</Title>
//         <p className="text-gray-600">{t.noResumeDesc}</p>
//       </div>
//     );
//   }

//   // Empty state
//   if (allCvData?.data?.length === 0) {
//     return (
//       <div className="flex flex-col items-center gap-4 mt-10 px-4">
//         <Title level="title40">{t.noDocs}</Title>
//         <p className="text-gray-600">{t.noDocsDesc}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="mt-10 px-4">
//       <Title level="title40" className="mb-6">
//         {t.header}
//       </Title>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//         {allCvData?.data?.map((cv, index) => {
//           const template = resumeData.find(
//             (item) => Number(item.id) === Number(cv.template_id)
//           );

//           if (!template) return null;
//           return (
//             <div
//               key={index}
//               className="relative group border rounded-md overflow-hidden shadow hover:shadow-lg transition"
//             >
//               <img
//                 src={template.resume}
//                 alt={template.title}
//                 className="w-full object-cover"
//               />
//               <button
//                 onClick={() => handleClick(cv)}
//                 className="absolute top-2 right-2 bg-blue-600 text-white p-2 rounded opacity-0 group-hover:opacity-100 transition"
//               >
//                 <FaEdit size={14} />
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default History;

import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useEmail } from "@/hooks/useEmail";
import { useResume } from "@/providers/ResumeContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FaFileAlt, FaGlobe } from "react-icons/fa";
import { FiEye, FiDownload, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import ResumeOneEdit from "@/components/All_Edit_template/ResumeOneEdit";
import ResumeTwoEdit from "@/components/All_Edit_template/ResumeTwoEdit";
import ResumeThreeEdit from "@/components/All_Edit_template/ResumThreeEdit";
import ResumeFourEdit from "@/components/All_Edit_template/ResumeFourEdit";
import ResumeFiveEdit from "@/components/All_Edit_template/ResumeFiveEdit";
import ResumeSixEdit from "@/components/All_Edit_template/ResumeSixEdit";
import ResumeSevenEdit from "@/components/All_Edit_template/ResumeSevenEdit";
import ResumeEightEdit from "@/components/All_Edit_template/ResumeEightEdit";
import ResumeNineEdit from "@/components/All_Edit_template/ResumeNineEdit";
import ResumeTenEdit from "@/components/All_Edit_template/ResumeTenEdit";
import ResumeElevenEdit from "@/components/All_Edit_template/ResumeElevenEdit";
import { toast } from "react-toastify";
import { showLoadingToast, updateToastSuccess } from "@/lib/utils";
// // Resume data array
export const resumeData = [
  { id: 1, title: "Resume 1", cvComponet: <ResumeOneEdit /> },
  { id: 2, title: "Resume 2", cvComponet: <ResumeTwoEdit /> },
  { id: 3, title: "Resume 3", cvComponet: <ResumeThreeEdit /> },
  { id: 4, title: "Resume 4", cvComponet: <ResumeFourEdit /> },
  { id: 5, title: "Resume 5", cvComponet: <ResumeFiveEdit /> },
  { id: 6, title: "Resume 6", cvComponet: <ResumeSixEdit /> },
  { id: 7, title: "Resume 7", cvComponet: <ResumeSevenEdit /> },
  { id: 8, title: "Resume 8", cvComponet: <ResumeEightEdit /> },
  { id: 9, title: "Resume 9", cvComponet: <ResumeNineEdit /> },
  { id: 10, title: "Resume 10", cvComponet: <ResumeTenEdit /> },
  { id: 11, title: "Resume 11", cvComponet: <ResumeElevenEdit /> },
];
export default function ResumeHistory() {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { setAllResumeData } = useResume();
  const { language } = useEmail(); // get current language

  const {
    data: allCvData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["all-cv-data"],
    queryFn: async () => {
      const res = await axiosSecure.get("/resume-histories/");
      return res.data;
    },
  });
  const handleClick = (templateData) => {
    setAllResumeData({ data: templateData });
    console.log("Template Data:", templateData);
    navigate(`/dashboard/edit-resume/${templateData?.template_id}`);
  };
  const queryClient = useQueryClient();

  const DeleteResume = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/delete-resume/${id}/`);
      return res.data;
    },
    onMutate: () => {
      const toastId = showLoadingToast("Deleting resume...");
      return { toastId };
    },
    onSuccess: (data, _variables, context) => {
      updateToastSuccess(
        context.toastId,
        data?.message || "Resume deleted successfully!"
      );
      // ✅ Refetch list
      queryClient.invalidateQueries(["all-cv-data"]);
    },
    onError: (error, _variables, context) => {
      updateToastError(
        context.toastId,
        error?.response?.data?.message || "Something went wrong!"
      );
    },
  });

  const handleDelete = (id) => {
    DeleteResume.mutate(id);
  };

  return (
    <div className="space-y-4 p-4 bg-black ">
      {allCvData?.data?.map((resume, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-sm hover:shadow-md transition"
        >
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <FaFileAlt className="text-white text-3xl" />
            <div>
              <h2 className="text-white font-medium">
                {resume.first_name} {resume.last_name}{" "}
              </h2>
              <p className="text-sm text-gray-400">
                Created: {dayjs(resume.created_at).format("YYYY-MM-DD")}
              </p>
            </div>
          </div>

          {/* Language */}
          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-800 text-gray-200 text-sm rounded-lg border border-zinc-700">
            {resume.resume_language === "de" ? "Deutsch" : "English"}
            <FaGlobe className="ml-1" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleClick(resume)}
              className="flex items-center gap-1 px-3 py-1 rounded-lg border border-zinc-700 text-gray-200 hover:bg-zinc-800 transition"
            >
              <FiEye /> {language === "de" ? "Sicht" : "View"}
            </button>
            {/* <button className="flex items-center gap-1 px-3 py-1 rounded-lg border border-zinc-700 text-gray-200 hover:bg-zinc-800 transition">
              <FiDownload /> Download
            </button> */}
            <button
              onClick={() => handleDelete(resume.id)}
              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-red-900/30 text-red-500 border border-red-700 hover:bg-red-900/50 transition"
            >
              <FiTrash2 /> {language === "de" ? "Löschen" : "Delete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
