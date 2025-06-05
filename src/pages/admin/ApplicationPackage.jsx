import { useState } from "react";
import UploadAResume from "@/components/upload_exgisting_resume/UploadAResume";
import UploadACoverLetter from "@/components/upload_exgisting_resume/UploadACoverLetter";
import UploadCertificates from "@/components/upload_exgisting_resume/UploadCertificates";
import ReviewDocuments from "@/components/upload_exgisting_resume/ReviewDocuments";

const steps = [
  { title: "Upload Resume", component: <UploadAResume /> },
  { title: "Upload Cover Letter", component: <UploadACoverLetter /> },
  { title: "Upload Certificates", component: <UploadCertificates /> },
  { title: "Review Documents", component: <ReviewDocuments /> },
];

const ApplicationPackage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  return (
    <div className="">
      {/* Active Step Component */}
      {steps[activeStep].component}

      {/* Navigation Buttons */}
      {activeStep === steps.length - 1 ? (
        ""
      ) : (
<div className="mt-8 max-w-5xl mx-auto flex justify-between">
  {/* Back Button - only render if not on first step */}
  {activeStep !== 0 ? (
    <button
      onClick={handleBack}
      className="font-semibold border border-white  px-8 py-2 text-lg rounded-md bg-black text-white transition-colors duration-300"
    >
      Back
    </button>
  ) : <div />}

  {/* Next Button */}
  <button
    onClick={handleNext}
    disabled={activeStep === steps.length - 1}
    className="font-semibold border border-white  px-8 py-2 text-lg rounded-md bg-white text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    Next
  </button>
</div>

      )}
    </div>
  );
};

export default ApplicationPackage;
