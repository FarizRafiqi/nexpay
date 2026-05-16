import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PaymentsShow({ auth, payment, totalBayar }) {
  const statusStyles = {
    sukses: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border-emerald-200 dark:border-emerald-800',
    tertunda: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 border-amber-200 dark:border-amber-800',
    gagal: 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 border-rose-200 dark:border-rose-800',
  };

  const details = [
    { label: 'Customer', value: payment.customer?.nama || '-' },
    { label: 'Pelanggan PLN', value: payment.pln_customer?.nama_pelanggan || '-' },
    { label: 'Tanggal Bayar', value: payment.tanggal_bayar || '-' },
    { label: 'Biaya Admin', value: `Rp ${parseInt(payment.biaya_admin || 0).toLocaleString('id-ID')}` },
    { label: 'Denda', value: `Rp ${parseInt(payment.denda || 0).toLocaleString('id-ID')}` },
    { label: 'Total Bayar', value: `Rp ${parseInt(totalBayar || 0).toLocaleString('id-ID')}` },
    { label: 'Metode Pembayaran', value: payment.payment_method?.nama || '-' },
    {
      label: 'Status',
      value: <Badge className={`text-[10px] ${statusStyles[payment.status] || ''}`}>{payment.status}</Badge>,
    },
  ];

  return (
    <AuthenticatedLayout auth={auth}>
      <Head title="Detail Pembayaran" />
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
                Detail <span className="text-primary italic">Pembayaran</span>
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
                Informasi Pembayaran
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
