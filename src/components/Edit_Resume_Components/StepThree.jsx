import React, { useEffect } from "react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { LuCirclePlus, LuTrash2 } from "react-icons/lu";
import { useResume } from "@/providers/ResumeContext";


const StepThree = () => {
  const { allRedumeData } = useResume();
  const data = allRedumeData?.data;

  const { register, control, watch, setValue } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "educations",
  });


  // English texts
  const t = {
    institute: "Name Of Institute *",
    degree: "Degree *",
    startDate: "Start Date *",
    endDate: "End Date",
    currentlyEnrolled: "Currently Enrolled",
    addEducation: "Add Education",
    institutePlaceholder: "Polytechnic Institute",
    degreePlaceholder: "Diploma",
  };

  useEffect(() => {
    fields.forEach((_, index) => {
      const endDate = watch(`educations.${index}.end_date`);
      if (endDate === "") {
        setValue(`educations.${index}.end_date`, null);
      }
    });
  }, [fields, watch, setValue]);

  return (
    <div>
      <div className="flex flex-col gap-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-4 rounded-lg border border-[#262626] bg-[#0E0E10] flex flex-col gap-4 relative"
          >
            {/* Institute Name */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white">{t.institute}</label>
              <input
                type="text"
                placeholder={t.institutePlaceholder}
                className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
                {...register(`educations.${index}.institute_name`)}
              />
            </div>

            {/* Degree */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white">{t.degree}</label>
              <input
                type="text"
                placeholder={t.degreePlaceholder}
                className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
                {...register(`educations.${index}.degree`)}
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-white">{t.startDate}</label>
                <input
                  type="date"
                  className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
                  {...register(`educations.${index}.start_date`)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-white">{t.endDate}</label>
                <input
                  type="date"
                  className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
                  {...register(`educations.${index}.end_date`)}
                  disabled={watch(`educations.${index}.currently_enrolled`)}
                />
              </div>
            </div>

            {/* Currently Enrolled */}
            <div className="flex items-center gap-2 py-2">
              <Controller
                control={control}
                name={`educations.${index}.currently_enrolled`}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value || false}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      if (checked)
                        setValue(`educations.${index}.end_date`, null);
                    }}
                  />
                )}
              />
              <p className="text-xs text-white">{t.currentlyEnrolled}</p>
            </div>

            {/* Remove Button */}
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700"
            >
              <LuTrash2 size={20} />
            </button>
          </div>
        ))}

        {/* Add Education Button */}
        <button
          type="button"
          onClick={() =>
            append({
              institute_name: "",
              degree: "",
              start_date: "",
              end_date: "",
              currently_enrolled: false,
            })
          }
          className="font-medium px-4 py-2 rounded-lg text-xs flex items-center gap-2 border border-white/20 hover:bg-white hover:text-black transition-colors duration-200"
        >
          <LuCirclePlus size={20} /> {t.addEducation}
        </button>
      </div>
    </div>
  );
};

export default StepThree;
