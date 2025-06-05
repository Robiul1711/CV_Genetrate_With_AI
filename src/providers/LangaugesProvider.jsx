
import { LangaugeContext } from '@/context';
import React, { useState } from 'react'

const LangaugesProvider = ({children}) => {
   const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "en"
  );
  return (
    <LangaugeContext.Provider value={{selectedLanguage, setSelectedLanguage}}>
      {children}
    </LangaugeContext.Provider>
  )
}

export default LangaugesProvider
