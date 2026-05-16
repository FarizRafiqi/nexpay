import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Shield, Target, Zap } from 'lucide-react';

export default function AboutUs() {
    return (
        <GuestLayout>
            <Head title="Tentang Kami" />
            
            <section className="pt-32 pb-24 bg-slate-50 dark:bg-slate-900 transition-colors">
                <div className="container px-4 mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl lg:text-5xl font-black mb-6 dark:text-white">Tentang Nexpay</h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                            Nexpay (sebelumnya dikenal sebagai Megamendung) adalah platform pembayaran listrik pascabayar berbasis web 
                            yang dirancang untuk memudahkan siapa pun dalam mengecek informasi tagihan dan membayar tagihan listrik 
                            secara mudah, aman, dan efisien.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors">
                <div className="container px-4 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
                        {[
                            { icon: Target, title: "Misi Kami", desc: "Memberikan akses termudah bagi seluruh masyarakat untuk mengelola tagihan listrik mereka tanpa hambatan." },
                            { icon: Shield, title: "Keamanan Utama", desc: "Menjaga integritas data dan keamanan transaksi setiap pelanggan dengan standar enkripsi terbaru." },
                            { icon: Zap, title: "Kecepatan Layanan", desc: "Proses verifikasi otomatis yang memungkinkan pembayaran Anda terdeteksi dalam hitungan detik." }
                        ].map((item, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800"
                            >
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <item.icon className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-4 dark:text-white">{item.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="max-w-lg mx-auto">
                        <Card className="border-none shadow-2xl shadow-slate-200/60 dark:shadow-none bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden">
                            <CardContent className="p-12 text-center">
                                <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-slate-100 dark:bg-slate-800 p-1">
                                    <img 
                                        src="https://ui-avatars.com/api/?name=Fariz+Rafiqi&background=0D8ABC&color=fff&size=128" 
                                        className="w-full h-full rounded-full" 
                                        alt="Administrator" 
                                    />
                                </div>
                                <span className="inline-block px-4 py-1.5 mb-4 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-widest uppercase">
                                    Administrator
                                </span>
                                <h2 className="text-2xl font-bold mb-4 dark:text-white">Aulia El Ihza Fariz Rafiqi</h2>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                    "Saya adalah orang yang ambisius. Saya suka dengan ketenangan, dan saya orang yang simpel."
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
