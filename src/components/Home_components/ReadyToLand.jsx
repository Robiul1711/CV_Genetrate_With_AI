import React from "react";
import starBG from "../../assets/images/starBG.png";

const ReadyToLand = () => {
  return (
    <div className="relative pb-28 h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      {/* Background Image */}
      <img
        src={starBG}
        alt="Stars Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Content Overlay */}
      <div className="absolute top-1/2 left-1/2 w-full max-w-5xl px-4 -translate-x-1/2 -translate-y-1/2 text-center flex flex-col items-center z-10">
        <h1 className="text-[28px] md:text-[36px] lg:text-[48px] font-bold leading-snug text-white">
          Ready to Land Your Next Job with a Perfect Resume?
        </h1>
        <p className="md:text-xl text-[#9B9B9B] pt-4 max-w-2xl">
          Let Clever-CV guide you with expert AI tools — build, improve, and
          export your resume in minutes.
        </p>
        <div className="flex items-center gap-5">
          <button className="mt-10 px-6 md:px-8 py-3 md:py-4 rounded-xl text-sm md:text-base border border-[#81FB84]/20 text-white hover:bg-white hover:text-dark transition-all duration-300 font-medium">
            Create Your Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadyToLand;
