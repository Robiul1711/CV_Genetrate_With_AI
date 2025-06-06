import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import Title from "../common/Title";
import { LuCirclePlus } from "react-icons/lu";
const Step_5 = () => {
  return (
    <div className=" text-white flex items-center justify-center">
      <div className="w-[800px] mx-auto">
        <div className="text-center flex flex-col items-center gap-4 mb-5">
          <Title level="title40">Cover Letter Language</Title>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Language *</label>
            <select className="bg-[#0E0E10] px-3 py-1.5 text-xs  rounded-lg border border-[#262626] text-white">
              <option value="beginner">German</option>
              <option value="intermediate">English</option>
              <option value="advanced">Russian</option>
              <option value="advanced">Arabic</option>
              <option value="advanced">Spanish</option>
              <option value="advanced">Turkish</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step_5;
