import { EmailContext } from "@/context";
import { useContext } from "react";

export const useEmail = () => {
    return useContext(EmailContext);
}