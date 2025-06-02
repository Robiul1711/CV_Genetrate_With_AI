import ChatBox from "@/components/aiHelpComponents/ChatBox";
import React from "react";
import { ScrollRestoration } from "react-router-dom";

const AIHelp = () => {
  return (
    <div className="section-padding-x section-padding-y">
      <ScrollRestoration />
      <ChatBox />
    </div>
  );
};

export default AIHelp;
