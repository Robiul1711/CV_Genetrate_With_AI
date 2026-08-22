import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { resumeData } from "./Step8";
import { Link } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import Title from "../common/Title";

const Step9 = ({ resumeId }) => {
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const cv = resumeData.find(
      (item) => parseInt(item.id) === parseInt(resumeId)
    );
    setResume(cv);
  }, [resumeId]);

  return (
    <div className=" flex items-center justify-center py-5 px-4 text-white">


      <div className="w-full max-w-5xl lg:bg-[#1A1A1D] lg:rounded-2xl lg:shadow-lg lg:p-4 xl:p-6">
        {/* Preview */}
        <div className="w-full bg-[#0E0E10] rounded-xl p-4 border border-[#262626]">
        <Link
        to={"/dashboard/create-New-resume"}
        className="flex items-center gap-2"
        state={{ step: 9 }}
      >
        <FaAngleLeft className="cursor-pointer text-xl p-1 border border-white/30 rounded-full" />
        <Title level="title32">Go Back</Title>
      </Link>

          <div
            className="bg-black/30 flex items-center justify-center 
                  max-h-[180vh]  overflow-auto p-2 rounded-lg"
          >
            {resume && resume.cvComponet ? (
              <div className="w-full">{resume.cvComponet}</div>
            ) : (
              <p className="text-gray-500 text-sm text-center">
                No resume selected
              </p>
            )}
          </div>
        </div>

        {/* <div className="mt-10 grid sm:grid-cols-2 gap-6">

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">
              Resume Name
            </label>
            <input
              type="text"
              placeholder="e.g. My Portfolio Resume"
              className="bg-[#0E0E10] px-4 py-2 text-sm rounded-lg border border-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#69CA6A] text-white placeholder-gray-500"
            />
          </div>

       
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">
              Download Type
            </label>
            <select className="bg-[#0E0E10] px-4 py-2 text-sm rounded-lg border border-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#69CA6A] text-white">
              <option value="pdf">PDF</option>
              <option value="png">PNG</option>
              <option value="jpg">JPG</option>
            </select>
          </div>
        </div> */}

        {/* <div className="mt-10 flex justify-end">
          <button className="font-semibold flex items-center gap-2 bg-[#69CA6A] text-black px-6 py-2 rounded-lg shadow-md hover:bg-[#58b258] transition-all duration-300">
            <Download size={18} /> Download Resume
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Step9;
