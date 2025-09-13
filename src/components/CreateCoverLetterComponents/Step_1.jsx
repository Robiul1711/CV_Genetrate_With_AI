import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Title from "../common/Title";
import { useEmail } from "@/hooks/useEmail";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const textMap = {
  en: {
    pageTitle: "Basic Information",
    firstName: "First Name *",
    firstNamePlaceholder: "John",
    lastName: "Last Name *",
    lastNamePlaceholder: "Smith",
    email: "Email *",
    emailPlaceholder: "johnsmith@gmail.com",
    phone: "Phone Number *",
    phonePlaceholder: "123 456 8455",
    address: "Address",
    addressPlaceholder: "Berlin, Germany",
    dob: "Date of Birth",
    jobTitle: "Job Title *",
    jobTitlePlaceholder: "UI/UX Designer",
    about: "About (Optional)",
    aboutPlaceholder: "Tell us about yourself...",
    linkedin: "LinkedIn Profile (optional)",
    linkedinPlaceholder: "https://www.linkedin.com/in/your-username/",
    xing: "XING Profile (optional)",
    xingPlaceholder: "https://www.xing.com/in/your-username/",
    errors: {
      firstName: "First name is required",
      lastName: "Last name is required",
      emailRequired: "Email is required",
      emailInvalid: "Invalid email format",
      phone: "Phone number is required",
      jobTitle: "Job title is required",
      address: "Address is required", // ✅ added
      dob: "Date of birth is required", // ✅ added
    },
  },
  de: {
    pageTitle: "Grundlegende Informationen",
    firstName: "Vorname *",
    firstNamePlaceholder: "John",
    lastName: "Nachname *",
    lastNamePlaceholder: "Smith",
    email: "E-Mail *",
    emailPlaceholder: "johnsmith@gmail.com",
    phone: "Telefonnummer *",
    phonePlaceholder: "123 456 8455",
    address: "Adresse",
    addressPlaceholder: "Berlin, Deutschland",
    dob: "Geburtsdatum",
    jobTitle: "Berufsbezeichnung *",
    jobTitlePlaceholder: "UI/UX Designer",
    about: "Über mich (Optional)",
    aboutPlaceholder: "Erzählen Sie uns etwas über sich...",
    linkedin: "LinkedIn-Profil (optional)",
    linkedinPlaceholder: "https://www.linkedin.com/in/your-username/",
    xing: "XING-Profil (optional)",
    xingPlaceholder: "https://www.xing.com/in/your-username/",
    errors: {
      firstName: "Vorname ist erforderlich",
      lastName: "Nachname ist erforderlich",
      emailRequired: "E-Mail ist erforderlich",
      emailInvalid: "Ungültiges E-Mail-Format",
      phone: "Telefonnummer ist erforderlich",
      jobTitle: "Berufsbezeichnung ist erforderlich",
      address: "Adresse ist erforderlich", // ✅ added
      dob: "Geburtsdatum ist erforderlich", // ✅ added
    },
  },
};

const Step_1 = () => {
  const { language } = useEmail();
  const t = textMap[language || "en"];
  const {
    register,
    formState: { errors },
    control
  } = useFormContext();

  return (
    <div className="text-white flex items-center justify-center">
      <div className="w-[800px] mx-auto">
        <div className="text-center flex flex-col items-center gap-4 mb-5 xl:mb-10">
          <Title level="title40">{t.pageTitle}</Title>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* First Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">{t.firstName}</label>
            <input
              type="text"
              placeholder={t.firstNamePlaceholder}
              {...register("first_name", { required: t.errors.firstName })}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
            {errors.first_name && (
              <span className="text-red-500 text-xs">
                {errors.first_name.message}
              </span>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">{t.lastName}</label>
            <input
              type="text"
              placeholder={t.lastNamePlaceholder}
              {...register("last_name", { required: t.errors.lastName })}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
            {errors.last_name && (
              <span className="text-red-500 text-xs">
                {errors.last_name.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">{t.email}</label>
            <input
              type="email"
              placeholder={t.emailPlaceholder}
              {...register("email", {
                required: t.errors.emailRequired,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t.errors.emailInvalid,
                },
              })}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Phone Number */}
        <div className="flex flex-col gap-2">
            <label className="md:text-base text-[14px] font-normal text-white">
              {
                language ==="en" ?"Phone Number" :"Telefonnummer"
              }
            </label>
            <Controller
              name="phone_number"
              control={control}
              rules={{
                required: "Phone number is required",
              }}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  country={ language ==="en" ?"us":"de"}
                  placeholder="Enter phone number"
                  inputClass=" md:text-base text-[14px]"
                  containerClass={`flex font-poppins gap-2 items-center  p-1  border-[1px] border-[#262626] w-full rounded-[12px] phone_input_container_profile_edit  ${
                    errors.phone ? "border-red-500" : "border-[#D8D8D]"
                  } `}
                />
              )}
            />
            {errors.phone_number && (
              <p className="text-red-500 text-sm">{errors.phone_number.message}</p>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">{t.address}</label>
            <input
              type="text"
              placeholder={t.addressPlaceholder}
              {...register("address", { required: t.errors.address })}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
            {errors.address && (
              <span className="text-red-500 text-xs">
                {errors.address.message}
              </span>
            )}
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">{t.dob}</label>
            <input
              type="date"
              {...register("dob", { required: t.errors.dob })} // ✅ required added
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
            {errors.dob && (
              <span className="text-red-500 text-xs">{errors.dob.message}</span>
            )}
          </div>

          {/* Job Title */}
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-sm text-white">{t.jobTitle}</label>
            <input
              type="text"
              placeholder={t.jobTitlePlaceholder}
              {...register("job_title", { required: t.errors.jobTitle })}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
            {errors.job_title && (
              <span className="text-red-500 text-xs">
                {errors.job_title.message}
              </span>
            )}
          </div>

          {/* About */}
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-sm text-white">{t.about}</label>
            <textarea
              placeholder={t.aboutPlaceholder}
              {...register("about")}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] h-24 resize-none text-white"
            />
          </div>

          {/* LinkedIn */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">{t.linkedin}</label>
            <input
              type="url"
              placeholder={t.linkedinPlaceholder}
              {...register("linked_in_profile")}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
          </div>

          {/* XING */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">{t.xing}</label>
            <input
              type="url"
              placeholder={t.xingPlaceholder}
              {...register("xing_profile")}
              className="bg-[#0E0E10] px-3 py-1.5 text-xs rounded-lg border border-[#262626] text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step_1;
