import React, { useEffect } from "react";
import Title from "../common/Title";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

const Step1 = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const goalValue = watch("goal");

  // Register the field manually for validation
  useEffect(() => {
    register("goal", {
      required: "Please enter your career goal",
    });
  }, [register]);

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      {/* Title Section */}
      <div className="text-center">
        <Title level="title48">Choose Your Goal</Title>
        <Title level="title20" className="mt-2">
          What’s your current job-seeking goal?
        </Title>
      </div>

      {/* Input Section */}
      <div className="mt-6 w-full max-w-md">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="goal">Enter your goal</Label>
          <input
            id="goal"
            type="text"
            className="w-full border bg-transparent rounded-md p-2 focus:outline-none focus:ring-2"
            placeholder="E.g. Senior Frontend Developer seeking remote opportunities"
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
