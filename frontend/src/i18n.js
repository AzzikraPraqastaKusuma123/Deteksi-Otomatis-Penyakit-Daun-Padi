import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

import enTranslation from '../public/locales/en.json';
import idTranslation from '../public/locales/id.json';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    load: 'languageOnly',
    detection: {
      order: ['cookie', 'localStorage', 'navigator'], // Prioritize explicit user choices
      caches: ['cookie'],
    },
    resources: {
      en: {
        translation: enTranslation,
      },
      id: {
        translation: idTranslation,
      },
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}.json', // Still keep for potential dynamic loading or if needed
    },
  });

export default i18n;
