import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, ShieldOff } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function Index({ auth, levels }) {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title={t('admin.levels')} />

            <div className="flex-1 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl md:text-2xl font-black tracking-tight">{t('admin.levels')}</h2>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Kelola level dan hak akses pengguna</p>
                    </div>
                    <Link href={route('admin.levels.create')}>
                        <Button>
                            <Plus className="w-4 h-4" />
                            {t('general.create')}
                        </Button>
                    </Link>
                </div>

                <Card className="bg-white dark:bg-slate-900 border-none shadow-sm rounded-xl">
                    <CardContent className="p-0">
                        {levels.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                                <ShieldOff className="w-12 h-12 mb-3" />
                                <p className="text-sm font-medium">{t('dt.no_data')}</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-100 dark:border-slate-800">
                                            <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">No.</th>
                                            <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">{t('dt.level')}</th>
                                            <th className="text-right px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">{t('dt.actions')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {levels.map((level, index) => (
                                            <tr key={level.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                                <td className="px-4 py-3 text-xs font-mono text-slate-500">{index + 1}</td>
                                                <td className="px-4 py-3">
                                                    <Badge variant="secondary" className="text-xs font-bold">{level.level}</Badge>
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Link href={route('admin.levels.edit', level.id)}>
                                                            <Button variant="ghost" size="sm">
                                                                <Pencil className="w-3.5 h-3.5" />
                                                            </Button>
                                                        </Link>
                                                        <Link href={route('admin.levels.destroy', level.id)} method="delete" as="button" className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
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
