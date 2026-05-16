import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save } from 'lucide-react';

export default function Edit({ auth, permission }) {
    const { data, setData, put, processing, errors } = useForm({
        title: permission.title,
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route('admin.permissions.update', permission.id));
    }

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Edit Permission" />

            <div className="flex-1 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl md:text-2xl font-black tracking-tight">Edit Permission</h2>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Ubah permission #{permission.id}</p>
                    </div>
                    <Link href={route('admin.permissions.index')}>
                        <Button variant="outline">
                            <ArrowLeft className="w-4 h-4" />
                            Kembali
                        </Button>
                    </Link>
                </div>

                <Card className="bg-white dark:bg-slate-900 border-none shadow-sm rounded-xl">
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Title</label>
                                <Input
                                    placeholder="Contoh: create-user"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                />
                                {errors.title && <p className="text-[10px] text-red-500">{errors.title}</p>}
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <Button type="submit" disabled={processing}>
                                    <Save className="w-4 h-4" />
                                    Update
                                </Button>
                                <Link href={route('admin.permissions.index')}>
                                    <Button type="button" variant="ghost">Batal</Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
