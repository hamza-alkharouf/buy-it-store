import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import translationAR from "./locale/ar"
import translationEN from "./locale/en"

const resources = {
  en: {
    translation: translationEN
  },
  ar: {
    translation: translationAR
  }
};
const DETECTION_OPTIONS = {
  order: ['localStorage', 'navigator'],
  caches: ['localStorage']
};

i18n
.use(LanguageDetector)
  .use(initReactI18next) 
  .init({
    resources,
    detection: DETECTION_OPTIONS,
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false 
    },
    // react:{
    //     useSuspense:false
    // }
  });

  export default i18n;