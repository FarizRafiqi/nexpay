import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        titles: [''],
    });

    function addTitle() {
        setData('titles', [...data.titles, '']);
    }

    function removeTitle(index) {
        if (data.titles.length === 1) return;
        setData('titles', data.titles.filter((_, i) => i !== index));
    }

    function updateTitle(index, value) {
        const updated = [...data.titles];
        updated[index] = value;
        setData('titles', updated);
    }

    function handleSubmit(e) {
        e.preventDefault();
        post(route('admin.permissions.store'));
    }

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Tambah Permission" />

            <div className="flex-1 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl md:text-2xl font-black tracking-tight">Tambah Permission</h2>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Buat permission baru</p>
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
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Titles</label>
                                    <Button type="button" variant="outline" size="sm" onClick={addTitle}>
                                        <Plus className="w-3.5 h-3.5" />
                                        Tambah Field
                                    </Button>
                                </div>
                                {data.titles.map((title, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <Input
                                            placeholder="Contoh: create-user"
                                            value={title}
                                            onChange={(e) => updateTitle(index, e.target.value)}
                                        />
                                        {data.titles.length > 1 && (
                                            <Button type="button" variant="ghost" size="sm" onClick={() => removeTitle(index)}>
                                                <Trash2 className="w-3.5 h-3.5 text-red-500" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                {errors.titles && <p className="text-[10px] text-red-500">{errors.titles}</p>}
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <Button type="submit" disabled={processing}>
                                    <Save className="w-4 h-4" />
                                    Simpan
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
