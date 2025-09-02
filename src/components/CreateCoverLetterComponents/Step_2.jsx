import React from "react";
import { useFormContext } from "react-hook-form";
import Title from "../common/Title";
import { useEmail } from "@/hooks/useEmail";

const textMap = {
  en: {
    pageTitle: "Job Application Details",
    applyingFor: "Job Title You’re Applying For *",
    applyingForPlaceholder: "Frontend Developer",
    applyingForError: "Job title is required",
    companyName: "Company Name *",
    companyNamePlaceholder: "xyz Company",
    companyNameError: "Company name is required",
    companyLocation: "Company Location *",
    companyLocationPlaceholder: "Germany, Berlin",
    companyLocationError: "Company location is required",
    hiringManager: "Hiring Manager Name *",
    hiringManagerPlaceholder: "Dear Luci,",
    hiringManagerError: "Hiring manager name is required",
  },
  de: {
    pageTitle: "Bewerbungsdetails",
    applyingFor: "Position, für die Sie sich bewerben *",
    applyingForPlaceholder: "Frontend Entwickler",
    applyingForError: "Berufsbezeichnung ist erforderlich",
    companyName: "Firmenname *",
    companyNamePlaceholder: "xyz Firma",
    companyNameError: "Firmenname ist erforderlich",
    companyLocation: "Firmenstandort *",
    companyLocationPlaceholder: "Deutschland, Berlin",
    companyLocationError: "Firmenstandort ist erforderlich",
    hiringManager: "Name des Personalmanagers *",
    hiringManagerPlaceholder: "Sehr geehrte Luci,",
    hiringManagerError: "Name des Personalmanagers ist erforderlich",
  },
};

const Step_2 = () => {
  const { language } = useEmail();
  const t = textMap[language || "en"];
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="text-white flex items-center justify-center">
      <div className="w-[800px]">
        <div className="text-center flex flex-col items-center gap-4 mb-5">
          <Title level="title40">{t.pageTitle}</Title>
        </div>

        <form className="flex flex-col gap-4">
          {/* Job Title */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">{t.applyingFor}</label>
            <input
              type="text"
              placeholder={t.applyingForPlaceholder}
              {...register("applying_for", { required: t.applyingForError })}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
            {errors.applying_for && (
              <span className="text-red-500 text-xs">{errors.applying_for.message}</span>
            )}
          </div>

          {/* Company Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">{t.companyName}</label>
            <input
              type="text"
              placeholder={t.companyNamePlaceholder}
              {...register("company_name", { required: t.companyNameError })}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
            {errors.company_name && (
              <span className="text-red-500 text-xs">{errors.company_name.message}</span>
            )}
          </div>

          {/* Company Location */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">{t.companyLocation}</label>
            <input
              type="text"
              placeholder={t.companyLocationPlaceholder}
              {...register("company_location", { required: t.companyLocationError })}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
            {errors.company_location && (
              <span className="text-red-500 text-xs">{errors.company_location.message}</span>
            )}
          </div>

          {/* Hiring Manager */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">{t.hiringManager}</label>
            <input
              type="text"
              placeholder={t.hiringManagerPlaceholder}
              {...register("hiring_manager_name", { required: t.hiringManagerError })}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
            {errors.hiring_manager_name && (
              <span className="text-red-500 text-xs">{errors.hiring_manager_name.message}</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step_2;
