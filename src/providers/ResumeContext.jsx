import React, { createContext, useContext, useState } from "react";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [coverLetter, setCoverLetter] = useState({});
  const [allRedumeData, setAllResumeData] = useState({});

  return (
    <ResumeContext.Provider
      value={{ coverLetter, setCoverLetter, allRedumeData, setAllResumeData }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
