import React, { createContext, useContext, useState, useEffect } from "react";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  // Load from localStorage initially
  const [coverLetter, setCoverLetter] = useState(() => {
    return JSON.parse(localStorage.getItem("coverLetter")) || {};
  });
  const [allRedumeData, setAllResumeData] = useState(() => {
    return JSON.parse(localStorage.getItem("allRedumeData")) || {};
  });
  const [imageString, setImageString] = useState(() => {
    return localStorage.getItem("imageString") || "";
  });
  const [color, setColor] = useState(() => {
    return localStorage.getItem("resumeColor") || "";
  });
  const [font, setFont] = useState(() => {
    return localStorage.getItem("resumeFont") || "";
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("coverLetter", JSON.stringify(coverLetter));
  }, [coverLetter]);

  useEffect(() => {
    localStorage.setItem("allRedumeData", JSON.stringify(allRedumeData));
  }, [allRedumeData]);

  useEffect(() => {
    localStorage.setItem("imageString", imageString || "");
  }, [imageString]);

  const [ imageset,setImageSet ] =useState()

  return (
    <ResumeContext.Provider
      value={{
        coverLetter,
        setCoverLetter,
        allRedumeData,
        setAllResumeData,
        imageString,
        setImageString,
        color,
        setColor,
        font,
        setFont,
        imageset,
        setImageSet
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
