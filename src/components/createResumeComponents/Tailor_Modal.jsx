import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Title from "../common/Title";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DialogClose } from "@radix-ui/react-dialog";
import { useFormContext, Controller } from "react-hook-form";

const Tailor = [
  { id: 1, title: "Professional" },
  { id: 2, title: "Academic" },
  { id: 3, title: "Technical" },
  { id: 4, title: "Casual" },
];

const Gender = [
  { id: 1, title: "Neutral" },
  { id: 2, title: "Inclusive" },
  { id: 3, title: "Feminine" },
  { id: 4, title: "Masculine" },
];

const Complexity = [
  { id: 1, title: "Simplified" },
  { id: 2, title: "Advanced" },
  { id: 3, title: "Academic" },
];

const Creativity = [
  { id: 1, title: "Straightforward" },
  { id: 2, title: "Moderate" },
  { id: 3, title: "Highly Creative" },
];

const Tailor_Modal = ({ activeStep, setActiveStep }) => {
  const { control } = useFormContext();

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button className="font-semibold border-white bg-white text-black px-3 py-1.5 text-sm rounded-md hover:bg-[#69CA6A] hover:text-white transition-colors duration-300">
            Add Another Courses and Training
          </button>
        </DialogTrigger>
        <DialogContent className="!bg-black max-w-xl">
          <DialogHeader>
            <div className="md:text-center flex flex-col md:items-center gap-4 mb-2 sm:mb-10 pt-2">
              <Title level="title28">
                Add Another Courses and Training Details
              </Title>
              <Title level="title16">
                Match your resume/cover letter to the company's culture. Select one option per category
              </Title>
            </div>

            {/* Tailor Voice */}
            <div className="sm:pb-10 pb-2">
              <Title level="title22">Tailor Your Document's Voice</Title>
              <Controller
                control={control}
                name="tailor_documents_voice"
                defaultValue="Professional"
                render={({ field }) => (
                  <RadioGroup 
                    value={field.value}
                    onValueChange={field.onChange}
                    className="w-full mt-2 flex flex-wrap gap-4"
                  >
                    {Tailor.map((item) => (
                      <div key={item.id} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={item.title}
                          id={`tailor-${item.id}`}
                        />
                        <Label htmlFor={`tailor-${item.id}`}>{item.title}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>

            {/* Gender Language */}
            <div className="sm:pb-10 pb-2">
              <Title level="title22">Gender Language</Title>
              <Controller
                control={control}
                name="gender_language"
                defaultValue="Neutral"
                render={({ field }) => (
                  <RadioGroup 
                    value={field.value}
                    onValueChange={field.onChange}
                    className="w-full mt-2 flex flex-wrap gap-4"
                  >
                    {Gender.map((item) => (
                      <div key={item.id} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={item.title}
                          id={`gender-${item.id}`}
                        />
                        <Label htmlFor={`gender-${item.id}`}>{item.title}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>

            {/* Complexity */}
            <div className="sm:pb-10 pb-2">
              <Title level="title22">Complexity</Title>
              <Controller
                control={control}
                name="complexity"
                defaultValue="Simplified"
                render={({ field }) => (
                  <RadioGroup 
                    value={field.value}
                    onValueChange={field.onChange}
                    className="w-full mt-2 flex flex-wrap gap-4"
                  >
                    {Complexity.map((item) => (
                      <div key={item.id} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={item.title}
                          id={`complexity-${item.id}`}
                        />
                        <Label htmlFor={`complexity-${item.id}`}>{item.title}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>

            {/* Creativity */}
            <div className="sm:pb-10 pb-2">
              <Title level="title22">Creativity</Title>
              <Controller
                control={control}
                name="creativity"
                defaultValue="Straightforward"
                render={({ field }) => (
                  <RadioGroup 
                    value={field.value}
                    onValueChange={field.onChange}
                    className="w-full mt-2 flex flex-wrap gap-4"
                  >
                    {Creativity.map((item) => (
                      <div key={item.id} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={item.title}
                          id={`creativity-${item.id}`}
                        />
                        <Label htmlFor={`creativity-${item.id}`}>{item.title}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex w-full mx-auto justify-between items-center sm:mt-10">
              <DialogClose asChild>
                <button className="font-semibold border border-white text-white px-4 py-2 text-sm rounded-md hover:bg-white hover:text-black transition-colors duration-300">
                  Back
                </button>
              </DialogClose>
              <DialogClose asChild>
                <button
                 
                  className="font-semibold border-white bg-white text-black px-4 text-sm py-2 rounded-md hover:bg-[#69CA6A] hover:text-white transition-colors duration-300"
                >
                 Select
                </button>
              </DialogClose>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tailor_Modal;