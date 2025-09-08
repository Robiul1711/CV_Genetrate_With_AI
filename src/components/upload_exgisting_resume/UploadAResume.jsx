import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useResume } from "@/providers/ResumeContext";
import { useEmail } from "@/hooks/useEmail";
import { DocumentIcon } from "@/components/AllIcons/DashboardAllIcons";
import Title from "@/components/common/Title";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Progress } from "@/components/ui/progress";
import LanguageList from "language-list";
import { toast } from "react-toastify";

// Options
const Tailor = [
  { id: 1, title_en: "Professional", title_de: "Professionell" },
  { id: 2, title_en: "Academic", title_de: "Akademisch" },
  { id: 3, title_en: "Technical", title_de: "Technisch" },
  { id: 4, title_en: "Casual", title_de: "Locker" },
];

const Complexity = [
  { id: 1, title_en: "Simplified", title_de: "Vereinfacht" },
  { id: 2, title_en: "Advanced", title_de: "Fortgeschritten" },
  { id: 3, title_en: "Academic", title_de: "Akademisch" },
];

const GenderLanguage = [
  { id: 1, title_en: "Informal(Du)", title_de: "Informell(Du)" },
  { id: 2, title_en: "Formell (Sie)", title_de: "Formell (Sie)" },
  { id: 3, title_en: "Gender (DU)", title_de: "Gender (DU)" },
  { id: 4, title_en: "Gender (Sie)", title_de: "Gender (Sie)" },
];

const Creativity = [
  { id: 1, title_en: "Straightforward", title_de: "Einfach" },
  { id: 2, title_en: "Moderate", title_de: "Mittel" },
  { id: 3, title_en: "Highly Creative", title_de: "Sehr Kreativ" },
];

// Get all languages
const allLanguages = new LanguageList().getData();

const UploadAResume = () => {
  const axiosSecure = useAxiosSecure();
  const { language, activeStep, setActiveStep } = useEmail();
  const navigate = useNavigate();
  const { setAllResumeData } = useResume();

  const t = {
    en: {
      pageTitle: "Upload Your Resume",
      pageSubtitle:
        "Upload your existing resume in PDF, DOCX or PNG format. Our AI will analyze and optimize it for the German job market",
      clickUpload: "Click to upload",
      allowedFormats: "PDF, DOCX or PNG (max 5MB)",
      submit: "Submit",
      uploading: "Uploading...",
      success: "Uploaded successfully!",
      error: "Upload failed. Try again.",
      label: "Convert to Language",
      placeholder: "Select a language",
      tailorVoice: "Document Style",
      genderStyle: "Formality Level",
      complexity: "Complexity Level",
      creativity: "Creativity Level",
    },
    de: {
      pageTitle: "Laden Sie Ihren Lebenslauf hoch",
      pageSubtitle:
        "Laden Sie Ihren vorhandenen Lebenslauf im PDF-, DOCX- oder PNG-Format hoch. Unsere KI analysiert und optimiert ihn für den deutschen Arbeitsmarkt",
      clickUpload: "Zum Hochladen klicken",
      allowedFormats: "PDF, DOCX oder PNG (max. 5MB)",
      submit: "Absenden",
      uploading: "Wird hochgeladen...",
      success: "Erfolgreich hochgeladen!",
      error: "Upload fehlgeschlagen. Bitte erneut versuchen.",
      label: "Sprache konvertieren",
      placeholder: "Sprache auswählen",
      tailorVoice: "Dokumentenstil",
      genderStyle: "Formalitätsgrad",
      complexity: "Komplexitätsgrad",
      creativity: "Kreativitätsgrad",
    },
  }[language || "en"];

  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tailor_documents_voice: Tailor[0],
      gender_language: GenderLanguage[0],
      complexity: Complexity[0],
      creativity: Creativity[0],
      converted_language: "",
    },
  });

  const getTitle = (item) =>
    language === "de" ? item.title_de : item.title_en;

  // Mutation
  const { mutate, isLoading, isSuccess, isError } = useMutation({
    mutationFn: async (formData) => {
      const res = await axiosSecure.post(
        `/upload-existing-resume/?lan=${language}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );
      return res.data;
    },
    onSuccess: (data) => {
      setUploading(false);
      setAllResumeData({ data: data?.data });
      navigate("/dashboard/choose-resume");
    },
    onError: (error) => {
      setUploading(false);
      console.error("Upload failed:", error);
      toast.error(error?.response?.data?.errors);
    },
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadProgress(0);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setUploadProgress(0);
  };

  const onSubmitFile = (data) => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("upload_resume", file);

    // Add selected dropdown values
    formData.append(
      "tailor_documents_voice",
      getTitle(data.tailor_documents_voice)
    );
    formData.append("gender_language_style", getTitle(data.gender_language));
    formData.append("complexity", getTitle(data.complexity));
    formData.append("creativity", getTitle(data.creativity));
    formData.append("converted_language", data.converted_language);

    mutate(formData);
  };

  // Dropdown render helper
  const renderSelect = (name, options, label) => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <select
            {...field}
            className="bg-[#1a1a1a] px-4 py-3 text-sm rounded-lg border border-[#333] text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            {options.map((opt) => (
              <option key={opt.id || opt.code} value={opt.id || opt.code}>
                {opt.language || getTitle(opt)}
              </option>
            ))}
          </select>
        )}
      />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-white mb-3">{t.pageTitle}</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">{t.pageSubtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-[#121212] rounded-xl p-6 border border-[#262626]">
          <h2 className="text-xl font-semibold text-white mb-4">
            Upload Resume
          </h2>

          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                file
                  ? "border-green-500/30 bg-green-500/10"
                  : "border-gray-300/30 hover:border-blue-500/50 bg-[#0a0a0a]"
              }`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <DocumentIcon
                  className={`w-10 h-10 mb-4 ${
                    file ? "text-green-500" : "text-gray-500"
                  }`}
                />
                <p className="mb-2 text-sm text-gray-400">
                  <span className="font-semibold">{t.clickUpload}</span>
                </p>
                <p className="text-xs text-gray-500">{t.allowedFormats}</p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {file && (
            <div className="border border-[#333] p-5 rounded-xl mt-6 bg-[#0a0a0a]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <DocumentIcon className="text-blue-500" />
                  <div className="flex flex-col">
                    <h3 className="text-md font-medium text-white truncate max-w-xs">
                      {file.name}
                    </h3>
                    <p className="text-[#9B9B9B] text-sm">
                      {Math.round(((uploadProgress / 100) * file.size) / 1024)}{" "}
                      KB of {Math.round(file.size / 1024)} KB uploaded
                    </p>
                  </div>
                </div>
                <IoIosCloseCircleOutline
                  className="text-2xl cursor-pointer text-gray-500 hover:text-red-500 transition-colors"
                  onClick={handleRemove}
                />
              </div>
              <div className="mt-4">
                <Progress value={uploadProgress} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>{uploadProgress}%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Configuration Section */}
        <div className="bg-[#121212] rounded-xl p-6 border border-[#262626]">
          <h2 className="text-xl font-semibold text-white mb-4">
            Resume Configuration
          </h2>

          <form
            onSubmit={handleSubmit(onSubmitFile)}
            className="flex flex-col gap-5"
          >
            {renderSelect("tailor_documents_voice", Tailor, t.tailorVoice)}
            {renderSelect("gender_language", GenderLanguage, t.genderStyle)}
            {renderSelect("complexity", Complexity, t.complexity)}
            {renderSelect("creativity", Creativity, t.creativity)}

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-300">
                {t.label}
              </label>
              <Controller
                control={control}
                name="converted_language"
                rules={{ required: "Language is required" }}
                render={({ field }) => (
                  <select
                    {...field}
                    className="bg-[#1a1a1a] px-4 py-3 text-sm rounded-lg border border-[#333] text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="" disabled className="text-gray-500">
                      {t.placeholder}
                    </option>
                    {allLanguages.map((lang) => (
                      <option key={lang.code} value={lang.language}>
                        {lang.language}
                      </option>
                    ))}
                  </select>
                )}
              />

              {errors.converted_language && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.converted_language.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={uploading || isLoading || !file}
              className={`mt-2 font-medium px-6 py-3 text-white rounded-lg transition-colors ${
                uploading || isLoading || !file
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {uploading || isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {t.uploading}
                </div>
              ) : (
                t.submit
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadAResume;
