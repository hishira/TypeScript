import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./public/translations/en.json";
import pl from "./public/translations/pl.json";
export const initializeFunction = (): void => {
  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: en,
      },
      pl: {
        translation: pl,
      },
    },
    lng: "en",
    fallbackLng: "eng",
    interpolation: {
      escapeValue: false,
    },
  });
};

export default { i18n, initializeFunction };
