import { useState } from "react";
import Button from "../../Button";
import { LanguageChangeContainer } from "./component.styled";
import { Translation } from "react-i18next";
import { i18n } from "i18next";
enum Language {
  en = "EN",
  pl = "PL",
}
export const LanguageChange = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(Language.pl);
  const languageChange = (i18n: { i18n: i18n; lng: string }) => {
    i18n.i18n.changeLanguage(currentLanguage.toLowerCase());
    setCurrentLanguage(
      currentLanguage === Language.en ? Language.pl : Language.en
    );
  };
  return (
    <Translation>
      {(_, i18n) => (
        <LanguageChangeContainer>
          <Button outline="without" onClick={() => languageChange(i18n)}>
            {currentLanguage}
          </Button>
        </LanguageChangeContainer>
      )}
    </Translation>
  );
};
