import React from "react";
import { useFormContext } from "react-hook-form";
import Title from "../common/Title";
import { useEmail } from "@/hooks/useEmail";
import languages from "language-list";
import { useStatusCheck } from "@/components/common/useStatusCheck"; // ✅ status hook
import { Link } from "react-router-dom";

const textMap = {
  en: {
    pageTitle: "Cover Letter Language",
    label: "Language *",
    placeholder: "Select a language",
    upgradeMsg: "To enable cover letter creation, please purchase a plan.",
    goPrice: "Go to Pricing",
  },
  de: {
    pageTitle: "Anschreiben Sprache",
    label: "Sprache *",
    placeholder: "Sprache auswählen",
    upgradeMsg: "Um ein Anschreiben zu erstellen, kaufen Sie bitte einen Plan.",
    goPrice: "Zu den Preisen",
  },
};

const Step_5 = () => {
  const { language } = useEmail();
  const t = textMap[language || "en"];

  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { data: status } = useStatusCheck(); // ✅ fetch subscription status

  // determine if the user is blocked from selecting a language
  const isDisabled =
    status?.has_subscription === false && status?.cover_letter === false;

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
              {...register("cover_letter_language", {
                required: "Language is required",
              })}
              className={`bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white ${
                isDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              defaultValue=""
              disabled={isDisabled} // ✅ disable dropdown if not allowed
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

            {errors.cover_letter_language && !isDisabled && (
              <p className="text-red-500 text-xs">
                {errors.cover_letter_language.message}
              </p>
            )}

            {/* ✅ Show upgrade message if disabled */}
            {isDisabled && (
              <p className="text-yellow-400 text-sm mt-2">
                {t.upgradeMsg}{" "}
                <Link
                  to="/price"
                  className="text-blue-400 underline hover:text-blue-300"
                >
                  {t.goPrice}
                </Link>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step_5;
