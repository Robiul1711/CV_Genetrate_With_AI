import React, { useState } from "react";
import ResumeHistory from "./ResumeHistory";
import CoverHistory from "./CoverHistory";

const History = () => {
  const [activeTab, setActiveTab] = useState("resume");

  return (
    <div className="w-full text-white">
      {/* Tabs */}
      <div className="flex  border-b border-gray-700 mb-6">
        <button
          onClick={() => setActiveTab("resume")}
          className={`px-6 py-3 font-semibold transition-all duration-300 border-b-2 ${
            activeTab === "resume"
              ? "border-[#69CA6A] text-[#69CA6A]"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          Resume History
        </button>
        <button
          onClick={() => setActiveTab("cover")}
          className={`px-6 py-3 font-semibold transition-all duration-300 border-b-2 ${
            activeTab === "cover"
              ? "border-[#69CA6A] text-[#69CA6A]"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          Cover Letter History
        </button>
      </div>

      {/* Content */}
      <div className=" ">
        {activeTab === "resume" && <ResumeHistory />}
        {activeTab === "cover" && <CoverHistory />}
      </div>
    </div>
  );
};

export default History;
