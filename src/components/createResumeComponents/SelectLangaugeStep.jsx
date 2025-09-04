import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import Title from "../common/Title";
import { useEmail } from "@/hooks/useEmail";


const SelectLanguageStep = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { language, setLanguage } = useEmail(); // 'de' or 'en'

  const labels = {
    title: language === "de" ? "Sprache des Lebenslaufs" : "Resume Language",
    fieldLabel: language === "de" ? "Sprache *" : "Language *",
    selectPlaceholder:
      language === "de" ? "Sprache auswählen" : "Select a language",
    options: [
      { value: "de", label: language === "de" ? "Deutsch" : "German" },
      { value: "en", label: language === "de" ? "Englisch" : "English" },
    ],
  };

  return (
    <div className="text-white flex items-center justify-center">
      <div className="w-[800px] mx-auto">
        <div className="text-center flex flex-col items-center gap-4 mb-5">
          <Title level="title40">{labels.title}</Title>
        </div>

        <Controller
          control={control}
          name="resume_language"
          rules={{ required: labels.selectPlaceholder }}
          defaultValue=""
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white">{labels.fieldLabel}</label>
              <select
                {...field}
                onChange={(e) => {
                  field.onChange(e); // update react-hook-form
                  setLanguage(e.target.value); // update your custom hook state
                }}
                className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
              >
                <option value="" disabled>
                  {labels.selectPlaceholder}
                </option>
                {labels.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.resume_language && (
                <p className="text-red-500 text-xs">
                  {errors.resume_language.message}
                </p>
              )}
            </div>
          )}
        />

        {/* <Tailor_Modal /> */}
      </div>
    </div>
  );
};

export default SelectLanguageStep;
