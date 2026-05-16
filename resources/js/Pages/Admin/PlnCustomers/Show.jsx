import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PlnCustomersShow({ auth, plnCustomer }) {
  const details = [
    { label: 'ID Pelanggan', value: plnCustomer.id },
    { label: 'Nama Pelanggan', value: plnCustomer.nama_pelanggan },
    { label: 'Nomor Meter', value: plnCustomer.nomor_meter },
    { label: 'Alamat', value: plnCustomer.alamat },
    { label: 'Tarif / Daya', value: plnCustomer.tariff?.daya || '-' },
    { label: 'Tarif per kWh', value: plnCustomer.tariff?.tarif_per_kwh ? `Rp ${parseInt(plnCustomer.tariff.tarif_per_kwh).toLocaleString('id-ID')}` : '-' },
  ];

  return (
    <AuthenticatedLayout auth={auth}>
      <Head title="Detail Pelanggan" />
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <Link href={route('admin.pln-customers.index')}>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h2 className="text-xl md:text-2xl font-black tracking-tight">
                Detail <span className="text-primary italic">Pelanggan</span>
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {plnCustomer.nama_pelanggan}
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
                <User className="w-4 h-4 text-primary" />
                Informasi Pelanggan
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
