import React from "react";
import resume from "../../assets/images/resume.png";
import { Download, Edit2 } from "lucide-react";
import { Link } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";
import Title from "../common/Title";

const FinalReview = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Link to={"/dashboard/edit-resume"} className="flex items-center gap-2">
          <FaAngleLeft className="cursor-pointer text-3xl p-1 border border-white/30 rounded-full" />

          <Title level="title32">Final Review</Title>
        </Link>
        <Title level="title22">
          You’re almost done! Preview your updated resume before downloading.
        </Title>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-between gap-6 md:gap-14">
        {/* Image */}
        <div className="md:w-1/2">
          <img src={resume} alt="resume" className="w-full" />
        </div>
        <div className="md:w-1/2 flex flex-col justify-end">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Resume name</label>
            <input
              type="text"
              placeholder="Write here..."
              className="bg-[#0E0E10] p-5 rounded-lg border border-[#262626] text-white"
            />
          </div>
          <div className="md:mt-10 mt-5 flex flex-col w-full gap-4">
            <label className="text-sm text-white">Download Type</label>
            <div className="flex pb-10  gap-2">
              <div className="flex flex-col w-full gap-2">
                <select className="bg-[#0E0E10] p-5 rounded-lg border border-[#262626] text-white">
                  <option value="beginner">PDF</option>
                  <option value="intermediate">PNG</option>
                  <option value="advanced">JPG</option>
                </select>
              </div>
              <button className="font-semibold flex items-center max-w-sm gap-2 border-white bg-white text-black py-4 px-8 text-lg rounded-md hover:bg-[#69CA6A] hover:text-white transition-colors duration-300">
                <Download size={20} /> Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinalReview;
