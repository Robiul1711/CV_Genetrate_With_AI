import React, { useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { LuCirclePlus } from "react-icons/lu";
import { CiEdit } from "react-icons/ci";
import Title from "../common/Title";
import { Checkbox } from "@/components/ui/checkbox";

const Step4 = () => {
  const {
    control,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "educations",
  });

  // Append default education if empty
  useEffect(() => {
    if (fields.length === 0) {
      append({
        institute_name: "",
        degree: "",
        start_date: "",
        end_date: "",
        currently_enrolled: false,
      });
    }
  }, [append, fields.length]);

  const handleAdd = () => {
    append({
      institute_name: "",
      degree: "",
      start_date: "",
      end_date: "",
      currently_enrolled: false,
    });
  };

  return (
    <div className="text-white flex items-center justify-center p-3 lg:px-6 xl:py-6">
      <div className="w-full max-w-3xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <Title level="title40">Your Education</Title>
          <Title level="title20">
            List your education background. Start with the most recent. You can add multiple entries.
          </Title>
        </div>

        {/* Education Cards */}
        {fields.map((item, index) => {
          const isCurrent = watch(`educations.${index}.currently_enrolled`);

          return (
            <div
              key={item.id}
              className="mb-8 border border-[#262626] bg-[#0E0E10] p-4 rounded-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Title level="title24">
                    {watch(`educations.${index}.institute_name`) || "Institute Name"}
                  </Title>
                  <Title level="title24">
                    {watch(`educations.${index}.degree`) || "Degree"}
                  </Title>
                </div>
                <div className="flex gap-2">
                  <CiEdit
                    className="text-white cursor-pointer p-1 border border-white/30 rounded-full"
                    size={28}
                  />
                  <button
                    type="button"
                    className="text-red-500 text-sm"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm">Institute Name *</label>
                  <input
                    type="text"
                    {...register(`educations.${index}.institute_name`, { required: "Institute Name is required" })}
                    className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
                  />
                  {errors?.educations?.[index]?.institute_name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.educations[index].institute_name.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm">Degree *</label>
                  <input
                    type="text"
                    {...register(`educations.${index}.degree`, { required: "Degree is required" })}
                    className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
                  />
                  {errors?.educations?.[index]?.degree && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.educations[index].degree.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm">Start Date *</label>
                  <input
                    type="date"
                    {...register(`educations.${index}.start_date`, { required: "Start Date is required" })}
                    className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
                  />
                  {errors?.educations?.[index]?.start_date && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.educations[index].start_date.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm">End Date</label>
                  <input
                    type="date"
                    disabled={isCurrent}
                    {...register(`educations.${index}.end_date`)}
                    className={`bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white ${
                      isCurrent ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  />
                </div>

                <div className="flex items-center gap-2 col-span-2">
                  <Checkbox
                    checked={isCurrent}
                    onCheckedChange={(checked) =>
                      setValue(`educations.${index}.currently_enrolled`, checked)
                    }
                  />
                  <label className="text-sm">I am currently studying here</label>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add Button */}
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={handleAdd}
            className="font-medium px-4 text-sm py-2 rounded-lg flex items-center gap-2 border border-white/20 hover:bg-white hover:text-black transition-colors duration-200"
          >
            <LuCirclePlus size={20} /> Add Education
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step4;
