import React from "react";
import Title from "../common/Title";
import { LuCirclePlus } from "react-icons/lu";
import { CiEdit } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import { useFormContext, useFieldArray } from "react-hook-form";
import Tailor_Modal from "./Tailor_Modal";

const Step7 = () => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "courses",
  });

  const courses = watch("courses");

  // Add initial course if none exists
  React.useEffect(() => {
    if (!courses || courses.length === 0) {
      append({
        institute: "",
        courseName: "",
        startDate: "",
        endDate: "",
      });
    }
  }, [courses, append]);

  return (
    <div className="text-white flex items-center justify-center p-3 lg:px-6 xl:py-6">
      <div className="w-[800px] mx-auto">
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

        {/* Form Fields */}
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border border-[#262626] bg-[#0E0E10] p-4 rounded-xl mb-5"
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <Title level="title32" className="text-sm sm:text-base">
                  {courses?.[index]?.courseName || "Course Name"}
                </Title>
                <GoDotFill className="text-[#fff] text-xl" />
                <Title level="title32" className="text-sm sm:text-base">
                  {courses?.[index]?.institute || "Institute Name"}
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

            <div className="flex flex-col gap-2 mb-2">
              <label className="text-sm text-white">Name Of Institute *</label>
              <input
                type="text"
                {...register(`courses.${index}.institute`, { required: true })}
                placeholder="Polytechnic Institute"
                className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
              />
            </div>

            <div className="flex flex-col gap-2 mb-2">
              <label className="text-sm text-white">Course Name *</label>
              <input
                type="text"
                {...register(`courses.${index}.courseName`, { required: true })}
                placeholder="Diploma"
                className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-white">Start Date *</label>
                <input
                  type="date"
                  {...register(`courses.${index}.startDate`, { required: true })}
                  className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-white">End Date</label>
                <input
                  type="date"
                  {...register(`courses.${index}.endDate`)}
                  className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add Button and Modal */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() =>
              append({
                institute: "",
                courseName: "",
                startDate: "",
                endDate: "",
              })
            }
            className="font-medium px-4 py-2 rounded-lg text-xs flex items-center gap-2 border border-white/20 hover:bg-white hover:text-black transition-colors duration-200"
          >
            <LuCirclePlus size={20} />
            Add Another Certificate
          </button>

          <Tailor_Modal />
        </div>
      </div>
    </div>
  );
};

export default Step7;
