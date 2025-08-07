import React, { createContext, useContext, useState } from "react";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [formData, setFormData] = useState({});
  const [selectedTemplate, setSelectedTemplate] = useState("resumeOne");

  return (
    <ResumeContext.Provider
      value={{ formData, setFormData, selectedTemplate, setSelectedTemplate }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
