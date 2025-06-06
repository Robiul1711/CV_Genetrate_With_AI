import React, { useState } from "react";
import uk from "../../assets/images/uk.png";
import { IoIosArrowDown } from "react-icons/io";

const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("English");

  const options = [
    { label: "English", value: "en", img: uk },
    { label: "German", value: "de", img: "https://flagcdn.com/w40/de.png" },
    { label: "French", value: "fr", img: "https://flagcdn.com/w40/fr.png" },
    { label: "Spanish", value: "es", img: "https://flagcdn.com/w40/es.png" },
    { label: "Turkish", value: "tr", img: "https://flagcdn.com/w40/tr.png" },
    { label: "Russian", value: "ru", img: "https://flagcdn.com/w40/ru.png" },
    { label: "Arabic", value: "ar", img: "https://flagcdn.com/w40/sa.png" },
  ];

  const handleSelect = (option) => {
    setSelected(option.label);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left w-[50%] lg:w-auto">
      {/* Trigger */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between font-medium py-2 text-sm xl:py-3 px-4 border border-white/10 rounded-lg gap-2 cursor-pointer text-white bg-transparent"
      >
        <img
          src={options.find((opt) => opt.label === selected)?.img}
          alt="Flag"
          className="w-5 h-5 object-cover"
        />
        <span className="flex-1">{selected}</span>
        <IoIosArrowDown
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute mt-2 w-full bg-black border border-white/10 rounded-lg shadow-lg z-50">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-white hover:text-black transition-colors cursor-pointer"
            >
              <img
                src={option.img}
                alt={option.label}
                className="w-5 h-5 object-cover"
              />
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
