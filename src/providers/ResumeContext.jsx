import React, { createContext, useContext, useState } from "react";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [coverLetter, setCoverLetter] = useState({});
  const [allRedumeData, setAllResumeData] = useState({});
  const [imageString,setImageString] =useState();
  const [color,setColor] =useState("#FFFFFF")

  return (
    <ResumeContext.Provider
      value={{ coverLetter, setCoverLetter, allRedumeData, setAllResumeData,imageString,setImageString ,color,setColor}}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
