import { useTranslation } from 'react-i18next';

// Custom hook for type-safe translations
export const useI18n = () => {
  const { t, i18n } = useTranslation();

  // Type-safe translation function
  const translate = (key: string) => {
    return t(key);
  };

  // Language switching function
  const changeLanguage = (language: 'zh' | 'en') => {
    return i18n.changeLanguage(language);
  };

  // Get current language
  const currentLanguage = i18n.language;

  return {
    t: translate,
    i18n,
    changeLanguage,
    currentLanguage,
  };
};