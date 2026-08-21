import React from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const Logo = ({ className = "", size = "md", showTag = true, href = "/" }) => {
  const sizeClasses = {
    sm: {
      icon: "w-7 h-7 text-xs",
      text: "text-lg",
      badge: "text-[9px] px-1 py-0.2",
    },
    md: {
      icon: "w-9 h-9 text-sm",
      text: "text-xl",
      badge: "text-[10px] px-1.5 py-0.5",
    },
    lg: {
      icon: "w-11 h-11 text-base",
      text: "text-2xl",
      badge: "text-xs px-2 py-0.5",
    },
    xl: {
      icon: "w-14 h-14 text-lg",
      text: "text-3xl",
      badge: "text-xs px-2.5 py-1",
    },
  }[size] || {
    icon: "w-9 h-9 text-sm",
    text: "text-xl",
    badge: "text-[10px] px-1.5 py-0.5",
  };

  const content = (
    <div className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Icon Emblem */}
      <div
        className={`relative ${sizeClasses.icon} rounded-xl bg-gradient-to-br from-[#1b2b21] via-[#0e1812] to-[#08090a] border border-[#81FB84]/40 flex items-center justify-center shadow-[0_0_15px_rgba(129,251,132,0.25)] group-hover:shadow-[0_0_22px_rgba(129,251,132,0.45)] group-hover:border-[#81FB84] transition-all duration-300`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-[#81FB84] transition-transform duration-300 group-hover:scale-110"
        >
          {/* Document shape */}
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          {/* AI lines inside */}
          <line x1="8" y1="13" x2="16" y2="13" stroke="#81FB84" strokeWidth="2" />
          <line x1="8" y1="17" x2="13" y2="17" stroke="#81FB84" strokeWidth="2" />
        </svg>

        {/* Floating Sparkle dot */}
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#81FB84] rounded-full shadow-[0_0_8px_#81FB84] animate-pulse"></span>
      </div>

      {/* Brand Text */}
      <div className="flex items-center gap-1.5 font-bold tracking-tight">
        <span className={`${sizeClasses.text} text-white font-extrabold font-sans`}>
          Clever
        </span>
        <span
          className={`${sizeClasses.text} text-transparent bg-clip-text bg-gradient-to-r from-[#81FB84] to-[#34D399] font-extrabold`}
        >
          CV
        </span>

        {showTag && (
          <span
            className={`${sizeClasses.badge} rounded-md bg-[#81FB84]/15 border border-[#81FB84]/30 text-[#81FB84] font-semibold tracking-wider uppercase ml-0.5`}
          >
            AI
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link to={href}>{content}</Link>;
  }

  return content;
};

export default Logo;
