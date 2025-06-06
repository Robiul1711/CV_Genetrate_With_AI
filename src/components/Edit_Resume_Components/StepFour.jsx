import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
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
  const [selectedSkills, setSelectedSkills] = useState([
    "Axure RP",
    "Balsamiq",
    "Zeplin",
    "Data Analysis",
    "Project Management",
  ]);
  const [search, setSearch] = useState("");

  const handleSelectSkill = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleRemoveSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const filteredSkills = allSkills.filter((skill) =>
    skill.toLowerCase().includes(search.toLowerCase())
  );

  return (
      <div className=" w-full">
        <div className="text-white">
          {/* Selected Skills */}
          <p className="text-sm mb-2">Selected Skill</p>
          <div className="flex flex-wrap gap-3 mb-3">
            {selectedSkills.map((skill) => (
              <div
                key={skill}
                className="flex items-center bg-[#0E0E10] border border-[#2A2A2A] px-2 py-1.5 rounded-full text-sm"
              >
                <span className="mr-2">{skill}</span>
                <button onClick={() => handleRemoveSkill(skill)}>
                  <IoClose
                    className="text-white hover:text-red-400"
                    size={14}
                  />
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
              className="w-full px-3 py-1.5  text-xs    4 pl-10 rounded-md bg-[#0E0E10] border border-[#262626]  placeholder:text-gray-400 focus:outline-none"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          {/* Suggested Skills */}
          <p className="mt-5 text-sm">Suggested Skill</p>
          <div className="flex flex-wrap gap-3 mt-3">
            {filteredSkills.map((skill) => (
              <button
                key={skill}
                onClick={() => handleSelectSkill(skill)}
                disabled={selectedSkills.includes(skill)}
                className={`px-3 py-1.5 rounded-full text-sm border border-[#2A2A2A] bg-[#0E0E10] ${
                  selectedSkills.includes(skill)
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:border-white"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>
  );
};

export default StepFour;
