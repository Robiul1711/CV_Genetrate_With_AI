import { useResume } from "@/providers/ResumeContext";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useFormContext } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useAuth } from "@/hooks/useAuth";
import { useEmail } from "@/hooks/useEmail";

const StepFour = () => {
  const { allRedumeData } = useResume();
  const data = allRedumeData?.data;

  const { language } = useEmail();
  const axiosPublic = useAxiosPublic();

  const {
    setValue,
    watch,
    register,
    formState: { errors },
  } = useFormContext();

  const formSkills = watch("skills") || [];

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  // Register skills field with validation
  register("skills", {
    validate: (value) =>
      (Array.isArray(value) && value.length > 0) ||
      "Please select at least one skill",
  });

  // Fetch skills from API
  const { data: skillsAll, isLoading } = useQuery({
    queryKey: ["resume-edit-skills", language, debouncedSearch],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/search-skills/?lan=${language}&q=${debouncedSearch}`
      );
      return res.data;
    },
    enabled: !!language,
  });

  const handleSelectSkill = (skill) => {
    if (!formSkills.some((s) => s.skill === skill)) {
      const updated = [...formSkills, { skill }];
      setValue("skills", updated, { shouldValidate: true, shouldDirty: true });
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updated = formSkills.filter((s) => s.skill !== skillToRemove);
    setValue("skills", updated, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className="w-full text-white">
      {/* Selected Skills */}
       <p className="text-sm mb-2">
          {language === "de"
            ? "Ausgewählte Fähigkeiten *"
            : "Selected Skills *"}
        </p>
      <div className="flex flex-wrap gap-3 mb-3">
        {formSkills.map((skillObj,idx) => (
          <div
            key={idx}
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

      {/* Error */}
      {errors.skills && (
        <p className="text-red-500 text-xs mb-2">{errors.skills.message}</p>
      )}

      {/* Search Input */}
     {language === "de" ? "Fähigkeit" : "Skill"}
      <div className="relative w-full">
        <input
          type="text"
            placeholder={language === "de" ? "Suchen..." : "Search..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-1.5 text-xs pl-10 rounded-md bg-[#0E0E10] border border-[#262626] placeholder:text-gray-400 focus:outline-none"
        />
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      {/* Suggested Skills */}
      <p className="mt-5 text-sm">{language === "de"
            ? "Vorgeschlagene Fähigkeiten"
            : "Suggested Skills"}</p>
      <div className="flex flex-wrap gap-3 mt-3">
        {isLoading && <p className="text-xs text-gray-400">Loading...</p>}
        {!isLoading &&
          skillsAll?.data?.map((skill, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectSkill(skill?.name)}
              disabled={formSkills.some((s) => s.skill === skill?.name)}
              className={`px-3 py-1.5 rounded-full text-sm border border-[#2A2A2A] bg-[#0E0E10] hover:border-white ${
                formSkills.some((s) => s.skill === skill?.name)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {skill?.name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default StepFour;
