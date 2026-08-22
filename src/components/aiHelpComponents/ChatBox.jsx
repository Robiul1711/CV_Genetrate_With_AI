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
  Zap,
  FileText,
  Briefcase,
  Target,
  Download,
  MoreVertical,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import DummyUser from "@/assets/images/placeholder-user.png";

const promptSuggestions = [
  {
    icon: Target,
    title: "Optimize for ATS Algorithms",
    prompt:
      "How can I optimize my resume bullet points to achieve a 90%+ match score on ATS screening?",
    category: "ATS Optimization",
  },
  {
    icon: FileText,
    title: "Tailored Cover Letter",
    prompt:
      "Write a high-converting, professional cover letter opening hook for a Senior Full-Stack role.",
    category: "Cover Letter",
  },
  {
    icon: Zap,
    title: "Action Verbs & Quantified Metrics",
    prompt:
      "Give me strong power verbs and numeric metric formulas to showcase technical leadership.",
    category: "Bullet Points",
  },
  {
    icon: Briefcase,
    title: "STAR Interview Preparation",
    prompt:
      "Give me the top behavioral questions for tech companies and guide me on answering using the STAR method.",
    category: "Interview Prep",
  },
];

const quickActionChips = [
  {
    label: "⚡ ATS Score Check",
    prompt:
      "Evaluate my current resume experience against top ATS screening criteria and suggest improvements.",
  },
  {
    label: "📄 Bullet Point Polisher",
    prompt:
      "Turn this job responsibility into an impact-driven accomplishment: 'Developed web application features and fixed bugs'.",
  },
  {
    label: "💼 Cover Letter Hook",
    prompt:
      "Write an engaging 3-sentence opening hook for my job application letter.",
  },
  {
    label: "🎯 Tech Keyword Match",
    prompt:
      "What are the top 10 keywords recruiters look for in full-stack and modern web developer resumes?",
  },
];

const aiModels = [
  { id: "gpt4-career", name: "Clever Career Engine v4.5", badge: "Smartest" },
  { id: "ats-speed", name: "Fast ATS Analyzer", badge: "Ultra-Fast" },
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
        time: "Just now",
      },
      {
        id: "m2",
        sender: "bot",
        text: "Here is how to structure your **Full-Stack Experience** for maximum recruiter impact:\n\n1. **Lead with Metrics**: Focus on scale, performance optimizations, and quantifiable impact:\n   > *'Architected microservices reducing backend API latency by 35% across 200k+ daily active users.'*\n\n2. **Group Tech Stacks Clearly**: Categorize your stack into:\n   - **Frontend**: React, Next.js, TypeScript, Tailwind CSS, Redux\n   - **Backend & Cloud**: Node.js, Express, Python, PostgreSQL, AWS (S3, Lambda), Docker\n\n3. **Demonstrate End-to-End Ownership**: Highlight architecture decisions, CI/CD pipeline setups, and cross-functional team collaboration.",
        time: "Just now",
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
        time: "Yesterday",
      },
      {
        id: "m4",
        sender: "bot",
        text: "Here is a compelling, high-converting opening hook:\n\n> *'With over 6 years of experience architecting high-performance web applications and mentoring agile engineering teams, I was thrilled to see the Senior Frontend Engineer opening at your company. My deep expertise in the React ecosystem, component architecture, and modern UX aligns seamlessly with your mission.'*",
        time: "Yesterday",
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
  ats: "To ensure your resume passes **ATS (Applicant Tracking Systems)** with high match scores:\n\n1. **Exact Keyword Matching**: Extract 5-10 specific skills, frameworks, and tools directly from the target job posting.\n2. **Standard Section Headers**: Use standard headings (*Work Experience*, *Technical Skills*, *Education*, *Certifications*).\n3. **Single Column Clean Layout**: Avoid complex multi-column floating boxes or graphics that can confuse automated parsers.\n4. **The Impact Formula**: Structure every bullet point as: *[Action Verb] + [Specific Task] + [Quantifiable Business Outcome]*.",
  cover:
    "Here is a tailored **Cover Letter framework** designed to capture recruiter attention in the first 10 seconds:\n\n1. **The Hook**: Mention the specific role and why this team's mission resonates with your career trajectory.\n2. **The Proof (Body)**: Highlight 2 specific achievements with tangible outcomes and metrics.\n3. **Culture & Synergy**: Explain why your work ethic and values match their environment.\n4. **Confident Call to Action**: Request a brief conversation to discuss how you can contribute immediately.",
  default:
    "I'm your **Clever AI Career Coach**! Here is how I can assist you:\n\n- **Resume Enhancement**: Convert duties into quantifiable, ATS-friendly achievements.\n- **Cover Letter Creation**: Generate tailored, persuasive application letters.\n- **Interview Preparation**: Practice STAR-method behavioral and technical questions.\n- **Keyword Auditing**: Benchmark your CV against specific job descriptions.\n\nWhat would you like to work on right now?",
};

const ChatBox = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState(initialChatSessions);
  const [activeSessionId, setActiveSessionId] = useState("1");
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(aiModels[0].id);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Default sidebar state: open on desktop (>=1024px), closed on mobile
  useEffect(() => {
    const handleInitialSidebar = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    handleInitialSidebar();
  }, []);

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
    toast.success("Conversation removed");
  };

  const handleSend = (textToSend) => {
    const message = textToSend || inputMessage;
    if (!message.trim() || isTyping) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: "user",
      text: message,
      time: "Just now",
    };

    // Update active session messages
    const updatedSessions = sessions.map((s) => {
      if (s.id === activeSessionId) {
        const title =
          s.messages.length === 0
            ? message.slice(0, 32) + (message.length > 32 ? "..." : "")
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

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    // Simulate realistic AI response
    setTimeout(() => {
      let botReply = mockAiResponses.default;
      const lower = message.toLowerCase();
      if (
        lower.includes("ats") ||
        lower.includes("keyword") ||
        lower.includes("screen") ||
        lower.includes("score")
      ) {
        botReply = mockAiResponses.ats;
      } else if (
        lower.includes("cover") ||
        lower.includes("letter") ||
        lower.includes("apply") ||
        lower.includes("hook")
      ) {
        botReply = mockAiResponses.cover;
      }

      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: botReply,
        time: "Just now",
      };

      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeSessionId
            ? { ...s, messages: [...s.messages, botMsg] }
            : s,
        ),
      );
      setIsTyping(false);
    }, 850);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputResize = (e) => {
    setInputMessage(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 130)}px`;
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportChat = () => {
    if (!activeSession || activeSession.messages.length === 0) {
      toast.error("No messages to export");
      return;
    }
    const content = activeSession.messages
      .map((m) => `[${m.sender.toUpperCase()}]:\n${m.text}\n`)
      .join("\n-------------------\n\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeSession.title.replace(/\s+/g, "_")}.txt`;
    a.click();
    toast.success("Chat exported successfully");
  };

  const renderFormattedBotMessage = (text) => {
    return text.split("\n").map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={i} className="h-2" />;

      if (trimmed.startsWith(">")) {
        return (
          <blockquote
            key={i}
            className="border-l-2 border-[#81FB84] pl-3.5 py-1.5 my-2 text-gray-200 italic bg-[#81FB84]/5 rounded-r-lg"
          >
            {trimmed.replace(/^>\s*/, "")}
          </blockquote>
        );
      }

      if (/^\d+\./.test(trimmed)) {
        return (
          <p
            key={i}
            className="ml-3 font-medium text-white my-1 leading-relaxed"
          >
            {trimmed}
          </p>
        );
      }

      if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
        return (
          <p
            key={i}
            className="ml-4 text-gray-300 my-1 leading-relaxed flex items-start gap-2"
          >
            <span className="text-[#81FB84] mt-1.5 text-xs">•</span>
            <span>{trimmed.replace(/^[-*]\s*/, "")}</span>
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
    <div className="h-[calc(100vh-80px)] w-full flex relative overflow-hidden bg-[#08090A] text-white">
      {/* =========================================================
          1. MOBILE BACKDROP (FOR SCREENS < 1024px)
          ========================================================= */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* =========================================================
          2. CHATGPT-STYLE RESPONSIVE SIDEBAR
          ========================================================= */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed lg:relative inset-y-0 left-0 z-50 lg:z-10 w-72 sm:w-80 h-full bg-[#0D0E10] border-r border-[#262626] flex flex-col justify-between flex-shrink-0 overflow-hidden shadow-2xl lg:shadow-none"
          >
            {/* Sidebar Top: New Chat & Close */}
            <div className="p-3.5 space-y-3 border-b border-white/5">
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={handleNewChat}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#172b1d] to-[#122217] hover:from-[#1e3825] hover:to-[#172b1d] border border-[#81FB84]/30 hover:border-[#81FB84] text-white text-xs font-semibold py-2.5 px-3 rounded-xl transition duration-200 shadow-md hover:scale-[1.02]"
                >
                  <Plus size={15} className="text-[#81FB84]" />
                  <span>New Conversation</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/5 transition"
                  title="Close sidebar"
                >
                  <PanelLeftClose size={18} />
                </button>
              </div>

              <div className="flex items-center justify-between px-1 pt-1">
                <span className="text-[11px] font-bold tracking-wider uppercase text-gray-400">
                  Recent Chats
                </span>
                <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded-full">
                  {sessions.length}
                </span>
              </div>
            </div>

            {/* Chat Sessions List (Clean & Scrollable) */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-2 space-y-1">
              {sessions.map((session) => {
                const isActive = session.id === activeSessionId;
                return (
                  <div
                    key={session.id}
                    onClick={() => {
                      setActiveSessionId(session.id);
                      if (window.innerWidth < 1024) setSidebarOpen(false);
                    }}
                    className={`group flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium cursor-pointer transition duration-200 ${
                      isActive
                        ? "bg-[#1A1A1E] text-white border border-[#81FB84]/30 shadow-sm"
                        : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <MessageSquare
                        size={14}
                        className={`shrink-0 ${
                          isActive ? "text-[#81FB84]" : "text-gray-400"
                        }`}
                      />
                      <span className="truncate">{session.title}</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleDeleteSession(session.id, e)}
                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 p-1 rounded transition shrink-0"
                      title="Delete chat"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Sidebar Footer User Profile Card */}
            <div className="p-3 border-t border-[#262626] bg-[#0A0A0C]">
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#141416] border border-[#262626]">
                <img
                  src={user?.profile?.profile_image || DummyUser}
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover border border-[#81FB84]/30 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-white truncate">
                    {user?.profile?.first_name ||
                      user?.first_name ||
                      "Job Seeker"}
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
          3. MAIN CHAT WORKSPACE
          ========================================================= */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-[#08090A]">
        {/* Top Header Bar */}
        <header className="h-14 border-b border-[#262626]/80 flex items-center justify-between px-3.5 sm:px-6 bg-[#08090A]/90 backdrop-blur-md z-20">
          <div className="flex items-center gap-3">
            {!sidebarOpen && (
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/5 border border-[#262626] transition flex items-center gap-1.5 text-xs"
                title="Open sidebar"
              >
                <PanelLeft size={16} />
                <span className="hidden sm:inline">Chats</span>
              </button>
            )}

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#81FB84]/10 border border-[#81FB84]/30 flex items-center justify-center text-[#81FB84]">
                <Bot size={14} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-white  flex items-center gap-1.5">
                  Clever AI Career Coach
                  <span className="w-2 h-2 rounded-full bg-[#81FB84] animate-pulse"></span>
                </span>
              </div>
            </div>
          </div>

          {/* Model Selector & Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#141416] border border-[#262626] text-[11px] text-gray-300 font-medium">
              <Sparkles size={12} className="text-[#81FB84]" />
              <span>GPT-4o Engine</span>
            </div>

            <button
              type="button"
              onClick={handleExportChat}
              className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/5 border border-transparent hover:border-[#262626] transition"
              title="Export conversation"
            >
              <Download size={16} />
            </button>

            <button
              type="button"
              onClick={handleNewChat}
              className="p-2 text-gray-300 hover:text-white bg-[#141416] hover:bg-[#1A1A1E] border border-[#262626] rounded-xl transition"
              title="New chat"
            >
              <Plus size={16} className="text-[#81FB84]" />
            </button>
          </div>
        </header>

        {/* Message Thread Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-3.5 sm:p-6 md:p-8 space-y-6 max-w-4xl w-full mx-auto">
          {activeSession.messages.length === 0 ? (
            /* Empty State: Greetings & High-Impact Suggestions */
            <div className="min-h-full flex flex-col items-center justify-center text-center space-y-7 py-6">
              <div className="space-y-3">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#172b1d] to-[#0A0A0C] border border-[#81FB84]/40 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(129,251,132,0.2)]"
                >
                  <Bot size={28} className="text-[#81FB84]" />
                </motion.div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white ">
                  How can I help you land your dream job?
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  Tailor your resume, craft compelling cover letters, optimize
                  for ATS screening, and practice mock interview questions.
                </p>
              </div>

              {/* Prompt Suggestions Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                {promptSuggestions.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => handleSend(item.prompt)}
                      className="p-4 rounded-2xl bg-[#0E0E10] border border-[#262626] hover:border-[#81FB84]/50 text-left transition duration-200 group flex items-start justify-between gap-3 shadow-lg"
                    >
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#81FB84]">
                          <Icon size={12} />
                          <span>{item.category}</span>
                        </div>
                        <p className="text-xs text-gray-300 group-hover:text-white line-clamp-2 leading-relaxed">
                          {item.prompt}
                        </p>
                      </div>
                      <ArrowUpRight
                        size={16}
                        className="text-gray-400 group-hover:text-[#81FB84] flex-shrink-0 transition mt-0.5"
                      />
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Conversation Bubble Stream */
            <div className="space-y-6 pb-4">
              {activeSession.messages.map((msg) => {
                const isUser = msg.sender === "user";
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex items-start gap-3 ${
                      isUser ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {/* Avatar */}
                    {isUser ? (
                      <img
                        src={user?.profile?.profile_image || DummyUser}
                        alt="User"
                        className="w-8 h-8 rounded-full object-cover border border-[#81FB84]/30 shrink-0 mt-0.5"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-xl bg-[#16221c] border border-[#81FB84]/40 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_12px_rgba(129,251,132,0.2)]">
                        <Bot size={17} className="text-[#81FB84]" />
                      </div>
                    )}

                    {/* Bubble Content */}
                    <div className="space-y-1.5 max-w-[88%] sm:max-w-[78%]">
                      <div
                        className={`p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${
                          isUser
                            ? "bg-gradient-to-r from-[#172b1d] to-[#122217] text-white border border-[#81FB84]/30 rounded-tr-none font-medium"
                            : "bg-[#0E0E10] text-gray-200 border border-[#262626] rounded-tl-none whitespace-pre-wrap"
                        }`}
                      >
                        {isUser
                          ? msg.text
                          : renderFormattedBotMessage(msg.text)}
                      </div>

                      {/* Action Toolbar for AI responses */}
                      {!isUser && (
                        <div className="flex items-center gap-2 text-xs text-gray-400 pl-1">
                          <button
                            type="button"
                            onClick={() => handleCopy(msg.text, msg.id)}
                            className="hover:text-white flex items-center gap-1 p-1 rounded-md hover:bg-white/5 transition"
                            title="Copy response"
                          >
                            {copiedId === msg.id ? (
                              <Check size={13} className="text-[#81FB84]" />
                            ) : (
                              <Copy size={13} />
                            )}
                            <span className="text-[10px]">Copy</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              toast.info("Feedback submitted. Thank you!")
                            }
                            className="hover:text-white p-1 rounded-md hover:bg-white/5 transition"
                            title="Helpful"
                          >
                            <ThumbsUp size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              toast.info("Feedback submitted. Thank you!")
                            }
                            className="hover:text-white p-1 rounded-md hover:bg-white/5 transition"
                            title="Not helpful"
                          >
                            <ThumbsDown size={13} />
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* Typing Animation */}
              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#16221c] border border-[#81FB84]/40 flex items-center justify-center shrink-0">
                    <Bot size={17} className="text-[#81FB84]" />
                  </div>
                  <div className="p-4 rounded-2xl rounded-tl-none bg-[#0E0E10] border border-[#262626] text-xs text-gray-300 flex items-center gap-2.5 shadow-md">
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#81FB84] animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#81FB84] animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#81FB84] animate-bounce"></span>
                    </span>
                    <span>Clever AI is generating your response...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Bottom Input Area with Quick Action Chips */}
        <div className="p-3 sm:p-4 bg-gradient-to-t from-[#08090A] via-[#08090A] to-transparent border-t border-white/5">
          <div className="max-w-4xl mx-auto space-y-2.5">
            {/* Quick Action Chips */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {quickActionChips.map((chip, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSend(chip.prompt)}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full bg-[#121316] hover:bg-[#1A1A1E] border border-white/10 hover:border-[#81FB84]/40 text-xs text-gray-300 hover:text-white transition shadow-sm shrink-0"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Auto-expanding Input Box */}
            <div className="relative bg-[#0E0E10] border border-[#262626] focus-within:border-[#81FB84]/50 focus-within:shadow-[0_0_20px_rgba(129,251,132,0.1)] rounded-2xl p-2 sm:p-2.5 shadow-2xl transition duration-200 flex items-end gap-2">
              <textarea
                ref={textareaRef}
                value={inputMessage}
                onChange={handleInputResize}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Ask Clever AI anything about your CV, cover letter, or interview..."
                className="w-full bg-transparent border-none text-white text-xs sm:text-sm focus:outline-none resize-none px-3 py-2 max-h-32 no-scrollbar placeholder-gray-500 leading-relaxed"
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => handleSend()}
                disabled={!inputMessage.trim() || isTyping}
                className="p-2.5 rounded-xl bg-[#81FB84] hover:bg-[#a6fca9] text-black font-semibold transition disabled:opacity-30 disabled:cursor-not-allowed shrink-0 shadow-md"
              >
                <Send size={15} />
              </motion.button>
            </div>

            <p className="text-[10px] sm:text-[11px] text-gray-400 text-center flex items-center justify-center gap-1.5">
              <ShieldCheck size={12} className="text-[#81FB84]" /> Clever AI
              delivers industry-tested career insights. Always review critical
              application details.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatBox;
