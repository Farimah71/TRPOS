import { useEffect, useState } from "react";
import { IconArrowDown, IconArrowRight } from "../icons/icons";
import TrFlag from "../../assets/images/flags/TrFlag.png";

export const LanguageBox = () => {
  // ---------- variables ----------
  const languages = [
    {
      id: 1,
      title: "Türkçe",
      code: "TR",
      icon: TrFlag,
    }, // {
    //   id: 2,
    //   title: "English",
    //   code: "en",
    //   icon: EnFlag,
    // },
  ];
  // ---------- states ----------
  const [currentLanguage, setCurrentLanguage] = useState("TR");
  const [isShowLanguages, setIsShowLanguages] = useState(false);

  // ---------- hooks ----------
  const lng = localStorage.trpos__lng;

  // ---------- lifeCycle ----------
  useEffect(() => {
    lng && setCurrentLanguage(lng);
  }, [lng]);

  // ---------- functions ----------
  const onChangeLng = (code: string) => {
    localStorage.trpos__lng = code;
    setCurrentLanguage(code);
  };
  const toggleLanguages = () => {
    setIsShowLanguages((currState) => !currState);
  };

  // ---------- render jsx ----------
  return (
    <div
      className="relative text-base flex items-center gap-x-2 px-3 cursor-pointer"
      onClick={toggleLanguages}
    >
      {isShowLanguages && (
        <div className="absolute border bg-white w-32 p-2 rounded-lg top-10 -left-4 md:left-0 flex flex-col gap-y-2 shadow-custom-gray dark:bg-dark_custom-light-black">
          {languages.map((language) => (
            <div
              key={language.id}
              className="flex items-center gap-x-2 py-1 px-2 rounded-11 z-10 dark:hover:text-dark_custom-light-black cursor-pointer duration-100 ease-in-out hover:bg-custom-gray-light"
              onClick={() => onChangeLng(language.code)}
            >
              <img
                src={language.icon}
                alt="flag"
                className="w-5 h-5 rounded-full"
              />
              <p className="text-14">{language.title}</p>
            </div>
          ))}
        </div>
      )}
      <img src={TrFlag} alt="flag" className="w-5 h-5 rounded-full" />
      <p className="text-base-content-40 select-none">
        {currentLanguage === "en" ? "English" : "Türkçe"}
      </p>

      {isShowLanguages ? (
        <IconArrowRight color="gray" className="-rotate-90 -translate-y-1" />
      ) : (
        <IconArrowDown color="gray" className="opacity-40 translate-y-1.5" />
      )}
    </div>
  );
};
