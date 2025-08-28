import { EmailContext } from "@/context";
import { useState, useEffect } from "react";

const EmailProvider = ({ children }) => {
  // Initialize from localStorage if exists
  const [language, setLanguage] = useState(() => localStorage.getItem("language") || "en");
  const [email, setEmail] = useState(() => localStorage.getItem("email") || "");
  const [resetToken, setResetToken] = useState(() => localStorage.getItem("resetToken") || "");

  // Sync language with localStorage
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Sync email with localStorage
  useEffect(() => {
    localStorage.setItem("email", email);
  }, [email]);

  // Sync resetToken with localStorage
  useEffect(() => {
    localStorage.setItem("resetToken", resetToken);
  }, [resetToken]);

  return (
    <EmailContext.Provider
      value={{ email, setEmail, resetToken, setResetToken, language, setLanguage }}
    >
      {children}
    </EmailContext.Provider>
  );
};

export default EmailProvider;
