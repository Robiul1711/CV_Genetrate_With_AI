import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuHeart, LuSend, LuThumbsUp } from "react-icons/lu";
import { FaRegSmile } from "react-icons/fa";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useEmail } from "@/hooks/useEmail";
import { useMutation } from "@tanstack/react-query";

const ChatScreenWithReaction = () => {
  const axiosSecure = useAxiosSecure();
  const { language } = useEmail();

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey there! How's it going?",
      sender: "other",
      senderProfile: {
        name: "Bot",
        avatar: "https://i.pravatar.cc/40?img=5"
      },
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      reaction: null
    }
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [reactingTo, setReactingTo] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

const ChatMutation = useMutation({
  mutationFn: async (data) => {
    const res = await axiosSecure.post("/chats/", data);
    return res.data; // This returns only `res.data`, not `res`
  },
  onSuccess: (res) => {
      console.log("Bot response:", res); // Add this to check structure
    const botResponse = res?.answer || "Got it!"; // fixed: was res.data.answer
    const newId = Date.now();
    setMessages((prev) => [
      ...prev,
      {
        id: newId,
        text: botResponse,
        sender: "other",
        senderProfile: {
          name: "Bot",
          avatar: "https://i.pravatar.cc/40?img=5"
        },
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        reaction: null
      }
    ]);
  }
});

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const newId = Date.now();

    setMessages((prev) => [
      ...prev,
      {
        id: newId,
        text: newMessage,
        sender: "me",
        senderProfile: {
          name: "You",
          avatar: "https://i.pravatar.cc/40?img=1"
        },
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        reaction: null
      }
    ]);

    ChatMutation.mutate({ question: newMessage, language });
    setNewMessage("");
    inputRef.current?.focus();
  };

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto bg-[#0E0E10] rounded-md   overflow-hidden shadow-md h-[90vh]">
      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex items-end gap-2 ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              {msg.sender === "other" && (
                <img src={msg.senderProfile.avatar} alt="" className="w-8 h-8 rounded-full" />
              )}
              <div>
                <div
                  className={`px-4 py-2 text-sm rounded-xl ${
                    msg.sender === "me"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-200 dark:bg-slate-700 text-black dark:text-white rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {msg.timestamp}
                </div>
              </div>
              {msg.sender === "me" && (
                <img src={msg.senderProfile.avatar} alt="" className="w-8 h-8 rounded-full" />
              )}

              {/* Reactions */}
              {msg.reaction && (
                <span className="text-xs ml-2 cursor-pointer" onClick={() => toggleReactionMenu(msg.id)}>
                  {msg.reaction === "love" && <LuHeart size={16} color="red" />}
                  {msg.reaction === "like" && <LuThumbsUp size={16} color="blue" />}
                  {msg.reaction === "smile" && <FaRegSmile size={16} color="gold" />}
                </span>
              )}
              {!msg.reaction && msg.sender === "other" && (
                <button
                  onClick={() => toggleReactionMenu(msg.id)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
                >
                  <FaRegSmile size={16} />
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Reaction Popover */}
      <AnimatePresence>
        {reactingTo && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 p-2 rounded-full shadow-md flex gap-2"
          >
            <button onClick={() => handleReaction(reactingTo, "love")}>
              <LuHeart color="red" />
            </button>
            <button onClick={() => handleReaction(reactingTo, "like")}>
              <LuThumbsUp color="blue" />
            </button>
            <button onClick={() => handleReaction(reactingTo, "smile")}>
              <FaRegSmile color="gold" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Field */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0e0e10]">
        <div className="flex gap-2 items-center">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900 text-black dark:text-white focus:outline-none"
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
