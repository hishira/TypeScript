import { Translation as TT, useTranslation } from "react-i18next";

export const TranslationFunction = (translationPath: string) => {
  const { t } = useTranslation();
  return t(translationPath);
};
export const Translation = (
  translationPath: string,
  options?: Record<any, any>
) => {
  return <TT>{(t, i18n) => t(translationPath, options)}</TT>;
};
