import React from "react";
import { useFormContext } from "react-hook-form";
import Title from "../common/Title";

const Step_4 = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="text-white flex items-center justify-center">
      <div className="w-[800px] mx-auto">
        <div className="text-center flex flex-col items-center gap-4 mb-5">
          <Title level="title40"> Why You’re a Good Fit</Title>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Why do you want this job?</label>
            <input
              type="text"
              placeholder="Write here..."
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
              {...register("why_do_you_want_this_job")}
            />
            {errors.why_do_you_want_this_job && (
              <p className="text-red-500 text-xs mt-1">{errors.why_do_you_want_this_job.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Relevant Experience/Skills for this role</label>
            <input
              type="text"
              placeholder="Write here..."
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
              {...register("relevant_experience_or_skill_for_this_role")}
            />
            {errors.relevant_experience_or_skill_for_this_role && (
              <p className="text-red-500 text-xs mt-1">{errors.relevant_experience_or_skill_for_this_role.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Any specific achievement or project to highlight?</label>
            <input
              type="text"
              placeholder="Write here..."
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
              {...register("specific_achievement_or_project_to_highlight")}
            />
            {errors.specific_achievement_or_project_to_highlight && (
              <p className="text-red-500 text-xs mt-1">{errors.specific_achievement_or_project_to_highlight.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Are there any keywords or values you'd like to emphasize?</label>
            <input
              type="text"
              placeholder="Write here..."
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
              {...register("keywords_or_values_to_emphasize")}
            />
            {errors.keywords_or_values_to_emphasize && (
              <p className="text-red-500 text-xs mt-1">{errors.keywords_or_values_to_emphasize.message}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step_4;
