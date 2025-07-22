import { Edit, MoveUpRight, Search, Send } from "lucide-react";
import React, { useState } from "react";
import Title from "../common/Title";
import { AIIcon } from "../CustomIcons/CustomIcon";
import man from "../../assets/images/man.png";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useEmail } from "@/hooks/useEmail";
import ChatScreenWithReaction from "./ChatScreenWithReaction";

const ChatBox = () => {
  const [showChatWithData, setShowChatWithData] = useState(false);
const axiosSecure = useAxiosSecure();
const { language } = useEmail();
  const {data} = useQuery({
    queryKey: ['suggested-questions', language],
    queryFn: () => axiosSecure.get('/suggested-questions',{
      params:{lan:language},
    })
  })
  return (
    <div className="flex flex-col md:flex-row gap-8 w-full">
      {/* Left Sidebar */}
      <div className="w-full hidden md:block md:w-[25%] bg-[#0E0E10] p-5 rounded-lg ">
        <div className="relative flex items-center">
          <span className="absolute left-3 text-gray-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-[#262626] bg-[#0E0E10] text-white"
          />
        </div>

        <h2 className="text-white text-lg font-semibold my-6 pt-4">
          Suggested Questions
        </h2>

        <div className="space-y-4 mt-8">
          {data?.data?.data?.map((q, idx) => (
            <div
              key={idx}
              onClick={() => setShowChatWithData(true)}
              className="flex justify-between items-center text-white hover:underline cursor-pointer"
            >
              <p className="text-sm md:text-base">{q.question}</p>
              <MoveUpRight size={18} />
            </div>
          ))}
        </div>
      </div>

      {showChatWithData ? (
        <>
<ChatScreenWithReaction  />
        </>
      ) : (
        <div className="w-full md:flex-1 bg-[#0E0E10] rounded-lg">
          <div className="flex justify-center items-center h-[50vh] md:h-[70vh] text-center px-4">
            <div>
              <div className="flex justify-center my-5">
                <AIIcon />
              </div>
              <h2 className="text-white text-xl font-semibold">
                Hi! I’m your CV guide. Ask me anything!
              </h2>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 px-4 md:px-16 mb-6">
            <div className="w-full md:w-[60%] xl:w-[75%]">
              <input
                type="text"
                placeholder="Ask anything about CV writing…"
                className="pl-6 pr-2 py-2 w-full text-sm md:text-base rounded-lg border border-[#262626] bg-[#0E0E10] text-white"
              />
            </div>
            <div className="relative w-[60%] lg:flex-1 text-black bg-white hover:bg-dark hover:text-white transition-all duration-300 pl-4 pr-10 py-2 rounded-lg">
              <button type="button" className="text-left text-sm md:text-base">
                Send Message
              </button>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                <Send size={18} />
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
