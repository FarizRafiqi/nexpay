import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
	Search,
	CheckCircle2,
	Info
} from 'lucide-react';
import { motion } from 'framer-motion';


export default function HowToPay() {
	const steps = [
		{
			title: "Siapkan Data",
			desc: "Siapkan nomor meter atau ID Pelanggan Anda (terdiri dari 11-12 digit angka).",
			img: "/assets/img/ilustrasi/ilustrasi-meteran-listrik@2x.png"
		},
		{
			title: "Masukkan ID",
			desc: "Buka beranda Nexpay dan masukkan nomor meter atau ID Pelanggan Anda di kolom yang tersedia.",
			img: "/assets/img/ilustrasi/ilustrasi-input-id-pelanggan@2x.png"
		},
		{
			title: "Cek Tagihan",
			desc: "Tunggu sistem menarik data tagihan Anda dari database PLN. Rincian biaya akan muncul secara otomatis.",
			img: "/assets/img/ilustrasi/payment-bill-time-illustration@2x.png"
		},
		{
			title: "Klik Bayar",
			desc: "Tekan tombol 'Bayar' yang muncul di bawah rincian tagihan Anda.",
			img: "/assets/img/ilustrasi/ilustrasi-klik-tombol-cek-tagihan@2x.png"
		},
		{
			title: "Pilih Metode",
			desc: "Pilih metode pembayaran yang paling nyaman bagi Anda (Transfer Bank, E-Wallet, dll).",
			img: "/assets/img/ilustrasi/mobile-payment-illustration@2x.png"
		},
		{
			title: "Transfer",
			desc: "Lakukan transfer sesuai dengan nominal yang tertera pada instruksi pembayaran.",
			img: "/assets/img/ilustrasi/search-illustration@2x.png"
		},
		{
			title: "Konfirmasi",
			desc: "Setelah melakukan transfer, tekan tombol 'Saya Sudah Bayar' untuk proses verifikasi.",
			img: "/assets/img/ilustrasi/user-profile-illustration@2x.png"
		},
		{
			title: "Selesai",
			desc: "Sistem akan memverifikasi pembayaran Anda. Status akan berubah menjadi 'Berhasil' di riwayat transaksi.",
			icon: CheckCircle2
		}
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
			<Head title="Cara Pembayaran - Nexpay" />

			<section className="pt-32 pb-24 bg-slate-50 dark:bg-slate-950 transition-colors">
				<div className="container px-4 mx-auto text-center">
					<motion.div 
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="max-w-2xl mx-auto"
					>
						<div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary/10 rounded-full border border-primary/20">
							<Info className="w-4 h-4 text-primary" />
							<span className="text-sm font-bold text-primary tracking-wide uppercase">Panduan Lengkap</span>
						</div>
						<h1 className="text-4xl lg:text-6xl font-black mb-8 dark:text-white leading-tight">
							Bagaimana Cara <br />
							Membayar di <span className="text-primary">Nexpay?</span>
						</h1>
						<p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
							Ikuti langkah-langkah praktis di bawah ini untuk pengalaman pembayaran listrik yang lebih lancar.
						</p>
					</motion.div>
				</div>
			</section>

			<section className="pb-32 bg-slate-50 dark:bg-slate-950 transition-colors">
				<div className="container px-4 mx-auto">
					<motion.div 
						variants={container}
						initial="hidden"
						animate="show"
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
					>
						{steps.map((step, index) => (
							<motion.div key={index} variants={item}>
								<Card className="group h-full border border-slate-200/50 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden hover:ring-4 hover:ring-primary/10 transition-all duration-500">
                                <CardContent className="p-8">
                                    <div className="relative mb-8 aspect-square flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                        {step.img ? (
                                            <img src={step.img} className="w-auto h-28 object-contain dark:brightness-90" alt={step.title} />
                                        ) : (
                                            <step.icon className="w-16 h-16 text-primary" />
                                        )}
                                        <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center text-lg font-black shadow-lg shadow-primary/30">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white tracking-tight">{step.title}</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {step.desc}
                                    </p>
                                </CardContent>
                            </Card>
							</motion.div>
						))}
					</motion.div>

					<motion.div 
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="mt-20 p-10 lg:p-16 bg-slate-900 dark:bg-primary/20 rounded-[3.5rem] text-white flex flex-col lg:flex-row items-center justify-between gap-10 shadow-3xl relative overflow-hidden border border-white/5"
					>
						<div className="absolute top-0 right-0 p-10 opacity-10">
							<Search className="w-64 h-64 -mr-32 -mt-32" />
						</div>
						<div className="text-center lg:text-left relative z-10">
							<h2 className="text-4xl font-black mb-4">Punya Pertanyaan Lain?</h2>
							<p className="text-slate-400 dark:text-slate-300 text-lg max-w-md">Tim kami siap membantu Anda 24/7 jika mengalami kendala teknis.</p>
						</div>
						<div className="flex gap-4 relative z-10">
							<Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 rounded-2xl px-12 h-16 text-lg font-bold shadow-xl">
								Hubungi CS
							</Button>
						</div>
					</motion.div>
				</div>
			</section>
		</GuestLayout>
	);
}
