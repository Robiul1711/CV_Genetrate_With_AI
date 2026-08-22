import { useResume } from "@/providers/ResumeContext";
import React, { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { LuCirclePlus } from "react-icons/lu";
import { IoClose } from "react-icons/io5";


const StepSix = () => {
  const { allRedumeData } = useResume();
  const data = allRedumeData?.data;

  const { register, control, watch, setValue,formState:{errors} } = useFormContext();

  // English texts
  const t = {
    institute: "Name Of Institute *",
    course: "Course Name *",
    startDate: "Start Date *",
    endDate: "End Date",
    addButton: "Add Another Certificate",
    institutePlaceholder: "Polytechnic Institute",
    coursePlaceholder: "Diploma",
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "courses_and_training_details",
  });

  // Initialize with existing data
  useEffect(() => {
    if (
      data?.courses_and_training_details &&
      data.courses_and_training_details.length > 0 &&
      fields.length === 0
    ) {
      data.courses_and_training_details.forEach((course) => {
        append({
          name_of_institute: course.name_of_institute || "",
          course_name: course.course_name || "",
          start_date: course.start_date || "",
          end_date: course.end_date || "",
        });
      });
    }
  }, [data, append, fields.length]);

  useEffect(() => {
    fields.forEach((_, index) => {
      const endDate = watch(`courses_and_training_details.${index}.end_date`);
      if (endDate === "") setValue(`courses_and_training_details.${index}.end_date`, null);
    });
  }, [fields, watch, setValue]);

  return (
    <div className="w-full">
      <form className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <div key={field.id} className="border border-[#262626] rounded-lg p-4 relative">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-400 hover:text-red-600"
              >
                <IoClose size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-2 mb-3">
              <label className="text-sm text-white">{t.institute}</label>
              <input
                {...register(`courses_and_training_details.${index}.name_of_institute`)}
                placeholder={t.institutePlaceholder}
                className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
              />
            </div>

            <div className="flex flex-col gap-2 mb-3">
              <label className="text-sm text-white">{t.course}</label>
              <input
                {...register(`courses_and_training_details.${index}.course_name`)}
                placeholder={t.coursePlaceholder}
                className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
              />
            </div>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-white">{t.startDate}</label>
                <input
                  {...register(`courses_and_training_details.${index}.start_date`)}
                  type="date"
                  className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-white">{t.endDate}</label>
                <input
                  {...register(`courses_and_training_details.${index}.end_date`)}
                  type="date"
                  className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
                />
              </div>
            </div> */}

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-white">
                  Start Year *
                </label>
                <input
                  type="text"
                  placeholder="YYYY"
                  {...register(`courses_and_training_details.${index}.start_date`, {
                    required: "Start year is required",
                  })}
                  className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
                />
                {errors?.courses_and_training_details?.[index]?.start_date && (
                  <p className="text-red-500 text-xs">
                    {errors.courses_and_training_details[index].start_date.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-white">
                  End Year (optional)
                </label>
                <input
                  type="text"
                  placeholder="YYYY"
                  {...register(`courses_and_training_details.${index}.end_date`)}
                  className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
                />
              </div>
            </div>
          </div>
        ))}

        <div>
          <button
            type="button"
            onClick={() =>
              append({
                name_of_institute: "",
                course_name: "",
                start_date: "",
                end_date: "",
              })
            }
            className="font-medium px-4 py-3 text-xs rounded-lg flex items-center gap-2 border border-white/20 hover:bg-white hover:text-black transition-colors duration-200"
          >
            <LuCirclePlus size={20} /> {t.addButton}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepSix;
