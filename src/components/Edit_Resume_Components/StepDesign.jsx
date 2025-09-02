import { useResume } from "@/providers/ResumeContext";
import React from "react";
import { Sketch } from "@uiw/react-color";
import { useEmail } from "@/hooks/useEmail";

const StepDesign = () => {
  const {language} = useEmail();
  const { color, setColor } = useResume();
console.log(color)
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

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm text-white mb-4">{language === "en" ? "Choose Color" : "Farbe wählen"}</p>
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

      <div className="flex flex-col gap-2">
        <h1>{language === "en" ? "Choose your custom Color" : "Wählen Sie Ihre individuelle Farbe"}</h1>
        <div>
          <Sketch
            color={color} // use context value
            onChange={(c) => setColor(c.hex)} // update global color
          />
          <p>{language === "en" ? "Current Color" : "Aktuelle Farbe"}: {color}</p>
        </div>
      </div>
    </div>
  );
};

export default StepDesign;
