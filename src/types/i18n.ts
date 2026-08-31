export type Language = 'en' | 'ko';

export type LocalizedText = {
  en: string;
  ko?: string;
};

export function getLocalizedText(text: LocalizedText | string | undefined, lang: Language): string {
  if (!text) return '';
  if (typeof text === 'string') return text;
  if (lang === 'ko' && text.ko) return text.ko;
  return text.en || '';
}

