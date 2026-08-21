import React, { useState, useRef, useEffect } from "react";
import {
  Plus,
  MessageSquare,
  Trash2,
  Send,
  Sparkles,
  Bot,
  Copy,
  Check,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  PanelLeftClose,
  PanelLeft,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import DummyUser from "@/assets/images/placeholder-user.png";

const promptSuggestions = [
  {
    title: "Optimize for ATS",
    prompt: "How can I optimize my resume bullet points for ATS screening algorithms?",
    category: "Resume",
  },
  {
    title: "Write a Cover Letter",
    prompt: "Write a compelling, professional cover letter for a Senior React Developer role.",
    category: "Cover Letter",
  },
  {
    title: "Action Verbs & Impact",
    prompt: "Give me strong action verbs and metrics to showcase leadership and technical impact.",
    category: "Writing",
  },
  {
    title: "Mock Interview Prep",
    prompt: "What are the top 5 behavioral interview questions for tech companies and how to answer them using STAR method?",
    category: "Interview",
  },
];

const initialChatSessions = [
  {
    id: "1",
    title: "Software Engineer Resume Optimization",
    date: "Today",
    messages: [
      {
        id: "m1",
        sender: "user",
        text: "How can I highlight my full-stack experience on my resume?",
      },
      {
        id: "m2",
        sender: "bot",
        text: "Here is how to effectively structure your **Full-Stack experience**:\n\n1. **Lead with Metrics**: Focus on scale, performance optimizations, and user impact (e.g., *'Built microservices reducing API latency by 35%'*).\n2. **Group Tech Stacks**: Clearly separate Frontend (React, Next.js, Tailwind), Backend (Node.js, Express, Python), and Cloud (AWS, Docker, PostgreSQL).\n3. **Quantify Results**: Mention user adoption, cost savings, or deployment velocity improvements.",
      },
    ],
  },
  {
    id: "2",
    title: "Tailored Cover Letter for Frontend Lead",
    date: "Yesterday",
    messages: [
      {
        id: "m3",
        sender: "user",
        text: "Write a short opening paragraph for a Senior Frontend role.",
      },
      {
        id: "m4",
        sender: "bot",
        text: "Here is an impactful opening hook:\n\n> *'With over 6 years of experience architecting high-performance web applications and mentoring agile engineering teams, I was thrilled to see the Senior Frontend Engineer opening at your company. My expertise in React ecosystem, component architecture, and modern UX aligns seamlessly with your mission.'*",
      },
    ],
  },
  {
    id: "3",
    title: "ATS Keywords for Tech Jobs",
    date: "Previous 7 Days",
    messages: [],
  },
];

const mockAiResponses = {
  ats: "To ensure your resume passes **ATS (Applicant Tracking Systems)** with high match scores:\n\n- **Exact Keyword Matching**: Extract 5-10 specific skills and tools from the target job posting.\n- **Standard Headers**: Use clean headings like *Work Experience*, *Education*, *Technical Skills*, *Projects*.\n- **Single Column Layout**: Avoid multi-column text frames, embedded tables, or non-standard icons that confuse parsers.\n- **Impact Format**: Use the formula: *Accomplished [X] as measured by [Y] by doing [Z]*.",
  cover: "Here is a tailored **Cover Letter framework** designed to capture recruiter attention:\n\n1. **The Hook**: Mention the specific role and why this team's product/mission excites you.\n2. **The Proof (Body)**: Highlight 2 specific achievements with tangible outcomes.\n3. **Culture & Synergy**: Explain why your work ethic and values match their environment.\n4. **Confident Call to Action**: Request a brief conversation to discuss how you can contribute immediately.",
  default: "I'm your **Clever AI Career Assistant**! I can help you:\n\n- Write ATS-friendly resume summaries & bullet points\n- Craft customized cover letters for any job description\n- Coach you through behavioral and technical interview questions\n- Suggest industry-specific keywords and power verbs\n\nHow would you like to level up your job application today?",
};

const ChatBox = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState(initialChatSessions);
  const [activeSessionId, setActiveSessionId] = useState("1");
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const activeSession =
    sessions.find((s) => s.id === activeSessionId) || sessions[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeSession?.messages, isTyping]);

  const handleNewChat = () => {
    const newId = Date.now().toString();
    const newSession = {
      id: newId,
      title: "New Conversation",
      date: "Today",
      messages: [],
    };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newId);
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  const handleDeleteSession = (id, e) => {
    e.stopPropagation();
    const filtered = sessions.filter((s) => s.id !== id);
    if (filtered.length === 0) {
      handleNewChat();
    } else {
      setSessions(filtered);
      if (activeSessionId === id) {
        setActiveSessionId(filtered[0].id);
      }
    }
    toast.success("Chat deleted");
  };

  const handleSend = (textToSend) => {
    const message = textToSend || inputMessage;
    if (!message.trim() || isTyping) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: "user",
      text: message,
    };

    // Update active session messages
    const updatedSessions = sessions.map((s) => {
      if (s.id === activeSessionId) {
        const title =
          s.messages.length === 0
            ? message.slice(0, 30) + (message.length > 30 ? "..." : "")
            : s.title;
        return {
          ...s,
          title,
          messages: [...s.messages, userMsg],
        };
      }
      return s;
    });

    setSessions(updatedSessions);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let botReply = mockAiResponses.default;
      const lower = message.toLowerCase();
      if (lower.includes("ats") || lower.includes("keyword") || lower.includes("screen")) {
        botReply = mockAiResponses.ats;
      } else if (lower.includes("cover") || lower.includes("letter") || lower.includes("apply")) {
        botReply = mockAiResponses.cover;
      }

      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: botReply,
      };

      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeSessionId
            ? { ...s, messages: [...s.messages, botMsg] }
            : s
        )
      );
      setIsTyping(false);
    }, 900);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderFormattedBotMessage = (text) => {
    return text.split("\n").map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={i} className="h-2" />;

      if (trimmed.startsWith(">")) {
        return (
          <blockquote
            key={i}
            className="border-l-2 border-[#81FB84] pl-3 py-1 my-2 text-gray-300 italic bg-[#81FB84]/5 rounded-r-lg"
          >
            {trimmed.replace(/^>\s*/, "")}
          </blockquote>
        );
      }

      if (/^\d+\./.test(trimmed)) {
        return (
          <p key={i} className="ml-4 list-decimal my-1 leading-relaxed">
            {trimmed}
          </p>
        );
      }

      if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
        return (
          <p key={i} className="ml-4 list-disc my-1 leading-relaxed">
            • {trimmed.replace(/^[-*]\s*/, "")}
          </p>
        );
      }

      return (
        <p key={i} className="my-1 leading-relaxed">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="h-[calc(100vh-80px)] w-full flex overflow-hidden bg-[#08090A] text-white select-none">
      {/* =========================================================
          1. CHATGPT-STYLE SIDEBAR
          ========================================================= */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full bg-[#0E0E10] border-r border-[#262626] flex flex-col justify-between flex-shrink-0 z-30 overflow-hidden"
          >
            {/* Sidebar Header & New Chat */}
            <div className="p-3 space-y-3">
              <div className="flex items-center justify-between px-1">
                <button
                  type="button"
                  onClick={handleNewChat}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#1A1A1C] hover:bg-[#222226] border border-[#262626] hover:border-white/20 text-white text-xs font-semibold py-2.5 px-3 rounded-xl transition shadow-sm"
                >
                  <Plus size={16} className="text-[#81FB84]" />
                  <span>New Chat</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 ml-1 transition"
                  title="Close sidebar"
                >
                  <PanelLeftClose size={18} />
                </button>
              </div>

              <div className="text-[11px] font-bold tracking-wider uppercase text-gray-400 px-2 pt-2">
                Recent Chats
              </div>
            </div>

            {/* Chat Sessions List (NO SCROLLBAR) */}
            <div className="flex-1 overflow-y-auto no-scrollbar px-2 space-y-1">
              {sessions.map((session) => {
                const isActive = session.id === activeSessionId;
                return (
                  <div
                    key={session.id}
                    onClick={() => {
                      setActiveSessionId(session.id);
                      if (window.innerWidth < 1024) setSidebarOpen(false);
                    }}
                    className={`group flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-xs font-medium cursor-pointer transition ${
                      isActive
                        ? "bg-[#1A1A1E] text-white border border-[#262626]"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <MessageSquare
                        size={14}
                        className={isActive ? "text-[#81FB84]" : "text-gray-400"}
                      />
                      <span className="truncate">{session.title}</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleDeleteSession(session.id, e)}
                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 transition"
                      title="Delete chat"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Sidebar Footer User Badge */}
            <div className="p-3 border-t border-[#262626] bg-[#0A0A0C]">
              <div className="flex items-center gap-3 p-2 rounded-xl bg-[#141416] border border-[#262626]">
                <img
                  src={user?.profile?.profile_image || DummyUser}
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover border border-[#333]"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-white truncate">
                    {user?.profile?.first_name || user?.first_name || "Job Seeker"}
                  </p>
                  <p className="text-[10px] text-[#81FB84] font-medium flex items-center gap-1">
                    <Sparkles size={10} /> Clever AI Pro
                  </p>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* =========================================================
          2. MAIN CHAT AREA (CHATGPT STYLE)
          ========================================================= */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-[#08090A]">
        {/* Top Floating Navbar */}
        <header className="h-14 border-b border-[#262626]/80 flex items-center justify-between px-4 bg-[#08090A]/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            {!sidebarOpen && (
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition"
                title="Open sidebar"
              >
                <PanelLeft size={18} />
              </button>
            )}

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white">Clever AI Career Coach</span>
              <span className="w-2 h-2 rounded-full bg-[#81FB84] shadow-[0_0_6px_#81FB84]"></span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleNewChat}
              className="inline-flex sm:hidden p-2 text-gray-300 hover:text-white bg-[#141416] border border-[#262626] rounded-lg"
            >
              <Plus size={16} />
            </button>
          </div>
        </header>

        {/* Message Thread (NO SCROLLBAR) */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 md:p-8 space-y-6 max-w-4xl w-full mx-auto">
          {activeSession.messages.length === 0 ? (
            /* Empty State: ChatGPT Greeting & Suggestions */
            <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-10">
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1b2b21] via-[#0e1812] to-[#08090a] border border-[#81FB84]/40 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(129,251,132,0.25)]">
                  <Bot size={28} className="text-[#81FB84]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  What can I help you build today?
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm max-w-md mx-auto">
                  Ask anything about resume tailoring, ATS keyword optimization, cover letter generation, or mock interviews.
                </p>
              </div>

              {/* Quick Prompt Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                {promptSuggestions.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(item.prompt)}
                    className="p-4 rounded-2xl bg-[#0E0E10] border border-[#262626] hover:border-[#81FB84]/40 text-left transition duration-200 group flex items-start justify-between gap-3 shadow-md"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#81FB84]">
                        {item.category}
                      </span>
                      <p className="text-xs text-gray-300 group-hover:text-white line-clamp-2">
                        {item.prompt}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-gray-400 group-hover:text-[#81FB84] flex-shrink-0 transition"
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Conversation Bubble Stream */
            <div className="space-y-6 pb-6">
              {activeSession.messages.map((msg) => {
                const isUser = msg.sender === "user";
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-start gap-3.5 ${
                      isUser ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {/* Avatar */}
                    {isUser ? (
                      <img
                        src={user?.profile?.profile_image || DummyUser}
                        alt="User"
                        className="w-8 h-8 rounded-full object-cover border border-[#333] flex-shrink-0"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-xl bg-[#16221c] border border-[#81FB84]/40 flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(129,251,132,0.2)]">
                        <Bot size={18} className="text-[#81FB84]" />
                      </div>
                    )}

                    {/* Content Box */}
                    <div className={`space-y-2 max-w-[85%] sm:max-w-[75%]`}>
                      <div
                        className={`p-4 rounded-2xl text-sm leading-relaxed ${
                          isUser
                            ? "bg-[#1A1A1E] text-white border border-[#262626] rounded-tr-none font-medium"
                            : "bg-[#0E0E10] text-gray-200 border border-[#262626] rounded-tl-none whitespace-pre-wrap shadow-md"
                        }`}
                      >
                        {isUser ? msg.text : renderFormattedBotMessage(msg.text)}
                      </div>

                      {/* Bot Message Action Toolbar */}
                      {!isUser && (
                        <div className="flex items-center gap-2 text-xs text-gray-400 pl-1">
                          <button
                            type="button"
                            onClick={() => handleCopy(msg.text, msg.id)}
                            className="hover:text-white flex items-center gap-1 p-1 rounded hover:bg-white/5 transition"
                            title="Copy response"
                          >
                            {copiedId === msg.id ? (
                              <Check size={13} className="text-[#81FB84]" />
                            ) : (
                              <Copy size={13} />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => toast.info("Feedback noted!")}
                            className="hover:text-white p-1 rounded hover:bg-white/5 transition"
                            title="Good response"
                          >
                            <ThumbsUp size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => toast.info("Feedback noted!")}
                            className="hover:text-white p-1 rounded hover:bg-white/5 transition"
                            title="Bad response"
                          >
                            <ThumbsDown size={13} />
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-[#16221c] border border-[#81FB84]/40 flex items-center justify-center flex-shrink-0">
                    <Bot size={18} className="text-[#81FB84]" />
                  </div>
                  <div className="p-4 rounded-2xl rounded-tl-none bg-[#0E0E10] border border-[#262626] text-xs text-gray-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#81FB84] animate-ping"></span>
                    Clever AI is thinking...
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Bottom ChatGPT Prompt Input Box */}
        <div className="p-4 bg-gradient-to-t from-[#08090A] via-[#08090A] to-transparent">
          <div className="max-w-4xl mx-auto space-y-2">
            <div className="relative bg-[#0E0E10] border border-[#262626] focus-within:border-white/40 rounded-2xl p-2 sm:p-2.5 shadow-2xl transition flex items-end gap-2">
              <textarea
                ref={textareaRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Ask Clever AI anything about your CV or interview..."
                className="w-full bg-transparent border-none text-white text-sm focus:outline-none resize-none px-3 py-2 max-h-32 no-scrollbar placeholder-gray-500"
              />

              <button
                type="button"
                onClick={() => handleSend()}
                disabled={!inputMessage.trim() || isTyping}
                className="p-2.5 rounded-xl bg-[#81FB84] hover:bg-[#a6fca9] text-black font-semibold transition disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0 shadow-md"
              >
                <Send size={16} />
              </button>
            </div>

            <p className="text-[11px] text-gray-400 text-center flex items-center justify-center gap-1.5">
              <ShieldCheck size={12} className="text-[#81FB84]" /> Clever AI may make mistakes. Verify important application details.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatBox;
