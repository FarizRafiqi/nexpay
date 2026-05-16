import { Link, Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	Zap,
	ShieldCheck,
	Wallet,
	ArrowRight,
	CheckCircle2,
	CreditCard,
	ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';


export default function Welcome() {
	const steps = [
		{ title: "Siapkan Data", desc: "Siapkan nomor meter atau ID Pelanggan Anda.", img: "/assets/img/ilustrasi/ilustrasi-meteran-listrik@2x.png" },
		{ title: "Input ID", desc: "Masukkan nomor meter atau ID Pelanggan di kolom cek tagihan.", img: "/assets/img/ilustrasi/ilustrasi-input-id-pelanggan@2x.png" },
		{ title: "Cek Tagihan", desc: "Tunggu hingga rincian tagihan Anda muncul secara otomatis.", img: "/assets/img/ilustrasi/payment-bill-time-illustration@2x.png" },
		{ title: "Klik Bayar", desc: "Klik tombol bayar untuk melanjutkan ke proses transaksi.", img: "/assets/img/ilustrasi/ilustrasi-klik-tombol-cek-tagihan@2x.png" },
		{ title: "Metode Bayar", desc: "Pilih berbagai metode pembayaran yang tersedia.", img: "/assets/img/ilustrasi/mobile-payment-illustration@2x.png" },
		{ title: "Instruksi", desc: "Ikuti instruksi pembayaran sesuai bank yang dipilih.", img: "/assets/img/ilustrasi/search-illustration@2x.png" },
		{ title: "Konfirmasi", desc: "Tekan tombol 'Saya Sudah Bayar' setelah transfer.", img: "/assets/img/ilustrasi/user-profile-illustration@2x.png" },
		{ title: "Selesai", desc: "Cek status di menu Riwayat Transaksi. Listrik aman!", icon: CheckCircle2 }
	];

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1
			}
		}
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 }
	};


	return (
		<GuestLayout>
			<Head title="Solusi Pembayaran Listrik Praktis" />

			{/* Hero Section */}
			<section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-48 bg-slate-50 dark:bg-slate-900 transition-colors">
				<div className="container relative z-10 px-4 mx-auto">
					<div className="flex flex-wrap items-center -mx-4">
						<motion.div 
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5 }}
							className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0 text-left"
						>
                            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-200 dark:border-slate-700">
                                <Zap className="w-4 h-4 text-primary fill-current" />
                                <span className="text-sm font-semibold dark:text-slate-300 tracking-wide uppercase">Solusi Listrik Pascabayar</span>
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-[1.1] dark:text-white">
                                Penuhi Kebutuhan <br />
                                <span className="text-primary italic">Listrik</span> Kamu
                            </h1>
                            <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-lg leading-relaxed">
                                Kini cek dan bayar tagihan listrik PLN tidak perlu keluar rumah.
                                Lakukan semuanya dengan aman dan efisien di platform Nexpay.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="h-16 px-10 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/30 group bg-primary text-white hover:scale-105 active:scale-95 transition-all" asChild>
                                    <Link href="/register">
                                        Mulai Sekarang
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl text-lg font-bold border-slate-200 dark:border-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900 hover:scale-105 active:scale-95 transition-all shadow-sm" asChild>
                                    <Link href="/how-to-pay">Lihat Panduan</Link>
                                </Button>
                            </div>
						</motion.div>
						<motion.div 
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="w-full lg:w-1/2 px-4"
						>
                            <div className="relative max-w-md mx-auto lg:max-w-none">
                                <img
                                    src="/assets/img/ilustrasi/mobile-payment-illustration@2x.png"
                                    className="relative z-10 w-full drop-shadow-2xl"
                                    alt="Nexpay Payment"
                                />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl z-0" />
                            </div>
						</motion.div>
					</div>
				</div>

			</section>

			{/* Steps Section */}
			<section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors">
				<div className="container px-4 mx-auto">
					<div className="text-center mb-20">
						<h2 className="text-3xl lg:text-4xl font-bold mb-4 dark:text-white">Cara Bayar di Nexpay</h2>
						<p className="text-slate-500 dark:text-slate-400">Ikuti 8 langkah mudah untuk melunasi tagihan Anda.</p>
					</div>

					<motion.div 
						variants={container}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: "-100px" }}
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
					>
						{steps.map((step, index) => (
							<motion.div key={index} variants={item}>
								<Card className="h-full border-none shadow-2xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900 rounded-3xl group overflow-hidden hover:scale-[1.02] transition-all">
                                <CardContent className="p-8">
                                    <div className="w-full h-40 flex items-center justify-center mb-6 bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden group-hover:scale-105 transition-transform border border-slate-100 dark:border-slate-700">
                                        {step.img ? (
                                            <img src={step.img} className="w-auto h-24 object-contain dark:brightness-90" alt={step.title} />
                                        ) : (
                                            <step.icon className="w-16 h-16 text-primary" />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-xs font-bold">{index + 1}</span>
                                        <h3 className="font-bold text-xl text-slate-900 dark:text-white">{step.title}</h3>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                        {step.desc}
                                    </p>
                                </CardContent>
                            </Card>
							</motion.div>
						))}
					</motion.div>
				</div>

			</section>

			{/* Benefits Section */}
			<section className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors">
				<div className="container px-4 mx-auto">
					<div className="flex flex-wrap -mx-4 items-center">
						<motion.div 
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0"
						>
							<h2 className="text-4xl font-bold mb-8 dark:text-white max-w-md">Kenapa Lebih Baik Pakai Nexpay?</h2>
							<div className="space-y-6">
								{[
									{ icon: CreditCard, title: "Pembayaran Otomatis", desc: "Nikmati kemudahan fitur pembayaran otomatis setiap bulannya." },
									{ icon: Wallet, title: "Cashback Menarik", desc: "Dapatkan reward berupa cashback di setiap transaksi pembayaran." },
									{ icon: ShieldCheck, title: "Keamanan Terjamin", desc: "Sistem enkripsi tingkat tinggi menjamin keamanan data transaksi Anda." }
								].map((benefit, i) => (
									<div key={i} className="flex gap-4 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
										<div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
											<benefit.icon className="w-6 h-6 text-primary" />
										</div>
										<div>
											<h4 className="font-bold mb-1 text-slate-900 dark:text-white">{benefit.title}</h4>
											<p className="text-sm text-slate-600 dark:text-slate-300">{benefit.desc}</p>
										</div>
									</div>
								))}
							</div>
						</motion.div>
						<motion.div 
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className="w-full lg:w-1/2 px-4"
						>
							<div className="bg-primary/10 p-12 rounded-[3rem] relative border border-primary/20">
								<div className="absolute top-0 right-0 p-8">
									<Zap className="w-20 h-20 text-primary opacity-20" />
								</div>
								<h3 className="text-2xl font-bold mb-6 dark:text-white">Tentang Nexpay</h3>
								<p className="text-slate-600 dark:text-slate-400 mb-8 leading-loose text-sm">
									Nexpay (sebelumnya dikenal sebagai Megamendung) adalah platform pembayaran listrik pascabayar berbasis web terpercaya.
									Kami hadir untuk memberikan kemudahan akses informasi tagihan dan efisiensi pembayaran dalam satu genggaman.
									Dikelola oleh tim profesional yang berdedikasi tinggi untuk kenyamanan pelanggan.
								</p>
								<div className="flex items-center gap-4">
									<div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden border-2 border-white dark:border-slate-800">
										<img src="https://ui-avatars.com/api/?name=Fariz+Rafiqi&background=0D8ABC&color=fff" alt="Admin" />
									</div>
									<div>
										<p className="font-bold text-slate-900 dark:text-white text-lg">Aulia El Ihza Fariz Rafiqi</p>
										<p className="text-sm text-slate-500 dark:text-slate-400">Lead Administrator</p>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-24 bg-white dark:bg-slate-950 transition-colors overflow-hidden relative">
				<div className="container px-4 mx-auto relative z-10">
					<motion.div 
						initial={{ opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						className="bg-slate-900 dark:bg-primary/20 rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl border border-white/10"
					>
						<div className="absolute top-0 right-0 p-4 opacity-10">
							<Zap className="w-96 h-96 -mr-48 -mt-48" />
						</div>
						<h2 className="text-4xl lg:text-5xl font-black mb-8">Siap Mengelola Tagihan Anda?</h2>
						<p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
							Bergabunglah bersama ribuan pengguna lainnya yang telah beralih ke cara pembayaran yang lebih cerdas.
						</p>
						<div className="flex justify-center gap-4">
							<Button size="lg" className="h-16 px-10 rounded-2xl text-lg bg-white text-slate-900 hover:bg-slate-100 group shadow-xl">
								<Link href="/register" className="flex items-center">
									Daftar Sekarang
									<ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
								</Link>
							</Button>
						</div>
					</motion.div>
				</div>
			</section>
		</GuestLayout>
	);
}
