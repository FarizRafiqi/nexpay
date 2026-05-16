import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import SearchableSelect from '@/components/SearchableSelect';

export default function PlnCustomersEdit({ auth, plnCustomer, tariffs, provinces }) {
  const { data, setData, put, processing, errors } = useForm({
    nama_pelanggan: plnCustomer.nama_pelanggan || '',
    nomor_meter: plnCustomer.nomor_meter || '',
    alamat: plnCustomer.alamat || '',
    id_kota: plnCustomer.id_kota || '',
    id_tarif: plnCustomer.id_tarif || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('admin.pln-customers.update', plnCustomer.id));
  };

  return (
    <AuthenticatedLayout auth={auth}>
      <Head title="Edit Pelanggan" />
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
                Edit <span className="text-primary italic">Pelanggan</span>
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
              <CardTitle className="text-sm font-bold">Edit Informasi Pelanggan</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 block">
                    Nama Pelanggan <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    value={data.nama_pelanggan}
                    onChange={(e) => setData('nama_pelanggan', e.target.value)}
                    placeholder="Masukkan nama pelanggan"
                  />
                  {errors.nama_pelanggan && (
                    <p className="text-[10px] text-rose-500 mt-1">{errors.nama_pelanggan}</p>
                  )}
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 block">
                    Nomor Meter <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    value={data.nomor_meter}
                    onChange={(e) => setData('nomor_meter', e.target.value)}
                    placeholder="Masukkan nomor meter"
                  />
                  {errors.nomor_meter && (
                    <p className="text-[10px] text-rose-500 mt-1">{errors.nomor_meter}</p>
                  )}
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 block">
                    Alamat
                  </label>
                  <textarea
                    value={data.alamat}
                    onChange={(e) => setData('alamat', e.target.value)}
                    placeholder="Masukkan alamat"
                    rows={3}
                    className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
                  />
                  {errors.alamat && (
                    <p className="text-[10px] text-rose-500 mt-1">{errors.alamat}</p>
                  )}
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 block">
                    Kota <span className="text-rose-500">*</span>
                  </label>
                  <SearchableSelect
                    value={data.id_kota}
                    onChange={(val) => setData('id_kota', val)}
                    options={(provinces || []).flatMap((p) =>
                      (p.cities || []).map((c) => ({
                        value: c.code,
                        label: c.name,
                        group: p.name,
                      }))
                    )}
                    placeholder="Pilih Kota"
                    searchPlaceholder="Cari kota..."
                    groupBy={true}
                    error={errors.id_kota}
                  />
                  {errors.id_kota && (
                    <p className="text-[10px] text-rose-500 mt-1">{errors.id_kota}</p>
                  )}
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 block">
                    Golongan Tarif <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={data.id_tarif}
                    onChange={(e) => setData('id_tarif', e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
                  >
                    <option value="">Pilih Golongan Tarif</option>
                    {tariffs?.map((tariff) => (
                      <option key={tariff.id} value={tariff.id}>
                        {tariff.golongan_tarif} / {parseInt(tariff.daya || 0).toLocaleString('id-ID')} VA - Rp {parseInt(tariff.tarif_per_kwh || 0).toLocaleString('id-ID')}/kWh
                      </option>
                    ))}
                  </select>
                  {errors.id_tarif && (
                    <p className="text-[10px] text-rose-500 mt-1">{errors.id_tarif}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button type="submit" disabled={processing} className="h-9 text-xs">
                    <Save className="w-3.5 h-3.5" />
                    {processing ? 'Menyimpan...' : 'Simpan'}
                  </Button>
                  <Link href={route('admin.pln-customers.index')}>
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
