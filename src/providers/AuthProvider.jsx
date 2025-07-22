import { AuthContext } from "@/context";

import { useState} from "react";


const AuthProvider = ({ children }) => {
  const [langauge, setLanguage] = useState("en");


  return (
    <AuthContext.Provider value={{langauge, setLanguage }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;