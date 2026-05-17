import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function Create({ auth }) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        daya: '',
        tarif_per_kwh: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('admin.tariffs.store'));
    }

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title={t('general.create')} />

            <div className="flex-1 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl md:text-2xl font-black tracking-tight">{t('general.create')}</h2>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{t('admin.tariffs')}</p>
                    </div>
                    <Link href={route('admin.tariffs.index')}>
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
                                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Daya (VA)</label>
                                <Input
                                    type="number"
                                    placeholder="Contoh: 900"
                                    value={data.daya}
                                    onChange={(e) => setData('daya', e.target.value)}
                                />
                                {errors.daya && <p className="text-[10px] text-red-500">{errors.daya}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Tarif per KWh (Rp)</label>
                                <Input
                                    type="number"
                                    placeholder="Contoh: 1444"
                                    value={data.tarif_per_kwh}
                                    onChange={(e) => setData('tarif_per_kwh', e.target.value)}
                                />
                                {errors.tarif_per_kwh && <p className="text-[10px] text-red-500">{errors.tarif_per_kwh}</p>}
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <Button type="submit" disabled={processing}>
                                    <Save className="w-4 h-4" />
                                    {t('general.save')}
                                </Button>
                                <Link href={route('admin.tariffs.index')}>
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
