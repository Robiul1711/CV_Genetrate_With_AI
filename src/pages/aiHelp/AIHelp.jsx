import ChatBox from "@/components/aiHelpComponents/ChatBox";
import React from "react";
import { ScrollRestoration } from "react-router-dom";

const AIHelp = () => {
  return (
    <div className="w-full h-full overflow-hidden">
      <ScrollRestoration />
      <ChatBox />
    </div>
  );
};

export default AIHelp;
