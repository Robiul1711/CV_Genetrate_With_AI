import React, { useEffect } from "react";
import Title from "../common/Title";
import { LuCirclePlus } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useEmail } from "@/hooks/useEmail"; // for language ("en" or "de")

const Step7 = () => {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { language } = useEmail(); // "en" or "de"

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
    <div className="text-white flex items-center justify-center p-3 lg:px-6 xl:py-6">
      <div className="w-[800px] mx-auto">
        {/* Titles */}
        <div className="text-center flex md:hidden flex-col items-center gap-2 mb-5 xl:mb-10">
          <Title level="title24">
            {language === "de" ? "Kurse und Schulungen" : "Courses and Training Details"}
          </Title>
          <Title level="title14">
            {language === "de"
              ? "Geben Sie Informationen zu beruflichen Kursen oder Schulungen an"
              : "Provide information about any professional courses or training"}
          </Title>
        </div>
        <div className="text-center hidden md:flex flex-col items-center gap-4 mb-5 xl:mb-10">
          <Title level="title40">
            {language === "de" ? "Kurse und Schulungen" : "Courses and Training Details"}
          </Title>
          <Title level="title20">
            {language === "de"
              ? "Geben Sie Informationen zu beruflichen Kursen oder Schulungen an"
              : "Provide information about any professional courses or training"}
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
                  {courses?.[index]?.course_name || (language === "de" ? "Kursname" : "Course Name")}
                </Title>
                <GoDotFill className="text-[#fff] text-xl" />
                <Title level="title32" className="text-sm sm:text-base">
                  {courses?.[index]?.name_of_institute || (language === "de" ? "Institutsname" : "Institute Name")}
                </Title>
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-400 text-xs hover:underline"
              >
                {language === "de" ? "Entfernen" : "Remove"}
              </button>
            </div>

            {/* Name of Institute */}
            <div className="flex flex-col gap-2 mb-2">
              <label className="text-sm text-white">
                {language === "de" ? "Name des Instituts *" : "Name Of Institute *"}
              </label>
              <input
                type="text"
                {...register(`courses_and_training_details.${index}.name_of_institute`, {
                  required: language === "de" ? "Institutsname ist erforderlich" : "Institute name is required",
                })}
                placeholder={language === "de" ? "Name des Instituts" : "Name of Institute"}
                className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
              />
              {errors?.courses_and_training_details?.[index]?.name_of_institute && (
                <p className="text-red-500 text-xs">
                  {errors.courses_and_training_details[index].name_of_institute.message}
                </p>
              )}
            </div>

            {/* Course Name */}
            <div className="flex flex-col gap-2 mb-2">
              <label className="text-sm text-white">
                {language === "de" ? "Kursname *" : "Course Name *"}
              </label>
              <input
                type="text"
                {...register(`courses_and_training_details.${index}.course_name`, {
                  required: language === "de" ? "Kursname ist erforderlich" : "Course name is required",
                })}
                placeholder={language === "de" ? "Kursname" : "Course Name"}
                className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
              />
              {errors?.courses_and_training_details?.[index]?.course_name && (
                <p className="text-red-500 text-xs">
                  {errors.courses_and_training_details[index].course_name.message}
                </p>
              )}
            </div>

            {/* Dates (year only) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-white">
                  {language === "de" ? "Startjahr *" : "Start Year *"}
                </label>
                <input
                  type="text"
                  placeholder="YYYY"
                  {...register(`courses_and_training_details.${index}.start_date`, {
                    required: language === "de" ? "Startjahr ist erforderlich" : "Start year is required",
                    // pattern: {
                    //   value: /^\d{4}$/,
                    //   message: language === "de" ? "Ungültiges Jahr" : "Invalid year",
                    // },
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
                  {language === "de" ? "Endjahr (optional)" : "End Year (optional)"}
                </label>
                <input
                  type="text"
                  placeholder="YYYY"
                  {...register(`courses_and_training_details.${index}.end_date`, {
                    // pattern: {
                    //   value: /^\d{4}$/,
                    //   message: language === "de" ? "Ungültiges Jahr" : "Invalid year",
                    // },
                  })}
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
            {language === "de" ? "Weiteres Zertifikat hinzufügen" : "Add Another Certificate"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step7;
