import tr from './locales/tr.json';
import en from './locales/en.json';
import type { Locale } from './types';

const dictionaries = { tr, en } as const;
export type TranslationKey = keyof typeof tr;

export const translate = (locale: Locale, key: TranslationKey) => dictionaries[locale][key] ?? key;

export const formatCurrency = (locale: Locale, value: number, currency = 'USD') =>
  new Intl.NumberFormat(locale === 'tr' ? 'tr-TR' : 'en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value);
