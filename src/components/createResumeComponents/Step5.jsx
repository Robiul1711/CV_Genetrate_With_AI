import React, { useState } from "react";
import Title from "../common/Title";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useFormContext } from "react-hook-form";

const allSkills = [
  "html",
  "Java",
  "Photoshop",
  "Figma",
  "Sketch",
  "Adobe XD",
  "InVision",
  "Axure RP",
  "Balsamiq",
  "Zeplin",
  "Data Analysis",
  "Project Management",
];

const Step5 = () => {
  const {
    setValue,
    watch,
    register,
    getValues,
    formState: { errors },
  } = useFormContext();

  const skills = watch("skills") || [];
  const [search, setSearch] = useState("");

  // Add skill object { skill: skill }
  const handleSelectSkill = (skill) => {
    const updated = [...skills, { skill }];
    setValue("skills", updated, { shouldValidate: true });
  };

  // Remove skill by value
  const handleRemoveSkill = (skillToRemove) => {
    const updated = skills.filter((s) => s.skill !== skillToRemove);
    setValue("skills", updated, { shouldValidate: true });
  };

  const filteredSkills = allSkills.filter(
    (skill) =>
      skill.toLowerCase().includes(search.toLowerCase()) &&
      !skills.some((s) => s.skill === skill)
  );

  return (
    <div className="text-white flex items-center justify-center p-3 lg:px-6 xl:py-6">
      <div className="w-[800px] mx-auto">
        {/* Mobile title */}
        <div className="text-center flex md:hidden flex-col items-center gap-2 mb-5 xl:mb-10">
          <Title level="title24">Highlight Your Skills</Title>
          <Title level="title14">
            Showcase both your technical expertise and soft skills to match job
            requirements.
          </Title>
        </div>
        {/* Desktop title */}
        <div className="text-center hidden md:flex flex-col items-center gap-4 mb-5 xl:mb-10">
          <Title level="title40">Highlight Your Skills</Title>
          <Title level="title20">
            Showcase both your technical expertise and soft skills to match job
            requirements.
          </Title>
        </div>

        {/* Selected Skills */}
        <p className="text-sm mb-2">Selected Skills</p>
        <div className="flex flex-wrap gap-3 mb-6">
          {skills.map((skillObj) => (
            <div
              key={skillObj.skill}
              className="flex items-center bg-[#0E0E10] border border-[#2A2A2A] px-3 py-1.5 rounded-full text-sm"
            >
              <span className="mr-2">{skillObj.skill}</span>
              <button onClick={() => handleRemoveSkill(skillObj.skill)}>
                <IoClose className="text-white hover:text-red-400" size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Search Input */}
        <p className="text-sm mb-2">Skill</p>
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 pl-10 text-xs rounded-md bg-[#0E0E10] border border-[#262626] placeholder:text-gray-400 focus:outline-none"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        {/* Suggested Skills */}
        <p className="mt-5 text-sm">Suggested Skills</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {filteredSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => handleSelectSkill(skill)}
              className="px-3 py-1.5 rounded-full text-sm border border-[#2A2A2A] bg-[#0E0E10] hover:border-white"
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step5;
