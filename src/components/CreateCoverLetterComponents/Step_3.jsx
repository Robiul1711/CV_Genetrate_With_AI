import React, { useEffect, useState } from "react";
import { DocumentIcon } from "@/components/AllIcons/DashboardAllIcons";
import Title from "@/components/common/Title";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Progress } from "@/components/ui/progress";
import { useFormContext, Controller } from "react-hook-form";
import { useEmail } from "@/hooks/useEmail";

const textMap = {
  en: {
    pageTitle: "Upload Resume",
    clickToUpload: "Click to upload",
    fileTypes: "PDF, DOCX (Max 5MB)",
    requiredError: "Resume is required",
  },
  de: {
    pageTitle: "Lebenslauf hochladen",
    clickToUpload: "Zum Hochladen klicken",
    fileTypes: "PDF, DOCX (Max. 5MB)",
    requiredError: "Lebenslauf ist erforderlich",
  },
};

const Step_3 = () => {
  const { language } = useEmail();
  const t = textMap[language || "en"];

  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const uploadedFile = watch("upload_resume");
  const [progress, setProgress] = useState(0);

  // Simulate progress bar
  useEffect(() => {
    if (uploadedFile) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [uploadedFile]);

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="text-center flex flex-col items-center gap-4 mb-5">
        <Title level="title32">{t.pageTitle}</Title>
      </div>

      <Controller
        name="upload_resume"
        control={control}
        rules={{ required: t.requiredError }}
        render={({ field }) => (
          <>
            {/* Upload Box */}
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="resume"
                className="flex flex-col items-center justify-center w-full sm:h-28 border-2 border-gray-300 border-dashed py-2 rounded-lg cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center pt-3 pb-2">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-xs text-gray-500">
                    <span className="font-semibold">{t.clickToUpload}</span>
                  </p>
                  <p className="text-xs text-gray-500">{t.fileTypes}</p>
                </div>
                <input
                  id="resume"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file || null);
                  }}
                />
              </label>
            </div>

            {/* Show file preview */}
            {field.value && (
              <div className="border border-[#262626] w-full p-4 rounded-xl mt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DocumentIcon />
                    <div className="flex flex-col">
                      <h1 className="text-xs font-semibold break-all">
                        {field.value.name}
                      </h1>
                      <p className="text-[#9B9B9B] text-xs">
                        {(field.value.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <IoIosCloseCircleOutline
                    className="text-base cursor-pointer"
                    onClick={() =>
                      setValue("upload_resume", null, { shouldValidate: true })
                    }
                  />
                </div>
                <div className="mt-4">
                  <Progress value={progress} className="h-3" />
                </div>
              </div>
            )}

            {/* Error */}
            {errors.upload_resume && (
              <p className="text-red-500 text-xs mt-2">
                {errors.upload_resume.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default Step_3;
