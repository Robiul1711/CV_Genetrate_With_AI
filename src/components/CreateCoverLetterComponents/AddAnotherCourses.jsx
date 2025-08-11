import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import Title from "../common/Title";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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

const AddAnotherCourses = () => {
  const { control } = useFormContext();

  return (
    <div className="bg-black max-w-xl p-6 mx-auto rounded-md">
      {/* Header */}
      <div className="md:text-center flex flex-col md:items-center gap-4 mb-4 sm:mb-10 pt-10">
        <Title level="title28">Add Another Courses and Training Details</Title>
        <Title level="title16">
          Provide information about any professional courses or training you’ve
          completed.
        </Title>
      </div>

      {/* Tailor */}
      <div className="sm:pb-10 pb-5">
        <Title level="title22">Tailor Your Document’s Voice</Title>
        <Controller
          name="tailor_documents_voice"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="w-full mt-2 flex flex-wrap"
            >
              {Tailor.map((item) => (
                <div key={item.id} className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value={item.title} id={`tailor-${item.id}`} />
                  <Label htmlFor={`tailor-${item.id}`}>{item.title}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
        />
      </div>

      {/* Gender */}
      <div className="sm:pb-10 pb-5">
        <Title level="title22">Gender Language</Title>
        <Controller
          name="gender_language"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="w-full mt-2 flex flex-wrap"
            >
              {Gender.map((item) => (
                <div key={item.id} className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value={item.title} id={`gender-${item.id}`} />
                  <Label htmlFor={`gender-${item.id}`}>{item.title}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
        />
      </div>

      {/* Complexity */}
      <div className="sm:pb-10 pb-5">
        <Title level="title22">Complexity</Title>
        <Controller
          name="complexity"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="w-full mt-2 flex flex-wrap"
            >
              {Complexity.map((item) => (
                <div key={item.id} className="flex items-center space-x-2 mb-3">
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
      <div className="sm:pb-10 pb-5">
        <Title level="title22">Creativity</Title>
        <Controller
          name="creativity"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="w-full mt-2 flex flex-wrap"
            >
              {Creativity.map((item) => (
                <div key={item.id} className="flex items-center space-x-2 mb-3">
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
    </div>
  );
};

export default AddAnotherCourses;
