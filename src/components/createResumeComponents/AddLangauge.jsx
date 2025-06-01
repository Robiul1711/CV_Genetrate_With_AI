import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import Title from "../common/Title";
import { LuCirclePlus } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
const AddLangauge = () => {
  return (
    <div className="bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-6xl w-full">
        <div className="text-center flex flex-col items-center gap-4 mb-10">
          <Title level="title40">Add Another Language Proficiency</Title>
          <Title level="title20">
     Mention all languages you speak and your proficiency levels
          </Title>
        </div>
        <div className="flex justify-between items-center mb-10 p-6 w-full rounded-[12px] border-[#262626] bg-[#0E0E10] border">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Title level="title32">German </Title>
              <GoDotFill className="text-[#fff] text-3xl" />
              <Title level="title32">Native</Title>
            </div>
          </div>
          <CiEdit
            size={32}
            className="text-white cursor-pointer p-1 border border-white/30 rounded-full"
          />
        </div>
        <div className=" flex justify-end mb-5">
          <FaRegTrashAlt className="text-white cursor-pointer text-3xl" />
        </div>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Language *</label>
            <select className="bg-[#0E0E10] p-5 rounded-lg border border-[#262626] text-white">
              <option value="beginner">German</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Select Level *</label>
            <select className="bg-[#0E0E10] p-5 rounded-lg border border-[#262626] text-white">
              <option value="beginner">Native</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div>
            <button className="font-medium px-7 py-5 rounded-lg  flex items-center gap-2   border border-white/20 hover:bg-[white] hover:text-black  transition-colors duration-200">
              <LuCirclePlus size={20} /> Add Another language
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLangauge;
