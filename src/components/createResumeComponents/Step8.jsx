import React from "react";
import Title from "../common/Title";
import { Edit2 } from "lucide-react";
import { FaEye } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ImageAssets } from "@/lib/ImageProvider";
import ResumeOne from "../All_Templates/ResumeOne";
import ResumeTwo from "../All_Templates/ResumeTwo";
import ResumeThree from "../All_Templates/ResumeThree";
import ResumeFour from "../All_Templates/ResumeFour";
import ResumeFive from "../All_Templates/ResumeFive";
import ResumeSix from "../All_Templates/ResumeSix";
import ResumeSeven from "../All_Templates/ResumeSeven";
import ResumeEight from "../All_Templates/ResumeEight";
import ResumeNine from "../All_Templates/ResumeNine";
import ResumeTen from "../All_Templates/ResumeTen";
import ResumeEleven from "../All_Templates/ResumeEleven";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useFormContext } from "react-hook-form";
import { useEmail } from "@/hooks/useEmail";
import Tailor_Modal from "./Tailor_Modal";
import { useResume } from "@/providers/ResumeContext";

// Resume data
export const resumeData = [
  { id: 1, title: "Resume 1", resume: ImageAssets.Resume1, cvComponet: <ResumeOne /> },
  { id: 2, title: "Resume 2", resume: ImageAssets.Resume2, cvComponet: <ResumeTwo /> },
  { id: 3, title: "Resume 3", resume: ImageAssets.Resume3, cvComponet: <ResumeThree /> },
  { id: 4, title: "Resume 4", resume: ImageAssets.Resume4, cvComponet: <ResumeFour /> },
  { id: 5, title: "Resume 5", resume: ImageAssets.Resume5, cvComponet: <ResumeFive /> },
  { id: 6, title: "Resume 6", resume: ImageAssets.Resume6, cvComponet: <ResumeSix /> },
  { id: 7, title: "Resume 7", resume: ImageAssets.Resume9, cvComponet: <ResumeSeven /> },
  { id: 8, title: "Resume 8", resume: ImageAssets.Resume8, cvComponet: <ResumeEight /> },
  { id: 9, title: "Resume 9", resume: ImageAssets.Resume10, cvComponet: <ResumeNine /> },
  { id: 10, title: "Resume 10", resume: ImageAssets.Resume7, cvComponet: <ResumeTen /> },
  { id: 11, title: "Resume 11", resume: ImageAssets.Resume11, cvComponet: <ResumeEleven /> },
];

const texts = {
  en: {
    heading: "Your AI-Generated Resumes Are Ready!",
    description:
      "We’ve created multiple resume versions tailored to your profile, optimized for the German job market. Preview, edit, and download the one that fits your goals best.",
    edit: "Edit",
    editing: "Editing...",
    preview: "Preview",
    preparing: "Preparing preview..."
  },
  de: {
    heading: "Ihre KI-erstellten Lebensläufe sind fertig!",
    description:
      "Wir haben mehrere Lebenslauf-Versionen erstellt, die auf Ihr Profil zugeschnitten sind und für den deutschen Arbeitsmarkt optimiert wurden. Vorschau, Bearbeitung und Herunterladen desjenigen, der am besten zu Ihren Zielen passt.",
    edit: "Bearbeiten",
    editing: "Bearbeiten...",
    preview: "Vorschau",
    preparing: "Vorschau vorbereiten..."
  }
};



const Step8 = ({ activeStep, setActiveStep, resumeId, setResumeId }) => {
  const axiosSecure = useAxiosSecure();
  const {allRedumeData } =useResume()
  const navigate = useNavigate();
  const { watch } = useFormContext();
  console.log()
   const {language} =useEmail()
  const t = texts[language];

  const IdSetupMutation = useMutation({
    mutationFn: async (body) => {
      const res = await axiosSecure.post(`/update-template-id/${allRedumeData?.data?.id}/`, body);
      return res.data;
    },
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });

  return (
    <div className="text-white flex items-center justify-center p-3 lg:px-6 xl:py-6">
      <div className="w-full">
        {/* Heading */}
        <div className="text-center flex md:hidden flex-col items-center gap-2 mb-5 xl:mb-10">
          <Title level="title24">{t.heading}</Title>
          <Title level="title14">{t.description}</Title>
        </div>
        <div className="text-center hidden md:flex flex-col items-center gap-4 mb-5 xl:mb-10">
          <Title level="title40">{t.heading}</Title>
          <Title level="title20">{t.description}</Title>
        </div>

        {/* Resume Grid */}
        <div className="sm:mt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {resumeData.map((item) => (
            <div
              key={item.id}
              className="p-2 sm:p-3 relative group border border-[#262626] rounded-xl bg-[#0E0E10]"
            >
              <img src={item.resume} alt={`resume ${item.id}`} className="rounded-xl" />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#0E0E10]/70 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <div className="flex flex-col  gap-2 sm:gap-4">
                  {/* Edit Button */}
                  <button
                    onClick={() => {
                      IdSetupMutation.mutate({ template_id: item.id });
                      navigate(`/dashboard/edit-resume/${item.id}`);
                      
                    }}
                    className="border px-2 py-1 bg-black/40 rounded-full flex items-center justify-center gap-2 text-white hover:bg-black/60 transition"
                  >
                    {IdSetupMutation.isPending ? t.editing : t.edit} <Edit2 size={14} />
                  </button>

                  {/* Preview Button */}
                  <button
                    onClick={() => {
                      IdSetupMutation.mutate({ template_id: item.id });
                      setActiveStep(activeStep + 1, item.id);
                      setResumeId(item.id);
                    }}
                    className="border px-2 py-1 bg-black/40 rounded-full flex items-center gap-2 text-white hover:bg-black/60 transition"
                  >
                    {IdSetupMutation.isPending ? t.preparing : t.preview} <FaEye size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
             
        </div>
      </div>
    </div>
  );
};

export default Step8;
