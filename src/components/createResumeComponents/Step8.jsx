import React from "react";
import Title from "../common/Title";
import resume from "../../assets/images/resume.png";
import { Edit2 } from "lucide-react";
import { FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";

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
const Step8 = ({ activeStep, setActiveStep }) => {
  return (
    <div className=" text-white flex items-center justify-center p-3 lg:px-6 xl:py-6">
      <div className=" w-full">
        
        <div className="text-center flex md:hidden flex-col items-center gap-2 mb-5 xl:mb-10">
          <Title level="title24">Your AI-Generated Resumes Are Ready!</Title>
          <Title level="title14">
            We’ve created multiple resume versions tailored to your profile,
            optimized for the German job market. Preview, edit, and download the
            one that fits your goals best.
          </Title>
        </div>
        <div className="text-center hidden md:flex flex-col items-center gap-4 mb-5 xl:mb-10">
          <Title level="title40">Your AI-Generated Resumes Are Ready!</Title>
          <Title level="title20">
            We’ve created multiple resume versions tailored to your profile,
            optimized for the German job market. Preview, edit, and download the
            one that fits your goals best.
          </Title>
        </div>
        <div className="sm:mt-14 grid grid-cols-2 md:grid-cols-3 gap-4">
          {resumeData.map((item, index) => (
            <div
              key={index}
              className="p-2 sm:p-5 relative group border border-[#262626] rounded-xl bg-[#0E0E10]"
            >
              {/* Image */}
              <img src={item.resume} alt="resume" className="rounded-xl" />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#0E0E10]/70 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <Link
                    to="/dashboard/edit-resume"
                    className="border px-4 bg-black/40 py-2 rounded-full  flex items-center gap-2 text-white hover:bg-black/60 transition"
                  >
                    Edit <Edit2 size={18} />
                  </Link>
                  <button
                    onClick={() => setActiveStep(activeStep + 1)}
                    className="border px-4 bg-black/40 py-2 rounded-full  flex items-center gap-2 text-white hover:bg-black/60 transition"
                  >
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
