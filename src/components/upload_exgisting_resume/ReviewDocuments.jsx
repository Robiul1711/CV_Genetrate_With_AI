import React from "react";
import resume from "../../assets/images/resume.png";
import resume2 from "../../assets/images/resume2.png";
import resume3 from "../../assets/images/resume3.png";
import { Download, Edit2 } from "lucide-react";
import CongratulationsModal from "../createResumeComponents/CongratulationsModal";
const ReviewDocuments = () => {
  return (
    <div className="w-full flex flex-col justify-between gap-6">
      {/* Image */}
      <div className=" grid grid-cols-3 ">
        <img src={resume} alt="resume" className="" />
        <img src={resume2} alt="resume" className="" />
        <img src={resume3} alt="resume" className="" />
        {/* <img src={resume} alt="resume" className="w-full" /> */}
      </div>
      <div className=" flex flex-col ">
        <div className="flex  flex-col gap-2">
          <label className="text-sm text-white">Cover Latter name</label>
          <input
            type="text"
            placeholder="Write here..."
            className="bg-[#0E0E10] p-5 rounded-lg border border-[#262626] text-white"
          />
        </div>
        <div className="sm:mt-10 mt-5 flex flex-col w-full gap-4">
          <label className="text-sm text-white">Download Type</label>
          <div className="flex flex-col sm:flex-row pb-10  gap-2">
            <div className="flex flex-col w-full gap-2">
              <select className="bg-[#0E0E10] p-5 rounded-lg border border-[#262626] text-white">
                <option value="beginner">PDF</option>
                <option value="intermediate">PNG</option>
                <option value="advanced">JPG</option>
              </select>
            </div>
            {/* Download Modal  */}
            <CongratulationsModal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDocuments;
