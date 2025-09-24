import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import zhTranslation from './locales/zh.json';
import enTranslation from './locales/en.json';

export const resources = {
  zh: {
    translation: zhTranslation,
  },
  en: {
    translation: enTranslation,
  },
} as const;

i18n
  .use(LanguageDetector) // Auto-detect user language
  .use(initReactI18next) // Initialize react-i18next
  .init({
    resources,

    // Default language
    fallbackLng: 'zh',

    // Debug mode (enable in development)
    debug: process.env.NODE_ENV === 'development',

    // Interpolation configuration
    interpolation: {
      escapeValue: false, // React already handles XSS safety
    },

    // Language detection configuration
    detection: {
      // Detection order: URL params -> localStorage -> browser language -> default
      order: ['querystring', 'localStorage', 'navigator', 'htmlTag'],

      // localStorage key
      lookupLocalStorage: 'i18nextLng',

      // URL parameter name
      lookupQuerystring: 'lng',

      // Cache user's language choice
      caches: ['localStorage'],
    },
  });

export default i18n;