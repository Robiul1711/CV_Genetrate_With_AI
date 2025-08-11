import React, { createContext, useContext, useState } from "react";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [coverLetter, setCoverLetter] = useState({});
  const [selectedTemplate, setSelectedTemplate] = useState("resumeOne");

  return (
    <ResumeContext.Provider
      value={{ coverLetter, setCoverLetter, selectedTemplate, setSelectedTemplate }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
