import React, { useState, useEffect } from "react";
import Title from "../common/Title";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useFormContext } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";

import { useEmail } from "@/hooks/useEmail";
import { toast } from "react-toastify";

const Step5 = () => {
  const {
    setValue,
    watch,
    register,
    formState: { errors },
  } = useFormContext();
  const axiosPublic = useAxiosPublic();
  const { language } = useEmail();
const [newSkill, setNewSkill] = useState("");
  // Selected skills
  const skills = watch("skills") || [];

  // Search state
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  // Register field with safe validation
  register("skills", {
    validate: (value) =>
      (Array.isArray(value) && value.length > 0) ||
      (language === "de"
        ? "Bitte wählen Sie mindestens eine Fähigkeit aus."
        : "Please select at least one skill."), 
  });

  // Query for search skills
  const { data: skillsAll, isLoading } = useQuery({
    queryKey: ["search-skills", language, debouncedSearch],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/search-skills/?lan=${language}&q=${debouncedSearch}`
      );
      return res.data;
    },
    enabled: !!language, // run only when language is available
  });

  const handleSelectSkill = (skill) => {
    if (skills.some((s) => s.skill === skill)) return;
    const updated = [...skills, { skill }];
    setValue("skills", updated, { shouldValidate: true });
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updated = skills.filter((s) => s.skill !== skillToRemove);
    setValue("skills", updated, { shouldValidate: true });
  };

  const handleAddNewSkill = async () => {
    if (!newSkill.trim()) return;
    try {
      const res = await axiosPublic.post(`/add-skill/?lan=${language}`, { name: newSkill });
      handleSelectSkill(newSkill); // add new skill to selected
      setNewSkill(""); // clear input
      queryClient.invalidateQueries(["search-skills", language]); // refresh skills list
      toast.success()
    } catch (err) {
      toast.error(err?.response?.data?.message)
    }
  };

  return (
    <div className="text-white flex items-center justify-center p-3 lg:px-6 xl:py-6">
      <div className="w-[800px] mx-auto">
        {/* Title */}
        <div className="text-center flex md:hidden flex-col items-center gap-2 mb-5 xl:mb-10">
          <Title level="title24">
            {language === "de"
              ? "Heben Sie Ihre Fähigkeiten hervor"
              : "Highlight Your Skills"}
          </Title>
          <Title level="title14">
            {language === "de"
              ? "Zeigen Sie sowohl Ihre technischen als auch Ihre sozialen Fähigkeiten, um den Anforderungen der Stelle gerecht zu werden."
              : "Showcase both your technical expertise and soft skills to match job requirements."}
          </Title>
        </div>

        <div className="text-center hidden md:flex flex-col items-center gap-4 mb-5 xl:mb-10">
          <Title level="title40">
            {language === "de"
              ? "Heben Sie Ihre Fähigkeiten hervor"
              : "Highlight Your Skills"}
          </Title>
          <Title level="title20">
            {language === "de"
              ? "Zeigen Sie sowohl Ihre technischen als auch Ihre sozialen Fähigkeiten, um den Anforderungen der Stelle gerecht zu werden."
              : "Showcase both your technical expertise and soft skills to match job requirements."}
          </Title>
        </div>

        {/* Selected Skills */}
        <p className="text-sm mb-2">
          {language === "de"
            ? "Ausgewählte Fähigkeiten *"
            : "Selected Skills *"}
        </p>

        <div className="flex flex-wrap gap-3 mb-1">
          {skills.map((skillObj) => (
            <div
              key={skillObj.skill}
              className="flex items-center bg-[#0E0E10] border border-[#2A2A2A] px-3 py-1.5 rounded-full text-sm"
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
        <p className="text-sm mb-2">
          {language === "de" ? "Fähigkeit" : "Skill"}
        </p>

        <div className="relative w-full">
          <input
            type="text"
            placeholder={language === "de" ? "Suchen..." : "Search..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 pl-10 text-xs rounded-md bg-[#0E0E10] border border-[#262626] placeholder:text-gray-400 focus:outline-none"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        {/* Suggested Skills */}
        <p className="mt-5 text-sm">
          {language === "de"
            ? "Vorgeschlagene Fähigkeiten"
            : "Suggested Skills"}
        </p>

        <div className="flex flex-wrap gap-2 mt-2">
          {isLoading && <p className="text-xs text-gray-400">Loading...</p>}
          {!isLoading &&
            skillsAll?.data?.slice(0,20)?.map((skill, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSkill(skill?.name)}
                disabled={skills.some((s) => s.skill === skill?.name)}
                className={`px-3 py-1.5 rounded-full text-sm border border-[#2A2A2A] bg-[#0E0E10] hover:border-white ${
                  skills.some((s) => s.skill === skill?.name)
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {skill?.name}
              </button>
            ))}
        </div>

          <div className="mt-5 flex gap-2 items-center">
          <input
            type="text"
            placeholder={language === "de" ? "Neue Fähigkeit hinzufügen" : "Add new skill"}
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="flex-1 p-2 text-xs rounded-md bg-[#0E0E10] border border-[#262626] placeholder:text-gray-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleAddNewSkill}
            className="px-4 py-2 text-sm rounded-md bg-blue-600 hover:bg-blue-700"
          >
            {language === "de" ? "Hinzufügen" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step5;
