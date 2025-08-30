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
import { useEmail } from "@/hooks/useEmail";

// Options
const Tailor = [
  { id: 1, title_en: "Professional", title_de: "Professionell" },
  { id: 2, title_en: "Academic", title_de: "Akademisch" },
  { id: 3, title_en: "Technical", title_de: "Technisch" },
  { id: 4, title_en: "Casual", title_de: "Locker" },
];

const Complexity = [
  { id: 1, title_en: "Simplified", title_de: "Vereinfacht" },
  { id: 2, title_en: "Advanced", title_de: "Fortgeschritten" },
  { id: 3, title_en: "Academic", title_de: "Akademisch" },
];
const GenderLanguage = [
  { id: 1, title_en: "Neutral", title_de: "Neutral" },
  { id: 2, title_en: "Inclusive", title_de: "Inklusiv" },
  { id: 3, title_en: "Feminine", title_de: "Feminin" },
  { id: 3, title_en: "Masculine", title_de: "Maskulin" },
];

const Creativity = [
  { id: 1, title_en: "Straightforward", title_de: "Einfach" },
  { id: 2, title_en: "Moderate", title_de: "Mittel" },
  { id: 3, title_en: "Highly Creative", title_de: "Sehr Kreativ" },
];

const FormOptions = [
  { id: 1, title_de: "Neutral", value_de: "neutral" },
  { id: 2, title_de: "Inklusiv", value_de: "inklusiv" },
  { id: 3, title_de: "Feminin", value_de: "feminin" },
  { id: 4, title_de: "Maskulin", value_de: "maskulin" },
];

const Tailor_Modal = () => {
  const { control } = useFormContext();
  const { language } = useEmail(); // 'de' or 'en'

  const getTitle = (item) => (language === "de" ? item.title_de : item.title_en);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button className="font-semibold border-white bg-white text-black px-3 py-1.5 text-sm rounded-md hover:bg-[#69CA6A] hover:text-white transition-colors duration-300">
            {language === "de" ? "Weiteres Zertifikat hinzufügen" : "Add Another Courses and Training"}
          </button>
        </DialogTrigger>

        <DialogContent className="!bg-black max-w-xl">
          <DialogHeader>
            <div className="md:text-center flex flex-col md:items-center gap-4 mb-2 sm:mb-10 pt-2">
              <Title level="title28">
                {language === "de" ? "Weitere Kurse und Schulungen hinzufügen" : "Add Another Courses and Training Details"}
              </Title>
              <Title level="title16">
                {language === "de"
                  ? "Passen Sie Ihren Lebenslauf / Ihr Anschreiben an die Unternehmenskultur an. Wählen Sie pro Kategorie eine Option aus"
                  : "Match your resume/cover letter to the company's culture. Select one option per category"}
              </Title>
            </div>

            {/* Tailor Voice */}
            <div className="sm:pb-10 pb-2">
              <Title level="title22">{language === "de" ? "Stimme des Dokuments anpassen" : "Tailor Your Document's Voice"}</Title>
              <Controller
                control={control}
                name="tailor_documents_voice"
                defaultValue={getTitle(Tailor[0])}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="w-full mt-2 flex flex-wrap gap-4"
                  >
                    {Tailor.map((item) => (
                      <div key={item.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={getTitle(item)} id={`tailor-${item.id}`} />
                        <Label htmlFor={`tailor-${item.id}`}>{getTitle(item)}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>

            {/* Form Du/Sie */}
            <div className="sm:pb-10 pb-2">
              <Title level="title22">{language === "de" ? "Geschlechtssprache" : "Gender Language"}</Title>
              <Controller
                control={control}
                name="gender_language"
                defaultValue={getTitle(GenderLanguage[0])}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="w-full mt-2 flex flex-wrap gap-4"
                  >
                    {GenderLanguage.map((item) => (
                      <div key={item.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={getTitle(item)} id={`form-${item.id}`} />
                        <Label htmlFor={`form-${item.id}`}>{getTitle(item)}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>

            {/* Complexity */}
            <div className="sm:pb-10 pb-2">
              <Title level="title22">{language === "de" ? "Komplexität" : "Complexity"}</Title>
              <Controller
                control={control}
                name="complexity"
                defaultValue={getTitle(Complexity[0])}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="w-full mt-2 flex flex-wrap gap-4"
                  >
                    {Complexity.map((item) => (
                      <div key={item.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={getTitle(item)} id={`complexity-${item.id}`} />
                        <Label htmlFor={`complexity-${item.id}`}>{getTitle(item)}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>

            {/* Creativity */}
            <div className="sm:pb-10 pb-2">
              <Title level="title22">{language === "de" ? "Kreativität" : "Creativity"}</Title>
              <Controller
                control={control}
                name="creativity"
                defaultValue={getTitle(Creativity[0])}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="w-full mt-2 flex flex-wrap gap-4"
                  >
                    {Creativity.map((item) => (
                      <div key={item.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={getTitle(item)} id={`creativity-${item.id}`} />
                        <Label htmlFor={`creativity-${item.id}`}>{getTitle(item)}</Label>
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
                  {language === "de" ? "Zurück" : "Back"}
                </button>
              </DialogClose>
              <DialogClose asChild>
                <button className="font-semibold border-white bg-white text-black px-4 text-sm py-2 rounded-md hover:bg-[#69CA6A] hover:text-white transition-colors duration-300">
                  {language === "de" ? "Auswählen" : "Select"}
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
