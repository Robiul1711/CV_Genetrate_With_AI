import { EmailContext } from "@/context";
import { useState } from "react";

const EmailProvider = ({children}) => {
    const [email, setEmail] = useState("");
    const [resetToken, setResetToken] = useState("")
    return(
        <EmailContext.Provider value={{email, setEmail, resetToken, setResetToken}}>
            {children}
        </EmailContext.Provider>
    )
}

export default EmailProvider;