import { useResume } from "@/providers/ResumeContext";
import React, { useEffect, useMemo } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { LuCirclePlus } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { useEmail } from "@/hooks/useEmail";
import languages from "language-list";

const LEVEL_OPTIONS = [
  { label: "Native", value: "Native" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Advanced", value: "Advanced" },
  { label: "A1", value: "A1" },
  { label: "A2", value: "A2" },
  { label: "B1", value: "B1" },
  { label: "B2", value: "B2" },
  { label: "C1", value: "C1" },
  { label: "C2", value: "C2" },
];

const StepFive = () => {
  const { allRedumeData } = useResume();
  const data = allRedumeData?.data;
  const { register, control } = useFormContext();
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "languages",
  });

  const { language } = useEmail(); // "en" or "de"

  // ✅ Localized text
  const texts = {
    en: {
      language: "Language *",
      level: "Level *",
      addLanguage: "Add Another Language",
      selectLanguage: "Select Language",
      title: "Languages You Know",
    },
    de: {
      language: "Sprache *",
      level: "Niveau *",
      addLanguage: "Weitere Sprache hinzufügen",
      selectLanguage: "Sprache auswählen",
      title: "Sprachenkenntnisse",
    },
  };

  const t = language === "de" ? texts.de : texts.en;

  // ✅ Get localized list of languages
  const languageOptions = useMemo(() => {
    return language === "de"
      ? languages("de").getData()
      : languages().getData();
  }, [language]);

  // ✅ Initialize languages only once
  useEffect(() => {
    if (data?.languages?.length > 0) {
      const mapped = data.languages.map((lang) => {
        const foundLang =
          languageOptions.find(
            (opt) => opt.language.toLowerCase() === lang.language?.toLowerCase()
          )?.language ||
          lang.language ||
          "";

        const foundLevel =
          LEVEL_OPTIONS.find(
            (opt) =>
              opt.value.toLowerCase() === lang.level?.toLowerCase() ||
              opt.label.toLowerCase() === lang.level?.toLowerCase()
          )?.value || "Native";

        return { language: foundLang, level: foundLevel };
      });

      replace(mapped);
    } else if (fields.length === 0) {
      append({ language: "", level: "Native" });
    }
    // ⚠️ Depend only on replace, append, data, languageOptions
    // Do not include `fields.length` or it can cause re-render loop
  }, [data, replace, append, languageOptions]);

  return (
    <div className="w-full text-white">
      {/* Section Title */}
      <h2 className="text-lg font-semibold mb-4 border-b border-[#262626] pb-2">
        {t.title}
      </h2>

      <form className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full bg-[#0E0E10] border border-[#262626] rounded-lg p-4 relative"
          >
            {/* Language Select */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-300">{t.language}</label>
              <select
                {...register(`languages.${index}.language`, {
                  required: "Language is required",
                })}
                defaultValue={field.language || ""}
                className="bg-[#1A1A1A] px-3 py-2 text-sm rounded-lg border border-[#333] text-white focus:outline-none focus:border-[#C7541A] transition"
              >
                <option value="">{t.selectLanguage}</option>
                {languageOptions.map((opt, i) => (
                  <option key={i} value={opt.language}>
                    {opt.language}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Select */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-300">{t.level}</label>
              <select
                {...register(`languages.${index}.level`)}
                defaultValue={field.level || "Native"}
                className="bg-[#1A1A1A] px-3 py-2 text-sm rounded-lg border border-[#333] text-white focus:outline-none focus:border-[#C7541A] transition"
              >
                {LEVEL_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Remove Button */}
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute top-2 right-2 text-red-400 hover:text-red-600 transition-colors"
              >
                <IoClose size={22} />
              </button>
            )}
          </div>
        ))}

        {/* Add Button */}
        <div className="mt-2">
          <button
            type="button"
            onClick={() => append({ language: "", level: "Native" })}
            className="font-medium px-4 py-3 text-sm rounded-lg flex items-center gap-2 border border-white/20 hover:bg-white hover:text-black transition duration-200"
          >
            <LuCirclePlus size={20} />
            {t.addLanguage}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepFive;
