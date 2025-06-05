import React, { useEffect, useRef, useState } from "react";
import uk from "../../assets/images/uk.png";
import { IoIosArrowDown } from "react-icons/io";
import { UseLangauge } from "@/hooks/UseLangauge";

const LanguageDropdown = () => {
  const { selectedLanguage, setSelectedLanguage } = UseLangauge();
  const [isOpen, setIsOpen] = useState(false);
  const [googleTranslateLoaded, setGoogleTranslateLoaded] = useState(false);
  const googleTranslateRef = useRef(null);

  const languages = [
    { code: "en", name: "English", flag: uk },
    { code: "tr", name: "Turkish", flag: "https://flagcdn.com/w40/tr.png" },
    { code: "de", name: "German", flag: "https://flagcdn.com/w40/de.png" },
    { code: "es", name: "Spanish", flag: "https://flagcdn.com/w40/es.png" },
    { code: "ar", name: "Arabic", flag: "https://flagcdn.com/w40/sa.png" },
    { code: "ja", name: "Japan", flag: "https://flagcdn.com/w40/jp.png" },
  ];

  const currentLang = languages.find((l) => l.code === selectedLanguage);

  useEffect(() => {
    const initializeGoogleTranslate = () => {
      window.googleTranslateElementInit = () => {
        googleTranslateRef.current =
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: languages.map((lang) => lang.code).join(","),
              layout:
                window.google.translate.TranslateElement.InlineLayout
                  .HORIZONTAL,
              autoDisplay: false,
            },
            "google_translate_element"
          );

        setTimeout(() => {
          const select = document.querySelector(".goog-te-combo");
          if (select) {
            select.value = selectedLanguage;
            select.dispatchEvent(new Event("change", { bubbles: true }));
          }
        }, 500);

        setGoogleTranslateLoaded(true);
      };

      if (!window.google || !window.google.translate) {
        const script = document.createElement("script");
        script.src =
          "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
      } else {
        window.googleTranslateElementInit();
      }
    };

    initializeGoogleTranslate();

    return () => {
      delete window.googleTranslateElementInit;
    };
  }, []);

  const handleLanguageChange = (eOrLangCode) => {
    const langCode =
      typeof eOrLangCode === "string" ? eOrLangCode : eOrLangCode.target.value;
    setSelectedLanguage(langCode);
    localStorage.setItem("selectedLanguage", langCode);
    setIsOpen(false);

    if (window.google && window.google.translate) {
      const select = document.querySelector(".goog-te-combo");
      if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event("change", { bubbles: true }));

        setTimeout(() => {
          if (!document.body.classList.contains(`translated-${langCode}`)) {
            if (window.google.translate.translatePage) {
              window.google.translate.translatePage(langCode);
            }
          }
        }, 300);
      }

      // Optional reload
      if (langCode === "en") {
        const select = document.querySelector(".goog-te-combo");
        if (select) {
          select.value = "en";
          const event = new Event("change", { bubbles: true });
          select.dispatchEvent(event);
        }
      }
    }
  };

  useEffect(() => {
    const checkCurrentTranslation = () => {
      for (const lang of languages) {
        if (document.body.classList.contains(`translated-${lang.code}`)) {
          setSelectedLanguage(lang.code);
          localStorage.setItem("selectedLanguage", lang.code);
          return;
        }
      }
    };

    checkCurrentTranslation();
    const timer = setTimeout(checkCurrentTranslation, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".language-selector")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="language-selector relative  ">
      {/* Google Translate element (hidden) */}
      <div id="google_translate_element" style={{ display: "none" }}></div>

      {/* Trigger */}
      <div
        className="flex items-center justify-between font-medium py-2.5 xl:py-3 px-4 border border-white/10 rounded-lg gap-2 cursor-pointer text-white bg-transparent"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <img
          src={currentLang?.flag}
          alt="flag"
          className="w-5 h-5 object-cover"
        />
        <span>{currentLang?.name}</span>
        <IoIosArrowDown
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-10 mt-2 w-full bg-black border border-white rounded-lg shadow-lg z-50">
          {languages.map((lang) => (
            <div
              translate="no"
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-white hover:text-black transition-colors cursor-pointer"
            >
              <img
                src={lang.flag}
                alt={lang.name}
                className="w-5 h-5 object-cover"
              />
              <span>{lang.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
