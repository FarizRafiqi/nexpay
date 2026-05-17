import { usePage } from '@inertiajs/react';

export function useTranslation() {
  const { locale, translations } = usePage().props;

  const t = (key, fallback = key) => {
    return translations?.messages?.[key] ?? fallback;
  };

  return { t, locale: locale || 'id' };
}
