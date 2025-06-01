import React from "react";
import Title from "../common/Title";
import resume from "../../assets/images/resume.png";
import { Edit2 } from "lucide-react";
import { FaEye } from "react-icons/fa6";

const resumeData = [
  {
    title: "Resume 1",
    resume: resume,
  },
  {
    title: "Resume 2",
    resume: resume,
  },
  {
    title: "Resume 3",
    resume: resume,
  },
  {
    title: "Resume 4",
    resume: resume,
  },
  {
    title: "Resume 5",
    resume: resume,
  },
  {
    title: "Resume 6",
    resume: resume,
  },
];
const Step8 = () => {
  return (
    <div className="bg-black text-white flex items-center justify-center p-6">
      <div className=" w-full">
        <div className="text-center flex flex-col items-center gap-4 mb-10">
          <Title level="title40">Your AI-Generated Resumes Are Ready!</Title>
          <Title level="title20">
            We’ve created multiple resume versions tailored to your profile,
            optimized for the German job market. Preview, edit, and download the
            one that fits your goals best.
          </Title>
        </div>
        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-4">
          {resumeData.map((item, index) => (
            <div
              key={index}
              className="p-5 relative group border border-[#262626] rounded-xl bg-[#0E0E10]"
            >
              {/* Image */}
              <img src={item.resume} alt="resume" className="rounded-xl" />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#0E0E10]/70 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <div className="flex gap-4">
                  <button className="border px-4 bg-black/40 py-2 rounded-full flex items-center gap-2 text-white hover:bg-black/60 transition">
                    Edit <Edit2 size={18} />
                  </button>
                  <button className="border px-4 bg-black/40 py-2 rounded-full flex items-center gap-2 text-white hover:bg-black/60 transition">
                    Preview <FaEye size={18} />
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
