import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

export default function PaymentsShow({ auth, payment, totalBayar }) {
  const { t } = useTranslation();

  if (!payment) {
    return (
      <AuthenticatedLayout auth={auth}>
        <Head title={t('admin.payments')} />
        <div className="flex-1 flex flex-col gap-4 p-8">
          <p className="text-center text-slate-500">{t('dt.no_data')}</p>
        </div>
      </AuthenticatedLayout>
    );
  }

  const statusStyles = {
    sukses: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border-emerald-200 dark:border-emerald-800',
    tertunda: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 border-amber-200 dark:border-amber-800',
    gagal: 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 border-rose-200 dark:border-rose-800',
  };

  const details = [
    { label: t('dt.customer_name'), value: payment.customer?.nama || '-' },
    { label: t('dt.pln_customer_name'), value: payment.pln_customer?.nama_pelanggan || '-' },
    { label: t('dt.payment_date'), value: payment.tanggal_bayar || '-' },
    { label: t('dt.admin_fee'), value: `Rp ${parseInt(payment.biaya_admin || 0).toLocaleString('id-ID')}` },
    { label: t('dt.penalty'), value: `Rp ${parseInt(payment.denda || 0).toLocaleString('id-ID')}` },
    { label: t('dt.total_amount'), value: `Rp ${parseInt(totalBayar || 0).toLocaleString('id-ID')}` },
    { label: t('dt.payment_method'), value: payment.payment_method?.nama || '-' },
    {
      label: t('dt.status'),
      value: <Badge className={`text-[10px] ${statusStyles[payment.status] || ''}`}>{payment.status}</Badge>,
    },
  ];

  return (
    <AuthenticatedLayout auth={auth}>
      <Head title={t('admin.payment_detail')} />
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <Link href={route('admin.payments.index')}>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h2 className="text-xl md:text-2xl font-black tracking-tight">
                {t('admin.payment_detail')}
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                #{payment.id}
              </p>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-white dark:bg-slate-900 border-none shadow-sm rounded-xl">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-primary" />
                {t('admin.payment_info')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {details.map((detail, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                      {detail.label}
                    </p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-white">
                      {detail.value}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AuthenticatedLayout>
  );
}
