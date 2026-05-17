import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, FileText, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import Pagination from '@/components/Pagination';
import { useTranslation } from '@/hooks/useTranslation';

export default function BillsIndex({ auth, bills }) {
  const { t } = useTranslation();
  return (
    <AuthenticatedLayout auth={auth}>
      <Head title={t('admin.bills')} />
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
          <div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight">
              {t('admin.bills')} <span className="text-primary italic">Listrik</span>
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              {t('admin.payment_history')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-700 dark:text-amber-400">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {t('admin.payment_history')}
        </div>

        <Card className="bg-white dark:bg-slate-900 border-none shadow-sm rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold">{t('admin.payment_history')}</CardTitle>
          </CardHeader>
          <CardContent>
            {!bills || (bills.data || []).length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{t('dt.no_data')}</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <th className="text-[10px] font-black uppercase tracking-widest text-slate-400 pb-3 pr-4">No.</th>
                      <th className="text-[10px] font-black uppercase tracking-widest text-slate-400 pb-3 pr-4">{t('dt.bill_id')}</th>
                      <th className="text-[10px] font-black uppercase tracking-widest text-slate-400 pb-3 pr-4">{t('dt.bulan')}</th>
                      <th className="text-[10px] font-black uppercase tracking-widest text-slate-400 pb-3 pr-4">{t('dt.tahun')}</th>
                      <th className="text-[10px] font-black uppercase tracking-widest text-slate-400 pb-3 pr-4">{t('dt.jumlah_kwh')}</th>
                      <th className="text-[10px] font-black uppercase tracking-widest text-slate-400 pb-3">{t('dt.status')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(bills.data || []).map((bill, index) => (
                      <motion.tr
                        key={bill.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="py-3 pr-4 text-xs font-mono text-slate-500">{index + 1}</td>
                        <td className="py-3 pr-4 text-xs">{bill.id_penggunaan}</td>
                        <td className="py-3 pr-4 text-xs">{bill.bulan}</td>
                        <td className="py-3 pr-4 text-xs">{bill.tahun}</td>
                        <td className="py-3 pr-4 text-xs font-medium">{bill.jumlah_kwh}</td>
                        <td className="py-3">
                          <Badge
                            variant={bill.status === 'lunas' ? 'default' : bill.status === 'tertunda' ? 'secondary' : 'destructive'}
                            className="text-[10px]"
                          >
                            {bill.status}
                          </Badge>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination paginator={bills} />
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}
