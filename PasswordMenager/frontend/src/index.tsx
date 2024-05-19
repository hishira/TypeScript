import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/App/App";
import reportWebVitals from "./reportWebVitals";
import { initializeFunction } from "./i18n";
// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import en from "./public/translations/en.json";
// import pl from "./public/translations/pl.json";
// i18n.use(initReactI18next).init({
//   resources: {
//     en: {
//       translation: en,
//     },
//     pl: {
//       translation: pl,
//     },
//   },
//   lng: "en",
//   fallbackLng: "eng",
//   interpolation: {
//     escapeValue: false,
//   },
// });
initializeFunction();
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
