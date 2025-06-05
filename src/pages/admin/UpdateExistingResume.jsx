
import Improvements from "@/components/UpdateExistingResumeComponent/Improvements";
import UploadAResume from "@/components/upload_exgisting_resume/UploadAResume";
import { act, useState } from "react";
const steps = [
  { title: "Upload Resume", component: <UploadAResume /> },
  { title: "Upload Cover Letter", component: <Improvements /> },
  // { title: "Upload Certificates", component: <UploadCertificates /> },
]
const UpdateExistingResume = () => {
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
          {
            activeStep !== 0 ? (
                  <button
            onClick={handleBack}
            disabled={activeStep === 0}
            className="font-semibold border border-white  px-8 py-2 text-lg rounded-md bg-black text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
            ):
            <div/>
          }
      

          <button
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
            className="font-semibold border border-white px-8 py-2 text-lg rounded-md bg-white text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateExistingResume;
