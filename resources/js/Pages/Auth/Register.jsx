import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, ArrowRight, Lock, Mail, User } from 'lucide-react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Daftar Akun Baru" />

            <div className="min-h-[80vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
                <Card className="max-w-md w-full border border-slate-200/60 dark:border-slate-800 shadow-2xl shadow-slate-300/40 dark:shadow-none bg-white/90 dark:bg-slate-900/80 backdrop-blur-md rounded-[2.5rem] overflow-hidden">
                    <CardHeader className="text-center space-y-2">
                        <div className="mx-auto bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                            <Zap className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle className="text-3xl font-bold tracking-tight dark:text-white">Buat Akun</CardTitle>
                        <CardDescription className="text-base dark:text-slate-400">
                            Bergabunglah dengan ribuan pebisnis lainnya
                        </CardDescription>
                    </CardHeader>
                    
                    <form onSubmit={submit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="relative">
                                    <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                    <Input 
                                        type="text" 
                                        placeholder="Nama lengkap" 
                                        className="pl-10 h-12 rounded-xl"
                                        value={data.nama}
                                        onChange={(e) => setData('nama', e.target.value)}
                                        error={errors.nama}
                                    />
                                </div>
                                {errors.nama && <p className="text-sm text-destructive font-medium">{errors.nama}</p>}
                            </div>

                            <div className="space-y-2">
                                <div className="relative">
                                    <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                    <Input 
                                        type="text" 
                                        placeholder="Username" 
                                        className="pl-10 h-12 rounded-xl"
                                        value={data.username}
                                        onChange={(e) => setData('username', e.target.value)}
                                        error={errors.username}
                                    />
                                </div>
                                {errors.username && <p className="text-sm text-destructive font-medium">{errors.username}</p>}
                            </div>

                            <div className="space-y-2">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                    <Input 
                                        type="email" 
                                        placeholder="Email anda" 
                                        className="pl-10 h-12 rounded-xl"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        error={errors.email}
                                    />
                                </div>
                                {errors.email && <p className="text-sm text-destructive font-medium">{errors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                    <Input 
                                        type="password" 
                                        placeholder="Password" 
                                        className="pl-10 h-12 rounded-xl"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        error={errors.password}
                                    />
                                </div>
                                {errors.password && <p className="text-sm text-destructive font-medium">{errors.password}</p>}
                            </div>

                            <div className="space-y-2">
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                    <Input 
                                        type="password" 
                                        placeholder="Konfirmasi Password" 
                                        className="pl-10 h-12 rounded-xl"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        
                        <CardFooter className="flex flex-col gap-4">
                            <Button className="w-full h-12 text-lg font-semibold rounded-xl shadow-lg shadow-primary/20" disabled={processing}>
                                {processing ? 'Mendaftarkan...' : 'Daftar Sekarang'}
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <p className="text-sm text-slate-500 text-center">
                                Sudah punya akun?{' '}
                                <Link href="/login" className="text-primary font-semibold hover:underline">
                                    Masuk di sini
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </GuestLayout>
    );
}
