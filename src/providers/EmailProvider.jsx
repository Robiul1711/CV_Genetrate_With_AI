import { EmailContext } from "@/context";
import { useState } from "react";

const EmailProvider = ({children}) => {
    const [language, setLanguage] = useState("en");

    const [email, setEmail] = useState("");
    const [resetToken, setResetToken] = useState("")
    return(
        <EmailContext.Provider value={{email, setEmail, resetToken, setResetToken, language, setLanguage}}>
            {children}
        </EmailContext.Provider>
    )
}

export default EmailProvider;