import React from 'react';
import { useFormContext } from 'react-hook-form';
import Title from '../common/Title';
import { useEmail } from '@/hooks/useEmail';
import languages from "language-list";

const textMap = {
  en: {
    pageTitle: "Cover Letter Language",
    label: "Language *",
    placeholder: "Select a language",
  },
  de: {
    pageTitle: "Anschreiben Sprache",
    label: "Sprache *",
    placeholder: "Sprache auswählen",
  },
};

const Step_5 = () => {
  const { language } = useEmail();
  const t = textMap[language || "en"];

  const { register, formState: { errors } } = useFormContext();

  // get all languages in English
  const allLanguages = languages().getData(); 
  // returns array: [{ code: 'en', language: 'English' }, { code: 'de', language: 'German' }, ...]

  return (
    <div className="text-white flex items-center justify-center">
      <div className="w-[800px] mx-auto">
        <div className="text-center flex flex-col items-center gap-4 mb-5">
          <Title level="title40">{t.pageTitle}</Title>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">{t.label}</label>
            <select
              {...register("cover_letter_language", { required: "Language is required" })}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
              defaultValue=""
            >
              <option value="" disabled>
                {t.placeholder}
              </option>
              {allLanguages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.language}
                </option>
              ))}
            </select>
            {errors.cover_letter_language && (
              <p className="text-red-500 text-xs">{errors.cover_letter_language.message}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step_5;
