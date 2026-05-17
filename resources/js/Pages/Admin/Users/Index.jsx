import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, Eye, Users as UsersIcon, Info, ShieldAlert } from 'lucide-react';
import Pagination from '@/components/Pagination';
import { useTranslation } from '@/hooks/useTranslation';

export default function Index({ auth, users }) {
    const { t } = useTranslation();
    const currentUserId = auth?.user?.id;
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title={t('admin.users')} />

            <div className="flex-1 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl md:text-2xl font-black tracking-tight">{t('admin.users')}</h2>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Kelola data pengguna aplikasi</p>
                    </div>
                    <Link href={route('admin.users.create')}>
                        <Button>
                            <Plus className="w-4 h-4" />
                            {t('general.create')}
                        </Button>
                    </Link>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
                    <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    <p className="text-[11px] text-blue-700 dark:text-blue-300">
                        Fitur manajemen pengguna. Anda dapat menambah, mengedit, melihat detail, dan menghapus pengguna.
                    </p>
                </div>

                <Card className="bg-white dark:bg-slate-900 border-none shadow-sm rounded-xl">
                    <CardContent className="p-0">
                        {(!users || (users.data || []).length === 0) ? (
                            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                                <UsersIcon className="w-12 h-12 mb-3" />
                                <p className="text-sm font-medium">{t('dt.no_data')}</p>
                            </div>
                        ) : (
                            <>
                                <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-100 dark:border-slate-800">
                                            <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">No.</th>
                                            <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">{t('dt.customer_name')}</th>
                                            <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">{t('dt.username')}</th>
                                            <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">{t('dt.email')}</th>
                                            <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">{t('dt.level')}</th>
                                            <th className="text-right px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">{t('dt.actions')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(users.data || []).map((user, index) => {
                                            const isAdmin = user.level?.level === 'administrator';
                                            const isSelf = user.id === currentUserId;
                                            return (
                                            <tr key={user.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                                <td className="px-4 py-3 text-xs font-mono text-slate-500">{index + 1}</td>
                                                <td className="px-4 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200">{user.nama}</td>
                                                <td className="px-4 py-3 text-xs text-slate-500">{user.username}</td>
                                                <td className="px-4 py-3 text-xs text-slate-500">{user.email}</td>
                                                <td className="px-4 py-3">
                                                    {user.level && (
                                                        <Badge variant="secondary" className="text-[10px] font-bold">{user.level.level}</Badge>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Link href={route('admin.users.show', user.id)}>
                                                            <Button variant="ghost" size="sm">
                                                                <Eye className="w-3.5 h-3.5" />
                                                            </Button>
                                                        </Link>
                                                        <Link href={route('admin.users.edit', user.id)}>
                                                            <Button variant="ghost" size="sm">
                                                                <Pencil className="w-3.5 h-3.5" />
                                                            </Button>
                                                        </Link>
                                                        {isAdmin ? (
                                                            <span className="p-1.5 rounded-lg text-slate-300 cursor-not-allowed" title="Tidak dapat menghapus admin">
                                                                <ShieldAlert className="w-3.5 h-3.5" />
                                                            </span>
                                                        ) : (
                                                            <Link href={route('admin.users.destroy', user.id)} method="delete" as="button" className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                                                <Trash2 className="w-3.5 h-3.5 text-red-500" />
                                                            </Link>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination paginator={users} />
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
