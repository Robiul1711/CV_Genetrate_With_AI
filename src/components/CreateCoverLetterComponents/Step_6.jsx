import React from "react";
import resume from "../../assets/images/resume4.png";
import { Download, Edit2 } from "lucide-react";

const Step_6 = () => {
  return (
    <div className="bg-black text-white flex items-center justify-center">
      <div className=" w-full">
        <div className="">
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
                  className="bg-[#0E0E10] px-3 py-1.5 text-xs  rounded-lg border border-[#262626] text-white"
                />
              </div>
              <div className="sm:mt-10 mt-5 flex flex-col w-full gap-4">
                <label className="text-sm text-white">Download Type</label>
                <div className="flex pb-5  gap-2">
                  <div className="flex flex-col w-full gap-2">
                    <select className="bg-[#0E0E10] px-3 py-1.5 text-xs  rounded-lg border border-[#262626] text-white">
                      <option value="beginner">PDF</option>
                      <option value="intermediate">PNG</option>
                      <option value="advanced">JPG</option>
                    </select>
                  </div>
                  <button className="font-semibold flex items-center max-w-sm gap-2 border-white bg-white text-black  px-8 text-xs rounded-md hover:bg-[#69CA6A] hover:text-white transition-colors duration-300">
                    <Download size={18} /> Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step_6;
