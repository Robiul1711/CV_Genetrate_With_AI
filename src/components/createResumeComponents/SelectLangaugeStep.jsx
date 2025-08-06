import React from 'react';
import { useFormContext } from 'react-hook-form';
import Title from '../common/Title';

const SelectLanguageStep = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="text-white flex items-center justify-center">
      <div className="w-[800px] mx-auto">
        <div className="text-center flex flex-col items-center gap-4 mb-5">
          <Title level="title40">Cover Letter Language</Title>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Language *</label>
            <select
              {...register("resume_language", { required: "Language is required" })}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
              defaultValue=""
            >
              <option value="" disabled>
                Select a language
              </option>
              <option value="german">German</option>
              <option value="english">English</option>
              <option value="russian">Russian</option>
              <option value="arabic">Arabic</option>
              <option value="spanish">Spanish</option>
              <option value="turkish">Turkish</option>
            </select>
            {errors.resume_language && (
              <p className="text-red-500 text-xs">{errors.resume_language.message}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SelectLanguageStep;

