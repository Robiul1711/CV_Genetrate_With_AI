import { useResume } from "@/providers/ResumeContext";
import React from "react";
import { Sketch } from "@uiw/react-color";

const StepDesign = () => {
  const { color, setColor, font, setFont } = useResume();

  const colors = [
    "#2E2E2E",
    "#34495E",
    "#1F4F4F",
    "#4B2C5E",
    "#F5F5F5",
    "#E3F2FD",
    "#FFF3E0",
    "#E8F5E9",
  ];
  const fonts = [
    { name: "Inter", className: "inter" },
    { name: "Poppins", className: "poppins" },
    { name: "Urbanist", className: "urbanist" },
    { name: "Roboto", className: "roboto" },
    { name: "Lato", className: "lato" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Color Selection */}
      <div>
        <p className="text-sm text-white mb-4">
          Choose Color
        </p>
        <div className="flex items-center gap-3 mb-4">
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

        <div className="flex flex-col gap-2">
          <h1>
            Choose your custom Color
          </h1>
          <div>
            <Sketch color={color} onChange={(c) => setColor(c.hex)} />
            <p>
              Current Color: {color}
            </p>
          </div>
        </div>
      </div>

      {/* Font Selection */}
      <div className="flex flex-col gap-2">
        <h1>Choose Font Style</h1>
        <select
          value={font}
          onChange={(e) => setFont(e.target.value)}
          className="p-2 rounded-md border border-gray-300 bg-white text-black"
        >
          {fonts.map((f, idx) => (
            <option key={idx} value={f.className} className={f.className}>
              {f.name}
            </option>
          ))}
        </select>
        <p>
          Current Font: {font}
        </p>
      </div>
    </div>
  );
};

export default StepDesign;
