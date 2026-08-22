import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useResume } from "@/providers/ResumeContext";
import { DocumentIcon } from "@/components/AllIcons/DashboardAllIcons";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Progress } from "@/components/ui/progress";
import LanguageList from "language-list";
import { toast } from "sonner";

const Tailor = [
  { id: 1, title: "Professional" },
  { id: 2, title: "Academic" },
  { id: 3, title: "Technical" },
  { id: 4, title: "Casual" },
];

const Complexity = [
  { id: 1, title: "Simplified" },
  { id: 2, title: "Advanced" },
  { id: 3, title: "Academic" },
];

const GenderLanguage = [
  { id: 1, title: "Informal" },
  { id: 2, title: "Formal" },
  { id: 3, title: "Neutral" },
];

const Creativity = [
  { id: 1, title: "Straightforward" },
  { id: 2, title: "Moderate" },
  { id: 3, title: "Highly Creative" },
];

const allLanguages = new LanguageList().getData();

const UploadAResume = () => {
  const navigate = useNavigate();
  const { setAllResumeData } = useResume();

  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tailor_documents_voice: Tailor[0],
      gender_language: GenderLanguage[0],
      complexity: Complexity[0],
      creativity: Creativity[0],
      converted_language: "English",
    },
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setUploadProgress(0);
    setUploading(true);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 50);
  };

  const handleRemove = () => {
    setFile(null);
    setUploadProgress(0);
    setUploading(false);
  };

  const onSubmitFile = (data) => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setAllResumeData({
        data: {
          first_name: "John",
          last_name: "Doe",
          email: "john.doe@example.com",
          ...data,
        },
      });
      toast.success("Uploaded and analyzed successfully!");
      navigate("/dashboard/choose-resume");
    }, 800);
  };

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
              <option key={opt.id} value={opt.id}>
                {opt.title}
              </option>
            ))}
          </select>
        )}
      />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto w-full py-2">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Upload Your Resume</h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
          Upload your existing resume in PDF, DOCX or PNG format. Our AI will analyze and optimize it for your target job.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-[#121212] rounded-xl p-6 border border-[#262626]">
          <h2 className="text-xl font-semibold text-white mb-4">Select Resume File</h2>

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
                <DocumentIcon className={`w-10 h-10 mb-4 ${file ? "text-green-500" : "text-gray-500"}`} />
                <p className="mb-2 text-sm text-gray-400">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-500">PDF, DOCX or PNG (max 5MB)</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
            </label>
          </div>

          {file && (
            <div className="border border-[#333] p-5 rounded-xl mt-6 bg-[#0a0a0a]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <DocumentIcon className="text-blue-500" />
                  <div className="flex flex-col">
                    <h3 className="text-md font-medium text-white truncate max-w-xs">{file.name}</h3>
                    <p className="text-[#9B9B9B] text-sm">
                      {Math.round(((uploadProgress / 100) * file.size) / 1024)} KB of{" "}
                      {Math.round(file.size / 1024)} KB
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
          <h2 className="text-xl font-semibold text-white mb-4">Optimization Preferences</h2>

          <form onSubmit={handleSubmit(onSubmitFile)} className="flex flex-col gap-5">
            {renderSelect("tailor_documents_voice", Tailor, "Document Style")}
            {renderSelect("gender_language", GenderLanguage, "Formality Level")}
            {renderSelect("complexity", Complexity, "Complexity Level")}
            {renderSelect("creativity", Creativity, "Creativity Level")}

            {/* Language Selection */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-300">Resume Language</label>
              <Controller
                control={control}
                name="converted_language"
                render={({ field }) => (
                  <select
                    {...field}
                    className="bg-[#1a1a1a] px-4 py-3 text-sm rounded-lg border border-[#333] text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    {allLanguages.map((lang) => (
                      <option key={lang.code} value={lang.language}>
                        {lang.language}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>

            <button
              type="submit"
              className={`mt-2 font-medium px-6 py-3 text-white rounded-lg transition-colors ${
                !file ? "bg-gray-700 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={!file || uploading}
            >
              {uploading ? "Analyzing..." : "Submit & Optimize"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadAResume;
