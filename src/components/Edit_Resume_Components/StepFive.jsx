import { useResume } from "@/providers/ResumeContext";
import React, { useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { LuCirclePlus } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

const StepFive = () => {
  const { allRedumeData } = useResume();
  const data = allRedumeData?.data;

  const { register, control, setValue, watch } = useFormContext();

  // Manage dynamic languages array
  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });

  // Initialize with existing data
  useEffect(() => {
    if (data?.languages && data.languages.length > 0 && fields.length === 0) {
      data.languages.forEach((lang) => {
        append({
          language: lang.language || "",
          level: lang.level || "Beginner",
        });
      });
    }
  }, [data, append, fields.length]);

  const watchLanguages = watch("languages") || [];

  console.log(watch());

  return (
    <div className="w-full">
      <form className="  flex flex-col gap-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2 w-full">
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-sm text-white">Language *</label>
              <select
                {...register(`languages.${index}.language`)}
                className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
              >
                <option value="German">German</option>
                <option value="English">English</option>
                <option value="Russian">Russian</option>
                <option value="Arabic">Arabic</option>
                <option value="Spanish">Spanish</option>
                <option value="Turkish">Turkish</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <label className="text-sm text-white">Level *</label>
              <select
                {...register(`languages.${index}.level`)}
                className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
              >
                <option value="Native">Native</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => remove(index)}
              className="mt-6 text-red-400 hover:text-red-600"
            >
              <IoClose size={20} />
            </button>
          </div>
        ))}

        <div className="md:col-span-2">
          <button
            type="button"
            onClick={() => append({ language: "", level: "Native" })}
            className="font-medium px-4 py-3 text-xs rounded-lg flex items-center gap-2 border border-white/20 hover:bg-white hover:text-black transition-colors duration-200"
          >
            <LuCirclePlus size={20} /> Add Another Language
          </button>
        </div>
      </form>

      {/* Optional: Debug */}
    </div>
  );
};

export default StepFive;
