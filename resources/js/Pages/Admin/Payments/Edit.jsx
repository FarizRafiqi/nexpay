import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PaymentsEdit({ auth, payment }) {
  const { data, setData, put, processing, errors } = useForm({
    status: payment.status || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('admin.payments.update', payment.id));
  };

  return (
    <AuthenticatedLayout auth={auth}>
      <Head title="Edit Pembayaran" />
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
                Edit <span className="text-primary italic">Pembayaran</span>
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
              <CardTitle className="text-sm font-bold">Edit Status Pembayaran</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 block">
                    Status
                  </label>
                  <select
                    value={data.status}
                    onChange={(e) => setData('status', e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
                  >
                    <option value="">Pilih Status</option>
                    <option value="tertunda">Tertunda</option>
                    <option value="sukses">Sukses</option>
                    <option value="gagal">Gagal</option>
                  </select>
                  {errors.status && (
                    <p className="text-[10px] text-rose-500 mt-1">{errors.status}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button type="submit" disabled={processing} className="h-9 text-xs">
                    <Save className="w-3.5 h-3.5" />
                    {processing ? 'Menyimpan...' : 'Simpan'}
                  </Button>
                  <Link href={route('admin.payments.index')}>
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
