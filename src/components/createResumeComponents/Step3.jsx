import React, { useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { LuCirclePlus } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { Checkbox } from "@/components/ui/checkbox";
import Title from "../common/Title";
import { useEmail } from "@/hooks/useEmail"; // Access language

const Step3 = () => {
  const {
    control,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { language } = useEmail();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "work_experiences",
  });

  // Add default item if empty
  useEffect(() => {
    if (fields.length === 0) {
      append({
        job_title: "",
        company_name: "",
        start_date: "",
        end_date: null,
        still_working_here: false,
        responsibilities: "",
      });
    }
  }, [append, fields.length]);

  // Ensure empty end_date becomes null
  useEffect(() => {
    fields.forEach((_, index) => {
      const endDate = watch(`work_experiences.${index}.end_date`);
      if (endDate === "") {
        setValue(`work_experiences.${index}.end_date`, null);
      }
    });
  }, [fields, watch, setValue]);

  const handleAdd = () => {
    append({
      job_title: "",
      company_name: "",
      start_date: "",
      end_date: null,
      still_working_here: false,
      responsibilities: "",
    });
  };

  return (
    <div className="text-white flex items-center justify-center p-3 lg:px-6 xl:py-6">
      <div className="w-full max-w-3xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <Title level="title40">
            {language === "de" ? "Ihre Berufserfahrung" : "Your Work Experience"}
          </Title>
          <Title level="title20">
            {language === "de"
              ? "Listen Sie Ihre bisherigen Jobs und Verantwortlichkeiten auf. Beginnen Sie mit Ihrer letzten Tätigkeit. Sie können mehrere Positionen hinzufügen."
              : "List your previous jobs and responsibilities. Start with your most recent experience. You can add multiple positions."}
          </Title>
        </div>

        {/* Work Experience Cards */}
        {fields.map((item, index) => {
          const isCurrent = watch(`work_experiences.${index}.still_working_here`);

          return (
            <div
              key={item.id}
              className="mb-10 border border-[#262626] bg-[#0E0E10] p-4 rounded-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Title level="title24">
                    {watch(`work_experiences.${index}.job_title`) ||
                      (language === "de" ? "Berufsbezeichnung" : "Job Title")}
                  </Title>
                  <GoDotFill className="text-white" />
                  <Title level="title24">
                    {watch(`work_experiences.${index}.company_name`) ||
                      (language === "de" ? "Unternehmen" : "Company")}
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
                    {language === "de" ? "Entfernen" : "Remove"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Job Title */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm">
                    {language === "de" ? "Berufsbezeichnung *" : "Job Title *"}
                  </label>
                  <input
                    type="text"
                    {...register(`work_experiences.${index}.job_title`, {
                      required:
                        language === "de"
                          ? "Berufsbezeichnung ist erforderlich"
                          : "Job Title is required",
                    })}
                    className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
                  />
                  {errors?.work_experiences?.[index]?.job_title && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.work_experiences[index].job_title.message}
                    </p>
                  )}
                </div>

                {/* Company Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm">
                    {language === "de"
                      ? "Unternehmensname *"
                      : "Company Name *"}
                  </label>
                  <input
                    type="text"
                    {...register(`work_experiences.${index}.company_name`, {
                      required:
                        language === "de"
                          ? "Unternehmensname ist erforderlich"
                          : "Company Name is required",
                    })}
                    className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
                  />
                  {errors?.work_experiences?.[index]?.company_name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.work_experiences[index].company_name.message}
                    </p>
                  )}
                </div>

                {/* Start Date */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm">
                    {language === "de" ? "Startdatum *" : "Start Date *"}
                  </label>
                  <input
                    type="date"
                    {...register(`work_experiences.${index}.start_date`, {
                      required:
                        language === "de"
                          ? "Startdatum ist erforderlich"
                          : "Start Date is required",
                    })}
                    className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
                  />
                  {errors?.work_experiences?.[index]?.start_date && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.work_experiences[index].start_date.message}
                    </p>
                  )}
                </div>

                {/* End Date */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm">
                    {language === "de" ? "Enddatum" : "End Date"}
                  </label>
                  <input
                    type="date"
                    disabled={isCurrent}
                    {...register(`work_experiences.${index}.end_date`)}
                    className={`bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white ${
                      isCurrent ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  />
                </div>

                {/* Still Working Checkbox */}
                <div className="flex items-center gap-2 col-span-2">
                  <Checkbox
                    checked={isCurrent}
                    onCheckedChange={(checked) =>
                      setValue(
                        `work_experiences.${index}.still_working_here`,
                        checked
                      )
                    }
                  />
                  <label className="text-sm">
                    {language === "de"
                      ? "Ich arbeite hier noch"
                      : "I'm still working here"}
                  </label>
                </div>

                {/* Responsibilities */}
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-sm">
                    {language === "de"
                      ? "Verantwortlichkeiten / Erfolge (optional)"
                      : "Responsibilities / Achievements (Optional)"}
                  </label>
                  <textarea
                    rows={3}
                    {...register(`work_experiences.${index}.responsibilities`)}
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
            <LuCirclePlus size={20} />{" "}
            {language === "de" ? "Erfahrung hinzufügen" : "Add Your Experience"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3;
