import React, { useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { LuCirclePlus } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { Checkbox } from "@/components/ui/checkbox";
import Title from "../common/Title";

const Step3 = () => {
  const {
    control,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "experiences",
  });

  // Append one default item on mount if empty
  useEffect(() => {
    if (fields.length === 0) {
      append({
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        description: "",
      });
    }
  }, [append, fields.length]);

  const handleAdd = () => {
    append({
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
    });
  };

  return (
    <div className="text-white flex items-center justify-center p-3 lg:px-6 xl:py-6">
      <div className="w-full max-w-3xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <Title level="title40">Your Work Experience</Title>
          <Title level="title20">
            List your previous jobs and responsibilities. Start with your most
            recent experience. You can add multiple positions.
          </Title>
        </div>

        {/* Experiences */}
        {fields.map((item, index) => {
          const isCurrent = watch(`experiences.${index}.isCurrent`);

          return (
            <div
              key={item.id}
              className="mb-10 border border-[#262626] bg-[#0E0E10] p-4 rounded-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Title level="title24">
                    {watch(`experiences.${index}.jobTitle`) || "Job Title"}
                  </Title>
                  <GoDotFill className="text-white" />
                  <Title level="title24">
                    {watch(`experiences.${index}.company`) || "Company"}
                  </Title>
                </div>
                <div className="flex gap-2">
                  <CiEdit
                    className="text-white cursor-pointer p-1 border border-white/30 rounded-full"
                    size={28}
                    onClick={() => {
                      // Optional: add toggle edit mode
                    }}
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
                  <label className="text-sm">Job Title *</label>
                  <input
                    type="text"
                    {...register(`experiences.${index}.jobTitle`)}
                    className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm">Company Name *</label>
                  <input
                    type="text"
                    {...register(`experiences.${index}.company`)}
                    className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm">Start Date *</label>
                  <input
                    type="date"
                    {...register(`experiences.${index}.startDate`)}
                    className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm">End Date</label>
                  <input
                    type="date"
                    disabled={isCurrent}
                    {...register(`experiences.${index}.endDate`)}
                    className={`bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white ${
                      isCurrent ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  />
                </div>

                <div className="flex items-center gap-2 col-span-2">
                  <Checkbox
                    checked={isCurrent}
                    onCheckedChange={(checked) =>
                      setValue(`experiences.${index}.isCurrent`, checked)
                    }
                  />
                  <label className="text-sm">I&apos;m still working here</label>
                </div>

                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-sm">
                    Responsibilities / Achievements (Optional)
                  </label>
                  <textarea
                    rows={3}
                    {...register(`experiences.${index}.description`)}
                    className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white resize-none"
                  />
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
            <LuCirclePlus size={20} /> Add Your Experience
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3;
