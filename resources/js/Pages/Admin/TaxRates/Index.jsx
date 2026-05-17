import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Tag } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function Index({ auth, taxRates }) {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title={t('admin.tax_rates')} />

            <div className="flex-1 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl md:text-2xl font-black tracking-tight">{t('admin.tax_rates')}</h2>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{t('admin.tax_management')}</p>
                    </div>
                </div>

                <Card className="bg-white dark:bg-slate-900 border-none shadow-sm rounded-xl">
                    <CardContent className="p-0">
                        {taxRates.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                                <Tag className="w-12 h-12 mb-3" />
                                <p className="text-sm font-medium">{t('dt.no_data')}</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-100 dark:border-slate-800">
                                            <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">No.</th>
                                            <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">{t('admin.tax_types')}</th>
                                            <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Rate</th>
                                            <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Kota</th>
                                            <th className="text-right px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">{t('dt.actions')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {taxRates.map((rate, index) => (
                                            <tr key={rate.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                                <td className="px-4 py-3 text-xs font-mono text-slate-500">{index + 1}</td>
                                                <td className="px-4 py-3">
                                                    {rate.tax_type ? (
                                                        <Badge variant="secondary" className="text-[10px] font-bold">{rate.tax_type.name}</Badge>
                                                    ) : (
                                                        <span className="text-xs text-slate-400">-</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200">
                                                    {rate.rate}%
                                                </td>
                                                <td className="px-4 py-3 text-xs text-slate-500">
                                                    {rate.city?.name || t('dt.no_data')}
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Link href={route('admin.tax-rates.destroy', rate.id)} method="delete" as="button" className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                                            <Trash2 className="w-3.5 h-3.5 text-red-500" />
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
