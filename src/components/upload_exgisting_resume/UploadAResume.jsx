import React, { useState } from "react";
import { DocumentIcon } from "@/components/AllIcons/DashboardAllIcons";
import Title from "@/components/common/Title";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Progress } from "@/components/ui/progress";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { useResume } from "@/providers/ResumeContext";
import { useEmail } from "@/hooks/useEmail";

const textMap = {
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
  },
};

const UploadAResume = () => {
  const axiosSecure = useAxiosSecure();
  const { language } = useEmail();
  const t = textMap[language || "en"];
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const { setAllResumeData } = useResume();

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
      navigate(`/dashboard/update-existing-resume-edit/12`);
    },
    onError: (error) => {
      setUploading(false);
      console.error("Upload failed:", error);
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

  const handleSubmit = () => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("upload_resume", file);
    mutate(formData);
  };

  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="text-center flex flex-col items-center gap-4 mb-5">
        <Title level="title32">{t.pageTitle}</Title>
        <Title level="title16">{t.pageSubtitle}</Title>
      </div>

      {/* Upload Area */}
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full sm:h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <DocumentIcon className="w-8 h-8 mb-4 text-gray-500" />
            <p className="mb-2 text-sm text-gray-500">
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

      {/* Show upload progress */}
      {file && (
        <div className="border border-[#262626] p-5 rounded-xl mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <DocumentIcon />
              <div className="flex flex-col">
                <h1 className="text-xl font-semibold">{file.name}</h1>
                <p className="text-[#9B9B9B]">
                  {Math.round(((uploadProgress / 100) * file.size) / 1024)} KB
                  of {Math.round(file.size / 1024)} KB uploaded
                </p>
              </div>
            </div>
            <IoIosCloseCircleOutline
              className="text-2xl cursor-pointer hover:text-red-500"
              onClick={handleRemove}
            />
          </div>

          <div className="mt-8">
            <Progress value={uploadProgress} />
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleSubmit}
              disabled={uploading || isLoading}
              className="font-semibold border border-white px-6 py-2 text-lg rounded-md bg-black text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading || isLoading ? t.uploading : t.submit}
            </button>
          </div>

          {isSuccess && <p className="text-green-600 mt-2">{t.success}</p>}
          {isError && <p className="text-red-600 mt-2">{t.error}</p>}
        </div>
      )}
    </div>
  );
};

export default UploadAResume;
