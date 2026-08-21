import React from "react";
import { Star, CheckCircle2 } from "lucide-react";
import DummyUser from "@/assets/images/placeholder-user.png";

const MarqueeComponent = ({ data }) => {
  const items = data?.data?.data || [];

  return (
    <div className="flex gap-5 pl-5 py-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-[#0E0E10] border border-[#262626] hover:border-[#81FB84]/40 rounded-2xl w-[320px] sm:w-[380px] p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl"
        >
          {/* Star rating */}
          <div className="flex items-center justify-between pb-3 border-b border-[#262626]/50">
            <div className="flex gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < item.rating ? "#F59E0B" : "none"}
                  className={i < item.rating ? "text-amber-400" : "text-gray-600"}
                />
              ))}
            </div>
            <span className="text-[10px] font-semibold text-[#81FB84] bg-[#81FB84]/10 border border-[#81FB84]/20 px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 size={10} /> Verified User
            </span>
          </div>

          {/* Comment quote */}
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed py-3">
            "{item.message || item.comment}"
          </p>

          {/* User profile */}
          <div className="flex items-center gap-3 pt-2">
            <img
              src={item.user_image || DummyUser}
              alt={item.name}
              className="w-10 h-10 object-cover rounded-full border border-[#333]"
              onError={(e) => {
                e.target.src = DummyUser;
              }}
            />
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                {item.name}
              </h4>
              <p className="text-[11px] text-gray-400">
                {item.designation || item.profession}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarqueeComponent;
