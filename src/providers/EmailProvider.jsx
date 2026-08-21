import { EmailContext } from "@/context";
import { useState, useEffect } from "react";

const EmailProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [email, setEmail] = useState(() => localStorage.getItem("email") || "");
  const [resetToken, setResetToken] = useState(() => localStorage.getItem("resetToken") || "");
  const [activeStep, setActiveStep] = useState(0);

  // Sync email with localStorage
  useEffect(() => {
    localStorage.setItem("email", email);
  }, [email]);

  // Sync resetToken with localStorage
  useEffect(() => {
    localStorage.setItem("resetToken", resetToken);
  }, [resetToken]);

  // Clear any leftover language setting
  useEffect(() => {
    localStorage.setItem("language", "en");
    localStorage.setItem("selectedLanguage", "en");
  }, []);

  return (
    <EmailContext.Provider
      value={{ email, setEmail, resetToken, setResetToken, language: "en", setLanguage, activeStep, setActiveStep }}
    >
      {children}
    </EmailContext.Provider>
  );
};

export default EmailProvider;
