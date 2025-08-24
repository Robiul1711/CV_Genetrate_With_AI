import { useResume } from "@/providers/ResumeContext";
import React, { useEffect, useState } from "react";
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

const StepFour = () => {
  const { allRedumeData } = useResume();
  const data = allRedumeData?.data;

  // Access React Hook Form context
  const { setValue, watch } = useFormContext();
  console.log(watch())

  // Watch the form's current skills array
  const formSkills = watch("skills") || [];

  // Local state for search
  const [search, setSearch] = useState("");

  // When context data loads, update form value

  // Add skill
  const handleSelectSkill = (skill) => {
    if (!formSkills.some((s) => s.skill === skill)) {
      const updated = [...formSkills, { skill }];
      setValue("skills", updated, { shouldValidate: true, shouldDirty: true });
    }
  };

  // Remove skill
  const handleRemoveSkill = (skillToRemove) => {
    const updated = formSkills.filter((s) => s.skill !== skillToRemove);
    setValue("skills", updated, { shouldValidate: true, shouldDirty: true });
  };

  // Filter suggestions
  const filteredSkills = allSkills.filter(
    (skill) =>
      skill.toLowerCase().includes(search.toLowerCase()) &&
      !formSkills.some((s) => s.skill === skill)
  );

  return (
    <div className="w-full text-white">
      {/* Selected Skills */}
      <p className="text-sm mb-2">Selected Skills</p>
      <div className="flex flex-wrap gap-3 mb-3">
        {formSkills.map((skillObj) => (
          <div
            key={skillObj.skill}
            className="flex items-center bg-[#0E0E10] border border-[#2A2A2A] px-2 py-1.5 rounded-full text-sm"
          >
            <span className="mr-2">{skillObj.skill}</span>
            <button
              type="button"
              onClick={() => handleRemoveSkill(skillObj.skill)}
            >
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
          className="w-full px-3 py-1.5 text-xs pl-10 rounded-md bg-[#0E0E10] border border-[#262626] placeholder:text-gray-400 focus:outline-none"
        />
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      {/* Suggested Skills */}
      <p className="mt-5 text-sm">Suggested Skills</p>
      <div className="flex flex-wrap gap-3 mt-3">
        {filteredSkills.map((skill) => (
          <button
            key={skill}
            type="button"
            onClick={() => handleSelectSkill(skill)}
            className="px-3 py-1.5 rounded-full text-sm border border-[#2A2A2A] bg-[#0E0E10] hover:border-white"
          >
            {skill}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StepFour;
