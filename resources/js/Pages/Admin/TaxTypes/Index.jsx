import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Percent } from 'lucide-react';

export default function Index({ auth, taxTypes }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Tipe Pajak" />

            <div className="flex-1 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl md:text-2xl font-black tracking-tight">Tipe Pajak</h2>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Kelola tipe pajak yang tersedia</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={route('admin.tax-rates.index')}>
                            <Button variant="outline">
                                <Percent className="w-4 h-4" />
                                Tarif Pajak
                            </Button>
                        </Link>
                    </div>
                </div>

                <Card className="bg-white dark:bg-slate-900 border-none shadow-sm rounded-xl">
                    <CardContent className="p-0">
                        {taxTypes.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                                <Percent className="w-12 h-12 mb-3" />
                                <p className="text-sm font-medium">Belum ada tipe pajak</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-100 dark:border-slate-800">
                                            <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">ID</th>
                                            <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Nama</th>
                                            <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Jumlah Tarif</th>
                                            <th className="text-right px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {taxTypes.map((type) => (
                                            <tr key={type.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                                <td className="px-4 py-3 text-xs font-mono text-slate-500">#{type.id}</td>
                                                <td className="px-4 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200">{type.nama}</td>
                                                <td className="px-4 py-3">
                                                    <Badge variant="secondary" className="text-[10px] font-bold">
                                                        {type.tax_rates_count || 0} tarif
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Link href={route('admin.tax-types.destroy', type.id)} method="delete" as="button" className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
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
