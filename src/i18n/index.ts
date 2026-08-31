import { Language } from '../types/i18n';
import { en, Translations } from './en';
import { ko } from './ko';

export const translations: Record<Language, Translations> = {
  en,
  ko,
};

export function getTranslation(lang: Language): Translations {
  return translations[lang] || translations.en;
}

