import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function Create({ auth, levels }) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        nama: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        level_id: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('admin.users.store'));
    }

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title={t('admin.users')} />

            <div className="flex-1 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl md:text-2xl font-black tracking-tight">{t('admin.users')}</h2>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Buat akun pengguna baru</p>
                    </div>
                    <Link href={route('admin.users.index')}>
                        <Button variant="outline">
                            <ArrowLeft className="w-4 h-4" />
                            {t('general.back')}
                        </Button>
                    </Link>
                </div>

                <Card className="bg-white dark:bg-slate-900 border-none shadow-sm rounded-xl">
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{t('dt.full_name')}</label>
                                <Input
                                    placeholder="John Doe"
                                    value={data.nama}
                                    onChange={(e) => setData('nama', e.target.value)}
                                />
                                {errors.nama && <p className="text-[10px] text-red-500">{errors.nama}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{t('dt.username')}</label>
                                <Input
                                    placeholder="johndoe"
                                    value={data.username}
                                    onChange={(e) => setData('username', e.target.value)}
                                />
                                {errors.username && <p className="text-[10px] text-red-500">{errors.username}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{t('dt.email')}</label>
                                <Input
                                    type="email"
                                    placeholder="john@example.com"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                {errors.email && <p className="text-[10px] text-red-500">{errors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{t('dt.password')}</label>
                                <Input
                                    type="password"
                                    placeholder="Min. 8 karakter"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                {errors.password && <p className="text-[10px] text-red-500">{errors.password}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{t('dt.confirm_password')}</label>
                                <Input
                                    type="password"
                                    placeholder="Ulangi password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{t('dt.level')}</label>
                                <select
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    value={data.level_id}
                                    onChange={(e) => setData('level_id', e.target.value)}
                                >
                                    <option value="">{t('general.select')} {t('dt.level')}</option>
                                    {levels.map((level) => (
                                        <option key={level.id} value={level.id}>{level.level}</option>
                                    ))}
                                </select>
                                {errors.level_id && <p className="text-[10px] text-red-500">{errors.level_id}</p>}
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <Button type="submit" disabled={processing}>
                                    <Save className="w-4 h-4" />
                                    {t('general.save')}
                                </Button>
                                <Link href={route('admin.users.index')}>
                                    <Button type="button" variant="ghost">{t('general.cancel')}</Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
