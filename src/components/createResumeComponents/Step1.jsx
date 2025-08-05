import React, { useEffect } from "react";
import Title from "../common/Title";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormContext } from "react-hook-form";

const select = [
  { id: 1, title: "I’m looking for a job in Germany" },
  { id: 2, title: "I’m applying for an Ausbildung program" },
  { id: 3, title: "I’m switching industries" },
  { id: 4, title: "I’m a fresh graduate" },
  { id: 5, title: "Other" },
];

const Step1 = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const selectedGoal = watch("goal");

  // ✅ Register the field manually for validation
  useEffect(() => {
    register("goal", { required: "Please select your goal" });
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

      {/* Radio Group Section */}
      <div className="mt-6 w-full max-w-md">
        <RadioGroup
          value={selectedGoal}
          onValueChange={(value) => setValue("goal", value, { shouldValidate: true })}
          className="w-full"
        >
          {select.map((item) => (
            <div key={item.id} className="flex items-center space-x-2 mb-3">
              <RadioGroupItem value={item.title} id={`option-${item.id}`} />
              <Label htmlFor={`option-${item.id}`}>{item.title}</Label>
            </div>
          ))}
        </RadioGroup>

        {/* Error message if not selected */}
        {errors.goal && (
          <p className="text-red-500 text-sm mt-2">{errors.goal.message}</p>
        )}
      </div>
    </div>
  );
};

export default Step1;
