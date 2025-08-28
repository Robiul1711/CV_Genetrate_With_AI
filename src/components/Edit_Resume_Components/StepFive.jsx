import { useResume } from "@/providers/ResumeContext";
import React, { useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { LuCirclePlus } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { useEmail } from "@/hooks/useEmail"; // Custom language hook

const LANGUAGE_OPTIONS = [
  { label: "German", value: "German" },
  { label: "English", value: "English" },
  { label: "Russian", value: "Russian" },
  { label: "Arabic", value: "Arabic" },
  { label: "Spanish", value: "Spanish" },
  { label: "Turkish", value: "Turkish" },
];

const LEVEL_OPTIONS = [
  { label: "Native", value: "Native" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Advanced", value: "Advanced" },
];

const StepFive = () => {
  const { allRedumeData } = useResume();
  const data = allRedumeData?.data;

  const { register, control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });

  const { language } = useEmail(); // "en" or "de"

  // Language text mapping
  const texts = {
    en: {
      language: "Language *",
      level: "Level *",
      addLanguage: "Add Another Language",
      selectLanguage: "Select Language",
    },
    de: {
      language: "Sprache *",
      level: "Niveau *",
      addLanguage: "Weitere Sprache hinzufügen",
      selectLanguage: "Sprache auswählen",
    },
  };

  const t = language === "de" ? texts.de : texts.en;

  // Initialize fields from API if empty
  useEffect(() => {
    if (data?.languages && data.languages.length > 0 && fields.length === 0) {
      const mapped = data.languages.map((lang) => {
        const languageOption =
          LANGUAGE_OPTIONS.find(
            (opt) =>
              opt.value.toLowerCase() === lang.language?.toLowerCase() ||
              opt.label.toLowerCase() === lang.language?.toLowerCase()
          )?.value || "";

        const levelOption =
          LEVEL_OPTIONS.find(
            (opt) =>
              opt.value.toLowerCase() === lang.level?.toLowerCase() ||
              opt.label.toLowerCase() === lang.level?.toLowerCase()
          )?.value || "Native";

        return { language: languageOption, level: levelOption };
      });

      mapped.forEach((item) => append(item));
    }
  }, [data, append, fields.length]);

  return (
    <div className="w-full">
      <form className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2 w-full">
            {/* Language select */}
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-sm text-white">{t.language}</label>
              <select
                {...register(`languages.${index}.language`)}
                defaultValue={field.language}
                className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
              >
                <option value="">{t.selectLanguage}</option>
                {LANGUAGE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Level select */}
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-sm text-white">{t.level}</label>
              <select
                {...register(`languages.${index}.level`)}
                defaultValue={field.level}
                className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
              >
                {LEVEL_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Remove button */}
            <button
              type="button"
              onClick={() => remove(index)}
              className="mt-6 text-red-400 hover:text-red-600"
            >
              <IoClose size={20} />
            </button>
          </div>
        ))}

        {/* Add new language */}
        <div className="md:col-span-2">
          <button
            type="button"
            onClick={() => append({ language: "", level: "Native" })}
            className="font-medium px-4 py-3 text-xs rounded-lg flex items-center gap-2 border border-white/20 hover:bg-white hover:text-black transition-colors duration-200"
          >
            <LuCirclePlus size={20} /> {t.addLanguage}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepFive;
