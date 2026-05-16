import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PaymentMethodsCreate({ auth }) {
  const { data, setData, post, processing, errors } = useForm({
    nama: '',
    slug: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('admin.payment-methods.store'));
  };

  return (
    <AuthenticatedLayout auth={auth}>
      <Head title="Tambah Metode Pembayaran" />
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
                Tambah <span className="text-primary italic">Metode Pembayaran</span>
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Tambah metode pembayaran baru
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
              <CardTitle className="text-sm font-bold">Informasi Metode Pembayaran</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 block">
                    Nama
                  </label>
                  <Input
                    value={data.nama}
                    onChange={(e) => setData('nama', e.target.value)}
                    placeholder="Masukkan nama metode"
                  />
                  {errors.nama && (
                    <p className="text-[10px] text-rose-500 mt-1">{errors.nama}</p>
                  )}
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 block">
                    Slug
                  </label>
                  <Input
                    value={data.slug}
                    onChange={(e) => setData('slug', e.target.value)}
                    placeholder="Masukkan slug"
                  />
                  {errors.slug && (
                    <p className="text-[10px] text-rose-500 mt-1">{errors.slug}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button type="submit" disabled={processing} className="h-9 text-xs">
                    <Save className="w-3.5 h-3.5" />
                    {processing ? 'Menyimpan...' : 'Simpan'}
                  </Button>
                  <Link href={route('admin.payment-methods.index')}>
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
