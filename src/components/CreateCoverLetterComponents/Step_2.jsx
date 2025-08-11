import React from "react";
import { useFormContext } from "react-hook-form";
import Title from "../common/Title";

const Step_2 = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="text-white flex items-center justify-center">
      <div className="w-[800px]">
        <div className="text-center flex flex-col items-center gap-4 mb-5">
          <Title level="title40">Job Application Details</Title>
        </div>

        <form className="flex flex-col gap-4">
          {/* Job Title */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">
              Job Title You’re Applying For *
            </label>
            <input
              type="text"
              placeholder="Frontend Developer"
              {...register("applying_for", { required: "Job title is required" })}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
            {errors.applying_for && (
              <span className="text-red-500 text-xs">
                {errors.applying_for.message}
              </span>
            )}
          </div>

          {/* Company Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Company Name *</label>
            <input
              type="text"
              placeholder="xyz Company"
              {...register("company_name", { required: "Company name is required" })}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
            {errors.company_name && (
              <span className="text-red-500 text-xs">
                {errors.company_name.message}
              </span>
            )}
          </div>

          {/* Company Location (Optional) */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Company Location (Optional)</label>
            <input
              type="text"
              placeholder="Germany, Berlin"
              {...register("company_location")}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
          </div>

          {/* Hiring Manager Name (Optional) */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Hiring Manager Name (Optional)</label>
            <input
              type="text"
              placeholder="Dear Luci,"
              {...register("hiring_manager_name")}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step_2;
