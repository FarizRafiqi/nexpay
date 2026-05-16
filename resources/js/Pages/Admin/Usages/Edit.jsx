import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import SearchableSelect from '@/components/SearchableSelect';

const months = [
  { value: 1, label: 'Januari' },
  { value: 2, label: 'Februari' },
  { value: 3, label: 'Maret' },
  { value: 4, label: 'April' },
  { value: 5, label: 'Mei' },
  { value: 6, label: 'Juni' },
  { value: 7, label: 'Juli' },
  { value: 8, label: 'Agustus' },
  { value: 9, label: 'September' },
  { value: 10, label: 'Oktober' },
  { value: 11, label: 'November' },
  { value: 12, label: 'Desember' },
];

export default function UsagesEdit({ auth, usage, customers }) {
  const { data, setData, put, processing, errors } = useForm({
    id_pelanggan: usage.id_pelanggan || '',
    bulan: usage.bulan || '',
    tahun: usage.tahun || '',
    meter_awal: usage.meter_awal || '',
    meter_akhir: usage.meter_akhir || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('admin.usages.update', usage.id));
  };

  return (
    <AuthenticatedLayout auth={auth}>
      <Head title="Edit Penggunaan" />
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <Link href={route('admin.usages.index')}>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h2 className="text-xl md:text-2xl font-black tracking-tight">
                Edit <span className="text-primary italic">Penggunaan</span>
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                #{usage.id}
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
              <CardTitle className="text-sm font-bold">Edit Informasi Penggunaan</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 block">
                    ID Pelanggan
                  </label>
                  <SearchableSelect
                    value={data.id_pelanggan}
                    onChange={(val) => setData('id_pelanggan', val)}
                    options={(customers || []).map((c) => ({
                      value: c.id,
                      label: `${c.nama_pelanggan} (${c.nomor_meter})`,
                    }))}
                    placeholder="Pilih Pelanggan"
                    searchPlaceholder="Cari pelanggan..."
                  />
                  {errors.id_pelanggan && (
                    <p className="text-[10px] text-rose-500 mt-1">{errors.id_pelanggan}</p>
                  )}
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 block">
                    Bulan
                  </label>
                  <select
                    value={data.bulan}
                    onChange={(e) => setData('bulan', e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
                  >
                    <option value="">Pilih Bulan</option>
                    {months.map((month) => (
                      <option key={month.value} value={month.value}>{month.label}</option>
                    ))}
                  </select>
                  {errors.bulan && (
                    <p className="text-[10px] text-rose-500 mt-1">{errors.bulan}</p>
                  )}
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 block">
                    Tahun
                  </label>
                  <Input
                    value={data.tahun}
                    onChange={(e) => setData('tahun', e.target.value)}
                    placeholder="Masukkan tahun"
                    type="number"
                  />
                  {errors.tahun && (
                    <p className="text-[10px] text-rose-500 mt-1">{errors.tahun}</p>
                  )}
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 block">
                    Meter Awal
                  </label>
                  <Input
                    value={data.meter_awal}
                    onChange={(e) => setData('meter_awal', e.target.value)}
                    placeholder="Masukkan meter awal"
                    type="number"
                  />
                  {errors.meter_awal && (
                    <p className="text-[10px] text-rose-500 mt-1">{errors.meter_awal}</p>
                  )}
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 block">
                    Meter Akhir
                  </label>
                  <Input
                    value={data.meter_akhir}
                    onChange={(e) => setData('meter_akhir', e.target.value)}
                    placeholder="Masukkan meter akhir"
                    type="number"
                  />
                  {errors.meter_akhir && (
                    <p className="text-[10px] text-rose-500 mt-1">{errors.meter_akhir}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button type="submit" disabled={processing} className="h-9 text-xs">
                    <Save className="w-3.5 h-3.5" />
                    {processing ? 'Menyimpan...' : 'Simpan'}
                  </Button>
                  <Link href={route('admin.usages.index')}>
                    <Button type="button" variant="outline" className="h-9 text-xs">
                      Batal
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AuthenticatedLayout>
  );
}
