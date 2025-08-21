import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuHeart, LuSend, LuThumbsUp } from "react-icons/lu";
import { FaRegSmile } from "react-icons/fa";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useEmail } from "@/hooks/useEmail";
import { useMutation } from "@tanstack/react-query";
import bot from "@/assets/images/bot.png";

const ChatScreenWithReaction = ({ suggestedQuestions, clickedQuestion, showChatWithData, history,  onQuestionProcessed  }) => {
  const axiosSecure = useAxiosSecure();
  const { language } = useEmail();

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
      const botResponse = res?.data;
      const newId = Date.now();

      setMessages((prev) => [
        ...prev,
        {
          id: newId,
          text: botResponse,
          sender: "other",
          senderProfile: {
            name: "Bot",
            avatar: bot,
          },
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          reaction: null,
        },
      ]);

      setLoading(false);
    },
  });

  // Initialize chat history (old messages top, latest bottom)
  useEffect(() => {
    if (history?.length) {
      // Reverse the history array to show oldest first, newest last
      const reversedHistory = [...history].reverse();
      const formattedHistory = [];

      reversedHistory.forEach((item) => {
        // User question (right)
        if (item.question) {
          formattedHistory.push({
            id: Date.now() + Math.random(),
            text: item.question,
            sender: "me",
            senderProfile: { name: "You", avatar: "https://i.pravatar.cc/40?img=1" },
            timestamp: new Date(item.created_at || Date.now()).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            reaction: null,
          });
        }

        // Bot answer (left)
        if (item.answer) {
          formattedHistory.push({
            id: Date.now() + Math.random(),
            text: item.answer,
            sender: "other",
            senderProfile: { name: "Bot", avatar: bot },
            timestamp: new Date(item.created_at || Date.now()).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            reaction: null,
          });
        }
      });

      setMessages(formattedHistory);
    } else {
      setMessages([
        {
          id: 1,
          text: "Hey there! How's it going?",
          sender: "other",
          senderProfile: { name: "Bot", avatar: bot },
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          reaction: null,
        },
      ]);
    }
  }, [history]);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Send message handler
  const handleSendMessage = (messageText = newMessage) => {
    if (!messageText.trim()) return;

    const newId = Date.now();
    setMessages((prev) => [
      ...prev,
      {
        id: newId,
        text: messageText,
        sender: "me",
        senderProfile: { name: "You", avatar: "https://i.pravatar.cc/40?img=1" },
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        reaction: null,
      },
    ]);

    setLoading(true);
    ChatMutation.mutate({ question: messageText, language });
    setNewMessage("");
    inputRef.current?.focus();
  };

  // Handle reaction
  const handleReaction = (messageId, reaction) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, reaction: m.reaction === reaction ? null : reaction } : m))
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
              className={`flex items-end gap-2 ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              {msg.sender === "other" && <img src={msg.senderProfile.avatar} alt="" className="w-8 h-8 rounded-full" />}
              <div>
                <div
                  className={`px-4 py-2 text-sm rounded-xl ${
                    msg.sender === "me"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-200 dark:bg-slate-700 text-black rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{msg.timestamp}</div>
              </div>
              {msg.sender === "me" && <img src={msg.senderProfile.avatar} alt="" className="w-8 h-8 rounded-full" />}

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

          {/* Typing indicator */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <img src={bot} alt="Bot" className="w-8 h-8 rounded-full" />
              <div className="bg-gray-200 dark:bg-slate-700 rounded-xl px-3 py-2 flex items-center gap-1">
                <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></span>
                <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Reaction menu */}
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

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
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