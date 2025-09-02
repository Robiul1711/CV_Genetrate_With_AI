import React from "react";
import { useFormContext } from "react-hook-form";
import Title from "../common/Title";
import { useEmail } from "@/hooks/useEmail";

const textMap = {
  en: {
    pageTitle: "Why You’re a Good Fit",
    jobQuestion: "Why do you want this job?",
    experienceQuestion: "Relevant Experience/Skills for this role",
    achievementQuestion: "Any specific achievement or project to highlight?",
    keywordsQuestion: "Are there any keywords or values you'd like to emphasize?",
    placeholder: "Write here...",
    required: "This field is required",
  },
  de: {
    pageTitle: "Warum Sie gut passen",
    jobQuestion: "Warum möchten Sie diesen Job?",
    experienceQuestion: "Relevante Erfahrungen/Fähigkeiten für diese Rolle",
    achievementQuestion: "Gibt es spezielle Erfolge oder Projekte hervorzuheben?",
    keywordsQuestion: "Gibt es Schlüsselwörter oder Werte, die Sie betonen möchten?",
    placeholder: "Hier schreiben...",
    required: "Dieses Feld ist erforderlich",
  },
};

const Step_4 = () => {
  const { language } = useEmail();
  const t = textMap[language || "en"];

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="text-white flex items-center justify-center">
      <div className="w-[800px] mx-auto">
        <div className="text-center flex flex-col items-center gap-4 mb-5">
          <Title level="title40">{t.pageTitle}</Title>
        </div>

        <form className="flex flex-col gap-4">
          {/* Why this job */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">{t.jobQuestion}</label>
            <input
              type="text"
              placeholder={t.placeholder}
              className={`bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border ${
                errors.why_do_you_want_this_job ? "" : "border-[#262626]"
              } text-white`}
              {...register("why_do_you_want_this_job", {
                required: t.required,
              })}
            />
            {errors.why_do_you_want_this_job && (
              <p className="text-red-500 text-xs mt-1">
                {errors.why_do_you_want_this_job.message}
              </p>
            )}
          </div>

          {/* Relevant Experience/Skills */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">{t.experienceQuestion}</label>
            <input
              type="text"
              placeholder={t.placeholder}
              className={`bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border ${
                errors.relevant_experience_or_skill_for_this_role
                  ? ""
                  : "border-[#262626]"
              } text-white`}
              {...register("relevant_experience_or_skill_for_this_role", {
                required: t.required,
              })}
            />
            {errors.relevant_experience_or_skill_for_this_role && (
              <p className="text-red-500 text-xs mt-1">
                {errors.relevant_experience_or_skill_for_this_role.message}
              </p>
            )}
          </div>

          {/* Achievement or Project */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">{t.achievementQuestion}</label>
            <input
              type="text"
              placeholder={t.placeholder}
              className={`bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border ${
                errors.specific_achievement_or_project_to_highlight
                  ? ""
                  : "border-[#262626]"
              } text-white`}
              {...register("specific_achievement_or_project_to_highlight", {
                required: t.required,
              })}
            />
            {errors.specific_achievement_or_project_to_highlight && (
              <p className="text-red-500 text-xs mt-1">
                {errors.specific_achievement_or_project_to_highlight.message}
              </p>
            )}
          </div>

          {/* Keywords/Values */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">{t.keywordsQuestion}</label>
            <input
              type="text"
              placeholder={t.placeholder}
              className={`bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border ${
                errors.keywords_or_values_to_emphasize
                  ? ""
                  : "border-[#262626]"
              } text-white`}
              {...register("keywords_or_values_to_emphasize", {
                required: t.required,
              })}
            />
            {errors.keywords_or_values_to_emphasize && (
              <p className="text-red-500 text-xs mt-1">
                {errors.keywords_or_values_to_emphasize.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step_4;
