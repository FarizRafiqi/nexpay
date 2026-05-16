import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Plus, Eye, Edit } from 'lucide-react';
import { motion } from 'framer-motion';
import Pagination from '@/components/Pagination';

export default function UsagesIndex({ auth, usages }) {
  return (
    <AuthenticatedLayout auth={auth}>
      <Head title="Penggunaan Listrik" />
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
          <div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight">
              Penggunaan <span className="text-primary italic">Listrik</span>
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Data pemakaian listrik pelanggan
            </p>
          </div>
          <Link href={route('admin.usages.create')}>
            <Button className="h-9 text-xs">
              <Plus className="w-3.5 h-3.5" />
              Tambah Penggunaan
            </Button>
          </Link>
        </div>

        <Card className="bg-white dark:bg-slate-900 border-none shadow-sm rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold">Riwayat Penggunaan</CardTitle>
          </CardHeader>
          <CardContent>
            {!usages || (usages.data || []).length === 0 ? (
              <div className="text-center py-12">
                <Activity className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Tidak ada data penggunaan</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <th className="text-[10px] font-black uppercase tracking-widest text-slate-400 pb-3 pr-4">ID</th>
                      <th className="text-[10px] font-black uppercase tracking-widest text-slate-400 pb-3 pr-4">ID Pelanggan</th>
                      <th className="text-[10px] font-black uppercase tracking-widest text-slate-400 pb-3 pr-4">Bulan</th>
                      <th className="text-[10px] font-black uppercase tracking-widest text-slate-400 pb-3 pr-4">Tahun</th>
                      <th className="text-[10px] font-black uppercase tracking-widest text-slate-400 pb-3 pr-4">Meter Awal</th>
                      <th className="text-[10px] font-black uppercase tracking-widest text-slate-400 pb-3 pr-4">Meter Akhir</th>
                      <th className="text-[10px] font-black uppercase tracking-widest text-slate-400 pb-3">Jumlah</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(usages.data || []).map((usage) => (
                      <motion.tr
                        key={usage.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="py-3 pr-4 text-xs font-bold">{usage.id}</td>
                        <td className="py-3 pr-4 text-xs">{usage.id_pelanggan}</td>
                        <td className="py-3 pr-4 text-xs capitalize">{usage.bulan}</td>
                        <td className="py-3 pr-4 text-xs">{usage.tahun}</td>
                        <td className="py-3 pr-4 text-xs">{usage.meter_awal}</td>
                        <td className="py-3 pr-4 text-xs">{usage.meter_akhir}</td>
                        <td className="py-3 pr-4 text-xs font-medium">{usage.jumlah}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-1">
                            <Link href={route('admin.usages.show', usage.id)}>
                              <Button variant="ghost" size="icon" className="w-7 h-7">
                                <Eye className="w-3.5 h-3.5" />
                              </Button>
                            </Link>
                            <Link href={route('admin.usages.edit', usage.id)}>
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
              <Pagination paginator={usages} />
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}
