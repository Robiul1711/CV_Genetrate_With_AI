import React, { useEffect } from "react";
import Title from "../common/Title";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { useEmail } from "@/hooks/useEmail"; // gives you the language

const Step1 = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { language } = useEmail(); // "en" or "de"
  const goalValue = watch("goal");

  // Register the field manually for validation
  useEffect(() => {
    register("goal", {
      required:
        language === "de"
          ? "Bitte geben Sie Ihr Ziel ein"
          : "Please enter your goal",
    });
  }, [register, language]);

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      {/* Title Section */}
      <div className="text-center">
        <Title level="title48">
          {language === "de" ? "Wählen Sie Ihr Ziel" : "Choose Your Goal"}
        </Title>
        <Title level="title20" className="mt-2">
          {language === "de"
            ? "Was ist Ihr aktuelles Karriereziel?"
            : "What’s your current job-seeking goal?"}
        </Title>
      </div>

      {/* Input Section */}
      <div className="mt-6 w-full max-w-md">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="goal">
            {language === "de"
              ? "Geben Sie Ihr Ziel ein"
              : "Enter your goal"}
          </Label>
          <input
            id="goal"
            type="text"
            className="w-full border  bg-transparent rounded-md p-2 focus:outline-none focus:ring-2 "
            placeholder={
              language === "de"
                ? "Z. B. Ich suche einen Job in Deutschland"
                : "E.g. I am looking for a job in Germany"
            }
            value={goalValue || ""}
            onChange={(e) =>
              setValue("goal", e.target.value, { shouldValidate: true })
            }
          />
        </div>

        {/* Error message */}
        {errors.goal && (
          <p className="text-red-500 text-sm mt-2">{errors.goal.message}</p>
        )}
      </div>
    </div>
  );
};

export default Step1;
