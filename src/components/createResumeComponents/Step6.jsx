import React, { useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import Title from "../common/Title";
import { LuCirclePlus } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";

const Step6 = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

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

  return (
    <div className="text-white flex items-center justify-center p-3 lg:px-6 xl:py-6">
      <div className="w-[800px] mx-auto">
        {/* Headings */}
        <div className="text-center flex md:hidden flex-col items-center gap-2 mb-5 xl:mb-10">
          <Title level="title24">Language Proficiency</Title>
          <Title level="title14">
            Mention all languages you speak and your proficiency levels
          </Title>
        </div>
        <div className="text-center hidden md:flex flex-col items-center gap-4 mb-5 xl:mb-10">
          <Title level="title40">Language Proficiency</Title>
          <Title level="title20">
            Mention all languages you speak and your proficiency levels
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
                  <Title level="title20">{field.language || "Language"}</Title>
                  <GoDotFill className="text-[#fff] text-xl" />
                  <Title level="title20">{field.level || "Level"}</Title>
                </div>
                <CiEdit className="text-white cursor-pointer text-xl" />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-white">Language *</label>
                <select
                  {...register(`languages.${index}.language`, {
                    required: "Language is required",
                  })}
                  className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
                >
                  <option value="">Select</option>
                  <option value="German">German</option>
                  <option value="English">English</option>
                  <option value="Russian">Russian</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Turkish">Turkish</option>
                </select>
                {errors.languages?.[index]?.language && (
                  <span className="text-red-500 text-xs">
                    {errors.languages[index].language.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-white">Level *</label>
                <select
                  {...register(`languages.${index}.level`, {
                    required: "Level is required",
                  })}
                  className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
                >
                  <option value="">Select</option>
                  <option value="Native">Native</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                {errors.languages?.[index]?.level && (
                  <span className="text-red-500 text-xs">
                    {errors.languages[index].level.message}
                  </span>
                )}
              </div>
            </div>

            {/* Delete Button - Only show if there's more than one language */}
            {fields.length > 1 && (
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-white cursor-pointer text-sm flex items-center gap-2"
                >
                  <FaRegTrashAlt className="text-lg" />
                  Remove Language
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
            <LuCirclePlus size={20} /> Add Another Language
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step6;