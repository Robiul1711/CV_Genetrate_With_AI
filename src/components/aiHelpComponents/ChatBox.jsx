import { Edit, MoveUpRight, Search, Send } from "lucide-react";
import React, { useState } from "react";
import Title from "../common/Title";
import { AIIcon } from "../CustomIcons/CustomIcon";
import man from "../../assets/images/man.png";

const ChatBox = () => {
  const [showChatWithData, setShowChatWithData] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full">
      {/* Left Sidebar */}
      <div className="w-full lg:w-[25%] bg-[#0E0E10] p-5 rounded-lg ">
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
          {[
            "How to write a summary?",
            "What skills to add?",
            "Should I include photo?",
          ].map((q, idx) => (
            <div
              key={idx}
              onClick={() => setShowChatWithData(true)}
              className="flex justify-between items-center text-white hover:underline cursor-pointer"
            >
              <p className="text-sm md:text-base">{q}</p>
              <MoveUpRight size={18} />
            </div>
          ))}
        </div>
      </div>

      {showChatWithData ? (
        <div className="w-full lg:flex-1 bg-[#0E0E10] rounded-lg">
          <div className="w-full md:flex-1 bg-[#0E0E10] rounded-lg p-6 space-y-6">
            {/* Top Input Row */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-shrink-0">
                <img
                  src={man}
                  alt="icon"
                  className="w-12 h-12 object-cover rounded-full"
                />
              </div>
              <div className="flex items-center gap-4 w-full">
                <div className="w-full md:w-[98%]">
                  <input
                    type="text"
                    placeholder="Ask anything about CV writing…"
                    className="pl-6 pr-2 py-2 w-full text-sm md:text-base rounded-lg border border-[#262626] bg-[#0E0E10] text-white focus:outline-none"
                  />
                </div>
                <div className="flex items-center justify-center w-10 h-10 border border-[#262626] rounded-lg text-white">
                  <Edit size={18} />
                </div>
              </div>
            </div>
            <div className="flex  flex-col lg:flex-row gap-4 items-start">
              <div className="p-2.5 rounded-full bg-black">
                <AIIcon className="text-white w-6 h-6" />
              </div>
              <div className="p-4 md:p-8 border border-[#262626] rounded-lg text-white w-full text-sm md:text-base leading-relaxed space-y-8">
                <Title level="title18" className="my-2">
                  AI Answer Artificial Intelligence (AI) offers numerous
                  advantages and has the potential to revolutionize various
                  aspects of our lives.
                </Title>
                <Title level="title16">
                  1. Automation: AI can automate repetitive and mundane tasks,
                  saving time and effort for humans. It can handle large volumes
                  of data, perform complex calculations, and execute tasks with
                  precision and consistency. This automation leads to increased
                  productivity and efficiency in various industries.
                </Title>
                <Title level="title16">
                  2. Decision-making: AI systems can analyze vast amounts of
                  data, identify patterns, and make informed decisions based on
                  that analysis. This ability is particularly useful in complex
                  scenarios where humans may struggle to process large datasets
                  or where quick and accurate decisions are crucial.
                </Title>

                <Title level="title16">
                  3. Improved accuracy: AI algorithms can achieve high levels of
                  accuracy and precision in tasks such as image recognition,
                  natural language processing, and data analysis. They can
                  eliminate human errors caused by fatigue, distractions, or
                  bias, leading to more reliable and consistent results.
                </Title>
                <Title level="title16">
                  4. Continuous operation: AI systems can work tirelessly
                  without the need for breaks, resulting in uninterrupted 24/7
                  operations. This capability is especially beneficial in
                  applications like customer support chatbots, manufacturing
                  processes, and surveillance systems.
                </Title>
              </div>
            </div>
          </div>
          {/* input */}
          <div className="flex flex-col md:flex-row items-center gap-4 p-4 md:px-16 mt-6 md:mt-16 ml-5">
            <div className="w-full md:w-[50%]  lg:w-[75%]">
              <input
                type="text"
                placeholder="Ask anything about CV writing…"
                className="pl-6 pr-2 py-2 w-full text-sm md:text-base rounded-lg border border-[#262626] bg-[#0E0E10] text-white"
              />
            </div>
            <div className="relative w-[65%] md:flex-1 text-black bg-white hover:bg-dark hover:text-white transition-all duration-300 py-2 px-2 rounded-lg">
              <button type="button" className="text-left text-sm">
                Send Message
              </button>
              <span className="absolute right-1 top-1/2 transform -translate-y-1/2 cursor-pointer">
                <Send size={18} />
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full lg:flex-1 bg-[#0E0E10] rounded-lg">
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
