import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useFormContext } from "react-hook-form";

const mockSkills = [
  "JavaScript", "TypeScript", "React", "Node.js", "Express", "Next.js", "Python",
  "HTML5", "CSS3", "TailwindCSS", "Git & GitHub", "REST APIs", "GraphQL",
  "SQL", "MongoDB", "PostgreSQL", "Docker", "AWS", "Agile / Scrum", "Figma",
  "Problem Solving", "Communication", "Leadership", "Teamwork", "Project Management"
];

const StepFour = () => {
  const {
    setValue,
    watch,
    register,
    formState: { errors },
  } = useFormContext();

  const formSkills = watch("skills") || [];
  const [search, setSearch] = useState("");

  register("skills", {
    validate: (value) =>
      (Array.isArray(value) && value.length > 0) ||
      "Please select at least one skill",
  });

  const filteredSkills = mockSkills.filter((s) =>
    s.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectSkill = (skill) => {
    if (!formSkills.some((s) => s.skill === skill)) {
      const updated = [...formSkills, { skill }];
      setValue("skills", updated, { shouldValidate: true, shouldDirty: true });
    }
  };

  const handleRemoveSkill = (skill) => {
    const updated = formSkills.filter((s) => s.skill !== skill);
    setValue("skills", updated, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className="text-white">
      {/* Selected Skills Section */}
      <h2 className="text-lg font-semibold mb-3">Selected Skills</h2>
      <div className="flex flex-wrap gap-2 min-h-[40px] p-2 bg-[#0E0E10] border border-[#262626] rounded-md">
        {formSkills?.length > 0 ? (
          formSkills.map((item, index) => (
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
          <span className="text-gray-500 text-sm">No skills selected</span>
        )}
      </div>

      {errors.skills && (
        <p className="text-red-500 text-sm mt-1">{errors.skills.message}</p>
      )}

      {/* Search Input */}
      <div className="mt-5">
        <label className="block text-sm font-medium mb-1">Search & Add Skills</label>
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search skills (e.g. React, Node.js, Leadership)..."
            className="w-full bg-[#0E0E10] border border-[#262626] rounded-md p-2 pl-9 text-sm focus:outline-none focus:border-white transition-colors"
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Available Skills List */}
      <p className="mt-5 text-sm font-medium">Suggested Skills</p>
      <div className="flex flex-wrap gap-2 mt-2 max-h-48 overflow-y-auto p-1">
        {filteredSkills.map((skill, index) => {
          const isSelected = formSkills.some((s) => s.skill === skill);
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
  );
};

export default StepFour;
