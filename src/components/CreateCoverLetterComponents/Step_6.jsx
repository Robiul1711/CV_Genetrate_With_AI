import React, { useRef } from "react";
import resume from "../../assets/images/resume4.png";
import { Download } from "lucide-react";
import CoverLetter from "../All_Templates/CoverLetter";
import { useResume } from "@/providers/ResumeContext";
import DownloadButton from "../common/DownloadButton";

const Step_6 = () => {
  const {coverLetter}=useResume();
 const resumeRef = useRef();

  return (
    <div className="bg-black text-white flex justify-center">
      <div className="w-full flex flex-col md:flex-row gap-6 md:gap-14">
        {/* Resume Preview */}
        <div className="md:w-1/2 mx-auto flex flex-col gap-2">
        <DownloadButton resumeRef={resumeRef}/>
         <CoverLetter resumeRef={resumeRef} coverLetter={coverLetter}/>
        </div>

        {/* Download & Name Section */}
        {/* <div className="md:w-1/2 flex flex-col justify-end">

          <div className="flex flex-col gap-2">
            <label className="text-sm">Resume name</label>
            <input
              type="text"
              placeholder="Write here..."
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
          </div>


          <div className="sm:mt-10 mt-5 flex flex-col gap-4">
            <label className="text-sm">Download Type</label>
            <div className="flex gap-2 pb-5">
              <select className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white w-full">
                <option value="pdf">PDF</option>
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
              </select>
              <button className="font-semibold flex items-center gap-2 border-white bg-white text-black px-8 text-xs rounded-md hover:bg-[#69CA6A] hover:text-white transition-colors duration-300">
                <Download size={18} /> Download
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Step_6;
