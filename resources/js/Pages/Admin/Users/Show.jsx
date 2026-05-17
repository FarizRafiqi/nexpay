import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Pencil, Mail, User, AtSign, Shield, Calendar } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function Show({ auth, user }) {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title={t('admin.users')} />

            <div className="flex-1 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl md:text-2xl font-black tracking-tight">{t('admin.users')}</h2>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Informasi lengkap pengguna</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={route('admin.users.edit', user.id)}>
                            <Button variant="outline">
                                <Pencil className="w-4 h-4" />
                                {t('general.edit')}
                            </Button>
                        </Link>
                        <Link href={route('admin.users.index')}>
                            <Button variant="outline">
                                <ArrowLeft className="w-4 h-4" />
                                {t('general.back')}
                            </Button>
                        </Link>
                    </div>
                </div>

                <Card className="bg-white dark:bg-slate-900 border-none shadow-sm rounded-xl overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-primary via-blue-500 to-purple-500" />
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl font-black">
                                {user.nama?.charAt(0) || '?'}
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-slate-800 dark:text-white">{user.nama}</h3>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400">@{user.username}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-500 flex items-center justify-center">
                                    <User className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t('dt.full_name')}</p>
                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{user.nama}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 flex items-center justify-center">
                                    <AtSign className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t('dt.username')}</p>
                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{user.username}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-500 flex items-center justify-center">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t('dt.email')}</p>
                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{user.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                <div className="w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-500 flex items-center justify-center">
                                    <Shield className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t('dt.level')}</p>
                                    {user.level ? (
                                        <Badge variant="secondary" className="text-[10px] font-bold mt-0.5">{user.level.level}</Badge>
                                    ) : (
                                        <p className="text-sm text-slate-400">-</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center">
                                    <Calendar className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t('dt.joined')}</p>
                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                      {user.created_at
                                        ? new Date(user.created_at).toLocaleDateString('id-ID', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                          })
                                        : '-'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
