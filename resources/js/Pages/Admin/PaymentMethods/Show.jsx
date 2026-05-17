import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

export default function PaymentMethodsShow({ auth, paymentMethod }) {
  const { t } = useTranslation();
  const details = [
    { label: 'Nama', value: paymentMethod.nama },
    { label: 'Slug', value: paymentMethod.slug },
  ];

  return (
    <AuthenticatedLayout auth={auth}>
      <Head title={t('admin.payment_methods')} />
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <Link href={route('admin.payment-methods.index')}>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h2 className="text-xl md:text-2xl font-black tracking-tight">
                <span>{t('admin.payment_methods')}</span>
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {paymentMethod.nama}
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
                {t('admin.payment_methods')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {paymentMethod.gambar_url && (
                <div className="mb-4">
                  <img
                    src={paymentMethod.gambar_url}
                    alt={paymentMethod.nama}
                    className="w-16 h-16 object-contain rounded-xl bg-slate-50 dark:bg-slate-800 p-2"
                  />
                </div>
              )}
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
