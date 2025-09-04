import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import Title from "../common/Title";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEmail } from "@/hooks/useEmail";

const AddAnotherCourses = () => {
  const { control } = useFormContext();
  const { language } = useEmail();

  // Translation map
  const texts = {
    en: {
      headerTitle: "Tailor Your Document’s Voice",
      headerSubtitle:
        "Match your resume/cover letter to the company’s culture. Select one option per category",
      tailorTitle: "Tailor Your Document’s Voice",
      genderTitle: "Gender Language",
      complexityTitle: "Complexity",
      creativityTitle: "Creativity",
      formalityTitle: "Formality",
      formalityOptions: ["Du", "Sie"],
      genderOptions: [
        "Informal (Du)",
        "Formal (Sie)",
        "Gender (DU) ",
        "Gender (Sie)",
      
      ],
      tailorOptions: ["Professional", "Academic", "Technical", "Casual"],
      complexityOptions: ["Simplified", "Advanced", "Academic"],
      creativityOptions: [
        "Straightforward",
        "Moderate",
        "Highly Creative",
      ],
    },
    de: {
      headerTitle: "Weitere Kurse und Schulungsdetails",
      headerSubtitle:
        "Geben Sie Informationen zu allen professionellen Kursen oder Schulungen an, die Sie abgeschlossen haben.",
      tailorTitle: "Ton Ihres Dokuments anpassen",
      genderTitle: "Geschlechtersprache",
      complexityTitle: "Komplexität",
      creativityTitle: "Kreativität",
      formalityTitle: "Formell / Umgangssprachlich",
      formalityOptions: ["Du", "Sie"],
      genderOptions: [
        "Informell (Du)",
        "Formell (Sie)", 
        "Gender (Du)",
        "Gender (Sie) ",

      ],
      tailorOptions: ["Professionell", "Akademisch", "Technisch", "Locker"],
      complexityOptions: ["Einfach", "Fortgeschritten", "Akademisch"],
      creativityOptions: ["Einfach", "Mittel", "Sehr Kreativ"],
    },
  };

  const t = language === "de" ? texts.de : texts.en;

  return (
    <div className="bg-black max-w-xl p-6 mx-auto rounded-md">
      {/* Header */}
      <div className="md:text-center flex flex-col md:items-center gap-4 mb-4 sm:mb-10 pt-10">
        <Title level="title28">{t.headerTitle}</Title>
        <Title level="title16">{t.headerSubtitle}</Title>
      </div>

      {/* Tailor */}
      <div className="sm:pb-10 pb-5">
        <Title level="title22">{t.tailorTitle}</Title>
        <Controller
          name="tailor_documents_voice"
          control={control}
          rules={{ required: "Please select a document voice" }}
          render={({ field, fieldState }) => (
            <>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="w-full mt-2 flex flex-wrap"
              >
                {t.tailorOptions.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value={item} id={`tailor-${index}`} />
                    <Label htmlFor={`tailor-${index}`}>{item}</Label>
                  </div>
                ))}
              </RadioGroup>
              {fieldState.error && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      {/* Gender */}
      <div className="sm:pb-10 pb-5">
        <Title level="title22">{t.genderTitle}</Title>
        <Controller
          name="gender_language"
          control={control}
          rules={{ required: "Please select a gender language" }}
          render={({ field, fieldState }) => (
            <>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="w-full mt-2 flex flex-wrap"
              >
                {t.genderOptions.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value={item} id={`gender-${index}`} />
                    <Label htmlFor={`gender-${index}`}>{item}</Label>
                  </div>
                ))}
              </RadioGroup>
              {fieldState.error && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      {/* Complexity */}
      <div className="sm:pb-10 pb-5">
        <Title level="title22">{t.complexityTitle}</Title>
        <Controller
          name="complexity"
          control={control}
          rules={{ required: "Please select a complexity level" }}
          render={({ field, fieldState }) => (
            <>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="w-full mt-2 flex flex-wrap"
              >
                {t.complexityOptions.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value={item} id={`complexity-${index}`} />
                    <Label htmlFor={`complexity-${index}`}>{item}</Label>
                  </div>
                ))}
              </RadioGroup>
              {fieldState.error && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      {/* Creativity */}
      <div className="sm:pb-10 pb-5">
        <Title level="title22">{t.creativityTitle}</Title>
        <Controller
          name="creativity"
          control={control}
          rules={{ required: "Please select a creativity level" }}
          render={({ field, fieldState }) => (
            <>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="w-full mt-2 flex flex-wrap"
              >
                {t.creativityOptions.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value={item} id={`creativity-${index}`} />
                    <Label htmlFor={`creativity-${index}`}>{item}</Label>
                  </div>
                ))}
              </RadioGroup>
              {fieldState.error && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      {/* Formality (optional, uncomment if needed) */}
      {/* <div className="sm:pb-10 pb-5">
        <Title level="title22">{t.formalityTitle}</Title>
        <Controller
          name="formality"
          control={control}
          rules={{ required: "Please select a formality level" }}
          render={({ field, fieldState }) => (
            <>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="w-full mt-2 flex flex-wrap"
              >
                {t.formalityOptions.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value={item} id={`formality-${index}`} />
                    <Label htmlFor={`formality-${index}`}>{item}</Label>
                  </div>
                ))}
              </RadioGroup>
              {fieldState.error && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        />
      </div> */}
    </div>
  );
};

export default AddAnotherCourses;
