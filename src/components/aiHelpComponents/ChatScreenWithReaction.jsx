import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuHeart, LuSend, LuThumbsUp } from "react-icons/lu";
import { FaRegSmile } from "react-icons/fa";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useEmail } from "@/hooks/useEmail";
import { useMutation } from "@tanstack/react-query";
import bot from "@/assets/images/bot.png";
import userdummy from "@/assets/images/userdummy.png";
import { useAuth } from "@/hooks/useAuth";
import DummyUser from "@/assets/images/userdummy.png"

// ✅ Improved parser function to format bot response with better bold text handling
const parseMessage = (text) => {
  if (!text) return null;
  const lines = text.split("\n");
  const {user} =useAuth()

  console.log(user?.profile?.profile_image)

  return lines.map((line, i) => {
    const trimmed = line.trim();
    
    // Function to process bold text in any content
    const processBoldText = (content) => {
      const boldPattern = /\*\*(.*?)\*\*/g;
      const parts = content.split(boldPattern);
      
      return parts.map((part, idx) =>
        idx % 2 === 1 ? <strong key={idx} className="text-white">{part}</strong> : part
      );
    };

    // Bullet points
    if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
      const content = trimmed.replace(/^[-*]\s*/, "");
      return (
        <li key={i} className="ml-6 list-disc leading-relaxed">
          {processBoldText(content)}
        </li>
      );
    }

    // Numbered lists (e.g., 1., 2.)
    if (/^\d+\./.test(trimmed)) {
      const content = trimmed.replace(/^\d+\.\s*/, "");
      return (
        <li key={i} className="ml-6 list-decimal leading-relaxed">
          {processBoldText(content)}
        </li>
      );
    }

    // Normal line with potential bold text
    return (
      <p key={i} className="mb-1 leading-relaxed">
        {processBoldText(trimmed)}
      </p>
    );
  });
};

const ChatScreenWithReaction = ({
  suggestedQuestions,
  clickedQuestion,
  showChatWithData,
  history,
  onQuestionProcessed,
}) => {
  const axiosSecure = useAxiosSecure();
  const { language } = useEmail();
  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;
  const {user}=useAuth()
  console.log(user?.profile?.profile_image);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [reactingTo, setReactingTo] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Mutation for sending message to bot
  const ChatMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post("/chats/", data);
      return res.data;
    },
    onSuccess: (res) => {
      const botText =
        typeof res?.data === "string" ? res.data : res?.data?.answer || "";
      if (!botText) return;

      const newId = Date.now();

      setMessages((prev) => [
        ...prev,
        {
          id: newId,
          text: botText,
          sender: "other",
          senderProfile: { name: "Bot", avatar: bot },
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          reaction: null,
        },
      ]);

      setLoading(false);
    },
  });

  // Initialize chat history
  useEffect(() => {
    if (history?.length) {
      const formattedHistory = [...history]
        .reverse()
        .flatMap((item) => {
          const msgs = [];
          if (item.question) {
            msgs.push({
              id: Date.now() + Math.random(),
              text: String(item.question),
              sender: "me",
              senderProfile: {
                name: "You",
                avatar: VITE_IMG_URL + user?.profile?.profile_image || userdummy,
              },
              timestamp: new Date(
                item.created_at || Date.now()
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              reaction: null,
            });
          }
          if (item.answer) {
            msgs.push({
              id: Date.now() + Math.random(),
              text: String(item.answer),
              sender: "other",
              senderProfile: { name: "Bot", avatar: bot },
              timestamp: new Date(
                item.created_at || Date.now()
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              reaction: null,
            });
          }
          return msgs;
        });

      setMessages(formattedHistory);
    } else {
      setMessages([
        {
          id: 1,
          text: "Hey there! How's it going?",
          sender: "other",
          senderProfile: { name: "Bot", avatar: bot },
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          reaction: null,
        },
      ]);
    }
  }, [history]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Send message
  const handleSendMessage = (messageText = newMessage) => {
    const text =
      typeof messageText === "string"
        ? messageText
        : String(messageText);
    if (!text.trim()) return;

    const newId = Date.now();
    setMessages((prev) => [
      ...prev,
      {
        id: newId,
        text,
        sender: "me",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        reaction: null,
      },
    ]);

    setLoading(true);
    ChatMutation.mutate({ question: text, language });
    setNewMessage("");
    inputRef.current?.focus();
  };

  // Handle reaction
  const handleReaction = (messageId, reaction) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId
          ? { ...m, reaction: m.reaction === reaction ? null : reaction }
          : m
      )
    );
    setReactingTo(null);
  };

  const toggleReactionMenu = (id) => {
    setReactingTo((prev) => (prev === id ? null : id));
  };

  // Handle clicked suggested question
  useEffect(() => {
    if (clickedQuestion && showChatWithData) {
      handleSendMessage(clickedQuestion);
      onQuestionProcessed && onQuestionProcessed();
    }
  }, [clickedQuestion, showChatWithData]);

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto bg-[#0E0E10] rounded-md custom-scrollbar overflow-hidden shadow-md h-[90vh] relative">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex items-end gap-2 ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "other" && (
                <img
                  src={msg.senderProfile.avatar}
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
              )}
              <div>
                <div
                  className={`px-4 py-2 text-sm rounded-2xl leading-relaxed max-w-xl ${
                    msg.sender === "me"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-[#1C1C1F] text-gray-200 rounded-bl-none"
                  }`}
                >
                  {msg.sender === "other" ? (
                    <div className="space-y-1">{parseMessage(msg.text)}</div>
                  ) : (
                    msg.text
                  )}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-1">
                  {msg.timestamp}
                </div>
              </div>
              {msg.sender === "me" && (
                <img
                   src={user?.profile?.profile_image ? `${import.meta.env.VITE_IMG_URL}${user?.profile?.profile_image}` :DummyUser}
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
              )}

              {msg.reaction && (
                <span
                  className="text-xs ml-2 cursor-pointer"
                  onClick={() => toggleReactionMenu(msg.id)}
                >
                  {msg.reaction === "love" && (
                    <LuHeart size={16} color="red" />
                  )}
                  {msg.reaction === "like" && (
                    <LuThumbsUp size={16} color="blue" />
                  )}
                  {msg.reaction === "smile" && (
                    <FaRegSmile size={16} color="gold" />
                  )}
                </span>
              )}
            </motion.div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <img src={bot} alt="Bot" className="w-8 h-8 rounded-full" />
              <div className="bg-[#1C1C1F] text-gray-300 rounded-xl px-3 py-2 flex items-center gap-1">
                <span
                  className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0s" }}
                ></span>
                <span
                  className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></span>
                <span
                  className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-800 bg-[#111]">
        <div className="flex gap-2 items-center">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 px-4 py-2 rounded-full border border-gray-700 bg-[#1C1C1F] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
          >
            <LuSend size={18} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreenWithReaction;