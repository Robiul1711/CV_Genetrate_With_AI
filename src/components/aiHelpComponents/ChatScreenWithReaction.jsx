import { useState, useRef, useEffect } from "react";
import { LuHeart, LuSend, LuThumbsUp } from "react-icons/lu";
import { FaRegSmile } from "react-icons/fa";
import bot from "@/assets/images/bot.png";
import DummyUser from "@/assets/images/placeholder-user.png";
import { useAuth } from "@/hooks/useAuth";

const defaultInitialMessages = [
  {
    id: 1,
    sender: "bot",
    text: "Hello! I am your Clever CV AI Assistant. How can I help you improve your resume or prepare for job applications today?",
    reaction: null,
  },
];

const mockBotResponses = {
  ats: "To optimize your resume for ATS systems:\n- Use standard section titles (Experience, Education, Skills)\n- Include keywords directly from the job description\n- Avoid complex columns or images in body text\n- Save and export as standard PDF",
  skills: "Top skills for modern roles include:\n- **Technical**: React, Node.js, TypeScript, REST APIs, Git\n- **Soft Skills**: Problem-solving, Cross-functional collaboration, Agile communication",
  default: "Thank you for asking! With Clever CV, you can build, optimize, and tailor resumes and cover letters in minutes with smart real-time feedback.",
};

const ChatScreenWithReaction = ({
  suggestedQuestions,
  clickedQuestion,
  onQuestionProcessed,
}) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState(defaultInitialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [reactingTo, setReactingTo] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // If a suggested question was clicked, handle it
  useEffect(() => {
    if (clickedQuestion) {
      handleSend(clickedQuestion);
      onQuestionProcessed?.();
    }
  }, [clickedQuestion]);

  const handleSend = (textToSend) => {
    const text = textToSend || newMessage;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text,
      reaction: null,
    };

    setMessages((prev) => [...prev, userMsg]);
    setNewMessage("");
    setLoading(true);

    // Simulate AI bot response
    setTimeout(() => {
      let botReply = mockBotResponses.default;
      const lower = text.toLowerCase();
      if (lower.includes("ats")) botReply = mockBotResponses.ats;
      else if (lower.includes("skill") || lower.includes("keyword")) botReply = mockBotResponses.skills;

      const botMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: botReply,
        reaction: null,
      };

      setMessages((prev) => [...prev, botMsg]);
      setLoading(false);
    }, 800);
  };

  const handleReaction = (msgId, reaction) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === msgId ? { ...msg, reaction: msg.reaction === reaction ? null : reaction } : msg
      )
    );
    setReactingTo(null);
  };

  return (
    <div className="flex flex-col h-[520px] bg-[#0E0E10] border border-[#262626] rounded-2xl overflow-hidden shadow-2xl">
      {/* Messages Window */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              <img
                src={isUser ? DummyUser : bot}
                alt={isUser ? "User" : "Bot"}
                className="w-8 h-8 rounded-full border border-white/20 object-cover flex-shrink-0"
              />

              <div className="relative group max-w-[80%]">
                <div
                  className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                    isUser
                      ? "bg-white text-black rounded-tr-none font-medium"
                      : "bg-[#1A1A1A] text-white border border-[#333] rounded-tl-none whitespace-pre-line"
                  }`}
                >
                  {msg.text}
                </div>

                {/* Reaction badge */}
                {msg.reaction && (
                  <div className="absolute -bottom-2 right-2 bg-black border border-white/20 px-1.5 py-0.5 rounded-full text-xs">
                    {msg.reaction === "thumbsUp" && "👍"}
                    {msg.reaction === "heart" && "❤️"}
                    {msg.reaction === "smile" && "😊"}
                  </div>
                )}

                {/* Reaction toolbar */}
                {!isUser && (
                  <div className="absolute top-1 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-black/80 px-2 py-1 rounded-full border border-white/10">
                    <button
                      type="button"
                      onClick={() => handleReaction(msg.id, "thumbsUp")}
                      className="text-gray-400 hover:text-white"
                    >
                      <LuThumbsUp size={12} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReaction(msg.id, "heart")}
                      className="text-gray-400 hover:text-red-400"
                    >
                      <LuHeart size={12} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReaction(msg.id, "smile")}
                      className="text-gray-400 hover:text-yellow-400"
                    >
                      <FaRegSmile size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-3">
            <img
              src={bot}
              alt="Bot"
              className="w-8 h-8 rounded-full border border-white/20 object-cover"
            />
            <div className="p-3 bg-[#1A1A1A] border border-[#333] rounded-2xl rounded-tl-none text-xs text-gray-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#81FB84] animate-ping"></span>
              AI Assistant is typing...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Field */}
      <div className="p-3 md:p-4 bg-black/60 border-t border-[#262626]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your question here..."
            className="flex-1 bg-[#1A1A1A] border border-[#333] focus:border-white focus:outline-none px-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-500"
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || loading}
            className="bg-white text-black p-2.5 rounded-xl hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LuSend size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatScreenWithReaction;
