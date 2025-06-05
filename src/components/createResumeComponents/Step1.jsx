import React from "react";
import Title from "../common/Title";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Data array
const select = [
  {
    id: 1,
    title: "I’m looking for a job in Germany",
  },
  {
    id: 2,
    title: "I’m applying for an Ausbildung program",
  },
  {
    id: 3,
    title: "I’m switching industries",
  },
  {
    id: 4,
    title: "I’m a fresh graduate",
  },
  {
    id: 5,
    title: "Other",
  },
];

const Step1 = () => {
  return (
   <div className="flex flex-col items-center justify-center ">
  <div className="text-center">
    <Title level="title48">Choose Your Goal</Title>
    <Title level="title20" className="mt-2">
      What’s your current job-seeking goal?
    </Title>
  </div>

  <div className="mt-6 w-full max-w-md">
    <RadioGroup defaultValue="option-1" className="w-full">
      {select.map((item) => (
        <div
          key={item.id}
          className="flex items-center space-x-2 mb-3"
        >
          <RadioGroupItem
            value={`option-${item.id}`}
            id={`option-${item.id}`}
          />
          <Label htmlFor={`option-${item.id}`}>{item.title}</Label>
        </div>
      ))}
    </RadioGroup>
  </div>
</div>

  );
};

export default Step1;

