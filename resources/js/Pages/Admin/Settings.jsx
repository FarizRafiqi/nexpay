import * as React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Settings as SettingsIcon,
  Shield,
  Globe,
  Save,
  Moon,
  Sun,
  ArrowUpFromLine,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function Settings({ auth }) {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = React.useState(
    () => document.documentElement.classList.contains('dark')
  );
  const [stickyHeader, setStickyHeader] = React.useState(
    () => localStorage.getItem('sticky_header') !== 'false'
  );
  const [showCurrentPw, setShowCurrentPw] = React.useState(false);
  const [showNewPw, setShowNewPw] = React.useState(false);
  const [showConfirmPw, setShowConfirmPw] = React.useState(false);

  const { data, setData, put, processing, errors, reset } = useForm({
    nama: auth?.user?.nama || '',
    username: auth?.user?.username || '',
    email: auth?.user?.email || '',
    id_level: auth?.user?.id_level || '',
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const toggleSticky = () => {
    const next = !stickyHeader;
    setStickyHeader(next);
    localStorage.setItem('sticky_header', String(next));
    window.dispatchEvent(new Event('storage'));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    put(route('admin.profile.update', auth.user.id), {
      preserveScroll: true,
      onSuccess: () => {
        reset('current_password', 'password', 'password_confirmation');
      },
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title={t('admin.settings')} />

      <div className="flex-1 flex flex-col gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white tracking-tight">
            <span className="text-primary italic">{t('admin.settings')}</span>
          </h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Kelola pengaturan aplikasi dan preferensi Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Tampilan */}
            <Card className="border-none shadow-sm bg-white dark:bg-slate-900">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold text-slate-800 dark:text-white">Preferensi Tampilan</CardTitle>
                    <CardDescription className="text-[11px] text-slate-500 dark:text-slate-400">
                      Sesuaikan tampilan aplikasi sesuai keinginan Anda.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Dark Mode */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 mt-0.5">
                        {darkMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-white">Mode Gelap</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">Gunakan tema gelap untuk tampilan yang lebih nyaman</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={darkMode} onChange={toggleDark} />
                      <div className="w-9 h-5 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                    </label>
                  </div>
                  <Separator className="bg-slate-100 dark:bg-slate-800" />

                  {/* Header Sticky */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 mt-0.5">
                        <ArrowUpFromLine className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-white">Header Sticky</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">Buat header tetap terlihat saat menggulir halaman</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={stickyHeader} onChange={toggleSticky} />
                      <div className="w-9 h-5 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile */}
            <Card className="border-none shadow-sm bg-white dark:bg-slate-900">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <SettingsIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold text-slate-800 dark:text-white">Informasi Profil</CardTitle>
                    <CardDescription className="text-[11px] text-slate-500 dark:text-slate-400">
                      Data akun Anda.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1.5 block">Nama</label>
                    <Input value={auth?.user?.nama || ''} disabled className="bg-slate-50 dark:bg-slate-800" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1.5 block">Username</label>
                    <Input value={auth?.user?.username || ''} disabled className="bg-slate-50 dark:bg-slate-800" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1.5 block">Email</label>
                    <Input value={auth?.user?.email || ''} disabled className="bg-slate-50 dark:bg-slate-800" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Change Password */}
          <div className="lg:col-span-1">
            <Card className="border-none shadow-sm bg-white dark:bg-slate-900">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold text-slate-800 dark:text-white">Ganti Password</CardTitle>
                    <CardDescription className="text-[11px] text-slate-500 dark:text-slate-400">
                      Update password akun Anda.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="relative">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1.5 block">Password Saat Ini</label>
                    <div className="relative">
                      <Input
                        type={showCurrentPw ? 'text' : 'password'}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 pr-9"
                        placeholder="Masukkan password saat ini"
                      />
                      <button type="button" onClick={() => setShowCurrentPw(!showCurrentPw)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        {showCurrentPw ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    {errors.current_password && <p className="text-[10px] text-rose-500 mt-1">{errors.current_password}</p>}
                  </div>
                  <div className="relative">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1.5 block">Password Baru</label>
                    <div className="relative">
                      <Input
                        type={showNewPw ? 'text' : 'password'}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 pr-9"
                        placeholder="Masukkan password baru"
                      />
                      <button type="button" onClick={() => setShowNewPw(!showNewPw)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        {showNewPw ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-[10px] text-rose-500 mt-1">{errors.password}</p>}
                  </div>
                  <div className="relative">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1.5 block">Konfirmasi Password Baru</label>
                    <div className="relative">
                      <Input
                        type={showConfirmPw ? 'text' : 'password'}
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 pr-9"
                        placeholder="Ulangi password baru"
                      />
                      <button type="button" onClick={() => setShowConfirmPw(!showConfirmPw)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        {showConfirmPw ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    {errors.password_confirmation && <p className="text-[10px] text-rose-500 mt-1">{errors.password_confirmation}</p>}
                  </div>
                  <Button type="submit" className="w-full" disabled={processing}>
                    <Save className="w-4 h-4" />
                    {processing ? t('general.loading') : t('settings.save_password')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
