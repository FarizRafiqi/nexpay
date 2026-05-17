import { usePage, router } from '@inertiajs/react';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher({ variant = 'default' }) {
  const { locale } = usePage().props;
  const current = locale || 'id';

  const toggle = () => {
    const next = current === 'id' ? 'en' : 'id';
    router.get(`/lang/${next}`);
  };

  if (variant === 'minimal') {
    return (
      <button
        onClick={toggle}
        className="flex items-center gap-1.5 px-2 py-1 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer"
      >
        <Globe className="w-3.5 h-3.5" />
        {current === 'id' ? 'EN' : 'ID'}
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-primary transition-all cursor-pointer"
    >
      <Globe className="w-4 h-4" />
      <span>{current === 'id' ? 'EN' : 'ID'}</span>
    </button>
  );
}
