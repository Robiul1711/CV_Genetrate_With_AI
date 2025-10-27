import React, { useRef } from "react";
import CoverLetter from "../All_Templates/CoverLetter";
import { useResume } from "@/providers/ResumeContext";
import DownloadButton from "../common/DownloadButton";
import HistoryViewOfCoverLetter from "../All_Templates/HistoryViewOfCoverLetter";

const HistoryView = () => {
  const { coverLetter } = useResume();
  const resumeRef = useRef();
  // console.log(coverLetter);
  return (
    <div className="bg-black text-white flex justify-center">
      <div className="w-full flex flex-col md:flex-row gap-6 md:gap-14">
        {/* Resume Preview */}
        <div className=" mx-auto flex flex-col gap-2 overflow-x-auto">
          <DownloadButton resumeRef={resumeRef} />
          <CoverLetter resumeRef={resumeRef} coverLetter={coverLetter} />
        </div>
      </div>
    </div>
  );
};

export default HistoryView;
