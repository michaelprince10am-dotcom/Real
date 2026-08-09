import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language, LanguageCode } from '../types';
import { LANGUAGES, TRANSLATIONS } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguageCode: (code: LanguageCode) => void;
  t: (key: string, fallback?: string) => string;
  languages: Language[];
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [langCode, setLangCode] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('aura_lang') as LanguageCode | null;
    if (saved && LANGUAGES.some((l) => l.code === saved)) {
      return saved;
    }
    // Try matching navigator language
    const navLang = navigator.language.split('-')[0] as LanguageCode;
    if (LANGUAGES.some((l) => l.code === navLang)) {
      return navLang;
    }
    return 'en';
  });

  const currentLang = LANGUAGES.find((l) => l.code === langCode) || LANGUAGES[0];
  const isRTL = !!currentLang.rtl;

  useEffect(() => {
    localStorage.setItem('aura_lang', langCode);
    document.documentElement.lang = langCode;
    if (isRTL) {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [langCode, isRTL]);

  const setLanguageCode = (code: LanguageCode) => {
    if (LANGUAGES.some((l) => l.code === code)) {
      setLangCode(code);
    }
  };

  const t = (key: string, fallback?: string): string => {
    const dict = TRANSLATIONS[langCode] || TRANSLATIONS['en'];
    if (dict[key]) return dict[key];
    // Fallback to English dictionary
    if (TRANSLATIONS['en'][key]) return TRANSLATIONS['en'][key];
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language: currentLang, setLanguageCode, t, languages: LANGUAGES, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
