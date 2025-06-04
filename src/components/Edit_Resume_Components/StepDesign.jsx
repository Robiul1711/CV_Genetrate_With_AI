import React from "react";

const StepDesign = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm text-white">Change Language</label>
        <select className="bg-[#0E0E10] p-5 rounded-lg border border-[#262626] text-white">
                <option value="beginner">German</option>
              <option value="intermediate">English</option>
              <option value="advanced">Russian</option>
              <option value="advanced">Arabic</option>
              <option value="advanced">Spanish</option>
              <option value="advanced">Turkish</option>
        </select>
      </div>
      <div>
        <p className="text-sm text-white mb-4">Change Color</p>
        <div className="flex items-center gap-3 ">
          <div className="w-12 h-12 rounded-md bg-[#CB6E17]"></div>
          <div className="w-12 h-12 rounded-md bg-[#17CBA7]"></div>
          <div className="w-12 h-12 rounded-md bg-[#17A4CB]"></div>
          <div className="w-12 h-12 rounded-md bg-[#fff]"></div>
          <div className="w-12 h-12 rounded-md bg-[#CB175F]"></div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-white">Font Style</label>
        <select className="bg-[#0E0E10] p-5 rounded-lg border border-[#262626] text-white">
          <option value="beginner">Inter</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
    </div>
  );
};

export default StepDesign;
