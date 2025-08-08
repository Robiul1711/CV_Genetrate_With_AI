import { MoveUpRight } from "lucide-react";
import React, { useState } from "react";
import { AIIcon } from "../CustomIcons/CustomIcon";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useEmail } from "@/hooks/useEmail";
import ChatScreenWithReaction from "./ChatScreenWithReaction";
import { useAuth } from "@/hooks/useAuth";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss"

const ChatBox = () => {
  const { user } = useAuth();
  const [showChatWithData, setShowChatWithData] = useState(false);
  const [clickedQuestion, setClickedQuestion] = useState(null); // NEW STATE
  const axiosSecure = useAxiosSecure();
  const { language } = useEmail();

  const { data: suggestedQuestionsData } = useQuery({
    queryKey: ["suggested-questions", language],
    queryFn: () =>
      axiosSecure.get("/suggested-questions", {
        params: { lan: language },
      }),
  });

  const { data: History } = useQuery({
    queryKey: ["chat-histories", language],
    queryFn: () =>
      axiosSecure.get("/chat-histories", {
        params: { lan: language },
      }),
    enabled: !!language,
    keepPreviousData: true,
  });

  const handleQuestionClick = (question) => {
    setClickedQuestion(question); // Store the clicked question
    setShowChatWithData(true); // Show chatbox
  };

  const HandleModal = () => {
    Swal.fire({
      title: "Login Required",
      text: "You need to log in to chat with the bot.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Login Now",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const currentUrl = window.location.pathname;
        window.location.href = `/sign-in?redirect=${encodeURIComponent(
          currentUrl
        )}`;
      }
    });
  };

  return (
    <>
      {user ? (
        <div className="flex flex-col md:flex-row w-full">
          {/* Sidebar */}
          <div className="flex-col w-full hidden md:block md:w-[25%] bg-[#0E0E10] p-5 rounded-lg">
            {History?.data?.data?.length > 0 && (
              <h2 className="text-white text-lg font-semibold pb-2">
                Chat History
              </h2>
            )}
            <div className="max-h-64 overflow-y-auto custom-scrollbar">
              <div className=" mt-4">
                {History?.data?.data?.map((q, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleQuestionClick(q.question)}
                    className=" space-y-4 px-2 py-3 rounded-lg hover:bg-[#262626] text-white hover:underline cursor-pointer"
                  >
                    <p className="text-sm md:text-base">{q.question}</p>
                   
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-14">
              <h2 className="text-white text-lg font-semibold">
                Suggested Questions
              </h2>
              <div className="max-h-72 overflow-y-auto custom-scrollbar">
                <div className=" mt-4 ">
                  {suggestedQuestionsData?.data?.data?.map((q, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleQuestionClick(q.question)}
                      className=" hover:bg-[#262626] space-y-4 px-2 py-3 rounded-lg text-white hover:underline cursor-pointer"
                    >
                      <p className="text-sm md:text-base flex justify-between items-center">{q.question}  <MoveUpRight size={18} /></p>
                     
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chat Component */}
          <div className="w-full md:w-[75%]">
            <ChatScreenWithReaction
              suggestedQuestions={suggestedQuestionsData?.data?.data}
              clickedQuestion={clickedQuestion} // ✅ pass clicked question
              showChatWithData={showChatWithData}
            />
          </div>
        </div>
      ) : (
        <div className="w-full md:flex-1 bg-[#0E0E10] rounded-lg">
          <div className="flex justify-center items-center h-[50vh] md:h-[90vh] text-center px-4">
            <div>
              <div className="flex justify-center my-5">
                <AIIcon />
              </div>
              <h2 className="text-white text-xl font-semibold">
                Hi! I’m your CV guide. Ask me anything!
              </h2>

              <div className="flex justify-center my-5">
                <button
                  type="button"
                  onClick={HandleModal}
                  className="text-left text-sm md:text-base border hover:border-gray-400 hover:text-black border-gray-300 px-5 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md hover:scale-105"
                >
                  Open Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;
