import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, ShieldOff } from 'lucide-react';
import Pagination from '@/components/Pagination';
import { useTranslation } from '@/hooks/useTranslation';

export default function Index({ auth, permissions }) {
    const { t } = useTranslation();
    const items = permissions?.data || permissions || []

  return (
    <AuthenticatedLayout auth={auth}>
      <Head title={t('admin.permissions')} />

      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight">{t('admin.permissions')}</h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Kelola hak akses permission</p>
          </div>
          <Link href={route('admin.permissions.create')}>
            <Button>
              <Plus className="w-4 h-4" />
              {t('general.create')}
            </Button>
          </Link>
        </div>

        <Card className="bg-white dark:bg-slate-900 border-none shadow-sm rounded-xl">
          <CardContent className="p-0">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                <ShieldOff className="w-12 h-12 mb-3" />
                <p className="text-sm font-medium">{t('dt.no_data')}</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800">
                        <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">No.</th>
                        <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">{t('dt.title')}</th>
                        <th className="text-right px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">{t('dt.actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((perm, index) => (
                        <tr key={perm.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="px-4 py-3 text-xs font-mono text-slate-500">{index + 1}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200">{perm.title}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Link href={route('admin.permissions.edit', perm.id)}>
                                <Button variant="ghost" size="sm">
                                  <Pencil className="w-3.5 h-3.5" />
                                </Button>
                              </Link>
                              <Link href={route('admin.permissions.destroy', perm.id)} method="delete" as="button" className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                <Trash2 className="w-3.5 h-3.5 text-red-500" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination paginator={permissions} />
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}
