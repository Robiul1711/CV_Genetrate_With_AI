import React, { useEffect } from "react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { LuCirclePlus, LuX } from "react-icons/lu";
import { useResume } from "@/providers/ResumeContext";

const StepTwo = () => {
  const { control, register, watch, setValue, reset } = useFormContext();
  const { allRedumeData, setAllResumeData } = useResume();
  const data = allRedumeData?.data;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "work_experiences",
  });

  const handleAdd = () => {
    append({
      job_title: "",
      company_name: "",
      start_date: "",
      end_date: "",
      still_working_here: false,
      responsibilities: "",
    });
  };

  useEffect(() => {
    fields.forEach((_, index) => {
      const endDate = watch(`work_experiences.${index}.end_date`);
      if (endDate === "") {
        setValue(`work_experiences.${index}.end_date`, null);
      }
    });
  }, [fields, watch, setValue]);

  return (
    <div className="w-full">
      {fields.map((item, index) => (
        <div
          key={item.id}
          className="mb-6 p-4 border border-white/10 rounded-lg relative"
        >
          <button
            type="button"
            onClick={() => remove(index)}
            className="absolute top-2 right-2 text-white hover:text-red-500"
          >
            <LuX size={18} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Job Title */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white">Job Title *</label>
              <input
                {...register(`work_experiences.${index}.job_title`)}
                type="text"
                className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
              />
            </div>

            {/* Company Name */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white">Company Name *</label>
              <input
                {...register(`work_experiences.${index}.company_name`)}
                type="text"
                className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
              />
            </div>

            {/* Start Date */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white">Start Date *</label>
              <input
                {...register(`work_experiences.${index}.start_date`)}
                type="date"
                className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
              />
            </div>

            {/* End Date */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white">End Date</label>
              <input
                {...register(`work_experiences.${index}.end_date`)}
                type="date"
                // disable if working
                className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg 
                  border border-[#262626] text-white disabled:opacity-50"
                disabled={watch(`work_experiences.${index}.still_working_here`)}
              />
            </div>

            {/* Still Working */}
            <div className="flex items-center gap-2 py-2">
              <Controller
                name={`work_experiences.${index}.still_working_here`}
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(val) => {
                      field.onChange(val);
                      if (val)
                        setValue(`work_experiences.${index}.end_date`, null);
                    }}
                  />
                )}
              />
              <p className="text-xs text-white">I'm still working here</p>
            </div>

            {/* Responsibilities */}
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-sm text-white">
                Responsibilities / Achievements (Optional)
              </label>
              <textarea
                {...register(`work_experiences.${index}.responsibilities`)}
                className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] h-24 resize-none text-white"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Add new experience */}
      <button
        type="button"
        onClick={handleAdd}
        className="font-medium px-4 py-2 rounded-lg text-sm flex items-center gap-2 border border-white/20 hover:bg-white hover:text-black transition-colors duration-200"
      >
        <LuCirclePlus size={20} /> Add Another Previous Experience
      </button>
    </div>
  );
};

export default StepTwo;
