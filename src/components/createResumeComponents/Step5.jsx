import React, { useState } from "react";
import Title from "../common/Title";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

const mockSkills = [
  "JavaScript", "TypeScript", "React", "Node.js", "Express", "Next.js", "Python",
  "HTML5", "CSS3", "TailwindCSS", "Git & GitHub", "REST APIs", "GraphQL",
  "SQL", "MongoDB", "PostgreSQL", "Docker", "AWS", "Agile / Scrum", "Figma",
  "Problem Solving", "Communication", "Leadership", "Teamwork", "Project Management"
];

const Step5 = () => {
  const {
    setValue,
    watch,
    register,
    formState: { errors },
  } = useFormContext();

  const [newSkill, setNewSkill] = useState("");
  const skills = watch("skills") || [];
  const [search, setSearch] = useState("");

  register("skills", {
    validate: (value) =>
      (Array.isArray(value) && value.length > 0) ||
      "Please select at least one skill.",
  });

  const filteredSkills = mockSkills.filter((s) =>
    s.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectSkill = (skill) => {
    if (skills.some((s) => s.skill === skill)) return;
    const updated = [...skills, { skill }];
    setValue("skills", updated, { shouldValidate: true, shouldDirty: true });
  };

  const handleRemoveSkill = (skill) => {
    const updated = skills.filter((s) => s.skill !== skill);
    setValue("skills", updated, { shouldValidate: true, shouldDirty: true });
  };

  const handleAddCustomSkill = () => {
    const trimmed = newSkill.trim();
    if (!trimmed) {
      toast.warning("Please type a skill name first.");
      return;
    }
    if (skills.some((s) => s.skill.toLowerCase() === trimmed.toLowerCase())) {
      toast.info("This skill is already added.");
      return;
    }
    handleSelectSkill(trimmed);
    setNewSkill("");
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      {/* Title */}
      <div className="text-center">
        <Title level="title48">Skills & Expertise</Title>
        <Title level="title20" className="mt-2">
          Select or add your top technical and professional skills.
        </Title>
      </div>

      <div className="mt-6 w-full max-w-xl">
        {/* Selected skills */}
        <div className="flex flex-wrap gap-2 min-h-[40px] p-2 bg-[#0E0E10] border border-[#262626] rounded-md">
          {skills?.length > 0 ? (
            skills.map((item, index) => (
              <span
                key={index}
                className="flex items-center gap-2 bg-[#1A1A1A] border border-[#333] px-3 py-1 rounded-full text-sm font-medium text-white shadow-sm"
              >
                {item.skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(item.skill)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <IoClose size={16} />
                </button>
              </span>
            ))
          ) : (
            <span className="text-gray-500 text-sm">No skills selected yet</span>
          )}
        </div>

        {errors.skills && (
          <p className="text-red-500 text-sm mt-2">{errors.skills.message}</p>
        )}

        {/* Custom skill input */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a custom skill..."
            className="flex-1 bg-[#0E0E10] border border-[#262626] rounded-md p-2 text-sm text-white focus:outline-none focus:border-white"
          />
          <button
            type="button"
            onClick={handleAddCustomSkill}
            className="px-4 py-2 bg-white text-black font-semibold text-sm rounded-md hover:bg-gray-200 transition-colors"
          >
            Add
          </button>
        </div>

        {/* Search Input */}
        <div className="mt-4">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search suggestions..."
              className="w-full bg-[#0E0E10] border border-[#262626] rounded-md p-2 pl-9 text-sm text-white focus:outline-none focus:border-white"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Suggested Skills */}
        <p className="mt-4 text-sm font-medium text-gray-300">Suggested Skills</p>
        <div className="flex flex-wrap gap-2 mt-2 max-h-48 overflow-y-auto p-1">
          {filteredSkills.map((skill, index) => {
            const isSelected = skills.some((s) => s.skill === skill);
            return (
              <button
                type="button"
                key={index}
                disabled={isSelected}
                onClick={() => handleSelectSkill(skill)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  isSelected
                    ? "bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-[#1A1A1A] border-[#333] hover:border-white text-white"
                }`}
              >
                + {skill}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Step5;
