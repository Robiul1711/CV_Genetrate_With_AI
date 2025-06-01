import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Title from "../common/Title";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
const Tailor = [
  {
    id: 1,
    title: "Professional",
  },
  {
    id: 2,
    title: "Academic",
  },
  {
    id: 3,
    title: "Technical",
  },
  {
    id: 4,
    title: "Casual",
  },

];
const Gender = [
  {
    id: 1,
    title: "Neutral  ",
  },
  {
    id: 2,
    title: "Inclusive ",
  },
  {
    id: 3,
    title: "Feminine",
  },
  {
    id: 4,
    title: "Masculine",
  },

];
const Complexity = [
  {
    id: 1,
    title: "Simplified    ",
  },
  {
    id: 2,
    title: "Advanced  ",
  },
  {
    id: 3,
    title: "Academic",
  },


];
const Creativity = [
  {
    id: 1,
    title: "Straightforward  ",
  },
  {
    id: 2,
    title: "Moderate   ",
  },
  {
    id: 3,
    title: "Highly Creative",
  },


];
const Tailor_Modal = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          {" "}
          <button className="font-semibold  border-white bg-white text-black py-4 px-16 text-lg rounded-md hover:bg-[#69CA6A] hover:text-white transition-colors duration-300">
            Generate Resume With AI
          </button>
        </DialogTrigger>
        <DialogContent className="!bg-black max-w-xl">
          <DialogHeader>
            <div className="text-center flex flex-col items-center gap-4 mb-10 pt-10">
              <Title level="title28">
                Add Another Courses and Training Details
              </Title>
              <Title level="title16">
                Provide information about any professional courses or training
                you’ve completed.
              </Title>
            </div>
            <div className="pb-10">
              <Title level="title22">Tailor Your Document’s Voice</Title>
              <RadioGroup defaultValue="option-1" className="w-full mt-5 flex">
                {Tailor.map((item) => (
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
            <div className="pb-10">
              <Title level="title22">Gender Language</Title>
              <RadioGroup defaultValue="option-1" className="w-full mt-5 flex">
                {Gender.map((item) => (
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
            <div className="pb-10">
              <Title level="title22">Complexity</Title>
              <RadioGroup defaultValue="option-1" className="w-full mt-5 flex">
                {Complexity.map((item) => (
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
            <div className="pb-10">
              <Title level="title22">Creativity</Title>
              <RadioGroup defaultValue="option-1" className="w-full mt-5 flex">
                {Creativity.map((item) => (
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
            <div className='flex  w-full mx-auto justify-between items-center mt-10'>
  <button className='font-semibold border border-white text-white py-4 px-16 text-lg rounded-md hover:bg-white hover:text-black transition-colors duration-300'>
    Back
  </button>
  <button className='font-semibold  border-white bg-white text-black py-4 px-16 text-lg rounded-md hover:bg-[#69CA6A] hover:text-white transition-colors duration-300'>
    Next
  </button>
</div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tailor_Modal;
