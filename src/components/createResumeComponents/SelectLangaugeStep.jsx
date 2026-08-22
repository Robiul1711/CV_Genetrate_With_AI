import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import Title from "../common/Title";
import languages from "language-list";

const SelectLanguageStep = () => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();

  // Get all languages as array of objects: [{code, language}]
  const allLanguages = languages().getData(); // [{ code: 'en', language: 'English'}, ...]

  return (
    <div className="text-white flex items-center justify-center w-full">
      <div className="w-full max-w-[800px] mx-auto">
        {/* Title */}
        <div className="text-center flex flex-col items-center gap-4 mb-5">
          <Title level="title40">Resume Language</Title>
        </div>

        {/* Dropdown controlled by react-hook-form */}
        <Controller
          control={control}
          name="resume_language"
          rules={{ required: "Select a language" }}
          defaultValue=""
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white">Language *</label>
              <select
                {...field}
                onChange={(e) => {
                  field.onChange(e); // update react-hook-form value
                }}
                className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
              >
                <option value="" disabled>
                  Select a language
                </option>

                {/* Render every available language */}
                {allLanguages.map((lang) => (
                  <option key={lang.code} value={lang.language}>
                    {lang.language}
                  </option>
                ))}
              </select>

              {/* Validation error message */}
              {errors.resume_language && (
                <p className="text-red-500 text-xs">
                  {errors.resume_language.message}
                </p>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default SelectLanguageStep;
