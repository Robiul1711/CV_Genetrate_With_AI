import React, { useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import Title from "../common/Title";
import { LuCirclePlus } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { useEmail } from "@/hooks/useEmail"; // for language ("en" or "de")
import languages from "language-list"; // ✅ package

const Step6 = () => {
  const { register, control, formState: { errors } } = useFormContext();
  const { language } = useEmail(); // "en" or "de"

  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });

  // Initialize with one empty language when component mounts
  useEffect(() => {
    if (fields.length === 0) {
      append({ language: "", level: "" });
    }
  }, [append, fields.length]);

  // ✅ Get language list (localized if German)
  const languageOptions =
    language === "de"
      ? languages("de").getData() // German names
      : languages().getData();    // English names

  return (
    <div className="text-white flex items-center justify-center p-3 lg:px-6 xl:py-6">
      <div className="w-[800px] mx-auto">
        {/* Headings */}
        <div className="text-center flex md:hidden flex-col items-center gap-2 mb-5 xl:mb-10">
          <Title level="title24">
            {language === "de" ? "Sprachkenntnisse" : "Language Proficiency"}
          </Title>
          <Title level="title14">
            {language === "de"
              ? "Geben Sie alle Sprachen an, die Sie sprechen, und Ihre Kenntnisse."
              : "Mention all languages you speak and your proficiency levels"}
          </Title>
        </div>
        <div className="text-center hidden md:flex flex-col items-center gap-4 mb-5 xl:mb-10">
          <Title level="title40">
            {language === "de" ? "Sprachkenntnisse" : "Language Proficiency"}
          </Title>
          <Title level="title20">
            {language === "de"
              ? "Geben Sie alle Sprachen an, die Sie sprechen, und Ihre Kenntnisse."
              : "Mention all languages you speak and your proficiency levels"}
          </Title>
        </div>

        {/* Dynamic Language Forms */}
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="mb-6 p-4 rounded-lg border border-[#262626] bg-[#0E0E10]"
          >
            {/* Preview */}
            {(field.language || field.level) && (
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Title level="title20">
                    {field.language ||
                      (language === "de" ? "Sprache" : "Language")}
                  </Title>
                  <GoDotFill className="text-[#fff] text-xl" />
                  <Title level="title20">
                    {field.level || (language === "de" ? "Niveau" : "Level")}
                  </Title>
                </div>
                {/* <CiEdit className="text-white cursor-pointer text-xl" /> */}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Language Select */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-white">
                  {language === "de" ? "Sprache *" : "Language *"}
                </label>
                <select
                  {...register(`languages.${index}.language`, {
                    required:
                      language === "de"
                        ? "Sprache ist erforderlich"
                        : "Language is required",
                  })}
                  className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
                >
                  <option value="">
                    {language === "de" ? "Auswählen" : "Select"}
                  </option>
                  {languageOptions.map((lang, i) => (
                    <option key={i} value={lang.language}>
                      {lang.language}
                    </option>
                  ))}
                </select>
                {errors.languages?.[index]?.language && (
                  <span className="text-red-500 text-xs">
                    {errors.languages[index].language.message}
                  </span>
                )}
              </div>

              {/* Level Select */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-white">
                  {language === "de" ? "Niveau *" : "Level *"}
                </label>
                <select
                  {...register(`languages.${index}.level`, {
                    required:
                      language === "de"
                        ? "Niveau ist erforderlich"
                        : "Level is required",
                  })}
                  className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
                >
                  <option value="">
                    {language === "de" ? "Auswählen" : "Select"}
                  </option>
                   <option value="A1">
                    {language === "de" ? "A1" : "A1"}
                  </option>
                  <option value="A2">
                    {language === "de" ? "A2" : "A2"}
                  </option>
                  <option value="B1">
                    {language === "de" ? "B1" : "B1"}
                  </option>
                  <option value="B2">
                    {language === "de" ? "B2" : "B2"}
                  </option>
                  <option value="C1">
                    {language === "de" ? "C1" : "C1"}
                  </option>
                  <option value="C2">
                    {language === "de" ? "C2" : "C2"}
                  </option>
                  <option value="Native">
                    {language === "de" ? "Muttersprache" : "Native"}
                  </option>
                  <option value="Intermediate">
                    {language === "de" ? "Mittelstufe" : "Intermediate"}
                  </option>
                  <option value="Advanced">
                    {language === "de" ? "Fortgeschritten" : "Advanced"}
                  </option>
                 
                </select>
                {errors.languages?.[index]?.level && (
                  <span className="text-red-500 text-xs">
                    {errors.languages[index].level.message}
                  </span>
                )}
              </div>
            </div>

            {/* Delete Button */}
            {fields.length > 1 && (
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-white cursor-pointer text-sm flex items-center gap-2"
                >
                  <FaRegTrashAlt className="text-lg" />
                  {language === "de"
                    ? "Sprache entfernen"
                    : "Remove Language"}
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Add More Button */}
        <div className="flex justify-start mt-4">
          <button
            type="button"
            onClick={() => append({ language: "", level: "" })}
            className="font-medium px-4 py-2 text-xs rounded-lg flex items-center gap-2 border border-white/20 hover:bg-white hover:text-black transition-colors duration-200"
          >
            <LuCirclePlus size={20} />
            {language === "de"
              ? "Weitere Sprache hinzufügen"
              : "Add Another Language"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step6;
