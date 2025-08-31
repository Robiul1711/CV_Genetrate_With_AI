import { useResume } from "@/providers/ResumeContext";
import React from "react";

const StepDesign = () => {
  const { color, setColor } = useResume();
const colors = [
  "#2E2E2E", 
  "#34495E",
  "#1F4F4F", 
  "#4B2C5E",

];


  console.log(color);
  return (
    <div className="flex flex-col gap-4">
      {/* <div className="flex flex-col gap-2">
        <label className="text-sm text-white">Change Language</label>
        <select className="bg-[#0E0E10] px-3 py-1.5  text-xs  rounded-lg border border-[#262626] text-white">
                <option value="beginner">German</option>
              <option value="intermediate">English</option>
              <option value="advanced">Russian</option>
              <option value="advanced">Arabic</option>
              <option value="advanced">Spanish</option>
              <option value="advanced">Turkish</option>
        </select>
      </div> */}
      <div>
        <p className="text-sm text-white mb-4">Change Color</p>
        <div className="flex items-center gap-3">
          {colors.map((c, idx) => (
            <div
              key={idx}
              className="w-10 h-10 rounded-md cursor-pointer border-2"
              style={{
                backgroundColor: c,
                borderColor: color === c ? "#FFD700" : "transparent",
              }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
      </div>
      {/* <div className="flex flex-col gap-2">
        <label className="text-sm text-white">Font Style</label>
        <select className="bg-[#0E0E10] px-3 py-1.5  text-xs rounded-lg border border-[#262626] text-white">
          <option value="beginner">Inter</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div> */}
    </div>
  );
};

export default StepDesign;
