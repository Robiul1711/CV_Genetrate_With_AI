import React, { useEffect } from "react";
import Title from "../common/Title";
import { LuCirclePlus } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { useFormContext, useFieldArray } from "react-hook-form";

const Step7 = () => {
  const { register, control, watch } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "courses_and_training_details",
  });

  const courses = watch("courses_and_training_details");

  // Initialize with one empty course
  useEffect(() => {
    if (!courses || courses.length === 0) {
      append({
        name_of_institute: "",
        course_name: "",
        start_date: "",
        end_date: "",
      });
    }
  }, [courses, append]);

  return (
    <div className="text-white flex items-center justify-center p-3 lg:px-6 xl:py-6 w-full">
      <div className="w-full max-w-[800px] mx-auto">
        {/* Titles */}
        <div className="text-center flex md:hidden flex-col items-center gap-2 mb-5 xl:mb-10">
          <Title level="title24">Courses and Training Details</Title>
          <Title level="title14">
            Provide information about any professional courses or training
          </Title>
        </div>

        <div className="text-center hidden md:flex flex-col items-center gap-4 mb-5 xl:mb-10">
          <Title level="title40">Courses and Training Details</Title>
          <Title level="title20">
            Provide information about any professional courses or training
          </Title>
        </div>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border border-[#262626] bg-[#0E0E10] p-4 rounded-xl mb-5"
          >
            {/* Preview */}
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <Title level="title32" className="text-sm sm:text-base">
                  {courses?.[index]?.course_name || "Course Name"}
                </Title>
                <GoDotFill className="text-[#fff] text-xl" />
                <Title level="title32" className="text-sm sm:text-base">
                  {courses?.[index]?.name_of_institute || "Institute Name"}
                </Title>
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-400 text-xs hover:underline"
              >
                Remove
              </button>
            </div>

            {/* Name of Institute */}
            <div className="flex flex-col gap-2 mb-2">
              <label className="text-sm text-white">Name Of Institute</label>
              <input
                type="text"
                {...register(
                  `courses_and_training_details.${index}.name_of_institute`,
                )}
                placeholder="Name of Institute"
                className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
              />
            </div>

            {/* Course Name */}
            <div className="flex flex-col gap-2 mb-2">
              <label className="text-sm text-white">Course Name</label>
              <input
                type="text"
                {...register(
                  `courses_and_training_details.${index}.course_name`,
                )}
                placeholder="Course Name"
                className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
              />
            </div>

            {/* Dates (year only) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-white">Start Year</label>
                <input
                  type="text"
                  placeholder="YYYY"
                  {...register(
                    `courses_and_training_details.${index}.start_date`,
                  )}
                  className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-white">End Year (optional)</label>
                <input
                  type="text"
                  placeholder="YYYY"
                  {...register(
                    `courses_and_training_details.${index}.end_date`,
                  )}
                  className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add Button */}
        <div className="flex items-center justify-between">
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
            className="font-medium px-4 py-2 rounded-lg text-xs flex items-center gap-2 border border-white/20 hover:bg-white hover:text-black transition-colors duration-200"
          >
            <LuCirclePlus size={20} />
            Add Another Certificate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step7;
