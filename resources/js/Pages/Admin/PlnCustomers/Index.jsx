import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Pagination from '@/components/Pagination';
import { useTranslation } from '@/hooks/useTranslation';

export default function PlnCustomersIndex({ auth, plnCustomers }) {
  const { t } = useTranslation();
  return (
    <AuthenticatedLayout auth={auth}>
      <Head title={t('admin.customers')} />
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
          <div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight">
              {t('admin.customers')} <span className="text-primary italic">PLN</span>
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              {t('admin.customers')}
            </p>
          </div>
          <Link href={route('admin.pln-customers.create')}>
            <Button className="h-9 text-xs">
              <Plus className="w-3.5 h-3.5" />
              {t('general.create')}
            </Button>
          </Link>
        </div>

        <Card className="bg-white dark:bg-slate-900 border-none shadow-sm rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold">{t('admin.customers')}</CardTitle>
          </CardHeader>
          <CardContent>
            {!plnCustomers || (plnCustomers.data || []).length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{t('dt.no_data')}</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800">
                        <th className="text-[10px] font-black uppercase tracking-widest text-slate-400 pb-3 pr-4">No.</th>
                        <th className="text-[10px] font-black uppercase tracking-widest text-slate-400 pb-3 pr-4">{t('dt.customer_name')}</th>
                        <th className="text-[10px] font-black uppercase tracking-widest text-slate-400 pb-3 pr-4">{t('dt.nomor_meter')}</th>
                        <th className="text-[10px] font-black uppercase tracking-widest text-slate-400 pb-3 pr-4">{t('dt.daya')}</th>
                        <th className="text-[10px] font-black uppercase tracking-widest text-slate-400 pb-3 pr-4">{t('dt.alamat')}</th>
                        <th className="text-[10px] font-black uppercase tracking-widest text-slate-400 pb-3">{t('dt.actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(plnCustomers.data || []).map((customer, index) => (
                        <motion.tr
                          key={customer.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                        >
                          <td className="py-3 pr-4 text-xs font-mono text-slate-500">{index + 1}</td>
                          <td className="py-3 pr-4 text-xs font-medium">{customer.nama_pelanggan}</td>
                          <td className="py-3 pr-4 text-xs">{customer.nomor_meter}</td>
                          <td className="py-3 pr-4 text-xs">{customer.tariff?.daya || '-'}</td>
                          <td className="py-3 pr-4 text-xs text-slate-500 max-w-[200px] truncate">{customer.alamat}</td>
                          <td className="py-3">
                            <div className="flex items-center gap-1">
                              <Link href={route('admin.pln-customers.show', customer.id)}>
                                <Button variant="ghost" size="icon" className="w-7 h-7">
                                  <Eye className="w-3.5 h-3.5" />
                                </Button>
                              </Link>
                              <Link href={route('admin.pln-customers.edit', customer.id)}>
                                <Button variant="ghost" size="icon" className="w-7 h-7">
                                  <Edit className="w-3.5 h-3.5" />
                                </Button>
                              </Link>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination paginator={plnCustomers} />
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}
