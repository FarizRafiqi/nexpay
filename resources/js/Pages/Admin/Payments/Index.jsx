import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreditCard, Eye, Edit, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import Pagination from '@/components/Pagination';
import { useTranslation } from '@/hooks/useTranslation';

const statusStyles = {
  sukses: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border-emerald-200 dark:border-emerald-800',
  tertunda: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 border-amber-200 dark:border-amber-800',
  gagal: 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 border-rose-200 dark:border-rose-800',
};

export default function PaymentsIndex({ auth, payments }) {
  const { t } = useTranslation();
  return (
    <AuthenticatedLayout auth={auth}>
      <Head title={t('admin.payments')} />
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
          <div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight">
              {t('admin.payments')} <span className="text-primary italic">{t('electricity')}</span>
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              {t('admin.payment_history')}
            </p>
          </div>
        </div>

        <Card className="bg-white dark:bg-slate-900 border-none shadow-sm rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold">{t('admin.payment_history_title')}</CardTitle>
          </CardHeader>
          <CardContent>
            {!payments || (payments.data || []).length === 0 ? (
              <div className="text-center py-12">
                <CreditCard className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
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
                      <th className="text-[10px] font-black uppercase tracking-widest text-slate-400 pb-3 pr-4">{t('dt.pln_customer_name')}</th>
                      <th className="text-[10px] font-black uppercase tracking-widest text-slate-400 pb-3 pr-4">{t('dt.payment_date')}</th>
                      <th className="text-[10px] font-black uppercase tracking-widest text-slate-400 pb-3 pr-4">{t('dt.total_amount')}</th>
                      <th className="text-[10px] font-black uppercase tracking-widest text-slate-400 pb-3 pr-4">{t('dt.status')}</th>
                      <th className="text-[10px] font-black uppercase tracking-widest text-slate-400 pb-3">{t('dt.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(payments.data || []).map((payment, index) => (
                      <motion.tr
                        key={payment.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="py-3 pr-4 text-xs font-mono text-slate-500">{index + 1}</td>
                        <td className="py-3 pr-4 text-xs">{payment.customer?.nama || '-'}</td>
                        <td className="py-3 pr-4 text-xs">{payment.pln_customer?.nama_pelanggan || '-'}</td>
                        <td className="py-3 pr-4 text-xs">{payment.tanggal_bayar || '-'}</td>
                        <td className="py-3 pr-4 text-xs font-medium">
                          Rp {parseInt(payment.total_bayar || 0).toLocaleString('id-ID')}
                        </td>
                        <td className="py-3 pr-4">
                          <Badge className={`text-[10px] ${statusStyles[payment.status] || ''}`}>
                            {payment.status}
                          </Badge>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-1">
                            <Link href={route('admin.payments.show', payment.id)}>
                              <Button variant="ghost" size="icon" className="w-7 h-7">
                                <Eye className="w-3.5 h-3.5" />
                              </Button>
                            </Link>
                            <Link href={route('admin.payments.edit', payment.id)}>
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
              <Pagination paginator={payments} />
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}
